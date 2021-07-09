import {colorLegend} from './colorLegend'
export const scatterPlotS = (selection, props) => {

    const {
        title,
        xValue,
        xLabel,
        x2Value,
        x2Label,
        xColName: xColumn,
        yValue,
        yLabel,
        yColName: yColumn,
        margin,
        widthS,
        heightS,
        //flag,
       // dateRange: dateRange,
        colorScale,
        colorValue,
        data,
        data2,
        xLre
     

        

    } = props;

    const innerWidth = widthS - margin.left - margin.right;
    const innerHeight = heightS - margin.top - margin.bottom;
    let dataF = data;
   
    const g = selection.selectAll('.container').data([null]);
    const gEnter = g.enter().append('g')
    .attr('class', 'container');
    
   // d3.selectAll('#svgG').remove();

    // const svgZ = selection.append('svg').attr('id', 'svgG');

    const svgZM = selection.selectAll('.svgGS').data([null]);
    const svgZMEnter = svgZM.enter().append('svg')
    .attr('class', 'svgGS')
    .attr('x',200)
    .attr('y', 100)
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .append("rect")
    .attr('x',50)
    .attr('y', 800)
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .style("fill", "none");

    svgZMEnter.merge(svgZM)
   .attr('transform', `translate(${0},${0})`);
    
    // svgZ.append("rect")
    // .attr('x', margin.left)
    // .attr('y', margin.top)
    // .attr("width", innerWidth)
    // .attr("height", innerHeight)
    // .style("fill", "none")
    const svgZ = d3.selectAll('.svgGS');

    const gZ = svgZ.selectAll('.containerZ').data([null]);
    const gZEnter = gZ.enter().append('g')
    .attr('class', 'containerZ');

    gEnter.merge(g)
    .attr('transform', `translate(${200},${100})`);


  //  d3.selectAll('.svgX').remove()
    
    const xScale = d3.scaleLinear()
    .domain([-0.4,2.4])
    .range([0,innerWidth])
    .nice()
  
    

    // const x2Dom = [2000,2900,3110,3320,3570,3870,4250,4670,5000,5200,5870,6820,8050,10100,1350,20000]
     const x2Dom = [2800,3450,4790,6900,50000]

     const x2Range = [0,190,405,620,850]
  
    // const x2Dom = [2800,2900,3090,3320,3450,3580,3890,4230,4680,21000]
    // const x2Range = [0,60,121,182,242,303,364,425,640,850]
   // x2Dom.reverse
    x2Range.reverse()
   
    // const x2Scale = d3.scaleSqrt()
    // .domain(x2Dom)
    // .range(x2Range)
    // .exponent(1/4)

    const x2Scale = d3.scaleLog()
    .domain(x2Dom)
    .range(x2Range)
    .base(2)
   


    // [innerWidth,innerWidth*13/14,innerWidth*12/14,innerWidth*11/14,innerWidth*10/14,innerWidth*9/14,innerWidth*8/14,
    //     innerWidth*7/14,innerWidth*6/14,innerWidth*5/14,innerWidth*4/14,innerWidth*3/14,innerWidth*2/14,innerWidth*1/14,0]

    const yScale = d3.scaleLinear()
    .domain([-5,3.5])
    .range([ innerHeight, 0])
    .nice();
    
    const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

    const xAxis = d3.axisBottom(xScale)
    .tickSize(-innerHeight)
    .tickPadding(10);

    const x2Axis = d3.axisTop(x2Scale)
    .tickSize(-7)
    .tickValues([40000,10000,5000,4000,3000])
    .tickPadding(20);

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
    .text(yLabel );

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
    .text(xLabel);


    const x2AxisG = g.select('.x2Axis');
    const x2AxisGEnter = gEnter.append('g')
    .attr('class', 'x2Axis')
    .attr('transform', `translate(0,${0})`);

    x2AxisG.merge(x2AxisGEnter)
    .call(x2Axis)
    .selectAll('.domain')
    .remove();

    const x2AxisLabelText = x2AxisGEnter
    .append('text')
    .attr('class', 'axis-label')
    .attr('fill', 'black')
    .attr('align', 'center')
    .attr('y', 24)
    .merge(x2AxisG.select('.axis-label'))
    .attr('x', innerWidth/2)
    .text(x2Label);

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
    .attr('y', -60)
    .merge(titleG.select('.title-text'))
    .attr('x', innerWidth/2)
    .text(title)
    .style('font-size', '24px')
    .style('fill', '#948e8d');


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
   
    var tooltip = d3.select(".transZ").append("div")
    .attr("class", "tooltip")
    .style("fill-opacity", 0);

  //  var hideT = document.getElementsByClassName("tooltip");
    var tipMouseover = function(event,d) {

       // hideT.style.display = "block";
        
        var color = colorScale(colorValue(d));
        var xM = d3.pointer(event, gZEnter.node())[0]
        var  yM = d3.pointer(event, gZEnter.node())[1]

        var offTY = 0;

        if(window.innerWidth<1900){
            offTY = -74
        }

        d3.select(this)
        .attr('stroke-width', '2')
        .attr("stroke", "black")
        .attr('fill-opacity', 1 );

        const subC = function(d) {
            if(d.sub_class === ""){
                return " "
            }
            else{
                return d.sub_class
            }
        }

        tooltip.html( "<b>" + d.hostname + "</b>"  + "<br/>" +
        "<span style='color:" + color + ";'>" + d.st_spectype +subC(d) + " "+ d.lum_class+"</span><br/>" +
        yLabel + ": " + Math.round(d.st_lum * 1000) / 1000 + "<br/>" + xLabel + ": " + + Math.round(d.st_bv * 1000) / 1000 
        )
        .style("left", (xM +310) + "px")
        .style("top", (yM +340+offTY) + "px")
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
    .on("zoom", function(event){
        //console.log(event)

        if(event.sourceEvent.x < 350 || event.sourceEvent.x >1260 || event.sourceEvent.y<90 || event.sourceEvent.y>730 ){

            return event;
        }
        else{
           // return zoomed
        }
      
    } );

    var yScaleAux = yScale;
    var xScaleAux = xScale;
    function zoomed(event) {
        // create new scale ojects based on event

       

        if (event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        if (event.sourceEvent && event.sourceEvent.type === "end") return;
        
        if (event.sourceEvent && event.sourceEvent.type !=="brush") { 

            if(event.sourceEvent.x < 350 || event.sourceEvent.x >1260 || event.sourceEvent.y<90 || event.sourceEvent.y>730 ){
        
                window.scrollBy(0, event.sourceEvent.deltaY);
                return;
            }
            
            else{
                var new_xScale = event.transform.rescaleX(xScale);
                var new_yScale = event.transform.rescaleY(yScale);
                var new_x2Scale = event.transform.rescaleX(x2Scale);

                yScaleAux = new_yScale
                xScaleAux = new_xScale
               // yScale.domain(new_yScale.domain());

           
              //  console.log(event.sourceEvent.y)
               
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
    
                x2AxisG.merge(x2AxisGEnter)
                .call(x2Axis.scale(new_x2Scale))
                .selectAll('.domain')
                .remove();
    
                // const line = d3.area()
                // .x(d => new_xScale(d.data.x))
                // .y(d => new_yScale(d[0]))
                
    
                
                d3.selectAll(".line-pathS")
               .attr("d", d3.line()
                .x(function(d) { return new_xScale(d.x) })
                .y(function(d) { return new_yScale(d.y) })
                )
               
    
                d3.selectAll('.rectP')
                .attr("transform", d => `translate(${new_xScale(xValue(d))},${new_yScale(yValue(d))})`)
            
                  d3.selectAll('.circleG')
                   .attr('cy', d => new_yScale(yValue(d)))
                    .attr('cx', d => new_xScale(xValue(d)))
                 //   .attr('r', 3.5 + event.transform.k/6);
            
                 gT.merge(gTEnter).select(".cell").call(brush.move, [xScaleR(event.transform.rescaleX(xScaleR).domain()[0]),xScaleR(event.transform.rescaleX(xScaleR).domain()[1])]);



        }
      

        }
       
            
    }
   
   
   

 

    
    const circles =  gZ.merge(gZEnter).selectAll('circle').data(dataF);

    // function size (d) {
    //     if(d)
    // }

    
        circles.enter().append('circle')
        .attr('class', 'circleG')
        .attr('cx', innerWidth/2)
        .attr('cy', innerHeight/2)
        .attr('r', 3.5)
        .merge(circles)
        .attr('r', 3.5)
        .transition().duration(2000)
        .attr('fill', d => colorScale(colorValue(d)))
        .attr('fill-opacity', 0.8)
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
 
        const shape = d3.symbol().size(40)
   
        const symbols =  gZ.merge(gZEnter).selectAll('.rectP').data(data2);

        symbols.enter()
       .append('path')
       .attr('class', 'rectP')
       .attr("transform", d => `translate(${innerWidth/2},${innerHeight/2})`)
       .merge(symbols)
       .transition().duration(2000)
       .attr("transform", d => `translate(${xScale(xValue(d))},${yScale(yValue(d))})`)
       .attr("d", shape.type(d3.symbolTriangle))
      .attr('fill', d => colorScale(colorValue(d)));
    
      d3.selectAll('.rectP')
        .on('mouseover', tipMouseover)
        .on('mouseout', tipMouseout);

    
    const svgB = d3
    .select('.transZ').selectAll('.svgTime').data([null]);
    const svgBEnter = svgB.enter().append('svg')
    .attr('class', 'svgTime')
    .attr('width', innerWidth+60)
    .attr('height', 80)
    .attr('transform', `translate(${400},${-310})`)
    svgBEnter.merge(svgB)
    const svgBT = d3.selectAll('.svgTime')

    const gT = svgBT.selectAll('.context').data([null]);
    const gTEnter = gT.enter().append("g")
        .attr("class", "context")
    .attr("transform", "translate(" +110+ "," +  25+ ")");


    var brushg =  gT.merge(gTEnter).selectAll('.cell').data([null]);

    var brushGenter = brushg
        .enter().append("g")
        .merge(brushg)
        .attr("class", 'cell')
            .attr("transform",  "translate(-109,-20)");

    const xScaleR = d3.scaleLinear()
    .domain(xScale.domain())
    .range([0,innerWidth])


    var brush = d3.brushX()
    .extent([[0, 0], [innerWidth, 50]])
    .on("brush end", brushed);

    
    brushGenter.call(brush)
    .call(brush.move, xScale.range());



    function brushed(event) {
      
        if (event.sourceEvent && event.sourceEvent.type === "wheel") return; 
        if (event.sourceEvent && event.sourceEvent.type === "zoom") return; 
        if (event.sourceEvent !== undefined) {

            // console.log(event.sourceEvent.x)
            // console.log(event.sourceEvent.y)
            var s = event.selection || xScale.range();
         
        xScaleAux.domain(s.map( xScaleR.invert,  xScaleR));
      //  timeRange = xScale.domain()
        //console.log(timeRange)
        // var t = 0;
        // setTimeout(function(){
        //     t = 1
        // },5000);
        // if (t === 1){
        //     onTimeChange(timeRange)
        // }
        // else{
        //     onTimeChange(timeRange)
        // }
        
  
        // lines.select(".line-path").attr("d", lineGenerator);
        // focus.select(".xAxis").call(xAxis);

        xAxisG.merge(xAxisGEnter)
        .call(xAxis.scale(xScaleAux))
        .selectAll('.domain')
        .remove();

        // const lineGeneratorZ = d3.line()
        // .x(d => xScale(new Date(d.key)))
        // .y(d => yScale(d.value))
        // .curve(d3.curveBasis);

    //     d3.selectAll(".line-path")
    //         .attr("d", d => lineGeneratorZ(d.values));

        //console.log("brush")
        d3.selectAll(".line-pathS")
        .attr("d", d3.line()
            .x(function(d) { return xScaleAux(d.x) })
            .y(function(d) { return yScaleAux(d.y) })
            )


            d3.selectAll('.rectP')
            .attr("transform", d => `translate(${xScaleAux(xValue(d))},${yScaleAux(yValue(d))})`)
        
            d3.selectAll('.circleG')
            .attr('cy', d => yScaleAux(yValue(d)))
            .attr('cx', d => xScaleAux(xValue(d)))

        }
        
      
     }

    // if(flag == 1) {
    //     circles.enter().append('circle')
    //     .attr('class', 'circleG')
    //     .attr('cx', innerWidth/2)
    //     .attr('cy', innerHeight/2)
    //     .attr('r', 3)
    //     .merge(circles)
    //     .attr('fill', d => colorScale(colorValue(d)))
    //     .attr('fill-opacity', opacity(dataF))
    //     .attr('cy', d => yScale(yValue(d)))
    //     .attr('cx', d => xScale(xValue(d)))
    //     .attr('r', d => d.sizeP);
    // }

        //  var u = d3.selectAll('.circleG')
        //   .data(data2)
    
        // circles.exit()
        //   .transition() // and apply changes to all of them
        //   .duration(2000)
        //   .style("opacity", 0)
        //   .remove()
      

        const lines2 = gZ.merge(gZEnter).selectAll('.line-pathS').data(xLre);

    //     console.log(xLre)

  try{
    const lineGenerator2 = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveBasis);
    // console.log(xLre)

    
        lines2.enter()
        .append("path")
        .merge(lines2)
            .datum(xLre)
            .attr('class', 'line-pathS')
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d => lineGenerator2(d)
            )
            lines2.exit().remove();
     
  }
  
           catch{
               
           }
        // catch(error){
        //     console.error(error);
        // }

      
 
    d3.selectAll('.circleG')
    .on('mouseover', tipMouseover)
    .on('mouseout', tipMouseout);

    d3.selectAll('.circleG').exit().remove();
    
    d3.selectAll('.svgS').call(d3.zoom()
    .filter((event) => { 
       
     if(event.clientX <window.innerWidth*0.75 && event.clientX >window.innerWidth*0.225 ){
        
        return !event.path[0].classList.contains('container') 
     }
       }).extent([[0, 0], [innerWidth, innerHeight]]).scaleExtent([1, 50]).translateExtent([[0, 0], [innerWidth, innerHeight]]).on("zoom",zoomed));

    circles.exit().remove();

};