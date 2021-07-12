export const linePlot = (selection,props) => {

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
        dateRange,
        colorScale,
        colorValue,
        data,
        dataP,
        onTimeChange

    } = props;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const dataF = data;
    const dataPure = dataP;
    var timeRange = [new Date("1992"), new Date("2022")]

    const svgZM = selection.selectAll('.svgGLP').data([null]);
    const svgZMEnter = svgZM.enter().append('svg')
    .attr('class', 'svgGLP')
    .attr('x',190)
    .attr('y', 60)
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .append("rect")
    .attr('x',190)
    .attr('y', 60)
    .attr("width", innerWidth)
    .attr("height", innerHeight)
    .style("fill", "none");

    svgZMEnter.merge(svgZM)
  
    const svgZ = d3.selectAll('.svgGLP');

    const gZ = svgZ.selectAll('.containerZ').data([null]);
    const gZEnter = gZ.enter().append('g')
    .attr('class', 'containerZ');
    
    const g = selection.selectAll('.container').data([null]);
    const gEnter = g.enter().append('g')
    .attr('class', 'container');

    gEnter.merge(g)
    .attr('transform', `translate(${190},${60})`);

    var xScale = d3.scaleTime().range([0, innerWidth])
    .domain([dateRange[0],dateRange[1]]);

    var yScale = d3.scaleLinear().range([innerHeight ,0])
    .domain([0, d3.max(dataPure, function(d){
        return d3.max(d.values, function(d){
            return d.value;
        })
    })])
    .nice();
    
    const yAxis = d3.axisLeft(yScale)
    .tickSize(-innerWidth)
    .tickPadding(10);

    const xAxis = d3.axisBottom(xScale)
    .ticks(10)
    .tickSize(-innerHeight)
    .tickPadding(10);
  
    const yAxisG = g.select('.yAxisLP');
    const yAxisGEnter = gEnter.append('g')
    .attr('class', 'yAxisLP');
    
    yAxisG.merge(yAxisGEnter)
    .call(yAxis)
    .selectAll('.domain')
    .style('stroke', '#b3aca7')

    const yAxisText = yAxisGEnter.append('text')
    .attr('class', 'axis-label')
    .attr('transform', `rotate(270)`)
    .attr('y', -70)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .merge(yAxisG.select('.axis-label'))
    .attr('x', -innerHeight/2)
    .text("Numer of Exoplanets");
   
    const xAxisG = g.select('.xAxisLP');
    const xAxisGEnter = gEnter.append('g')
    .attr('class', 'xAxisLP')
    .attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.merge(xAxisGEnter)
    .call(xAxis)
    .selectAll('.domain')
    .remove();

    const xAxisText = xAxisGEnter.append('text')
    .attr('class', 'axis-label')
    .attr('y', 50)
    .attr('fill', 'black')
    .attr('text-anchor', 'middle')
    .merge(xAxisG.select('.axis-label'))
    .attr('x', innerWidth/2)
    .text("Years");
   
    const titleG = g.select('.title');
    const titleGEnter = gEnter.append('g')
    .attr('class', 'titleLP')

    titleG.merge(titleGEnter)
    .selectAll('.domain')
    .remove();

    const titleGText = titleGEnter
    .append('text')
    .attr('class', 'title-label')
    .attr('fill', 'black')
    .attr('align', 'center')
    .attr('y', -10)
    .merge(titleG.select('.title-label'))
    .attr('x', innerWidth/2)
    .text('Exoplanets discoveries per year ('+ timeRange[0].getFullYear() +'-'+timeRange[1] +')');

    const lineGenerator = d3.line()
    .x(d => xScale(new Date(d.key)))
    .y(d => yScale(d.value))
    .curve(d3.curveBasis);

    const tooltipLine = g.merge(gEnter).append('line');

    let tipBox = g.merge(gEnter).append('rect')
    .attr('class', 'tipBox')
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .attr('opacity', 0)
    .on('mousemove', onTooltip)
    .on('mouseout', offTooltip);
    
    d3.selectAll('.tooltipLP').remove();
   
    var tooltip = d3.select(".transZ").append("div")
    .attr("class", "tooltipLP")
    .style("fill-opacity", 0);
    
    function offTooltip() {
        if (tooltip) tooltip.style('display', 'none');
        if (tooltipLine) tooltipLine.attr('stroke', 'none');
    }

    var bisectDate = d3.bisector(function(d) { 
       var yy = d.values;
        return yy.key; 
    }).left
      
    function onTooltip(event) {

        const year = Math.floor((xScale.invert(d3.pointer(event, tipBox.node())[0])) / 1) * 1;
        
        const yearP = new Date(year);
        const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
        const month = formatter.format(yearP);
        const xM = d3.pointer(event, tipBox.node())[0];
        const x2M = d3.pointer(event, tipBox.node())[0]+1;
        const yM = d3.pointer(event, tipBox.node())[1];
        const dataR = dataPure;
        
        const dataRR = dataR.filter(function (v) {
                
            return v.value = d3.max(v.values, function(d){
                if(d.key<yearP){
                    return d.value;
                }
            })
        });

        dataRR.sort((a,b) => (a.value < b.value) ? 1:(b.value < a.value) ? -1:0)

        tooltipLine.attr('stroke', '#f5f0e1')
            .attr('x1', xM )
            .attr('x2', x2M )
            .attr('y1', 0)
            .attr('y2', innerHeight);
        
        tooltip.html( "<b>" + month + "-" + yearP.getFullYear() +"<p>")
            .style('display', 'block')
            .style("left", (xM +200 ) + "px")
            .style("top", (event.pageY -45) + "px")
            .selectAll()
            .data(dataRR).enter()
            .append('div')
            .style('color', d => colorScale(d.key))
            .html(d => d.key +': ' + d.value
             );
    }
    var yScale2 = d3.scaleLinear().range([50 ,0])
    .domain([0, d3.max(dataPure, function(d){
        return d3.max(d.values, function(d){
            return d.value;
        })
    })])
    .nice();

    const svgB = d3
    .select('div#slider-range').selectAll('.svgTime').data([null]);
    const svgBEnter = svgB.enter().append('svg')
    .attr('class', 'svgTime')
    .attr('width', width)
    .attr('height', 120)
    .attr('transform', `translate(${width/4-90},${-30})`);

    svgBEnter.merge(svgB)

    var xScale2 = d3.scaleTime().range([0, innerWidth]);
    xScale2.domain(xScale.domain());

    const xAxis2 = d3.axisBottom(xScale)
    .ticks(10)
    .tickSize(-60)
    .tickPadding(10);

    const svgBT = d3.selectAll('.svgTime');
   
    const gT = svgBT.selectAll('.context').data([null]);
    const gTEnter = gT.enter().append("g")
    .attr("class", "context")
    .attr("transform", "translate(" +50+ "," +  20+ ")");

    const lineGenerator2 = d3.line()
    .x(d => xScale(new Date(d.key)))
    .y(d => yScale2(d.value))
    .curve(d3.curveBasis);

    const lines2 =  gTEnter.merge(gT).selectAll('.line-path2').data(dataPure);
    
    var linesL2 = lines2.enter().append('path')
    .merge(lines2)
    .attr('class', 'line-path2')
    .attr('d', d => lineGenerator2(d.values))
    .attr('stroke', d => colorScale(d.key));

    lines2.exit().remove();
    
    const xAxisG2 = gT.select('.xAxis2');
    const xAxisGEnter2 = gTEnter.append('g')
    .attr('class', 'xAxis2')
    .attr('transform', `translate(0,${50})`);
    
    xAxisG2.merge(xAxisGEnter2)
    .call(xAxis2)
    .selectAll('.domain')
    .remove();

    var brushg =  gT.merge(gTEnter).selectAll('.brush');

    var brushGEnter = brushg
      .enter().append("g")
      .merge(brushg)
      .attr("class", "brush");
    
    var context = svgBT.append("g")
    .attr("class", "context")

    var brush = d3.brushX()
    .extent([[0, 0], [innerWidth, 60]])
    .on("brush end", brushed);

    var zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [innerWidth, innerHeight]])
    .extent([[0, 0], [innerWidth, innerHeight]])
    .on("zoom", zoomed);

    var focus = g.append("g")
    .attr("class", "focus")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var brushg =  gT.merge(gTEnter).selectAll('.cell').data([null]);

    var brushGenter = brushg
    .enter().append("g")
    .merge(brushg)
    .attr("class", 'cell')
    .attr("transform",  "translate(0,-10)");

    const lines =  gZ.merge(gZEnter).selectAll('.line-path').data(dataPure);
    
    var linesL = lines.enter().append('path')
    .merge(lines)
    .attr('class', 'line-path')
    .attr('d', d => lineGenerator(d.values))
    .attr('stroke', d => colorScale(d.key))
    lines.exit().remove();

    brushGenter.call(brush)
    .call(brush.move, xScale.range());;

    function brushed(event) {
        if (event.sourceEvent && event.sourceEvent.type === "wheel") return; 
        if (event.sourceEvent && event.sourceEvent.type === "zoom") return; 
 
        var s = event.selection || xScale.range();
  
        xScale.domain(s.map( xScale2.invert,  xScale2));
        timeRange = xScale.domain()
      
        onTimeChange(timeRange)
        const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
        const month0 = formatter.format(timeRange[0]);
        const month1 = formatter.format(timeRange[1]);

        titleGText 
        .text('Exoplanets discoveries per year ('+ month0 +" "+ timeRange[0].getFullYear() +' to '+month1 +" "+timeRange[1].getFullYear() +')');
        
        lines.select(".line-path").attr("d", lineGenerator);
        focus.select(".xAxis").call(xAxis);

        xAxisG.merge(xAxisGEnter)
        .call(xAxis.scale(xScale))
        .selectAll('.domain')
        .remove();

        const lineGeneratorZ = d3.line()
        .x(d => xScale(new Date(d.key)))
        .y(d => yScale(d.value))
        .curve(d3.curveBasis);

        d3.selectAll(".line-path")
            .attr("d", d => lineGeneratorZ(d.values));
      }

    function zoomed(event) {
        if (event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
        if (event.sourceEvent && event.sourceEvent.type === "end") return;
        if (event.sourceEvent && event.sourceEvent.type !=="brush") {
     
             xScale.domain(event.transform.rescaleX(xScale2).domain());
             
             xAxisG.merge(xAxisGEnter)
             .call(xAxis.scale(xScale))
             .selectAll('.domain')
             .remove();
     
             const lineGeneratorZ = d3.line()
             .x(d => xScale(new Date(d.key)))
             .y(d => yScale(d.value))
             .curve(d3.curveBasis);
     
     
             d3.selectAll(".line-path")
                 .attr("d", d => lineGeneratorZ(d.values));

             gT.merge(gTEnter).select(".cell").call(brush.move, [xScale2(event.transform.rescaleX(xScale2).domain()[0]),xScale2(event.transform.rescaleX(xScale2).domain()[1])]); 
       } 
    }

    tipBox.call(zoom)
}