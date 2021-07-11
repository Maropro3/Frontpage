(function (factory) {
   typeof define === 'function' && define.amd ? define(factory) :
   factory();
}((function () { 'use strict';

   const dropDown = (selection, props) => {
       const {
           options,
           onOptionClick,
           selectedOption,
           axis,
           data,
           
       } = props;
       let select = selection.selectAll('select').data([null]);
       let units = "";
       
       select = select.enter().append('select')
       .merge(select)
       .attr('id', 'drop')
       .on('change', function() {
           switch(this.value){
               case 'ESI':
                
                 
                   units = "";

                   onOptionClick('ESI_in','ESI_ext', 'Interior ESI', 'Exterior ESI',this.value,'ESI_t', units);
                   break;
               case 'CDHS':
              
                 
                   units = "";

                   onOptionClick('cdhs_in','cdhs_sur', 'Interior CDHS', 'Surface CDHS',this.value,'cdhs_t',units);
                   break;

             
               default:
                
                 
                   units = "";

                   onOptionClick('hzdI','hzdO', 'Interior ESI', 'Exterior ESI',this.value,'ESI_t', units);
                
           }
       });

       const option = select.selectAll('option').data(options);
       option.enter().append('option').merge(option)
       .attr('value', d => d)
       .property('selected', d => d === selectedOption)
       .text(d => d);
   };

   const colorLegend = (selection, props) => {
     const { colorScale, circleRadius, spacing, textOffset,label, onLegendChange} = props;
     let select = selection.selectAll('select').data([null]);

     
     select.enter()
     .merge(select)
     .append('text')
     .attr('x', 0)
     .attr('y', 0)
     .attr('fill', 'black')
     .attr('font-family', 'Helvetica Neue, Arial')
     .attr('font-weight', 'bold')
     .attr('font-size', '12px')
     .text("Total "+label + " range:")
     .style('fill', '#b3aca7');

     var width = 70;
     var height = 280;
     var min = 0;
     var max = Math.round(colorScale.domain()[0]);

    

     if(max === 0) {
       max = 1;
     }
     console.log(min,max);
     const xScale = d3
     .scaleBand()
     .domain([0, 1])
     .range([0, width]);


     const yScale = d3
     .scaleLinear()
     .domain([min,max])
     .range([height, 0]);
     
     const expandedDomain = d3.range(min, max, (max - min) / height);

    
     const svgBar = fc
       .autoBandwidth(fc.seriesSvgBar())
       .xScale(xScale)
       .yScale(yScale)
       .crossValue(0)
       .baseValue((_, i) => (i > 0 ? expandedDomain[i - 1] : 0))
       .mainValue(d => d)
       .decorate(select => {
         select.selectAll("path").style("fill", d => colorScale(d));
       });


     const legendSvg = select.enter()
     .merge(select);
     
     const legendBar = legendSvg
       .append("g")
       .attr("transform", `translate(${50},30)`)
       .datum(expandedDomain)
       .call(svgBar);

     const domain = [min,max];
     const axisLabel = fc
     .axisRight(yScale)
     .tickValues([...domain, (domain[1] + domain[0]) / 2])
     .tickSizeOuter(0);

   Math.abs(legendBar.node().getBoundingClientRect().x);

   legendSvg.append("g")
     .attr("transform", `translate(${12+55},30)`)
     .datum(expandedDomain)
     .call(axisLabel);

     fc.extentLinear()
     .pad([0.1, 0.1])
     .padUnit("percent")(domain);


     };

   const scatterPlot = (selection, props) => {

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

       yAxisGEnter
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

       xAxisGEnter
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
       .attr('class', 'title');

       titleG.merge(titleGEnter)
       .selectAll('.domain')
       .remove();

       titleGEnter
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
      };

     d3.selectAll('.tooltip').remove();
      
       var tooltip = d3.select(".transZ").append("div")
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

           var xM = d3.pointer(event, gZEnter.node())[0];
           var  yM = d3.pointer(event, gZEnter.node())[1];

           var offTY = 0;

           if(window.innerWidth<1900){
               offTY = -56;
           }
           

           d3.select(this)
           .attr('stroke-width', '2')
           .attr("stroke", "black")
           .attr('fill-opacity', 1 );

           const colsel = function(d){
               if (d.st_mass == null){
                   return color2
               }
               else {
                   return color 
               }
           }; 

           var habZ;

           if (d.inHZD === "over"|| d.inHZD === "under"){
               habZ = "Outside Habitable Zone";
           }
           else {
               habZ = "Inside Habitable Zone";
           }

           var color3 = colorScaleHab(habZ);

           tooltip.html( "<b>" + d.pl_name + "</b>" + "<br/>" 
          +"<span>"+"<i>" + d.pl_type + "</i>"+"</span>" +  "<br/>"+
           "<span style='color:" + colsel(d) + ";'>" + fillLabel+": " + Math.round(d[cfill] * 1000) / 1000 + "</span><br/>" +
           yLabel + ": " + Math.round(d[yColName] * 1000) / 1000 + "<br/>" + xLabel + ": " + + Math.round(d[xColName] * 1000) / 1000 +
           "<br/>"+"<span style='color:" + color3 + ";'>"+"<b>" + habZ + "</b>"+"</span>"
           )
           .style("left", (xM +340) + "px")
           .style("top", (yM+1280 +offTY) + "px")
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
           else {
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


       d3.zoom()
       .extent([[0, 0], [innerWidth, innerHeight]])
       .on("zoom", zoomed);

       function zoomed(event) {
           // create new scale ojects based on event


           if(event.sourceEvent.x < 432 || event.sourceEvent.x >1330 || event.sourceEvent.y<268 || event.sourceEvent.y>830){
             
               window.scrollBy(0, event.sourceEvent.deltaY*2.5);
               return;

           }
           else {

            
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
               .y1(d => new_yScale(d[1]));
           
                 d3.selectAll('.circleG')
                  .attr('cy', d => new_yScale(yValue(d)))
                   .attr('cx', d => new_xScale(xValue(d)));

               d3.selectAll('.rectP')
               .attr("transform", d => `translate(${new_xScale(xValue(d))},${new_yScale(yValue(d))})`);
               
   			d3.selectAll(".line-path")
               .attr("d", line);


              d3.selectAll('.textLines').style('visibility', 'hidden');

           }
          
           
       }

       
       d3.selectAll('.circleG')
       .attr('visibility', 'visible');

       const svgB = d3
       .select('.transZ').selectAll('.svgTime').data([null]);
       const svgBEnter = svgB.enter().append('svg')
       .attr('class', 'svgTime')
       .attr('width', 80)
       .attr('height', 320)
       .attr('transform', `translate(${innerWidth+490},${-innerHeight-94})`);
       svgBEnter.merge(svgB);
       const svgBT = d3.selectAll('.svgTime');

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
       .range([280,0]);


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
                  else {
                      return 'hidden'
                  }
              });
            
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
       let xTemp, pp;
       let yTemp04,
           yTemp16, 
           yTemp36,
           yTemp64,
           yTemp1;


       let dataset_stack= [];
       for (let i = 0.01; i <= pointNum2; i++) {
           xTemp = xDomain / pointNum * i;
           
           if(xTemp >= 1.2){
               yTemp1 = 0;
           }
           else {
               yTemp1 = 1;
           }

           yTemp04 = 0.04/xTemp;
           yTemp16 = 0.16/(xTemp*1.335);
           yTemp36 = 0.36/(xTemp*1.79);
           yTemp64 = 0.64/(xTemp*2.25);

           pp = {x:xTemp, y04:yTemp04,y16:yTemp16,y36:yTemp36,y64:yTemp64,y1:yTemp1};
           dataset_stack.push(pp);
       }

      // console.log(xColName)
    
    //  d3.selectAll('.line-path').remove()

   if(xColName === 'cdhs_in') {
       d3.selectAll('.line-path').style('visibility', 'hidden');
       d3.selectAll('.textLines').style('visibility', 'hidden');
      
   }
   else { 
       d3.selectAll('.line-path').style('visibility', 'visible');
       d3.selectAll('.textLines').style('visibility', 'visible');
   }
       
   var stacked = d3.stack()
   .keys(["y04","y16","y36", "y64", "y1"])
   //.order(["inside-out"])
   .offset(d3.stackOrderSequential);
   var stackedData = stacked(dataset_stack);

   const lineGenerator = d3.area()
   .x(d => xScale(d.data.x))
   .y0(d => yScale(d[0]))
   .y1(d => yScale(d[1]));


   var color = d3.scaleOrdinal()
   .domain(["y04", "y16", "y36", "y64"])
   .range(['rgb(118, 63, 173)','rgb(184, 60, 176)','rgb(251, 73, 136)','rgb(255, 141, 55)','rgb(206, 206, 54)' ]);

   const lines = gZ.merge(gZEnter).selectAll('.line-path').data(stackedData);

   lines.enter().append('path')
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
       .attr('class', 'title');

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

   console.log(flagChangeL);


      





   lines.exit().remove();
       
       const shape = d3.scaleOrdinal(dataSol.map(d => d.pl_name), d3.symbols.map(s => d3.symbol().size(120).type(s)()));
       const circles =  gZ.merge(gZEnter).selectAll('circle').data(dataF);
       const symbols =  gZ.merge(gZEnter).selectAll('.rectP').data(dataSol);
       var plNames = dataSol.map(d => d.pl_name);

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
           .attr('cx', d => xScale(xValue(d)));
           

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
       
       d3.selectAll('#svgM').call(d3.zoom().filter((event) => { 
           console.log(event);
        if(event.clientX <window.innerWidth*0.75 && event.clientX >window.innerWidth*0.225 ){
           
           return !event.path[0].classList.contains('container') 
        }
          }).extent([[0, 0], [innerWidth, innerHeight]]).scaleExtent([1, 10]).translateExtent([[0, 0], [innerWidth, innerHeight]])
       .on("zoom", zoomed));

       circles.exit().remove();

   };

   const colorLegendSol = (selection, props) => {
       const { colorScale,shapes, spacing, textOffset, onLegendChange} = props;
       let select = selection.selectAll('select').data([null]);
       
       // const onCLick = function(event, d){
       //   if(contClick == 0) {
       //     d3.selectAll('.gLegendLP')
       //     .attr('opacity', 0.2);
       //     d3.selectAll('.gLegend')
       //     .attr('opacity', 0.2);
       //     d3.select(this)   
       //     .attr('opacity', 1);
       //     sel = d3.select(this).selectAll('text').text()
       //     d3.selectAll('g.gLegend').each(function(d){
            
       //       if(d === sel){
              
       //         d3.select(this).attr('opacity', 1);
       //       }
       //     })
       //     contClick++;
       //     methodsF.push(d3.select(this).selectAll('text').text());
       //     onLegendChange(methodsF);
       //   }
       //   else if(methodsF.length === 9) {
       //     d3.selectAll('.gLegendLP')
       //     .attr('opacity', 0.2)
       //     d3.selectAll('.gLegend')
       //     .attr('opacity', 0.2);
       //     d3.select(this)   
       //     .attr('opacity', 1);
       //     sel = d3.select(this).selectAll('text').text()
       //     d3.selectAll('g.gLegend').each(function(d){
            
       //       if(d === sel){
               
       //         d3.select(this).attr('opacity', 1);
       //       }
       //     })
       //     methodsF = [];
       //     methodsF.push(d3.select(this).selectAll('text').text());
       //     onLegendChange(methodsF);
       //    }
       //   else {
       //     if ( d3.select(this).attr('opacity') == 1) { 
     
       //       d3.select(this)   
       //       .attr('opacity', 0.2);
       //       sel = d3.select(this).selectAll('text').text()
       //       d3.selectAll('g.gLegend').each(function(d){
             
       //         if(d === sel){
       //           c
       //           d3.select(this).attr('opacity', 0.2);
       //         }
       //       })
       //       methodsF = methodsF.filter (
       //          v => v !== d3.select(this).selectAll('text').text()
       //       );
       //       onLegendChange(methodsF);
       //       }
       //     else {
       //       d3.select(this)   
       //     .attr('opacity', 1);
       //     sel = d3.select(this).selectAll('text').text()
       //     d3.selectAll('g.gLegend').each(function(d){
           
       //       if(d === sel){
               
       //         d3.select(this).attr('opacity', 1);
       //       }
       //     })
       //     methodsF.push(d3.select(this).selectAll('text').text());
       //     onLegendChange(methodsF);
       //     }
       //   }
         
      
       // };
       
       // const onDBCLick = function(event, d){
         
        
       //     d3.selectAll('.gLegendLP')
       //     .attr('opacity', 1)
       //     d3.selectAll('.gLegend')
       //     .attr('opacity', 1)
       //     methodsF = [];
       //     onLegendChange(methodsF);
         
        
        
       // };
     
       // const onMouseover = function(event, d){
     
       //   d3.select(this).selectAll('rect')
       //   .attr("stroke", "white")
       //   .attr('stroke-width', '2');
       // }
     
       // const onMouseout = function(event, d){
     
       //   d3.select(this).selectAll('rect')
       //   .attr("stroke", "none")
       //   .attr('stroke-width', '2');
         
       // }
     
       // const background = select.enter()
       // .merge(select)
       // .append('rect')
       // .attr('class', 'legendBack')
       // .attr('width', '290px')
       // .attr('height', '324px')
       // .attr('transform', 'translate(0, -25)');
     
       select.enter()
       .merge(select)
       .append('text')
       .attr('x', 0)
       .attr('y', 0)
       .attr('fill', 'black')
       .attr('font-family', 'Helvetica Neue, Arial')
       .attr('font-weight', 'bold')
       .attr('font-size', '10px')
       .text('Solar System Objects:');
     
      
       const entries = select.enter()
       .merge(select).selectAll('g')
       .data(colorScale.domain())
       .join('g')
       .attr('transform', (d, i) =>
       `translate(30, ${i * spacing + 28})`)
       .attr('class', 'gLegendS');
       // .on('click', onCLick)
       // .on('dblclick', onDBCLick)
       // .on('mouseover', onMouseover)
       // .on('mouseout', onMouseout);
     
     entries.append('path')
    // .attr("transform", d => `translate(${xScale(xValue(d))},${yScale(yValue(d))})`)
       .attr("d", shapes)
       .attr('fill', colorScale);
     
     
     
     entries.append('text')
       .attr('x', textOffset +5) 
       .attr('dy', '0.38em') 
       .attr('fill', 'black')
       .attr('font-family', 'Helvetica Neue, Arial')
       .attr('font-size', '9px')
       .attr('class', 'legendText')
       .style('user-select', 'none') 
       .text(d => d);
     
     
     
       
     };

   const planetLegend = (selection, props) => {
       const { colorScale, circleRadius, spacing, textOffset, onLegendChange, current,colorScaleR} = props;
     
       var contClick = 0;
       var methodsF = [];
       let select = selection.selectAll('select').data([null]);
     
       const onCLick = function(event, d){
         if(contClick == 0) {
           d3.selectAll('.circlePlanetsL')
           .attr("fill", "gray");
           d3.select(this).selectAll('circle')
           .attr("fill", "#2196F3");
           contClick++;
           methodsF.push(d3.select(this).selectAll('text').text());
           
           onLegendChange(methodsF);
         }
         else if(methodsF.length === 5) {
           //contClick = 0
           d3.selectAll('.circlePlanetsL')
         .attr("fill", "gray");
           d3.select(this).selectAll('circle')
         .attr("fill", "#2196F3");
         
       
           methodsF = [];
           methodsF.push(d3.select(this).selectAll('text').text());
           onLegendChange(methodsF);
           
          }
         else {
           if (  d3.select(this).selectAll('circle')
           .attr("fill") === "#2196F3") { 
     
             d3.select(this).selectAll('circle')
             .attr("fill", "gray");
             methodsF = methodsF.filter (
                v => v !== d3.select(this).selectAll('text').text()
             );
             onLegendChange(methodsF);
             }
           else {
             d3.select(this).selectAll('circle')
             .attr("fill", "#2196F3");
           methodsF.push(d3.select(this).selectAll('text').text());
           onLegendChange(methodsF);
           }
         }
       };
     
       const onDBCLick = function(event, d){
         d3.selectAll('.circlePlanetsL')
         .attr("fill", "#2196F3");


           methodsF = [];
           onLegendChange(methodsF);
        
        
       };

       console.log(current);

       const onMouseover = function(event, d){
     
         d3.select(this).selectAll('circle')
         .attr("stroke", "white")
         .attr('stroke-width', '4');

         // d3.select(this).selectAll('circle')
         // .attr("fill", "red")
         var numC = d3.select(this).selectAll('text').text();
         d3.selectAll('.circleG')
         .style('fill',function(d){
           if(d.pl_type !== numC){
             return "grey"
           }
           else {
             return  colorScaleR(d => d[current])
           }
         })
         .style("opacity" ,function(d){
           if(d.pl_type !== numC){
             return 0.4
           }
           else {
             return  1
           }
         });
       };
     
       const onMouseout = function(event, d){
     
         d3.select(this).selectAll('circle')
         //.attr("stroke", "none")
         .attr('stroke-width', '2');

         d3.selectAll('.circleG')
         .style('fill',function(d){
           
             return colorScaleR(d => d[current])
           
         })
         .style("opacity", 1);
         
       };
       select.enter()
       .merge(select)
       .append('text')
       .attr('x', 0)
       .attr('y', 0)
       .attr('fill', 'black')
       .attr('font-family', 'Helvetica Neue, Arial')
       .attr('font-weight', 'bold')
       .attr('font-size', '13px')
       .text('Select Planet Classes:')
       .style('fill', '#b3aca7');
     
       var spacing2 = [120,120,132,140,136]; 
       const entries = select.enter()
       .merge(select).selectAll('g')
       .data(colorScale.domain())
       .join('g')
       // .attr('transform', (d, i) =>
       // `translate(${i * spacing + 146},-5 )`)
        .attr('transform',function(d,i){
         for(var z = 0; z< 5; z++){
         
             return  `translate(${i * spacing2[i] + 230},-5 )`
          }
        })
       .attr('class', 'gLegend')
       .on('click', onCLick)
       .on('dblclick', onDBCLick)
       .on('mouseover', onMouseover)
       .on('mouseout', onMouseout);
     
     entries.append('circle')
     .attr('class', 'circlePlanetsL')
       .attr('cx', circleRadius) 
       .attr('r', circleRadius)
       .attr('fill',colorScale)
       .attr("stroke", "white")
       .attr('stroke-width', '2');
     
     entries.append('text')
       .attr('x', textOffset +5) 
       .attr('dy', '0.34em') 
       .attr('fill', 'black')
       .attr('font-family', 'Helvetica Neue, Arial')
       .attr('font-size', '12px')
       .attr('class', 'legendText')
       .style('user-select', 'none') 
       .style('fill', '#a8a09e')
       .text(d => d);
     };

   const svg = d3.select('#svgM')
    .attr('transform', `translate(${250},${0})`);
   const width = 1600;
   const height = 800;

   svg
   .attr('width', width)
   .attr('height', height);

   let data;
   let xColumn = 'ESI_in';
   let xLabelColumn = 'Interior ESI';
   let yColumn = 'ESI_ext';
   let yLabelColumn = 'Exterior ESI';
   let dropSelect = 'ESI';
   let cfill = 'ESI_t';
   const columns = ['ESI', 'CDHS'];
   var methods = [];
   var planetTypes = [];
   let dateRange = [new Date("1990"), new Date ("2021")]; 
   var xUnits = " ";
   var yUnits = " ";
   var flag = 0;
   var filterHab = 0;
   var flagChangeL = 1;

   let menusCSS = document.querySelector("#menus");
   menusCSS.style.left = `${(width- width/4 +1100)/6}px`;
   menusCSS.style.top = `10px`;

   let switchCSS = document.querySelector(".switchH");
   switchCSS.style.top = `10px`;

   d3.select("#habButton")
   .on("click",onHabChange);

   function onHabChange(){
       flagChangeL = 0;

       if(filterHab === 0){
           filterHab = 1;
           d3.selectAll('.textLines').style('visibility', 'hidden');
       }
       else {
           filterHab = 0;
       }
     
       flag = 1;
       render();
       if(filterHab === 1){
          
           d3.selectAll('.textLines').style('visibility', 'hidden');
       }
       flagChangeL = 1;
       
   }

   const onLegendChange = (methodsF) => {
       methods = methodsF;
       flag = 1;
       render();
       
   };

   const onLegendPLChange = (methodsF) => {
       flagChangeL = 0;
       planetTypes = methodsF;
       flag = 1;
       render();
       d3.selectAll('.textLines').style('visibility', 'hidden');
       flagChangeL = 1;
   };

   const onXColumnClick = (x, y, xlabel, ylabel, sel,fill,units) => {
       xColumn = x;
       yColumn = y;
       xLabelColumn = xlabel;
       yLabelColumn = ylabel;
       cfill = fill;
       xUnits = units;
       dropSelect = sel;
     

       flag = 0;

       render();
   };

   const render = () => {

       const dataSol = [
           {pl_name: "Earth", ESI_in: 1, ESI_ext: 1, ESI_t: 1, cdhs_in:1 , cdhs_sur: 1, cdhs_t: 1, inHZD: "in",pl_type: "Terrestial" },
           {pl_name: "Mars", ESI_in: 0.82, ESI_ext: 0.6, ESI_t: 0.7, cdhs_in:0.5815 , cdhs_sur: 0.763, cdhs_t: 0.583, inHZD: "in",pl_type: "Terrestial"},
           {pl_name: "Mercury", ESI_in: 0.84, ESI_ext:0.4, ESI_t: 0.6, cdhs_in:0.46 , cdhs_sur: 1.274, cdhs_t: 0.468,inHZD: "under",pl_type: "Terrestial"},
           {pl_name: "The Moon", ESI_in: 0.67, ESI_ext: 0.46, ESI_t: 0.56, cdhs_in:0.333 , cdhs_sur: 0.6896, cdhs_t: 0.336, inHZD:"in",pl_type: "Terrestial Moon"},
           {pl_name: "Venus", ESI_in: 0.98, ESI_ext: 0.2, ESI_t: 0.44, cdhs_in:0.95 , cdhs_sur: 2.089, cdhs_t: 0.961, inHZD: "in",pl_type: "Terrestial"},
           {pl_name: "Jupiter", ESI_in: 0.36, ESI_ext: 0.34, ESI_t: 0.29, cdhs_in:5.89 , cdhs_sur: 0.709, cdhs_t: 5.838, inHZD: "over",pl_type: "Gas Giant"},
           {pl_name: "Saturn", ESI_in: 0.28, ESI_ext: 0.2, ESI_t: 0.25, cdhs_in:4.75, cdhs_sur: 0.6096, cdhs_t: 4.708, inHZD:"over",pl_type: "Gas Giant"},
       ];
       var hzdFilter = ["in"];
       var colorScale = d3.scaleSequential(d3.interpolateWarm)
       .domain(d3.extent(data, d => d[cfill]));

       var dataM2 = [];
       if(filterHab == 1){
           
           dataM2 = data.filter(
           
               v => hzdFilter.includes(v.inHZD)
           );
       }
       else {
          
           dataM2 = data;
       }
       var dataM1 = [];
    
       dataM1 = dataM2.filter(
           
           v => planetTypes.includes(v.pl_type)
       );
      
       var dataM = dataM1.filter(
           
           v => methods.includes(v.discoverymethod)
       );
      
       if(dataM.length == 0) {
           dataM = dataM2;
       }
       
       const dataFX = dataM.filter(function (v) {
               if (v.disc_pubdate < dateRange[1] && v.disc_pubdate > dateRange[0]) {
                   return v
               }
       });

      var dataF = dataFX;
     
       dataF.filter(function (v) {
           if (isNaN(v[xColumn]) || isNaN(v[yColumn])) {
               return v.sizeP = 0;
           }
           else {return v.sizeP = 4.5}
           }
       );
        
       if (cfill === 'cdhs_t') {
           
               colorScale = d3.scaleSequential(d3.interpolateWarm)
               .domain(d3.extent(data, d => d[cfill]).reverse());
      
         
        
       }
       
       var fillLabel;
      
           if (cfill === 'ESI_t') {
               if(flagChangeL == 1){
                   colorScale = d3.scaleSequential(d3.interpolateWarm)
                   .domain(d3.extent(dataF, d => d[cfill]));
               }
             
               fillLabel = "Total ESI";
           }
       
           if (cfill === 'cdhs_t') {
               if(flagChangeL == 1){
                   colorScale = d3.scaleSequential(d3.interpolateWarm)
                   .domain(d3.extent(dataF, d => d[cfill]).reverse());
               }
             
               fillLabel = "Total CDHS";
           }
       
           if (cfill === 'hzd') {
               if(flagChangeL == 1){
                colorScale = d3.scaleSequential(d3.interpolateWarm)
               .domain(d3.extent(dataF, d => d[cfill]).reverse());
               }
               fillLabel = "Total CDHS";
           }
       
       d3.select('#h_menu')
       .call(dropDown, {
           options: columns,
           onOptionClick: onXColumnClick,
           selectedOption: dropSelect,
           data: dataF,
          
           }
       ); 

      svg.call(scatterPlot, {
           title: `${yLabelColumn}/${xLabelColumn} distribution`,
           xValue: d => d[xColumn],
           xLabel: xLabelColumn,
           xColName: xColumn,
           yValue: d => d[yColumn],
           yLabel: yLabelColumn,
           yColName: yColumn,
           cfill,
           margin: { top:70, right: 80, bottom: 150, left:180},
           width,
           height,
           xUnits,
           yUnits,
           flag,
           dateRange: dateRange,
           colorScale: colorScale,
           colorValue: d => d[cfill],
           data: dataF,
           dataSol,
           fillLabel,
           flagChangeL
      });

     d3.selectAll('.legend').remove();

      const gLegendEnter = svg.append('g')
      .attr('class', 'legend');

      const gLegend = svg.selectAll('.legend').data([null]);

      gLegendEnter
      .attr('transform', `translate(${ width- width/4 -90},${height/8 - 15 })`)
      .merge(gLegendEnter)
      .call(colorLegend, {
          colorScale,
          circleRadius: 10,
          spacing: 30,
          textOffset: 20,
          label: dropSelect,
          onLegendChange: onLegendChange,
      });

      gLegend.exit().remove();

      var plNames = dataSol.map(d => d.pl_name);
      const shape = d3.scaleOrdinal(dataSol.map(d => d.pl_name), d3.symbols.map(s => d3.symbol().size(220).type(s)()));
      const colorScaleSol = d3.scaleOrdinal()
      .domain(plNames)
      .range(['#4adeff',  '#f7543b',
      '#b3acab','#d2b0ff',
      '#aaf2a2', '#ff3636',
      '#fcee90', '#eb83c8',
      '#edb861'
      ]);
      
       
      //
      d3.selectAll('.legendSol').remove();

      const gLegendEnterS = svg.append('g')
      .attr('class', 'legendSol');

      const gLegendS = svg.selectAll('.legendSol').data([null]);

      gLegendEnterS
      .attr('transform', `translate(${ width- width/4 -90},${height/8 + 345 })`)
      .merge(gLegendEnterS)
      .call(colorLegendSol, {
          colorScale: colorScaleSol,
          shapes: shape,
          spacing: 30,
          textOffset: 20,
          label: plNames,
          onLegendChange: onLegendChange,
      });

      gLegendS.exit().remove();

       d3.nest().key(d => d.pl_type)
       .entries(dataF);

      var plTypes = ["Terrestial", "Super-Earth", "Neptune-Like", "Gas Giant", "Super-Jupiter"];
      
      //const shape = d3.scaleOrdinal(dataSol.map(d => d.pl_name), d3.symbols.map(s => d3.symbol().size(220).type(s)()))
   //    const colorScalePl = d3.scaleOrdinal()
   //    .domain(plTypes)
   //    .range(['#44ebe2','#48eb36',
   //    '#4e51ed', '#edcd4e','#eb635b'
   //    ]);
      
   const colorScalePl = d3.scaleOrdinal()
   .domain(plTypes)
   .range(['#2196F3'
   ]);
      //
     // d3.selectAll('.legendPl').remove()

      const gLegendEnterPl = svg.append('g')
      .attr('class', 'legendPl');

      const gLegendPl = svg.selectAll('.legendPl').data([null]);

      gLegendEnterPl
      .attr('transform', `translate(${ width/4 -220},${height-30 })`)
      .merge(gLegendEnterPl)
      .call(planetLegend, {
          colorScale: colorScalePl,
          circleRadius: 10,
          spacing: 160,
          textOffset: 20,
          label: plTypes,
          onLegendChange: onLegendPLChange,
          current: cfill,
          colorScaleR: colorScale
      });

      gLegendPl.exit().remove();

      flag = 0;

      

   };
   //ExoplanetsHab.csv'
   d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/ExoplanetsCompClean.csv').then(loadedData => {
      
       loadedData.forEach(clearFunction);

       function clearFunction(i,n) {
           for(var k in i){
               if (i[k] === ""){
                   i[k] = "no";
               }        }
       }
       var wR = 0.57;
       var wD = 1.07;
       var wV = 0.70;
       var wT = 5.58;

       var alpha = 0.8;
       var beta = 0.1;
       var gamma = 0.8;
       var lambda = 0.1;

       

       loadedData.forEach(d => { 

           d.pl_bmasse = +d.pl_bmasse;
           d.pl_rade = +d.pl_rade;
           d.st_mass = +d.st_mass;
           d.st_teff = +d.st_teff;
           d.st_rad = +d.st_rad;
           d.st_lum = +d.st_lum;
           d.pl_orbper = +d.pl_orbper;
           d.pl_orbeccen = +d.pl_orbeccen;
           d.pl_orbsmax = +d.pl_orbsmax;
           d.pl_dens = +d.pl_dens;
           d.pl_eqt = +d.pl_eqt;
           d.pl_dense = +d.pl_dens/5.51;
           d.pl_escv = +(Math.sqrt((2*6.674*(10**-11)*d.pl_bmasse*5.97237*(10**24))/(d.pl_rade*6371*(10**3))))/(11.186*(10**3));
           d.disc_pubdate = new Date(d.disc_pubdate);
           d.esiR = 1-Math.abs((1-d.pl_rade)/(1+d.pl_rade)); 
           d.esiD = 1-Math.abs((1-d.pl_dense)/(1+d.pl_dense)); 
           d.esiV = 1-Math.abs((1-d.pl_escv)/(1+d.pl_escv)); 
           d.esiT = 1-Math.abs((288-d.pl_eqt)/(288+d.pl_eqt));  
           d.cdhs_in = (d.pl_rade**alpha)*(d.pl_dense**beta);
           d.cdhs_sur = ((d.pl_eqt/288)**gamma)*(d.pl_escv**lambda);
           d.habI = Math.sqrt(10**d.st_lum)*(0.72-2.761*(10**-5)*(d.st_teff-5700)-3.809*(10**-9)*(d.st_teff-5700)**2);
           d.habO = Math.sqrt(10**d.st_lum)*(1.77-1.378*(10**-4)*(d.st_teff-5700)-1.428*(10**-9)*(d.st_teff-5700)**2);
          
       });

       loadedData.forEach(d => {
           d.ESI_in = Math.sqrt((d.esiR**wR)*(d.esiD**wD));
           d.ESI_ext = Math.sqrt((d.esiV**wV)*(d.esiT**wT));
           d.ESI_t = Math.sqrt(d.ESI_ext*d.ESI_in);
           d.cdhs_t = d.cdhs_in*0.99+d.cdhs_sur*0.01;
         

           d.hzd = (2*d.pl_orbsmax-d.habO-d.habI)/(d.habO-d.habI);
           if(d.hzd > 1) {
               d.inHZD = "over";
           }
           else if (d.hzd < -1){
               d.inHZD = "under";
           }
           else {
               d.inHZD = "in";
           }
       });
     //  console.log(loadedData);

       // var nestR = d3.nest()
       // .key(function(d) { return d.esiT; })
       // .entries(loadedData);

       // console.log(d3.max(loadedData, d => d.pl_eqt))
       // console.log(d3.min(loadedData,d => d.pl_eqt))


       var nest = d3.nest()
       .key(function(d) { return d.discoverymethod; })
       .entries(loadedData);
       

       var test = [];
       var a = 0;
       for(var i = 0, len=nest.length; i<len; i++){
           
           if(nest[i].key !== "Astrometry" && nest[i].key !== "Eclipse Timing Variations") {
               test[a] = nest[i].key;
              a = a+1;
           }
           
       }

      // console.log(nest)

       methods = test;


       for(var i = 0, len = loadedData.length; i < len-4; i++){

           if (Object.prototype.toString.call(loadedData[i].disc_pubdate) === "[object Date]"){
               if (isNaN(loadedData[i].disc_pubdate.getTime())) {  
                   loadedData.splice(i,1);
                 } 
           }
       }
    

       loadedData.sort(function(a,b){
           return a.disc_pubdate - b.disc_pubdate;
       });


       // dataFilter.push({type: xColumn,name: NaN},
       //     {type: yColumn,name: NaN});
       
       // const dataF1 = loadedData.filter( v =>
       //         !Number.isNaN(v[yColumn]));
       
       // const dataF2 = dataF1.filter( v =>
       //         !Number.isNaN(v[xColumn]));
       
       // const dataF = loadedData.filter(function (v) {
       //         if (v.disc_pubdate < dateRange[1] && v.disc_pubdate > dateRange[0]) {
       //             return v
       //         }
       // });
       //console.log(dataF);
     //  console.log(loadedData);



       loadedData.forEach(d => {
        
           if(d.esiT > 0.8) {
               d.bigESI = "yes";
           }
           else {
               d.bigESI= "no";
           }

           if(d.pl_rade<1.25){
               d.pl_type = "Terrestial";
               d.pl_tphc = "Non-Habitable";
               if(173 <= d.pl_eqt && d.pl_eqt<223){
                   d.pl_tphc = "Hypopsychroplanet";
               }
               if(223 <= d.pl_eqt && d.pl_eqt<273){
                   d.pl_tphc = "Psychroplanet";
               }
               if(273 <= d.pl_eqt && d.pl_eqt<323){
                   d.pl_tphc = "Mesoplanet";
               }
               if(323 <= d.pl_eqt && d.pl_eqt<373){
                   d.pl_tphc = "Thermoplanet";
               }
               if(373 <= d.pl_eqt && d.pl_eqt<423){
                   d.pl_tphc = "Hyperthermoplanet";
               }
              
           }
           if(1.25 <= d.pl_rade && d.pl_rade<2){
               d.pl_type = "Super-Earth";
               d.pl_tphc = "Non-Habitable";
               if(173 <= d.pl_eqt && d.pl_eqt<223){
                   d.pl_tphc = "Hypopsychroplanet";
               }
               if(223 <= d.pl_eqt && d.pl_eqt<273){
                   d.pl_tphc = "Psychroplanet";
               }
               if(273 <= d.pl_eqt && d.pl_eqt<323){
                   d.pl_tphc = "Mesoplanet";
               }
               if(323 <= d.pl_eqt && d.pl_eqt<373){
                   d.pl_tphc = "Thermoplanet";
               }
               if(373 <= d.pl_eqt && d.pl_eqt<423){
                   d.pl_tphc = "Hyperthermoplanet";
               }
             
           }
          if(2 <= d.pl_rade && 6 > d.pl_rade){
               if(d.pl_dens > 2.5) {
                   d.pl_type = "Super-Earth";
                   d.pl_tphc = "Non-Habitable";
                   if(173 <= d.pl_eqt && d.pl_eqt<223){
                       d.pl_tphc = "Hypopsychroplanet";
                   }
                   if(223 <= d.pl_eqt && d.pl_eqt<273){
                       d.pl_tphc = "Psychroplanet";
                   }
                   if(273 <= d.pl_eqt && d.pl_eqt<323){
                       d.pl_tphc = "Mesoplanet";
                   }
                   if(323 <= d.pl_eqt && d.pl_eqt<373){
                       d.pl_tphc = "Thermoplanet";
                   }
                   if(373 <= d.pl_eqt && d.pl_eqt<423){
                       d.pl_tphc = "Hyperthermoplanet";
                   }
               }
               else {
                   d.pl_type = "Neptune-Like";
               }
           }
           if(6 <= d.pl_rade && 15 > d.pl_rade){
               d.pl_type = "Gas Giant";
           }
           if(15 < d.pl_rade ){
               d.pl_type = "Super-Jupiter";
           }
         
       });


       data = loadedData;
      
       d3.nest()
       .key(d => d.inHZD)
       .key(d => d.bigESI)
       .entries(loadedData);

       d3.nest()
       .key(d => d.pl_type)
       .key(d => d.inHZD)
       .entries(loadedData);

       d3.nest()
       .key(d => d.pl_type)
       .key(d => d.pl_tphc)
       .entries(loadedData);

       d3.nest()
       .key(d => d.pl_tphc)
       .key(d => d.inHZD)
       .entries(loadedData);

      
       // console.log(nest4)
     render();
     
   });

})));
