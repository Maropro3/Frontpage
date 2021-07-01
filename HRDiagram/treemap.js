export const treemap = (selection, props) => {

    const { dataJ} = props;

    const nested1 = d3.nest()
    .key(d => d.st_spectype)
    .entries(dataJ)
    console.log(nested1)
    const width = 320
    const height = 320

    const colorScalePl = d3.scaleOrdinal()
    .domain(['B A', 'F', 'G', 'K', 'M'])
    .range(['#bee1fa','#faf4be','#fffc61','#ffd061','#ff9b61'
    ]);
    const colorValue = d => d.id
    d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/treemapData.csv').then(dataT => {
  
    
        var root = d3.stratify()
        .id(function(d) { return d.name; })   // Name of the entity (column name is name in csv)
        .parentId(function(d) { return d.parent; })   // Name of the parent (column name is parent in csv)
        (dataT);
        root.sum(function(d) { return +d.value })   // Compute the numeric value for each entity

        d3.treemap()
        .size([width, height])
        .padding(4)
        (root)
    
    console.log(root.leaves())


    selection
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", d => colorScalePl(colorValue(d)) );

      selection
      .selectAll("text")
      .data(root.leaves())
      .enter()
      .append("text")
        .attr("x", function(d){ return d.x0+4})    // +10 to adjust position (more right)
        .attr("y", function(d){ return d.y0+13})    // +20 to adjust position (lower)
        .text(function(d){ return d.data.name + " "+ "("+ d.data.value + ")"})
        .attr("font-size", "12.5px")
        .attr("fill", "black")
//   // Then d3.treemap computes the position of each element of the hierarchy
//   // The coordinates are added to the root object above
//   d3.treemap()
//     .size([width, height])
//     .padding(4)
//     (root)

    })










}