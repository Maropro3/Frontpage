export const colorLegend = (selection, props) => {
  const { colorScale, circleRadius, spacing, textOffset, onLegendChange} = props;

  var contClick = 0;
  var methodsF = [];
  let select = selection.selectAll('select').data([null]);

  const onCLick = function(event, d){
    if(contClick == 0) {
      d3.selectAll('.gLegend')
      .attr('opacity', 0.2)
      d3.select(this)   
      .attr('opacity', 1);
      contClick++;
      methodsF.push(d3.select(this).selectAll('text').text());
      
      onLegendChange(methodsF);
    }
    else if(methodsF.length === 8) {
      d3.selectAll('.gLegend')
      .attr('opacity', 0.2)
      d3.select(this)   
      .attr('opacity', 1);
      methodsF = [];
      methodsF.push(d3.select(this).selectAll('text').text());
      onLegendChange(methodsF);
     }
    else {
      if ( d3.select(this).attr('opacity') == 1) { 

        d3.select(this)   
        .attr('opacity', 0.2);
        methodsF = methodsF.filter (
           v => v !== d3.select(this).selectAll('text').text()
        );
        onLegendChange(methodsF);
        }
      else {
        d3.select(this)   
      .attr('opacity', 1);
      methodsF.push(d3.select(this).selectAll('text').text());
      onLegendChange(methodsF);
      }
    }
   
 
  };

  const onDBCLick = function(event, d){
    if(d3.selectAll('.gLegend').attr('opacity') == 1) {
      d3.selectAll('.gLegend')
      .attr('opacity', 0.2)
      d3.select(this)   
      .attr('opacity', 1);
      methodsF = [];
     onLegendChange(methodsF);
    }
    else {
      d3.selectAll('.gLegend')
      .attr('opacity', 1)
      methodsF = [];
      onLegendChange(methodsF);
    }
    contClick = 0;
   
  };

  const onMouseover = function(event, d){

    d3.select(this).selectAll('circle')
    .attr("stroke", "white")
    .attr('stroke-width', '2');
  }

  const onMouseout = function(event, d){

    d3.select(this).selectAll('circle')
    .attr("stroke", "none")
    .attr('stroke-width', '2');
    
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
  .text('Select Clusters:')
  .style('fill', '#b3aca7');

  const entries = select.enter()
  .merge(select).selectAll('g')
  .data(colorScale.domain())
  .join('g')
  .attr('transform', (d, i) =>
  `translate(${i * spacing + 116},-5 )`)
  .attr('class', 'gLegend')
  .on('click', onCLick)
  .on('dblclick', onDBCLick)
  .on('mouseover', onMouseover)
  .on('mouseout', onMouseout);

const symbols = entries.append('circle')
  .attr('cx', circleRadius) 
  .attr('r', circleRadius)
  .attr('fill',colorScale);

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









    