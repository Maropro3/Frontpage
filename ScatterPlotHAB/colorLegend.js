export const colorLegend = (selection, props) => {
  const { colorScale, circleRadius, spacing, textOffset,label, onLegendChange} = props;

  var contClick = 0;
  var methodsF = [];
  let select = selection.selectAll('select').data([null]);

  
  const title = select.enter()
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
  var min = 0
  var max = Math.round(colorScale.domain()[0]);

 

  if(max === 0) {
    max = 1;
  }
  console.log(min,max)
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
  .merge(select)
  
  const legendBar = legendSvg
    .append("g")
    .attr("transform", `translate(${50},30)`)
    .datum(expandedDomain)
    .call(svgBar);

  const domain = [min,max]
  const axisLabel = fc
  .axisRight(yScale)
  .tickValues([...domain, (domain[1] + domain[0]) / 2])
  .tickSizeOuter(0);;


const barWidth = Math.abs(legendBar.node().getBoundingClientRect().x);

legendSvg.append("g")
  .attr("transform", `translate(${12+55},30)`)
  .datum(expandedDomain)
  .call(axisLabel);

  const paddedDomain = fc.extentLinear()
  .pad([0.1, 0.1])
  .padUnit("percent")(domain);


  }









    