(function (factory) {
  typeof define === 'function' && define.amd ? define(['d3-shape'], factory) :
  factory();
}((function () { 'use strict';

  const scatterPlotS = (selection, props) => {

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
      .domain([-0.25,2.4])
      .range([0,innerWidth])
      .nice();

      // const x2Dom = [2000,2900,3110,3320,3570,3870,4250,4670,5000,5200,5870,6820,8050,10100,1350,20000]
       const x2Dom = [2800,3450,4680,7400,21000];
       const x2Range = [0,190,405,620,850];
      // const x2Dom = [2800,2900,3090,3320,3450,3580,3890,4230,4680,21000]
      // const x2Range = [0,60,121,182,242,303,364,425,640,850]
     // x2Dom.reverse
  x2Range.reverse();
      console.log(innerWidth);
      const x2Scale = d3.scaleSqrt()
      .domain(x2Dom)
      .range(x2Range)
      .exponent(1/2);
     


      // [innerWidth,innerWidth*13/14,innerWidth*12/14,innerWidth*11/14,innerWidth*10/14,innerWidth*9/14,innerWidth*8/14,
      //     innerWidth*7/14,innerWidth*6/14,innerWidth*5/14,innerWidth*4/14,innerWidth*3/14,innerWidth*2/14,innerWidth*1/14,0]

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

      const x2Axis = d3.axisTop(x2Scale)
      .tickSize(-7)
      .ticks(5)
      .tickPadding(20);

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
      .text(yLabel );

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
      .text(xLabel);


      const x2AxisG = g.select('.x2Axis');
      const x2AxisGEnter = gEnter.append('g')
      .attr('class', 'x2Axis')
      .attr('transform', `translate(0,${0})`);

      x2AxisG.merge(x2AxisGEnter)
      .call(x2Axis)
      .selectAll('.domain')
      .remove();

      x2AxisGEnter
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
      .attr('class', 'title');

      titleG.merge(titleGEnter)
      .selectAll('.domain')
      .remove();

      titleGEnter
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
     };

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

          tooltip.html( "<b>" + d.hostname + "</b>"  + "<br/>" +
          "<span style='color:" + color + ";'>" + d.st_spectype + +d.sub_class+ " "+ d.lum_class+"</span><br/>" +
          yLabel + ": " + Math.round(d.st_lum * 1000) / 1000 + "<br/>" + xLabel + ": " + + Math.round(d.st_teff * 1000) / 1000 
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


      d3.zoom()
      .extent([[0, 0], [innerWidth, innerHeight]])
      .on("zoom", function(event){
          console.log(event);

          if(event.sourceEvent.x < 350 || event.sourceEvent.x >1260 || event.sourceEvent.y<90 || event.sourceEvent.y>730 ){

              return event;
          }
        
      } );

      function zoomed(event) {
          // create new scale ojects based on event

          if(event.sourceEvent.x < 350 || event.sourceEvent.x >1260 || event.sourceEvent.y<90 || event.sourceEvent.y>730 ){
              console.log(event);
              window.scrollBy(0, event.sourceEvent.deltaY);
              return event;
          }
          else {
              var new_xScale = event.transform.rescaleX(xScale);
              var new_yScale = event.transform.rescaleY(yScale);
              var new_x2Scale = event.transform.rescaleX(x2Scale);

             
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
              );


              d3.selectAll('.rectP')
              .attr("transform", d => `translate(${new_xScale(xValue(d))},${new_yScale(yValue(d))})`);
          
                d3.selectAll('.circleG')
                 .attr('cy', d => new_yScale(yValue(d)))
                  .attr('cx', d => new_xScale(xValue(d)));
               //   .attr('r', 3.5 + event.transform.k/6);
          

          }

         
          
         
              
      }
     
      var xLre = [];
      const pointNum = 36;
      const pointNum2 = 200;
      const xDomain = 0.398;
      var pp, xTemp, yTemp;
      
      for(let i = -7.6; i<=pointNum2; i++){
          xTemp = xDomain / pointNum * i;
          
         // yTemp = cx2*xTemp**2+xTemp*cx +c+cx3*xTemp**3 +cx4*xTemp**4 //+ cx5*xTemp**5 + cx6*xTemp**6;
          yTemp =  1.3989  -4.3335 *xTemp +24.1944 *xTemp**2 -75.2543 *xTemp**3 +104.0721 *xTemp**4  -71.7930*xTemp**5 + 24.2841*xTemp**6  -3.2161 *xTemp**7;//+0.3812 *xTemp**6
         // console.log(xTemp)
          pp = {x:xTemp,y:yTemp};
          xLre.push(pp);
      }
      console.log(xLre);

   

      
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
          .attr('fill-opacity', opacity(dataF))
          .attr('cy', d => yScale(yValue(d)))
          .attr('cx', d => xScale(xValue(d)));
   
          const shape = d3.symbol().size(40);
     
          const symbols =  gZ.merge(gZEnter).selectAll('.rectP').data(data2);

          symbols.enter()
         .append('path')
         .attr('class', 'rectP')
         .merge(symbols)
         .transition().duration(2000)
         .attr("transform", d => `translate(${xScale(xValue(d))},${yScale(yValue(d))})`)
         .attr("d", shape.type(d3.symbolTriangle))
        .attr('fill', d => colorScale(colorValue(d)));
      
        d3.selectAll('.rectP')
          .on('mouseover', tipMouseover)
          .on('mouseout', tipMouseout);
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
          const lines2 = gZ.merge(gZEnter).selectAll('.line-pathS').data(xLre);

          lines2.enter()
           .append("path")
           .merge(lines2)
             .datum(xLre)
             .attr('class', 'line-pathS')
             .attr("fill", "none")
             .attr("stroke", "steelblue")
             .attr("stroke-width", 1.5)
             .attr("d", d3.line()
               .x(function(d) { return xScale(d.x) })
               .y(function(d) { return yScale(d.y) })
               );
               lines2.exit().remove();
   
      d3.selectAll('.circleG')
      .on('mouseover', tipMouseover)
      .on('mouseout', tipMouseout);

      d3.selectAll('.circleG').exit().remove();
      
      d3.selectAll('.svgS').call(d3.zoom().extent([[0, 0], [innerWidth, innerHeight]]).scaleExtent([1, 50]).translateExtent([[0, 0], [innerWidth, innerHeight]]).on("zoom",zoomed));

      circles.exit().remove();

  };

  const colorSlider = (selection, props) => {
      const { colorScale, circleRadius, spacing, textOffset,label, onLegendChange} = props;
      let select = selection.selectAll('select').data([null]);
    
      
      select.enter()
      .merge(select)
      .append('text')
      .attr("transform", `translate(230,-10) `)
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'black')
      .attr('font-family', 'Helvetica Neue, Arial')
      .attr('font-weight', 'bold')
      .style('font-size', '16px')
      .text(label)
      .style('fill', '#b3aca7');
    
      var width = 90;
      var height = 850;
      var min = -0.4;
      var max = 2.4;
    //Math.round(colorScale.domain()[0]);
     console.log(colorScale.domain()[0]);
      console.log(min,max);
      const xScale = d3
      .scaleBand()
      .domain([0, 1])
      .range([0, width]);
    
    
      const yScale = d3
      .scaleLinear()
      .domain([min,max])
      .range([0,height]);
      
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
        .attr("transform", `translate(${-478},-446) rotate(270 ${height/2} ${width/2})`)
        .datum(expandedDomain)
        .call(svgBar);

        const xScale2 = d3
        .scaleLinear()
        .domain([min,max])
        .range([0,height]);
    
      const domain = [min,max];
      const axisLabel = fc
      .axisBottom(xScale2)
      .tickValues([...domain, (domain[1] + domain[0]) / 2])
      .tickSize(15)
      .tickSizeOuter(0);  
    
    Math.abs(legendBar.node().getBoundingClientRect().x);
    
    legendSvg.append("g")
      .attr("transform", `translate(${-98.5},47)`)
      .datum(expandedDomain)
      .call(axisLabel);
    
      fc.extentLinear()
      .pad([0.1, 0.1])
      .padUnit("percent")(domain);
    
    
      };

  const treemap = (selection, props) => {

      const { dataJ} = props;

      d3.nest()
      .key(d => d.st_spectype)
      .entries(dataJ);
     // console.log(nested1)
      const width = 320;
      const height = 320;

      d3.scaleOrdinal()
      .domain(['B A', 'F', 'G', 'K', 'M'])
      .range(['#bee1fa','#faf4be','#fffc61','#ffd061','#ff9b61'
      ]);


      d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/barPlot.csv').then(data => {



          var subgroups = data.columns.slice(1);

          const groups = data.map(d => (d.Spectral_Type));


          const x = d3.scaleBand()
          .domain(groups)
          .range([0, width])
          .padding([0.2]);
          selection.append("g")
          .attr("transform", `translate(0, ${height})`)
          .call(d3.axisBottom(x).tickSizeOuter(0));
    
      // Add Y axis
       const y = d3.scaleLinear()
          .domain([0, 1460])
          .range([ height, 0 ]);
          selection.append("g")
          .call(d3.axisRight(y))
          .attr("transform", `translate(${width},0)`);

      const stackedData = d3.stack()
      .keys(subgroups)
      (data);

      var colorRange = [];

      stackedData.forEach(d => {
          if (d.key === "Labeled"){
              d.forEach(e =>{
                  e.data.colorK = d.key;
                  colorRange.push(e.data.Spectral_Type);
              });
          }
          else {
              d.forEach(e =>{
                  e.data.colorK = d.key;
                  colorRange.push(e.data.Spectral_Type);
              });
          }
         
      });
     
      const color = d3.scaleOrdinal()
      .domain(colorRange)
      .range(['#5e94ff','#bee1fa','#faf4be','#fffc61','#ffd061','#ff9b61']);

      selection.append('text')
      .attr('class', 'title-text')
      .attr('fill', 'black')
      .attr('align', 'center')
      .attr('y',-10)
      .attr('x',width/2)
      .text("Stellar Type Distribution (Labeled and Unlabeled)")
      .style('font-size', '14px')
      .style('fill', '#948e8d');

      d3.selectAll('.tooltip2').remove();
     
      var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip2")
      .style("fill-opacity", 0);

      // Three function that change the tooltip when user hover / move / leave a cell
      const mouseover = function(event, d) {
         
          const subgroupName = d3.select(this.parentNode).datum().key;
          const subgroupValue = d.data[subgroupName];
          tooltip
              .html("Data Type: " + subgroupName + "<br>" + "Instances: " + subgroupValue)
              .style("opacity", 1);
              // .style("left", (event.pageX -95) + "px")
              // .style("top", (event.pageY -90) + "px")
              // .transition()
              //     .duration(200) 
              //     .style("fill-opacity", .9) 
              //     .style('display','block'); 
              
        };
        const mousemove = function(event, d) {
          tooltip.style("left", (event.pageX-62) + "px")
          .style("top", (event.pageY-50) + "px")
          .transition()
              .duration(200) 
              .style("fill-opacity", .9) 
              .style('display','block'); 
        };
        const mouseleave = function(event, d) {
          tooltip
            .style("opacity", 0);
        };
      
      selection.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
          .attr("fill", "grey")
          .selectAll("rect")
          // enter a second time = loop subgroup per subgroup to add all rectangles
          .data(d => d)
          .join("rect")
          .attr("x", d => x(d.data.Spectral_Type))
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width",x.bandwidth())    
          .attr("fill", function(d){
            
              if(d[0] === 0){
                  return(color(d.data.Spectral_Type))
              }
              else {
                  return "grey"
              }
          })
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave);


        
          
      });
  //     d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/treemapData.csv').then(dataT => {
    
      
  //         var root = d3.stratify()
  //         .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
  //         .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
  //         (dataT);
  //         root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

  //         d3.treemap()
  //         .size([width, height])
  //         .padding(4)
  //         (root)
      
  //     console.log(root.leaves())


  //     selection
  //     .selectAll("rect")
  //     .data(root.leaves())
  //     .enter()
  //     .append("rect")
  //       .attr('x', function (d) { return d.x0; })
  //       .attr('y', function (d) { return d.y0; })
  //       .attr('width', function (d) { return d.x1 - d.x0; })
  //       .attr('height', function (d) { return d.y1 - d.y0; })
  //       .style("stroke", "black")
  //       .style("fill", d => colorScalePl(colorValue(d)) );

  //       selection
  //       .selectAll("text")
  //       .data(root.leaves())
  //       .enter()
  //       .append("text")
  //         .attr("x", function(d){ return d.x0+4})    // +10 to adjust position (more right)
  //         .attr("y", function(d){ return d.y0+13})    // +20 to adjust position (lower)
  //         .text(function(d){ return d.data.name + " "+ "("+ d.data.value + ")"})
  //         .attr("font-size", "12.5px")
  //         .attr("fill", "black")
  // //   // Then d3.treemap computes the position of each element of the hierarchy
  // //   // The coordinates are added to the root object above
  // //   d3.treemap()
  // //     .size([width, height])
  // //     .padding(4)
  // //     (root)

  //     })










  };

  //import regression from 'regression';


  // let menusCSS = document.querySelector("#menus");
  // menusCSS.style.left = `${(width- width/4 +700)/6+650}px`;
  // menusCSS.style.top = `10px`;

  d3.selectAll('#menus')
  .style('top', '1060px');

  var widthS = 1000,
  heightS = 860,
      paddingS = 100,
      flagChangeL = 0;
  var dataSt = [];
  var dataSt2 = [];
  var dataJ = [];
  var dropSelect ="Star Colour (B-V) Range";
  var svgS = d3.select("body").append("svg")
    .attr('class', 'svgS')
    .attr("width", 1460)
    .attr("height", 1000)
    .attr("transform", "translate(" + paddingS*2  + "," + paddingS * 1.4+ ")");

  var rr = Float32Array.from({ length: 1000 }, d3.randomNormal(0.55, 0.85));

  const scale = d3.scaleSequentialQuantile(d3.interpolateRdYlBu); // same as t1
  const interpolator = scale.interpolator(); // read its interpolator
  const mirror = t => interpolator(1 - t); // creates a mirror image of the interpolator

  var scale2 = scale.interpolator(mirror); // updates the scale’s interpolator

  var sss = scale2.domain(rr);

  d3.selectAll('#toggleS')
  .style('right', '1200')
  .attr("transform", "translate(1000,1000)");

  d3.select("#habButton")
  .on("click",onHabChange);

  d3.select("#habButton2")
  .on("click",onHabChange2);

  function onHabChange(){
      //flagChangeL = 0;

      if(flagChangeL === 0){
          //filterHab = 1
          d3.selectAll('.rectP').style('visibility', 'hidden');
          flagChangeL = 1;
      
      }
      else {
        d3.selectAll('.rectP').style('visibility', 'visible');
        flagChangeL = 0;
      
      }
    
     // flag = 1;
      //renderS();
      // if(filterHab === 1){
         
      //     d3.selectAll('.textLines').style('visibility', 'hidden')
      // }
     
  }

  function onHabChange2(){
    //flagChangeL = 0;

    if(flagChangeL === 0){
        //filterHab = 1
        d3.selectAll('.line-pathS').style('visibility', 'hidden');
        flagChangeL = 1;
    
    }
    else {
      d3.selectAll('.line-pathS').style('visibility', 'visible');
      flagChangeL = 0;
    
    }

   // flag = 1;
    //renderS();
    // if(filterHab === 1){
       
    //     d3.selectAll('.textLines').style('visibility', 'hidden')
    // }
   
  }
  const renderS = () =>{

      dataJ = dataSt.concat(dataSt2);

    //  console.log(result)
    
      svgS.call(scatterPlotS, {
          title: `Hertzsprung–Russell diagram`,
          xValue: d => d.st_bv,
          xLabel: "Colour(B-V)",
          x2Value: d => d.st_teff,
          x2Label: "Temperature (K)",
          xColName: "st_bv",
          yValue: d => d.st_lum,
          yLabel: "Luminosity (log(Solar))",
          yColName: "st_lum",
          margin: { top:70, right: 80, bottom: 150, left:70},
          widthS,
          heightS,
          //flag,
         // dateRange: dateRange,
          colorScale:sss,
          colorValue: d => d.st_bv,
          data: dataSt,
          data2: dataSt2,
        

     });

     d3.selectAll('.legend').remove();

     const gLegendEnter = svgS.append('g')
     .attr('class', 'legend');

     const gLegend = svgS.selectAll('.legend').data([null]);

     gLegendEnter
     .attr('transform', `translate(${ 300},${heightS })`)
     .merge(gLegendEnter)
     .call(colorSlider, {
         colorScale: sss,
         circleRadius: 10,
         spacing: 30,
         textOffset: 20,
         label: dropSelect,
        // onLegendChange: onLegendChange,
     });

     gLegend.exit().remove();

     d3.selectAll('.treemap').remove();

     const gTreeEnter = svgS.append('g')
     .attr('class', 'treemap');

     const gTree = svgS.selectAll('.treemap').data([null]);

     gTreeEnter
     .attr('transform', `translate(${ widthS+60},${heightS -440})`)
     .merge(gTreeEnter)
     .call(treemap, {
         dataJ
        // onLegendChange: onLegendChange,
     });

     gTree.exit().remove();

     d3.symbol().size(40);

     var plNames = ["Pre-Labeled Stars","Classified Stars"];
      //const shape = d3.scaleOrdinal().domain(plNames).range([d3.symbolTriangle, d3.symbolTriangle])
    // const shape = d3.scaleOrdinal(plNames,d3.symbols.map(s => d3.symbol().size(220).type(s)()))
    const shape = d3.scaleOrdinal(plNames,d3.symbols.map(function(s){

      console.log(s);
      return d3.symbol().size(220).type(s)()
    }));
     d3.scaleOrdinal()
     .domain(plNames)
     .range(['#4adeff',  '#f7543b',
     '#b3acab','#d2b0ff',
     '#aaf2a2', '#ff3636',
     '#fcee90', '#eb83c8',
     '#edb861'
     ]);

    
     //d3.symbols.map(s => d3.symbol().size(220).type(s)())
      console.log(shape.range());
     //
     d3.selectAll('.legendST').remove();

     svgS.append('g')
     .attr('class', 'legendST');

     const gLegendS = svgS.selectAll('.legendST').data([null]);

    //  gLegendEnterS
    //  .attr('transform', `translate(${ widthS- widthS/4 -90},${heightS/8 + 345 })`)
    //  .merge(gLegendEnterS)
    //  .call(colorLegend, {
    //      colorScale: colorScaleSol,
    //      shapes: shape,
    //      spacing: 30,
    //      textOffset: 20,
    //      label: plNames,
    //     // onLegendChange: onLegendChange,
    //  });

     gLegendS.exit().remove();


    // var aa =  d3.nest()
    //   .key(d => d.st_spectype)
    //   .entries(dataSt)

    //   var nn =  d3.nest()
    //   .key(d => d.st_spectype)
    //   .entries(dataSt2)

    //   console.log(aa)
    //   console.log(nn)
  };




  d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/AAStars.csv').then(dataS => {

      dataS.forEach(d => { 

        
          d.st_mass = +d.st_mass;
          d.st_teff = +d.st_teff;
          d.st_rad = +d.st_rad;
          d.st_lum = +d.st_lum;
          d.st_met = +d.st_met;
          d.st_logg = +d.st_logg;
          d.st_age = +d.st_age;
          d.st_dens = +d.st_dens;
          d.sy_gaiamag = +d.sy_gaiamag;
          d.sy_bmag = +d.sy_bmag; 
          d.sy_vmag = +d.sy_vmag; 

       
      });

      dataS.forEach(d => { 
       
      //   if(d.sy_bmag == 0 || isNaN(d.sy_vmag)){
     
      //     d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      //   }
      //   else{
      //     d.st_bv =  d.sy_bmag - d.sy_vmag 
      //   }
       
          d.st_lumN = 10**d.st_lum;
        d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
    
       
      });

     

      dataSt = dataS;

     
  });


  d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/NNStars.csv').then(dataS2 => {

      dataS2.forEach(d => { 

        
          d.st_mass = +d.st_mass;
          d.st_teff = +d.st_teff;
          d.st_rad = +d.st_rad;
          d.st_lum = +d.st_lum;
          d.st_met = +d.st_met;
          d.st_logg = +d.st_logg;
          d.st_age = +d.st_age;
          d.st_dens = +d.st_dens;
          d.sy_gaiamag = +d.sy_gaiamag;
          d.sy_bmag = +d.sy_bmag; 
          d.sy_vmag = +d.sy_vmag; 
          d.sub_class  = null;
          d.lum_class = "";
      });

      dataS2.forEach(d => { 
       
      //   if(d.sy_bmag == 0 || isNaN(d.sy_vmag)){
     
      //     d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      //   }
      //   else{
      //     d.st_bv =  d.sy_bmag - d.sy_vmag 
      //   }
       
          d.st_lumN = 10**d.st_lum;
        d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
    
       
      });

     

      dataSt2 = dataS2;

      renderS();
  });

})));
