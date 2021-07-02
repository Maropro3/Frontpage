export const treemap = (selection, props) => {

    const { dataJ} = props;

    const nested1 = d3.nest()
    .key(d => d.st_spectype)
    .entries(dataJ)
   // console.log(nested1)
    const width = 320
    const height = 320

    const colorScalePl = d3.scaleOrdinal()
    .domain(['B A', 'F', 'G', 'K', 'M'])
    .range(['#bee1fa','#faf4be','#fffc61','#ffd061','#ff9b61'
    ]);
    const colorValue = d => d.id


    d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/barPlot.csv').then(data => {



        var subgroups = data.columns.slice(1)

        const groups = data.map(d => (d.Spectral_Type))


        const x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.2])
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
            .style("opacity", 1)
            // .style("left", (event.pageX -95) + "px")
            // .style("top", (event.pageY -90) + "px")
            // .transition()
            //     .duration(200) 
            //     .style("fill-opacity", .9) 
            //     .style('display','block'); 
            
      }
      const mousemove = function(event, d) {
        tooltip.style("left", (event.pageX-62) + "px")
        .style("top", (event.pageY-50) + "px")
        .transition()
            .duration(200) 
            .style("fill-opacity", .9) 
            .style('display','block'); 
      }
      const mouseleave = function(event, d) {
        tooltip
          .style("opacity", 0)
      }
    
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
            else{
                return "grey"
            }
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)


      
        
    })
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










}