export const planetLegend = (selection, props) => {
    const { colorScale, circleRadius, spacing, textOffset, onLegendChange, current,colorScaleR} = props;
  
    var contClick = 0;
    var methodsF = [];
    let select = selection.selectAll('select').data([null]);
  
    const onCLick = function(event, d){
      if(contClick == 0) {
        d3.selectAll('.circlePlanetsL')
        .attr("fill", "gray")
        d3.select(this).selectAll('circle')
        .attr("fill", "#2196F3")
        contClick++;
        methodsF.push(d3.select(this).selectAll('text').text());
        
        onLegendChange(methodsF);
      }
      else if(methodsF.length === 5) {
        //contClick = 0
        d3.selectAll('.circlePlanetsL')
      .attr("fill", "gray")
        d3.select(this).selectAll('circle')
      .attr("fill", "#2196F3")
      
    
        methodsF = [];
        methodsF.push(d3.select(this).selectAll('text').text());
        onLegendChange(methodsF);
        
       }
      else {
        if (  d3.select(this).selectAll('circle')
        .attr("fill") === "#2196F3") { 
  
          d3.select(this).selectAll('circle')
          .attr("fill", "gray")
          methodsF = methodsF.filter (
             v => v !== d3.select(this).selectAll('text').text()
          );
          onLegendChange(methodsF);
          }
        else {
          d3.select(this).selectAll('circle')
          .attr("fill", "#2196F3")
        methodsF.push(d3.select(this).selectAll('text').text());
        onLegendChange(methodsF);
        }
      }
    };
  
    const onDBCLick = function(event, d){
      d3.selectAll('.circlePlanetsL')
      .attr("fill", "#2196F3")


        methodsF = [];
        onLegendChange(methodsF);
     
     
    };

    console.log(current)

    const onMouseover = function(event, d){
  
      d3.select(this).selectAll('circle')
      .attr("stroke", "white")
      .attr('stroke-width', '4');

      // d3.select(this).selectAll('circle')
      // .attr("fill", "red")
      var numC = d3.select(this).selectAll('text').text()
      d3.selectAll('.circleG')
      .style('fill',function(d){
        if(d.pl_type !== numC){
          return "grey"
        }
        else{
          return  colorScaleR(d => d[current])
        }
      })
      .style("opacity" ,function(d){
        if(d.pl_type !== numC){
          return 0.4
        }
        else{
          return  1
        }
      })
    }
  
    const onMouseout = function(event, d){
  
      d3.select(this).selectAll('circle')
      //.attr("stroke", "none")
      .attr('stroke-width', '2');

      d3.selectAll('.circleG')
      .style('fill',function(d){
        
          return colorScaleR(d => d[current])
        
      })
      .style("opacity", 1)
      
    }
    const title = select.enter()
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
  
    var spacing2 = [120,120,132,140,136] 
    const entries = select.enter()
    .merge(select).selectAll('g')
    .data(colorScale.domain())
    .join('g')
    // .attr('transform', (d, i) =>
    // `translate(${i * spacing + 146},-5 )`)
     .attr('transform',function(d,i){
      for(var z = 0, len = 5; z< 5; z++){
      
          return  `translate(${i * spacing2[i] + 230},-5 )`
       }
     })
    .attr('class', 'gLegend')
    .on('click', onCLick)
    .on('dblclick', onDBCLick)
    .on('mouseover', onMouseover)
    .on('mouseout', onMouseout);
  
  const symbols = entries.append('circle')
  .attr('class', 'circlePlanetsL')
    .attr('cx', circleRadius) 
    .attr('r', circleRadius)
    .attr('fill',colorScale)
    .attr("stroke", "white")
    .attr('stroke-width', '2');
  
  const labels = entries.append('text')
    .attr('x', textOffset +5) 
    .attr('dy', '0.34em') 
    .attr('fill', 'black')
    .attr('font-family', 'Helvetica Neue, Arial')
    .attr('font-size', '12px')
    .attr('class', 'legendText')
    .style('user-select', 'none') 
    .style('fill', '#a8a09e')
    .text(d => d);
  }