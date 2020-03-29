function adjust_extent(my_array){
    return [0.8*my_array[0],1.2*my_array[1]];
}

d3.csv('assets/data/data.csv').then(function(data){
    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

    var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    abbr = data.map(x=>x.abbr);
    poverty = data.map(x=>parseFloat(x.poverty));
    no_health = data.map(x=>parseFloat(x.healthcare));

    xlims = adjust_extent(d3.extent(poverty));
    ylims = adjust_extent(d3.extent(no_health));
    
    xscale = d3.scaleLinear().domain(xlims).range([0,width]);
    yscale = d3.scaleLinear().domain(ylims).range([height,0]);

    xAxis = d3.axisBottom(xscale);
    yAxis = d3.axisLeft(yscale);

    var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    chartGroup.append('g').attr('transform',`translate(0,${height})`)
                          .attr("stroke","1.5")
                          .call(xAxis);
    
    chartGroup.append('g').attr("stroke","1.5")
                          .call(yAxis);

    
    var circles = chartGroup.selectAll("circle")
                            .data(data)
                            .enter()
                            .append("circle")
                            .attr("cx", d=>xscale(parseFloat(d.poverty)))
                            .attr("cy", d=>yscale(parseFloat(d.healthcare)))
                            .attr("r", "8")
                            .attr("fill", "blue")
                            .attr("opacity","0.5");


    data.forEach(function(d){
        x = xscale(parseFloat(d.poverty));
        y = yscale(parseFloat(d.healthcare));
        chartGroup.append("text")
                  .attr("transform",`translate(${x-5},${y+4})`)
                  .attr("stroke","white")
                  .attr("fill","white")
                  .attr("font-size","8px")
                  .text(d.abbr);
    })

                          

    let label1 = chartGroup.append("text")
                           .attr("x",50)
                           .attr("y",height+45)
                           .attr("font-weight",'bold')
                           .text("Percentage of Individuals In Poverty")
    
    let label2 = chartGroup.append("text")
                           .attr("x",-height+50)
                           .attr("y",-25)
                           .attr("font-weight","bold")
                           .attr("transform","rotate(270)")
                           .text("Percentage of Individuals Without Healthcare")
                        

    });