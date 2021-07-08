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
        cfill,
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
        dataSol,
        fillLabel,
        flagChangeL
        

    } = props;

   
    //console.log(dataSol)

    const innerWidth = width- width/4 -300;
    const innerHeight = height -height/4;
    let dataF = data;

    const g = selection.selectAll('.container').data([null]);
    const gEnter = g.enter().append('g')
    .attr('class', 'container');
    
   // d3.selectAll('#svgG').remove();

    // const svgZ = selection.append('svg').attr('id', 'svgG');

    const svgZM = selection.selectAll('.svgG').data([null]);
    const svgZMEnter = svgZM.enter().append('svg')
    .attr('class', 'svgG')
    .attr('x', margin.left)
    .attr('y', margin.top)
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .append("rect")
    .attr('x', margin.left)
    .attr('y', margin.top)
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .style("fill", "none");

    svgZMEnter.merge(svgZM);
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
    .attr('transform', `translate(${margin.left},${margin.top})`);


  //  d3.selectAll('.svgX').remove()

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

       const colorScaleHab = d3.scaleOrdinal()
       .domain([ "Outside Habitable Zone","Inside Habitable Zone"])
       .range(['#ff7770',' #6ff28a'
       ]);
        
        var color = colorScale(colorValue(d));
        var color2 = colorScaleSol(d.pl_name);
        

        d3.select(this)
        .attr('stroke-width', '2')
        .attr("stroke", "black")
        .attr('fill-opacity', 1 );

        const colsel = function(d){
            if (d.st_mass == null){
                return color2
            }
            else{
                return color 
            }
        } 

        var habZ;

        if (d.inHZD === "over"|| d.inHZD === "under"){
            habZ = "Outside Habitable Zone"
        }
        else{
            habZ = "Inside Habitable Zone"
        }

        var color3 = colorScaleHab(habZ);

        tooltip.html( "<b>" + d.pl_name + "</b>" + "<br/>" 
       +"<span>"+"<i>" + d.pl_type + "</i>"+"</span>" +  "<br/>"+
        "<span style='color:" + colsel(d) + ";'>" + fillLabel+": " + Math.round(d[cfill] * 1000) / 1000 + "</span><br/>" +
        yLabel + ": " + Math.round(d[yColName] * 1000) / 1000 + "<br/>" + xLabel + ": " + + Math.round(d[xColName] * 1000) / 1000 +
        "<br/>"+"<span style='color:" + color3 + ";'>"+"<b>" + habZ + "</b>"+"</span>"
        )
        .style("left", (event.pageX -80) + "px")
        .style("top", (event.pageY-136 ) + "px")
        .transition()
            .duration(200) 
            .style("fill-opacity", .9) 
            .style('display','block'); 

    };
    var tipMouseout = function(d) {

        // d3.selectAll('.circleG')
        // .attr('fill-opacity', opacity);
        if(  d3.select(this).attr('class') === "rectP"){
            d3.select(this)
            .attr('stroke-width', '0')
            .attr('fill-opacity', 1 );
        
        }
        else{
            d3.select(this)
            .attr('stroke-width', '0')
            .attr('fill-opacity', opacity(dataF) );
        }

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


        if(event.sourceEvent.x < 432 || event.sourceEvent.x >1330 || event.sourceEvent.y<268 || event.sourceEvent.y>830){
          
            window.scrollBy(0, event.sourceEvent.deltaY*2.5);
            return;

        }
        else{

         
            // console.log(event.sourceEvent.y)
            var new_xScale = event.transform.rescaleX(xScale);
            var new_yScale = event.transform.rescaleY(yScale);
        // update axes
     
            xAxisG.merge(xAxisGEnter)
            .call(xAxis.scale(new_xScale))
            .selectAll('.domain')
            .remove();

            yAxisG.merge(yAxisGEnter)
            .call(yAxis.scale(new_yScale))
            .selectAll('.domain')
            .remove();

   

            const line = d3.area()
            .x(d => new_xScale(d.data.x))
            .y0(d => new_yScale(d[0]))
            .y1(d => new_yScale(d[1]))
        
              d3.selectAll('.circleG')
               .attr('cy', d => new_yScale(yValue(d)))
                .attr('cx', d => new_xScale(xValue(d)));

            d3.selectAll('.rectP')
            .attr("transform", d => `translate(${new_xScale(xValue(d))},${new_yScale(yValue(d))})`)
            
			d3.selectAll(".line-path")
            .attr("d", line);


           d3.selectAll('.textLines').style('visibility', 'hidden')

        }
       
        
    }

    
    d3.selectAll('.circleG')
    .attr('visibility', 'visible')

    const svgB = d3
    .select('body').selectAll('.svgTime').data([null]);
    const svgBEnter = svgB.enter().append('svg')
    .attr('class', 'svgTime')
    .attr('width', 80)
    .attr('height', 320)
    .attr('transform', `translate(${innerWidth+490},${-innerHeight-94})`)
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

    const yScaleR = d3.scaleLinear()
    .domain(d3.extent(dataF, d => d[cfill]))
    .range([280,0])


    var brush = d3.brushY()
    .extent([[0, 0], [38, 280]])
    .on("brush end", brushed);

    
    brushGenter.call(brush)
    .call(brush.move, [0,280]);


    function brushed(event) {
      
        if (event.sourceEvent && event.sourceEvent.type === "wheel") return; 
        if (event.sourceEvent && event.sourceEvent.type === "zoom") return; 
        if (event.sourceEvent !== undefined) {

            // console.log(event.sourceEvent.x)
            // console.log(event.sourceEvent.y)
            var s = event.selection || yScaleR.range();

        var  eMax= yScaleR.invert(s[0]);
        var  eMin = yScaleR.invert(s[1]);

             d3.selectAll('.circleG')
           .attr('visibility', function(d){
               if(d[cfill] >= eMin && d[cfill] <= eMax){
                   return 'visible'
               }
               else{
                   return 'hidden'
               }
           })
         
        // xScaleAux.domain(s.map( xScaleR.invert,  xScaleR));
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

        // xAxisG.merge(xAxisGEnter)
        // .call(xAxis.scale(xScaleAux))
        // .selectAll('.domain')
        // .remove();

        // const lineGeneratorZ = d3.line()
        // .x(d => xScale(new Date(d.key)))
        // .y(d => yScale(d.value))
        // .curve(d3.curveBasis);

    //     d3.selectAll(".line-path")
    //         .attr("d", d => lineGeneratorZ(d.values));

        //console.log("brush")
        // d3.selectAll(".line-pathS")
        // .attr("d", d3.line()
        //     .x(function(d) { return xScaleAux(d.x) })
        //     .y(function(d) { return yScaleAux(d.y) })
        //     )


        //     d3.selectAll('.rectP')
        //     .attr("transform", d => `translate(${xScaleAux(xValue(d))},${yScaleAux(yValue(d))})`)
        
        //     d3.selectAll('.circleG')
        //     .attr('cy', d => yScaleAux(yValue(d)))
        //     .attr('cx', d => xScaleAux(xValue(d)))

       }
        
      
     }


    const pointNum = 36;
    const pointNum2 = 86;
    const xDomain = 0.5;
    let xTemp, yTemp, key, pp;
    let yTemp04,
        yTemp16, 
        yTemp36,
        yTemp64,
        yTemp1;


    let dataset_stack= []
    for (let i = 0.01; i <= pointNum2; i++) {
        xTemp = xDomain / pointNum * i
        
        if(xTemp >= 1.2){
            yTemp1 = 0;
        }
        else{
            yTemp1 = 1;
        }

        yTemp04 = 0.04/xTemp;
        yTemp16 = 0.16/(xTemp*1.335);
        yTemp36 = 0.36/(xTemp*1.79);
        yTemp64 = 0.64/(xTemp*2.25);

        pp = {x:xTemp, y04:yTemp04,y16:yTemp16,y36:yTemp36,y64:yTemp64,y1:yTemp1}
        dataset_stack.push(pp)
    }

   // console.log(xColName)
 
 //  d3.selectAll('.line-path').remove()

if(xColName === 'cdhs_in') {
    d3.selectAll('.line-path').style('visibility', 'hidden')
    d3.selectAll('.textLines').style('visibility', 'hidden')
   
}
else { 
    d3.selectAll('.line-path').style('visibility', 'visible')
    d3.selectAll('.textLines').style('visibility', 'visible')
}
    
var stacked = d3.stack()
.keys(["y04","y16","y36", "y64", "y1"])
//.order(["inside-out"])
.offset(d3.stackOrderSequential)
var stackedData = stacked(dataset_stack)

const lineGenerator = d3.area()
.x(d => xScale(d.data.x))
.y0(d => yScale(d[0]))
.y1(d => yScale(d[1]))


var color = d3.scaleOrdinal()
.domain(["y04", "y16", "y36", "y64"])
.range(['rgb(118, 63, 173)','rgb(184, 60, 176)','rgb(251, 73, 136)','rgb(255, 141, 55)','rgb(206, 206, 54)' ])

const lines = gZ.merge(gZEnter).selectAll('.line-path').data(stackedData);

var linesL = lines.enter().append('path')
.merge(lines)
.attr('class', 'line-path')
.style("fill", function(d) { return color(d.key); })
.attr('fill-opacity', 0.03)
.attr('d', lineGenerator)
.attr('stroke',function(d) { return color(d.key); }) 
.attr('stroke-opacity', '0.45');

// const lineText = g.merge(gEnter).selectAll('.textLines');
// lineText.append('text')
//     .attr('class', 'textLines')
//   .attr('x', 100) 
//   .attr('y', 100)
//   .text("0.2");

  const textLG = g.select('.textLines');
    const textLGEnter = gEnter.append('g')
    .attr('class', 'title')

    textLG.merge(textLGEnter)
    .selectAll('.domain')
    .remove();

    textLGEnter
    .append('text')
    .attr('class', 'textLines')
    .attr('fill', 'black')
    .attr('align', 'center')
    .attr('y', 50)
    .attr('font-size', '1px')
    .style('fill', 'rgb(118, 63, 173)')
    .merge(textLG.select('.textLines'))
    .attr('x', 58)
    .text("0.2");

    textLGEnter
    .append('text')
    .attr('class', 'textLines')
    .attr('fill', 'black')
    .attr('align', 'center')
    .attr('y', 50)
    .attr('font-size', '1px')
    .style('fill', 'rgb(184, 60, 176)')
    .merge(textLG.select('.textLines'))
    .attr('x', 172)
    .text("0.4");

    textLGEnter
    .append('text')
    .attr('class', 'textLines')
    .attr('fill', 'black')
    .attr('align', 'center')
    .attr('y', 50)
    .attr('font-size', '1px')
    .style('fill', 'rgb(255, 141, 55)')
    .merge(textLG.select('.textLines'))
    .attr('x', 382)
    .text("0.6");

    textLGEnter
    .append('text')
    .attr('class', 'textLines')
    .attr('fill', 'black')
    .attr('align', 'center')
    .attr('y', 50)
    .attr('font-size', '1px')
    .style('fill', 'rgb(206, 206, 54)')
    .merge(textLG.select('.textLines'))
    .attr('x', 652)
    .text("0.8");

console.log(flagChangeL)


   





lines.exit().remove();
    
    const shape = d3.scaleOrdinal(dataSol.map(d => d.pl_name), d3.symbols.map(s => d3.symbol().size(120).type(s)()))
    const circles =  gZ.merge(gZEnter).selectAll('circle').data(dataF);
    const symbols =  gZ.merge(gZEnter).selectAll('.rectP').data(dataSol);
    var plNames = dataSol.map(d => d.pl_name)

    const colorScaleSol = d3.scaleOrdinal()
    .domain(plNames)
    .range(['#4adeff',  '#f7543b',
    '#b3acab','#d2b0ff',
    '#aaf2a2', '#ff3636',
    '#fcee90', '#eb83c8',
    '#edb861'
    ]);

    symbols.enter()
   .append('path')
   .attr('class', 'rectP')
   .merge(symbols)
   .transition().duration(2000)
   .attr("transform", d => `translate(${xScale(xValue(d))},${yScale(yValue(d))})`)
   .attr("d", d => shape(d.pl_name))
  .attr('fill', d => colorScaleSol(d.pl_name));

  d3.selectAll('.rectP')
    .on('mouseover', tipMouseover)
    .on('mouseout', tipMouseout);

    // function size (d) {
    //     if(d)
    // }

    if(flag == 0) {
        circles.enter().append('circle')
        .attr('class', 'circleG')
        .attr('cx', innerWidth/2)
        .attr('cy', innerHeight/2)
        .attr('r', 4.5)
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
        .attr('r', 3)
        .merge(circles)
        .attr('fill', d => colorScale(colorValue(d)))
        .attr('fill-opacity', opacity(dataF))
        .attr('cy', d => yScale(yValue(d)))
        .attr('cx', d => xScale(xValue(d)))
        .attr('r', d => d.sizeP);
    }
    d3.selectAll('.circleG')
    .on('mouseover', tipMouseover)
    .on('mouseout', tipMouseout);


    d3.selectAll('.circleG').exit().remove();
    
    d3.selectAll('#svgM').call(d3.zoom().extent([[0, 0], [innerWidth, innerHeight]]).scaleExtent([1, 10]).translateExtent([[0, 0], [innerWidth, innerHeight]])
    .on("zoom", zoomed));

    circles.exit().remove();

};

