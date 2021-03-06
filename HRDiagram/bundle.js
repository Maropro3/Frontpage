(function (factory) {
  typeof define === 'function' && define.amd ? define(['d3-shape'], factory) :
  factory();
}((function () { 'use strict';

  const colorLegend = (selection, props) => {
    const { colorScale, shapes, spacing, textOffset} = props;
    let select = selection.selectAll('select').data([null]);

    select.enter()
      .merge(select)
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', 'black')
      .attr('font-family', 'Helvetica Neue, Arial')
      .style('font-size', '17px')
      .text('Markers:')
      .style("fill", "#afafab");
    
    const entries = select.enter()
      .merge(select).selectAll('g')
      .data(colorScale.domain())
      .join('g')
      .attr('transform', (d, i) =>
      `translate(30, ${i * spacing + 28})`)
      .attr('class', 'gLegendS');
    
    [{symbol:d3.symbol().type(d3.symbolSquare).size(40)},
      {symbol:d3.symbol().type(d3.symbolTriangle).size(40)}];  

    entries.append('path')
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
      
      const svgZ = d3.selectAll('.svgGS');

      const gZ = svgZ.selectAll('.containerZ').data([null]);
      const gZEnter = gZ.enter().append('g')
      .attr('class', 'containerZ');

      gEnter.merge(g)
      .attr('transform', `translate(${200},${100})`);
      
      const xScale = d3.scaleLinear()
      .domain([-0.4,2.4])
      .range([0,innerWidth])
      .nice();
    
      const x2Dom = [2800,3450,4790,6900,50000];

      const x2Range = [0,190,405,620,850];
    
      x2Range.reverse();

      const x2Scale = d3.scaleLog()
      .domain(x2Dom)
      .range(x2Range)
      .base(2);

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
     
      var tooltip = d3.select(".transZ").append("div")
      .attr("class", "tooltip")
      .style("fill-opacity", 0);

      var tipMouseover = function(event,d) {
          
          var color = colorScale(colorValue(d));
          var xM = d3.pointer(event, gZEnter.node())[0];
          var  yM = d3.pointer(event, gZEnter.node())[1];

          var offTY = 0;

          if(window.innerWidth<1900){
              offTY = -74;
          }

          d3.select(this)
          .attr('stroke-width', '2')
          .attr("stroke", "black")
          .attr('fill-opacity', 1 );

          const subC = function(d) {
              if(d.sub_class === ""){
                  return " "
              }
              else {
                  return d.sub_class
              }
          };

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

          d3.select(this)
          .attr('stroke-width', '0')
          .attr('fill-opacity', opacity(dataF) );

          tooltip.transition()
              .duration(200) 
              .style("fill-opacity", 0)
              .style('display','none'); 
      };

      d3.zoom()
      .extent([[0, 0], [innerWidth, innerHeight]])
      .on("zoom", function(event){

          if(event.sourceEvent.x < 350 || event.sourceEvent.x >1260 || event.sourceEvent.y<90 || event.sourceEvent.y>730 ){

              return event;
          }
        
      });

      var yScaleAux = yScale;
      var xScaleAux = xScale;

      function zoomed(event) {

          if (event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
          if (event.sourceEvent && event.sourceEvent.type === "end") return;
          
          if (event.sourceEvent && event.sourceEvent.type !=="brush") { 

              if(event.sourceEvent.x < 350 || event.sourceEvent.x >1260 || event.sourceEvent.y<90 || event.sourceEvent.y>730 ){
          
                  window.scrollBy(0, event.sourceEvent.deltaY);
                  return;
              }
              
              else {
                  var new_xScale = event.transform.rescaleX(xScale);
                  var new_yScale = event.transform.rescaleY(yScale);
                  var new_x2Scale = event.transform.rescaleX(x2Scale);

                  yScaleAux = new_yScale;
                  xScaleAux = new_xScale;
          
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

                  d3.selectAll(".line-pathS")
                  .attr("d", d3.line()
                  .x(function(d) { return new_xScale(d.x) })
                  .y(function(d) { return new_yScale(d.y) }));
                  
                  d3.selectAll('.rectP')
                  .attr("transform", d => `translate(${new_xScale(xValue(d))},${new_yScale(yValue(d))})`);
              
                  d3.selectAll('.circleG')
                  .attr('cy', d => new_yScale(yValue(d)))
                  .attr('cx', d => new_xScale(xValue(d)));
          
                  gT.merge(gTEnter).select(".cell").call(brush.move, [xScaleR(event.transform.rescaleX(xScaleR).domain()[0]),xScaleR(event.transform.rescaleX(xScaleR).domain()[1])]);

              }
          }      
      }
     
      const circles =  gZ.merge(gZEnter).selectAll('circle').data(dataF);

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
      .attr('cx', d => xScale(xValue(d)));

      const shape = d3.symbol().size(40);

      const symbols =  gZ.merge(gZEnter).selectAll('.rectP').data(data2);

      symbols.enter()
      .append('path')
      .attr('class', 'rectP')
      .attr("transform", d => `translate(${innerWidth/2},${innerHeight/2})`)
      .merge(symbols)
      .transition().duration(2000)
      .attr("transform", d => `translate(${xScale(xValue(d))},${yScale(yValue(d))})`)
      .attr("d", shape.type(d3.symbolCross))
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
      .attr('transform', `translate(${400},${-310})`);
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

      const xScaleR = d3.scaleLinear()
      .domain(xScale.domain())
      .range([0,innerWidth]);

      var brush = d3.brushX()
      .extent([[0, 0], [innerWidth, 50]])
      .on("brush end", brushed);
      brushGenter.call(brush)
      .call(brush.move, xScale.range());

      function brushed(event) {
        
          if (event.sourceEvent && event.sourceEvent.type === "wheel") return; 
          if (event.sourceEvent && event.sourceEvent.type === "zoom") return; 
          if (event.sourceEvent !== undefined) {

              var s = event.selection || xScale.range();
                  
              xScaleAux.domain(s.map( xScaleR.invert,  xScaleR));

              xAxisG.merge(xAxisGEnter)
              .call(xAxis.scale(xScaleAux))
              .selectAll('.domain')
              .remove();

              d3.selectAll(".line-pathS")
              .attr("d", d3.line()
              .x(function(d) { return xScaleAux(d.x) })
              .y(function(d) { return yScaleAux(d.y) }));

              d3.selectAll('.rectP')
              .attr("transform", d => `translate(${xScaleAux(xValue(d))},${yScaleAux(yValue(d))})`);

              d3.selectAll('.circleG')
              .attr('cy', d => yScaleAux(yValue(d)))
              .attr('cx', d => xScaleAux(xValue(d)));
          }
      }

      const lines2 = gZ.merge(gZEnter).selectAll('.line-pathS').data(xLre);

      try{

          const lineGenerator2 = d3.line()
          .x(d => xScale(d.x))
          .y(d => yScale(d.y))
          .curve(d3.curveBasis);

          lines2.enter()
          .append("path")
          .merge(lines2)
              .datum(xLre)
              .attr('class', 'line-pathS')
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-width", 1.5)
              .attr("d", d => lineGenerator2(d));

          lines2.exit().remove();
      }
    
      catch{
          
      }
   
      d3.selectAll('.circleG')
      .on('mouseover', tipMouseover)
      .on('mouseout', tipMouseout);

      d3.selectAll('.circleG').exit().remove();
      
      d3.selectAll('.svgS').call(d3.zoom()
      .filter((event) => { 
         
       if(event.clientX <window.innerWidth*0.75 && event.clientX >window.innerWidth*0.225 ){
          
          return !event.path[0].classList.contains('container') 
       }}).extent([[0, 0], [innerWidth, innerHeight]]).scaleExtent([1, 50]).translateExtent([[0, 0], [innerWidth, innerHeight]]).on("zoom",zoomed));

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
      .tickValues([...domain, (domain[1] + domain[0]) *0.15, (domain[1] + domain[0]) *0.85,(domain[1] + domain[0]) / 2])
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

      const { dataJ,sss, gZEnter} = props;

      d3.nest()
      .key(d => d.st_spectype)
      .entries(dataJ);
    
      const width = 360;
      const height = 320;

      d3.scaleOrdinal()
      .domain(['B A', 'F', 'G', 'K', 'M'])
      .range(['#bee1fa','#faf4be','#fffc61','#ffd061','#ff9b61']);

      d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/barPlot.csv').then(data => {

      const tStars = [{"Spectral_Type":"B", "total":4 },
      {"Spectral_Type":"A", "total":19 },
      {"Spectral_Type":"F", "total":94 },
      {"Spectral_Type":"G", "total":239 },
      {"Spectral_Type":"K", "total":380 },
      {"Spectral_Type":"M", "total":2403 }];

      var subgroups = data.columns.slice(1);

      const groups = data.map(d => (d.Spectral_Type));

      const x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2]);
      selection.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

      const y = d3.scaleLinear()
        .domain([0, 2500])
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
      .attr('y',-20)
      .attr('x',width/2)
      .text("Stellar Type Distribution in the Exoplanet Archive (Labeled and Unlabeled)")
      .style('font-size', '11.2px')
      .style('fill', '#919191');

      selection.append('text')
      .attr('class', 'title-text')
      .attr('fill', 'black')
      .attr('align', 'center')
      .attr('y',-4)
      .attr('x',width/2)
      .text(" and the percentage of sprectral types of main sequence stars")
      .style('font-size', '11.2px')
      .style('fill', '#919191');

      d3.selectAll('.tooltip2').remove();
     
      var tooltip = d3.select(".transZ").append("div")
      .attr("class", "tooltip2")
      .style("fill-opacity", 0);

      const mouseover = function(event, d) {
        
          const subgroupName = d3.select(this.parentNode).datum().key;
          const subgroupValue = d.data[subgroupName];
          const subgroupU = +d.data["Unlabeled"];
          const subgroupL = +d.data["Labeled"];
          var subgroupTotal = subgroupU+subgroupL;
          var tolSpect = d.data.Spectral_Type;

          var color2 = color(d.data.Spectral_Type);
          tooltip
              .html( "<span style='color:" + color2 + ";'>"+"Spectral Type: "+ d.data.Spectral_Type+"</span>" +"<br>"+"Data Type: " + subgroupName + "<br>" + "Instances: " + subgroupValue+ "</br>"
              + "% of type in the exoplanet database: "+  Math.round((subgroupTotal/3144*100+ Number.EPSILON)*100)/100 +"%")
              .style("opacity", 1);
          
          if(subgroupName === "Labeled"){
              d3.selectAll('.circleG')
              .style('fill',function(d){
                if(d.st_spectype !==tolSpect ){
                  return "grey"
                }
                else {
                  return  sss(d => d.cluster)
                }
              })
              .style('opacity',function(d){
                  if(d.st_spectype !==tolSpect ){
                    return 0.2
                  }
                  else {
                    return  1
                  }
                });

                d3.selectAll('.rectP')
                .style("fill", "grey")
                .style('opacity', 0.025);
          }

          if(subgroupName === "Unlabeled"){
              d3.selectAll('.rectP')
              .style('fill',function(d){
                if(d.st_spectype !==tolSpect ){
                  return "grey"
                }
                else {
                  return  sss(d => d.cluster)
                }
              })
              .style('opacity',function(d){
                  if(d.st_spectype !==tolSpect ){
                    return 0.02
                  }
                  else {
                    return  1
                  }
                });

             
                d3.selectAll('.circleG')
                .style("fill", "grey")
                .style('opacity', 0.2);
          } 
              
        };
        const mousemove = function(event, d) {
          var xM = d3.pointer(event, gZEnter.node())[0];
          var  yM = d3.pointer(event, gZEnter.node())[1];
          var offTY = 0;

          if(window.innerWidth<1900){
              offTY = -66;
          }

          tooltip.style("left", (xM+1110) + "px")
          .style("top", (yM+650+offTY) + "px")
          .transition()
              .duration(200) 
              .style("fill-opacity", .9) 
              .style('display','block'); 
        };

        const mouseleave = function(event, d) {
          tooltip
            .style("opacity", 0);

            d3.selectAll('.circleG')
              .style('fill',function(d){
             
                  return  sss(d => d.cluster)
              })
              .style('opacity',1);

              d3.selectAll('.rectP')
              .style('fill',function(d){
             
                  return  sss(d => d.cluster)
              })
              .style('opacity',1);
        };
      
      selection.append("g")
      .selectAll("g")
      .data(stackedData)
      .join("g")
          .attr("fill", "grey")
          .selectAll("rect")
          .data(d => d)
          .join("rect")
          .attr("x", d => x(d.data.Spectral_Type)+2)
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width",x.bandwidth()/2.5)    
          .attr("fill", function(d){
            
              if(d[0] === 0){
                  return "steelblue"
              }
              else {
                  return "#b53333"
              }
          })
          .attr("stroke",  d => color(d.data.Spectral_Type))
          .attr('stroke-width', '1')
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave);

    const mouseover2 = function(event, d) {

      var tolSpect = d.Spectral_Type;
      d3.selectAll('.circleG')
      .style('fill',function(d){
        if(d.st_spectype !==tolSpect ){
          return "grey"
        }
        else {
          return  sss(d => d.cluster)
        }
      })
      .style('opacity',function(d){
          if(d.st_spectype !==tolSpect ){
            return 0.2
          }
          else {
            return  1
          }
        });
    
      d3.selectAll('.rectP')
      .style('fill',function(d){
        if(d.st_spectype !==tolSpect ){
          return "grey"
        }
        else {
          return  sss(d => d.cluster)
        }
      })
      .style('opacity',function(d){
          if(d.st_spectype !==tolSpect ){
            return 0.02
          }
          else {
            return  1
          }
      });


      var color2 = color(d.Spectral_Type);
      tooltip
          .html( "<span style='color:" + color2 + ";'>"+"Spectral Type: "+ d.Spectral_Type+"</span>" +"</br>"+
          "% of total Main Sequence stars: "+  Math.round((d.total/3144*100+ Number.EPSILON)*100)/100 +"%" )
          .style("opacity", 1);      
    };

    const mousemove2 = function(event, d) {

      var xM = d3.pointer(event, gZEnter.node())[0];
      var  yM = d3.pointer(event, gZEnter.node())[1];
    
      var offTY = 0;

      if(window.innerWidth<1900){
          offTY = -66;
      }
      tooltip.style("left", (xM+1126) + "px")
      .style("top", (yM+700+offTY) + "px")
      .transition()
      .duration(200) 
      .style("fill-opacity", .9) 
      .style('display','block'); 
    };

    const x2 = d3.scaleBand()
    .range([ 0, width ])
    .domain(tStars.map(d => d.Spectral_Type))
    .padding(0.2);

    const y2 = d3.scaleLinear()
    .domain([0, 2500])
    .range([ height, 0]);

    selection.append("g")
    .selectAll("g")
    .data(tStars)
    .join("rect")
    .attr("fill", d => color(d.Spectral_Type))
    .attr("x", d => x2(d.Spectral_Type)+24)
    .attr("y", d => y2(d.total))
    .attr("height", d => height - y2(d.total))
    .attr("width",x.bandwidth()/2.5)    
    .on("mouseover", mouseover2)
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave);
    });
  };

  d3.selectAll('#menus')
  .style('top', '560px');

  var widthS = 1000,
      heightS = 860,
      paddingS = 100,
      flagChangeL = 0;
  var dataSt = [];
  var dataSt2 = [];
  var dataJ = [];
  var dropSelect ="Star Colour (B-V) Range";
  var svgS = d3.select(".transZ").append("svg")
    .attr('class', 'svgS')
    .attr("width", 1520)
    .attr("height", 1000)
    .attr("transform", "translate(" + paddingS*2  + "," + -160+ ")");

  var rr = Float32Array.from({ length: 1000 }, d3.randomNormal(0.55, 0.85));

  const scale = d3.scaleSequentialQuantile(d3.interpolateRdYlBu); 
  const interpolator = scale.interpolator(); 
  const mirror = t => interpolator(1 - t); 

  var scale2 = scale.interpolator(mirror); 

  var sss = scale2.domain(rr);

  var xLreAux = [];
  const pointNum = 36;
  const pointNum2 = 200;
  const xDomain = 0.42;
  var pp, xTemp, yTemp;

  for(let i = -12; i<=pointNum2; i++){
      xTemp = xDomain / pointNum * i;
      yTemp =  1.42437  -2.32118*xTemp +9.58316*xTemp**2 -36.71320*xTemp**3  +54.05569*xTemp**4  -37.56820*xTemp**5 + 12.45696 *xTemp**6  -1.59237*xTemp**7;//+0.3812 *xTemp**6
      pp = {x:xTemp,y:yTemp};
      xLreAux.push(pp);
  }

  var xLre = xLreAux;

  d3.selectAll('#toggleS')
  .style('right', '1200')
  .attr("transform", "translate(1000,1000)");

  d3.select("#habButton")
  .on("click",onHabChange);

  d3.select("#habButton2")
  .on("click",onHabChange2);

  function onHabChange(){

      if(flagChangeL === 0){
          d3.selectAll('.rectP').style('visibility', 'hidden');
          flagChangeL = 1;
      }
      else {
        d3.selectAll('.rectP').style('visibility', 'visible');
        flagChangeL = 0;
      }
  }

  function onHabChange2(){

    if(flagChangeL === 0){
        d3.selectAll('.line-pathS').style('visibility', 'hidden');
        flagChangeL = 1;
    }
    else {
      d3.selectAll('.line-pathS').style('visibility', 'visible');
      flagChangeL = 0;
    }
  }

  const renderS = () =>{

      dataJ = dataSt.concat(dataSt2);
      d3.nest()
      .key(d => d.st_spectype)
      .entries(dataSt2);

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
      });

      gLegend.exit().remove();

      svgS.call(scatterPlotS, {
        title: `Hertzsprung???Russell diagram`,
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
        colorScale:sss,
        colorValue: d => d.st_bv,
        data: dataSt,
        data2: dataSt2,
        xLre
     });

     d3.selectAll('.treemap').remove();

     const gTreeEnter = svgS.append('g')
     .attr('class', 'treemap');

     const gTree = svgS.selectAll('.treemap').data([null]);

     gTreeEnter
     .attr('transform', `translate(${ widthS+60},${heightS -440})`)
     .merge(gTreeEnter)
     .call(treemap, {
         dataJ,
         sss,
         gZEnter: gTreeEnter
     });

     gTree.exit().remove();

     d3.symbol().size(40);

     var plNames = ["Pre-Labeled Stars","Classified Stars"];
     const shape = d3.scaleOrdinal().domain(plNames).range(["M8.368283871884005,0A8.368283871884005,8.368283871884005,0,1,1,-8.368283871884005,0A8.368283871884005,8.368283871884005,0,1,1,8.368283871884005,0","M-9.9498743710662,-3.3166247903554L-3.3166247903554,-3.3166247903554L-3.3166247903554,-9.9498743710662L3.3166247903554,-9.9498743710662L3.3166247903554,-3.3166247903554L9.9498743710662,-3.3166247903554L9.9498743710662,3.3166247903554L3.3166247903554,3.3166247903554L3.3166247903554,9.9498743710662L-3.3166247903554,9.9498743710662L-3.3166247903554,3.3166247903554L-9.9498743710662,3.3166247903554Z"]);

     const colorScaleSol = d3.scaleOrdinal()
     .domain(plNames)
     .range(["#edd79a"
     ]);

     d3.selectAll('.legendST').remove();

     const gLegendEnterS = svgS.append('g')
     .attr('class', 'legendST');

     const gLegendS = svgS.selectAll('.legendST').data([null]);

     gLegendEnterS
     .attr('transform', `translate(${ widthS +80},${ 206})`)
     .merge(gLegendEnterS)
     .call(colorLegend, {
         colorScale: colorScaleSol,
         shapes: shape,
         spacing: 30,
         textOffset: 20,
         label: plNames,
     });

     gLegendS.exit().remove();
  };

  d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/AAStarsComp.csv').then(dataS => {

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

        d.st_lumN = 10**d.st_lum;
        d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        if(d.st_teff > 11000 && d.st_teff < 21000 ){
          d.st_bv = (0.012*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        }
        if(d.st_teff > 21000 && d.st_teff < 30000){
          d.st_bv = (0.010*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        }
        if(d.st_teff > 30000){
          d.st_bv = (0.008*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        }
        if(d.st_teff < 2600){
          d.st_bv = (0.018*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        }
      });
      dataSt = dataS; 
  });


  d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/NNStarsComp.csv').then(dataS2 => {

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
          d.sub_class  = "";
          d.lum_class =  d.lum_class;
      });

      dataS2.forEach(d => { 
       
        d.st_lumN = 10**d.st_lum;
        d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        if(d.st_teff > 11000 && d.st_teff < 21000 ){
          d.st_bv = (0.012*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        }
        if(d.st_teff > 21000 && d.st_teff < 30000){
          d.st_bv = (0.008*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        }
        if(d.st_teff > 30000){
          d.st_bv = (0.010*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        }
        if(d.st_teff < 2600){
          d.st_bv = (0.018*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
        }
      });
      
      dataSt2 = dataS2;
      renderS();
  });

})));
