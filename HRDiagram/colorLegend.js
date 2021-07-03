import { symbol } from "d3-shape";

export const colorLegend = (selection, props) => {
  const { colorScale, shapes, spacing, textOffset} = props;

  var contClick = 0;
  var methodsF = [];
  let select = selection.selectAll('select').data([null]);


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
    //.attr('font-weight', 'bold')
    .style('font-size', '17px')
    .text('Markers:')
    .style("fill", "#afafab");
  
   
    const entries = select.enter()
    .merge(select).selectAll('g')
    .data(colorScale.domain())
    .join('g')
    .attr('transform', (d, i) =>
    `translate(30, ${i * spacing + 28})`)
    .attr('class', 'gLegendS')
    // .on('click', onCLick)
    // .on('dblclick', onDBCLick)
    // .on('mouseover', onMouseover)
    // .on('mouseout', onMouseout);
  
  const symbolsP =  [{symbol:d3.symbol().type(d3.symbolSquare).size(40)},
    {symbol:d3.symbol().type(d3.symbolTriangle).size(40)}]  
  const symbols = entries.append('path')
 // .attr("transform", d => `translate(${xScale(xValue(d))},${yScale(yValue(d))})`)
    .attr("d", shapes)
    //.attr("d",d3.symbol().type(d3.symbolSquare).size(40) )
    .attr('fill', colorScale);
  
  
  
  const labels = entries.append('text')
    .attr('x', textOffset +5) 
    .attr('dy', '0.38em') 
    .attr('fill', 'black')
    .attr('font-family', 'Helvetica Neue, Arial')
    .attr('font-size', '9px')
    .attr('class', 'legendText')
    .style('user-select', 'none') 
    .text(d => d);

}







    