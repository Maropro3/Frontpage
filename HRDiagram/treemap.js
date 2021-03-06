export const treemap = (selection, props) => {

    const { dataJ,sss, gZEnter} = props;

    const nested1 = d3.nest()
    .key(d => d.st_spectype)
    .entries(dataJ)
  
    const width = 360
    const height = 320

    const colorScalePl = d3.scaleOrdinal()
    .domain(['B A', 'F', 'G', 'K', 'M'])
    .range(['#bee1fa','#faf4be','#fffc61','#ffd061','#ff9b61']);

    const colorValue = d => d.id

    d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/barPlot.csv').then(data => {

    const tStars = [{"Spectral_Type":"B", "total":4 },
    {"Spectral_Type":"A", "total":19 },
    {"Spectral_Type":"F", "total":94 },
    {"Spectral_Type":"G", "total":239 },
    {"Spectral_Type":"K", "total":380 },
    {"Spectral_Type":"M", "total":2403 }]

    var subgroups = data.columns.slice(1)

    const groups = data.map(d => (d.Spectral_Type))

    const x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
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
    (data)

    var colorRange = []

    stackedData.forEach(d => {
        if (d.key === "Labeled"){
            d.forEach(e =>{
                e.data.colorK = d.key
                colorRange.push(e.data.Spectral_Type)
            })
        }
        else{
            d.forEach(e =>{
                e.data.colorK = d.key
                colorRange.push(e.data.Spectral_Type)
            })
        }
    });
   
    const color = d3.scaleOrdinal()
    .domain(colorRange)
    .range(['#5e94ff','#bee1fa','#faf4be','#fffc61','#ffd061','#ff9b61'])

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
            .style("opacity", 1)
        
        if(subgroupName === "Labeled"){
            d3.selectAll('.circleG')
            .style('fill',function(d){
              if(d.st_spectype !==tolSpect ){
                return "grey"
              }
              else{
                return  sss(d => d.cluster)
              }
            })
            .style('opacity',function(d){
                if(d.st_spectype !==tolSpect ){
                  return 0.2
                }
                else{
                  return  1
                }
              })

              d3.selectAll('.rectP')
              .style("fill", "grey")
              .style('opacity', 0.025)
        }

        if(subgroupName === "Unlabeled"){
            d3.selectAll('.rectP')
            .style('fill',function(d){
              if(d.st_spectype !==tolSpect ){
                return "grey"
              }
              else{
                return  sss(d => d.cluster)
              }
            })
            .style('opacity',function(d){
                if(d.st_spectype !==tolSpect ){
                  return 0.02
                }
                else{
                  return  1
                }
              })

           
              d3.selectAll('.circleG')
              .style("fill", "grey")
              .style('opacity', 0.2)
        } 
            
      }
      const mousemove = function(event, d) {
        var xM = d3.pointer(event, gZEnter.node())[0]
        var  yM = d3.pointer(event, gZEnter.node())[1]
        var offTY = 0;

        if(window.innerWidth<1900){
            offTY = -66
        }

        tooltip.style("left", (xM+1110) + "px")
        .style("top", (yM+650+offTY) + "px")
        .transition()
            .duration(200) 
            .style("fill-opacity", .9) 
            .style('display','block'); 
      }

      const mouseleave = function(event, d) {
        tooltip
          .style("opacity", 0)

          d3.selectAll('.circleG')
            .style('fill',function(d){
           
                return  sss(d => d.cluster)
            })
            .style('opacity',1)

            d3.selectAll('.rectP')
            .style('fill',function(d){
           
                return  sss(d => d.cluster)
            })
            .style('opacity',1)
      }
    
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
            else{
                return "#b53333"
            }
        })
        .attr("stroke",  d => color(d.data.Spectral_Type))
        .attr('stroke-width', '1')
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

  const mouseover2 = function(event, d) {

    var tolSpect = d.Spectral_Type;
    d3.selectAll('.circleG')
    .style('fill',function(d){
      if(d.st_spectype !==tolSpect ){
        return "grey"
      }
      else{
        return  sss(d => d.cluster)
      }
    })
    .style('opacity',function(d){
        if(d.st_spectype !==tolSpect ){
          return 0.2
        }
        else{
          return  1
        }
      })
  
    d3.selectAll('.rectP')
    .style('fill',function(d){
      if(d.st_spectype !==tolSpect ){
        return "grey"
      }
      else{
        return  sss(d => d.cluster)
      }
    })
    .style('opacity',function(d){
        if(d.st_spectype !==tolSpect ){
          return 0.02
        }
        else{
          return  1
        }
    })


    var color2 = color(d.Spectral_Type);
    tooltip
        .html( "<span style='color:" + color2 + ";'>"+"Spectral Type: "+ d.Spectral_Type+"</span>" +"</br>"+
        "% of total Main Sequence stars: "+  Math.round((d.total/3144*100+ Number.EPSILON)*100)/100 +"%" )
        .style("opacity", 1)      
  }

  const mousemove2 = function(event, d) {

    var xM = d3.pointer(event, gZEnter.node())[0]
    var  yM = d3.pointer(event, gZEnter.node())[1]
  
    var offTY = 0;

    if(window.innerWidth<1900){
        offTY = -66
    }
    tooltip.style("left", (xM+1126) + "px")
    .style("top", (yM+700+offTY) + "px")
    .transition()
    .duration(200) 
    .style("fill-opacity", .9) 
    .style('display','block'); 
  }

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
  .on("mouseleave", mouseleave)
  })
}