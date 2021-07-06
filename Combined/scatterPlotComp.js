import {colorLegend} from './colorLegend'
export const scatterPlot = (selection, props) => {

    const {
        title,
        xValue,
        xLabel,
        xColName,
        yValue,
        yLabel,
        yColName,
        margin,
        width,
        height,
        xUnits,
        yUnits,
        flag,
        dateRange,
        colorScale,
        colorValue,
        data,
        data2
        

    } = props;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    let dataF = data;

    const g = selection.selectAll('.container').data([null]);
    const gEnter = g.enter().append('g')
    .attr('class', 'container');
    
   // d3.selectAll('#svgG').remove();

    // const svgZ = selection.append('svg').attr('id', 'svgG');

    const svgZM = selection.selectAll('.svgG').data([null]);
    const svgZMEnter = svgZM.enter().append('svg')
    .attr('class', 'svgG')
    .attr('x',90)
    .attr('y', 60)
    .attr("width", innerWidth)
    .attr("height", innerHeight)


    svgZMEnter.merge(svgZM)
   // .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // svgZ.append("rect")
    // .attr('x', margin.left)
    // .attr('y', margin.top)
    // .attr("width", innerWidth)
    // .attr("height", innerHeight)
    // .style("fill", "none")
    const svgZ = d3.selectAll('.svgG');

    const gZ = svgZ.selectAll('.containerZ').data([null]);
    const gZEnter = gZ.enter().append('g')
    .attr('class', 'containerZ');

    gEnter.merge(g)
    .attr('transform', `translate(${90},${60})`);


  //  d3.selectAll('.svgX').remove()
  console.log(xColName)

    const xScale = d3.scaleLinear()
    .domain(d3.extent(dataF, xValue))
    .range([0,innerWidth])
    .nice();

    const yScale = d3.scaleLinear()
    .domain(d3.extent(dataF, yValue))
    .range([ innerHeight, 0])
    .nice();
    
    const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

    const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(10);

    const yAxisG = g.select('.yAxis');
    const yAxisGEnter = gEnter.append('g')
    .attr('class', 'yAxis');

    yAxisG.merge(yAxisGEnter)
    .call(yAxis)
    .selectAll('.domain')
    .remove();

    const yAxisLabelText = yAxisGEnter
    .append('text')
    .attr('class', 'axis-label')
    .attr('transform', `rotate(270)`)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .attr('y', -70)
    .merge(yAxisG.select('.axis-label'))
    .attr('x', -innerHeight/2)
    .text(yLabel + yUnits);

    const xAxisG = g.select('.xAxis');
    const xAxisGEnter = gEnter.append('g')
    .attr('class', 'xAxis')
    .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.merge(xAxisGEnter)
    .call(xAxis)
    .selectAll('.domain')
    .remove();

    const xAxisLabelText = xAxisGEnter
    .append('text')
    .attr('class', 'axis-label')
    .attr('fill', 'black')
    .attr('align', 'center')
    .attr('y', 50)
    .merge(xAxisG.select('.axis-label'))
    .attr('x', innerWidth/2)
    .text(xLabel + xUnits);

    const titleG = g.select('.title');
    const titleGEnter = gEnter.append('g')
    .attr('class', 'title')

    titleG.merge(titleGEnter)
    .selectAll('.domain')
    .remove();

    const titleGText = titleGEnter
    .append('text')
    .attr('class', 'title-text')
    .attr('fill', 'black')
    .attr('align', 'center')
    .attr('y', -10)
    .merge(titleG.select('.title-text'))
    .attr('x', innerWidth/2)
    .text(title);


   var opacity = function(val) {
    if (val.length < 500) {
          return 1;
      }
    if ( val.length < 1000) {
        return 0.8;
    }
    if ( val.length < 2000) {
        return 0.65;
    }
    if ( val.length < 5000) {
        return 0.45;
    }
    if ( val.length < 10000) {
        return 0.25;
    }
    if ( val.length < 20000) {
        return 0.1;
    }
    else {
        return 0.08;
    }
   }

  d3.selectAll('.tooltip').remove();
   
    var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("fill-opacity", 0);

  //  var hideT = document.getElementsByClassName("tooltip");
    var tipMouseover = function(event,d) {

       // hideT.style.display = "block";
        
        var color = colorScale(colorValue(d));

        d3.select(this)
        .attr('stroke-width', '2')
        .attr("stroke", "black")
        .attr('fill-opacity', 1 );

        tooltip.html( "<b>" + d.pl_name + "</b>" + "<br/>" +
        "<span style='color:" + color + ";'>" + d.discoverymethod + "</span><br/>" +
        yLabel + ": " + d[yColName] + "<br/>" + xLabel + ": " + + d[xColName] 
        )
        .style("left", (event.pageX -95) + "px")
        .style("top", (event.pageY -90) + "px")
        .transition()
            .duration(200) 
            .style("fill-opacity", .9) 
            .style('display','block'); 

    };
    var tipMouseout = function(d) {

        // d3.selectAll('.circleG')
        // .attr('fill-opacity', opacity);

        d3.select(this)
        .attr('stroke-width', '0')
        .attr('fill-opacity', opacity(dataF) );

        tooltip.transition()
            .duration(200) 
            .style("fill-opacity", 0)
            .style('display','none'); 

       // hideT.style.display = "none";
    };


    var zoom = d3.zoom()
    .extent([[0, 0], [innerWidth, innerHeight]])
    .on("zoom", zoomed);

    function zoomed(event) {
        // create new scale ojects based on event

        if(event.sourceEvent.x < 991 || event.sourceEvent.x >1640 || event.sourceEvent.y<180 || event.sourceEvent.y>640){
          
            window.scrollBy(0, event.sourceEvent.deltaY);
            return;

        }
        else{
           
                var new_xScale = event.transform.rescaleX(xScale);
                var new_yScale = event.transform.rescaleY(yScale);
            // update axes
                // gX.call(xAxis.scale(new_xScale));
                // gY.call(yAxis.scale(new_yScale));
    
                // var yAxisZ = d3.axisLeft(new_yScale)
                // .tickSize(-innerWidth)
                // .tickPadding(10);
            
                // var xAxisZ = d3.axisBottom(new_xScale)
                // .tickSize(-innerHeight)
                // .tickPadding(10);
    
                xAxisG.merge(xAxisGEnter)
                .call(xAxis.scale(new_xScale))
                .selectAll('.domain')
                .remove();
    
                yAxisG.merge(yAxisGEnter)
                .call(yAxis.scale(new_yScale))
                .selectAll('.domain')
                .remove();
    
                // xAxisGEnter
                // .call(xAxis.scale(new_xScale))
                // .selectAll('.domain')
                // .merge(xAxisG.select('.axis-label'))
                // .call(xAxis.scale(new_xScale))
                // .attr('x', innerWidth/2)
                // .text(xLabel + xUnits)
                // .remove();
              
                // yAxisGEnter
                // .call(yAxis.scale(new_yScale))
                // .selectAll('.domain')
                // .merge(xAxisG.select('.axis-label'))
                // .call(yAxis.scale(new_xScale))
                // .attr('x', innerHeight/2)
                // .text(yLabel + yUnits)
                // .remove();
    
                // var newX = event.transform.rescaleX(xScale);
                // var newY = event.transform.rescaleY(yScale);
    
                // xAxis.call(d3.axisBottom(newX));
                // yAxis.call(d3.axisLeft(newY));
            
                  d3.selectAll('.circleG')
                   .attr('cy', d => new_yScale(yValue(d)))
                    .attr('cx', d => new_xScale(xValue(d)));
        }

      
    }
    
    const circles =  gZ.merge(gZEnter).selectAll('circle').data(dataF);

    // function size (d) {
    //     if(d)
    // }

    if(flag == 0) {
        circles.enter().append('circle')
        .attr('class', 'circleG')
        .attr('cx', innerWidth/2)
        .attr('cy', innerHeight/2)
        .attr('r', 2.2)
        .merge(circles)
        .attr('r', d => d.sizeP)
        .transition().duration(2000)
        .attr('fill', d => colorScale(colorValue(d)))
        .attr('fill-opacity', opacity(dataF))
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        

    }

    if(flag == 1) {
        circles.enter().append('circle')
        .attr('class', 'circleG')
        .attr('cx', innerWidth/2)
        .attr('cy', innerHeight/2)
        .attr('r', 2.2)
        .merge(circles)
        .attr('fill', d => colorScale(colorValue(d)))
        .attr('fill-opacity', opacity(dataF))
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', d => d.sizeP);
    }

        //  var u = d3.selectAll('.circleG')
        //   .data(data2)
    
        // circles.exit()
        //   .transition() // and apply changes to all of them
        //   .duration(2000)
        //   .style("opacity", 0)
        //   .remove()
      

  

        // // Create the u variable
        // var u = d3.selectAll('.circleG')
        //   .data(data2)
      
        // u
        //   .transition() // and apply changes to all of them
        //   .duration(2000)
        //     .attr("cx",  d => xScale(xValue(d)))
        //     .attr("cy", d => yScale(yValue(d)))
        //     .attr('fill', d => colorScale(colorValue(d)))
        //     .attr('fill-opacity', opacity(dataF))
        //     .attr("r", 4.5)

        // u
        // .enter()
        // .append("circle") // Add a new circle for each new elements
        // .merge(u) // get the already existing elements as well
        // .transition() // and apply changes to all of them
        // .duration(1000)
        // .attr("cx",  d => xScale(xValue(d)))
        // .attr("cy", d => yScale(yValue(d)))
        // .attr('fill', d => colorScale(colorValue(d)))
        // .attr('fill-opacity', opacity(dataF))
        // .attr("r", 4.5)
      
        // // If less group in the new dataset, I delete the ones not in use anymore
        // u
        //   .exit()
        //   .transition() // and apply changes to all of them
        //   .duration(2000)
        //   .style("opacity", 0)
        //   .remove()
      console.log(dataF)
 
    d3.selectAll('.circleG')
    .on('mouseover', tipMouseover)
    .on('mouseout', tipMouseout);

    d3.selectAll('.circleG').exit().remove();
    
    d3.selectAll('#svgM').call(d3.zoom().extent([[0, 0], [innerWidth, innerHeight]]).scaleExtent([1, 50]).translateExtent([[0, 0], [innerWidth, innerHeight]]).on("zoom",zoomed));

    circles.exit().remove();

    // d3.select('body')
    // .style('overflow-y', 'hidden')

   
};

