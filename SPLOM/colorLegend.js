export const colorLegend = (selection, props) => {
  const { colorScale, circleRadius, spacing, textOffset, onLegendChange, nClusters, selectedData} = props;

  var contClick = 0;
  var methodsF = [];
  let select = selection.selectAll('select').data([null]);
  
  var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("fill-opacity", 0)
  .style('visibility', 'hidden');

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
    else if(methodsF.length === nClusters.length) {
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
  
      d3.selectAll('.gLegend')
      .attr('opacity', 1)
      methodsF =nClusters;
      onLegendChange(methodsF);
    
    //contClick = 0;
   
  };

  const onMouseover = function(event, d){

    d3.select(this).selectAll('circle')
    .attr("stroke", "white")
    .attr('stroke-width', '2');

    var numC = d3.select(this).selectAll('text').text()

    d3.selectAll('.circleSP')
    .style('fill',function(d){
      if(d.cluster !== numC){
        return "grey"
      }
      else{
        return  colorScale(d.cluster)
      }
    })

    var colL;
    var circleCol;
  // ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]

    switch(numC){
        case "0":
            circleCol = "cluster0";
            colL = "#1b9e77"
            break;
         case "1":
            circleCol = "cluster1";
            colL = "#d95f02"
            break;
        case "2":
            circleCol = "cluster2";
            colL = "#7570b3"
            break;
        case "3":
            circleCol = "cluster3";
            colL = "#e7298a"
            break;
        case "4":
            circleCol = "cluster4";
            colL = "#66a61e"
            break;
    }

    d3.selectAll('.cluster0')
    .style("opacity", "0.1")
    .style("fill", "grey")
    d3.selectAll('.cluster1')
    .style("opacity", "0.1")
    .style("fill", "grey")
    d3.selectAll('.cluster2')
    .style("opacity", "0.1")
    .style("fill", "grey")
    d3.selectAll('.cluster3')
    .style("opacity", "0.1")
    .style("fill", "grey")
    d3.selectAll('.cluster4')
    .style("opacity", "0.1")
    .style("fill", "grey")

    d3.selectAll('.'+circleCol)
    .style("opacity", "1")
    .style("fill", colL)

    tooltip
    .style('visibility', 'visible');

    //GM
     if (selectedData === 1){

      switch(numC){
        case "0":
          tooltip
          .html( "This cluster contains the planets with the highest temperatures and mass, as well as a high radius and average density." +"</br>"+"</br>"+
          "These planets also orbit close to their star and could be classified as dense gas giants or bigger Super-Eaths")
          .style("opacity", 1)
          break;
       case "1":
        tooltip
        .html( "Cluster 1 is strange as it contains the least amount of planets and its members are very spread in terms of their attributes." +"</br>"+"</br>"+
        "Its most relevant characteristics are its high radius and orbit")
        .style("opacity", 1)
          break;
      case "2":
        tooltip
      .html( "This cluster is the most compact across all attributes, with high mass, radius, temperature, but low density and orbital axis."+"</br>"+"</br>"+
      "The planets in this cluster are problably gas gigants or Neptune-Like")
      .style("opacity", 1)
          break;
      case "3":
        tooltip
        .html( "Cluster 3 has a very wide distribution across all atributes, usually concentrating in the middle ranges, specially in mass and radius" +"<br>"+"</br>"+
        "This could signify that this planets are either small Neptune-like gas planets or Super-Earths")
        .style("opacity", 1)
          break;
      case "4":
        tooltip
        .html( "Cluster 4 is composed of the densest planets with the lowest mass, radius, and orbits; evenly spread in terms of temperature." +"</br>"+ "</br>"+
        "Most likely these planets are terrestial planets like Earth or Venus")
        .style("opacity", 1)
          break;
      }
     }

     if (selectedData === 0){

      switch(numC){
        case "0":
          tooltip
          .html( "This cluster contains the planets with the highest temperatures and mass, as well as a high radius and average density." +"</br>"+"</br>"+
          "These planets also orbit close to their star and could be classified as dense gas giants or bigger Super-Eaths")
          .style("opacity", 1)
          break;
       case "1":

        tooltip
        .html( "Cluster 1 is composed of the densest planets with the lowest mass radius, and orbits; evenly spread in terms of temperature." +"</br>"+ "</br>"+
        "Most likely these planets are terrestial planets like Earth or Venus")
        .style("opacity", 1)
     
          break;
      case "2":
        tooltip
      .html( "This cluster is the most compact across all attributes, with high mass, radius, temperature, but the lowest density and orbital axis."+"</br>"+"</br>"+
      "The exoplanets in this cluster are problably gas gigants or Neptune-Like planets")
      .style("opacity", 1)
          break;
      case "3":
        tooltip
        .html( "Cluster 3 is formed with the lowest temperature and highest orbital axis values, and its quite widely spread acroos the other atributes" +"</br>"+"</br>"+
        "Its the smallest cluster, and it encompases the coldest and further away from their star planets")
        .style("opacity", 1)
          break;
      case "4":
        tooltip
        .html( "These exoplanets are clustered arround the mid ranges for every atribute. " +"<br>"+"</br>"+
        "This could signify that this planets are either small Neptune-Like gas planets or Super-Earths")
        .style("opacity", 1)
          break;
      }
     }
  //var color2 = color(d.data.Spectral_Type);

  if (selectedData === 2){

    switch(numC){
      case "0":
        tooltip
      .html( "Cluster 0 is formed with the lowest temperature and highest orbital axis values, as well as above average density and below average radius and mass" +"</br>"+"</br>"+
      "These exoplanets colder, orbiting far away from their star and are likely rocky Earth-Like or Super-Earth exoplanets")
      .style("opacity", 1)
    
        break;
     case "1":

      tooltip
      .html( "This cluster contains the planets with the highest temperatures and mass, as well as a high radius and average density." +"</br>"+"</br>"+
      "These planets also orbit close to their star and could be classified as dense gas giants or bigger Super-Eaths")
      .style("opacity", 1)
      
        break;
    case "2":

      tooltip
      .html( "Cluster 3 is composed of the densest planets with the lowest mass, radius, and orbital distance; as well as above average temperature." +"</br>"+ "</br>"+
      "Most likely these planets are terrestial planets like Earth or Venus")
      .style("opacity", 1)
     
    case "3":
      tooltip
      .html( "This cluster has exoplanets with high mass, radius and temperature, but with the lowest density and orbital axis."+"</br>"+"</br>"+
      "The exoplanets in this cluster are problably gas gigants or Neptune-Like planets")
      .style("opacity", 1)
          break;
     
        break;
    case "4":
      tooltip
      .html( "These exoplanets are clustered arround the mid ranges for every atribute. " +"<br>"+"</br>"+
      "This could signify that this planets are either small Neptune-Like gas planets or Super-Earths")
      .style("opacity", 1)
        break;
    }
   }
 

  }

  const onMouseout = function(event, d){

    d3.select(this).selectAll('circle')
    .attr("stroke", "none")
    .attr('stroke-width', '2');

    d3.selectAll('.circleSP')
    .style('fill',function(d){
      
        return  colorScale(d.cluster)
      
    })

    d3.selectAll('.cluster0')
    .style("opacity", "0.6")
    .style("fill", "#1b9e77")
    d3.selectAll('.cluster1')
    .style("opacity", "0.6")
    .style("fill", "#d95f02")
    d3.selectAll('.cluster2')
    .style("opacity", "0.6")
    .style("fill", "#7570b3")
    d3.selectAll('.cluster3')
    .style("opacity", "0.6")
    .style("fill", "#e7298a")
    d3.selectAll('.cluster4')
    .style("opacity", "0.6")
    .style("fill", "#66a61e")

    tooltip
    .style("opacity", 0)
    
  }

  const mousemove = function(event, d) {
    var offsetX = 0; 
    var offsetY = 0; 

   if(window.innerWidth<1728 && window.innerWidth>1534 ){
    offsetX = 55
    offsetY = 50
   }
   else if(window.innerWidth<1534 && window.innerWidth>1344){
    offsetX = 55*2
    offsetY = 50*2
   }
   else if(window.innerWidth<1344 && window.innerWidth>1152){
    offsetX = 55*3
    offsetY = 50*3
   }
   else if(window.innerWidth<1152 && window.innerWidth>900){
    offsetX = 55*4
    offsetY = 50*4
   }
    tooltip.style("left", (event.pageX-242+offsetX) + "px")
    .style("top", (event.pageY+offsetY) + "px")
    .transition()
        .duration(200) 
        .style("fill-opacity", .9) 
        .style('display','block'); 
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
  .on('mousemove', mousemove)
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
  .style('fill', 'white')
  .text(d => d);
}









    