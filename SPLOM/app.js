
import {colorLegend} from './colorLegend'
import {dropDown} from './dropDown'


///SPLOM////

var width = 960,
    size = 240,
    padding = 40,
    offset = 310;

var x = d3.scaleLinear()
    .range([padding / 2, size - padding / 2]);

var y = d3.scaleLinear()
    .range([size - padding / 2, padding / 2]);

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(6);

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(6);

var svgL;
var svg;

svgL = d3.select(".transZ").append("svg")
  .attr('class', 'svgL')
  .attr("width", 1200)
  .attr("height", 80)
  .attr("transform", "translate(" + padding*2  + "," + padding * 2.2+ ")")

  svg = d3.select(".transZ").append("svg")
  .attr('class', 'svgSPLOM')
  .attr("width", size * 5 + padding+20)
  .attr("height", size * 5 + padding +100)
  .attr("transform", "translate(" + offset + "," + padding * 2 + ")")
  

var dataF = [];
var dataF0 = [];
var dataF1 = [];
var dataF2 = [];
var methods0 = [];
var methods1 = [];
var methods2 = [];
var methodsFF = ['0','1', '2', '3', '4', '5', '6', '7', '8'];

let dropSelect = 'Gaussian Mixture';
const columnsD = ['Gaussian Mixture', 'KMeans', 'Aglomerative'];

var color = d3.scaleOrdinal().range(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#ffcabd"])

var columns = [ 'pl_bmasse', 'pl_rade', 'pl_orbsmax', 'pl_eqt', 'pl_dens']
var labels = ['Planet Mass (Earth Mass)', 'Planet Radius (Earth Radius)', 'Orbital Period','Orbit Semi-Major Axis', 'Planet Temperature']
var dataF = [];

var  colorScale;

// let menusCSS = document.querySelector("#menus");
// menusCSS.style.left = `${(width- width/4 +800)/6}px`;
// menusCSS.style.top = `10px`;

const onLegendChange = (methodsF) => {
  methodsFF = methodsF;
  
  d3.selectAll('.container').remove()
  d3.selectAll('.cluster0').remove();
  d3.selectAll('.cluster1').remove();
  d3.selectAll('.cluster2').remove();
  d3.selectAll('.cluster3').remove();
  d3.selectAll('.cluster4').remove();
 // flag = 1;
 console.log(methodsF)
  render();
 
}

let selectedData = 1;


const onXColumnClick = (select, name) => {
  selectedData = select
//  d3.selectAll('.svgSPLOM').remove()
//  d3.selectAll('.svgL').remove()
d3.selectAll('.legend').remove()
d3.selectAll('.circleSP').remove()


    d3.selectAll('.cluster0').remove();
    d3.selectAll('.cluster1').remove();
    d3.selectAll('.cluster2').remove();
    d3.selectAll('.cluster3').remove();
    d3.selectAll('.cluster4').remove();

   

 // dataSelector()
 methodsFF = ['0','1', '2', '3', '4', '5', '6', '7', '8'];
 console.log("column")
    render();
};
d3.select('#menus')
.call(dropDown, {
    options: columnsD,
    onOptionClick: onXColumnClick,
    selectedOption: dropSelect,
   
    }

); 

//clusterKNNBIG.csv

    d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/clusterP_KNN.csv').then(data => {
        //console.log(data)
    
        data.forEach(clearFunction);

        function clearFunction(i,n) {
            for(var k in i){
                if (i[k] === ""){
                    i[k] = "no";
                };
            }
        };

        data.forEach(d => { 

            d.pl_bmasse = +d.pl_bmasse;
            d.pl_rade = +d.pl_rade;
            // d.st_mass = +d.st_mass;
            // d.st_teff = +d.st_teff;
            // d.st_rad = +d.st_rad;
            // d.st_lum = +d.st_lum;
           
            d.pl_orbsmax = +d.pl_orbsmax;
            d.pl_dens = +d.pl_dens;
            d.pl_eqt = +d.pl_eqt;
        // d.cluster = +d.cluster;
        // d.disc_pubdate = new Date(d.disc_pubdate);
        });
    // console.log(loadedData);

        var nest = d3.nest()
        .key(function(d) { return d.cluster; })
        .entries(data);
        
        var methodsD = []
        var a = 0;
        for(var i = 0, len=nest.length; i<len; i++){
            
            if(nest[i].key !== "Astrometry" && nest[i].key !== "Eclipse Timing Variations") {
                methodsD[a] = nest[i].key;
            a = a+1;
            }
            
        }
        methodsD.sort();
      
        methods0 = methodsD
    // methods = test;


        for(var i = 0, len = data.length; i < len-4; i++){

            if (Object.prototype.toString.call(data[i].disc_pubdate) === "[object Date]"){
                if (isNaN(data[i].disc_pubdate.getTime())) {  
                    data.splice(i,1);
                } 
            }
        }
    

        data.sort(function(a,b){
            return a.disc_pubdate - b.disc_pubdate;
        })
        dataF0 = data;

        var domainByTrait = {},
        traits = d3.keys(dataF[0]).filter(v => columns.includes(v)),
        n = traits.length;
        if(selectedData == 0){
            render()
          }
           
      
    
    
    });

    // clusterEM.csv

    d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/clusterP_GM.csv').then(data => {
       // console.log(data)
    
        data.forEach(clearFunction);

        function clearFunction(i,n) {
            for(var k in i){
                if (i[k] === ""){
                    i[k] = "no";
                };
            }
        };

        data.forEach(d => { 

            d.pl_bmasse = +d.pl_bmasse;
            d.pl_rade = +d.pl_rade;
            // d.st_mass = +d.st_mass;
            // d.st_teff = +d.st_teff;
            // d.st_rad = +d.st_rad;
            // d.st_lum = +d.st_lum;
            d.pl_orbper = +d.pl_orbper;
            d.pl_orbsmax = +d.pl_orbsmax;
            d.pl_dens = +d.pl_dens;
            d.pl_eqt = +d.pl_eqt;
        // d.cluster = +d.cluster;
        // d.disc_pubdate = new Date(d.disc_pubdate);
        });
    // console.log(loadedData);

        var nest = d3.nest()
        .key(function(d) { return d.cluster; })
        .entries(data);
        
        var methodsD = []
        var a = 0;
        for(var i = 0, len=nest.length; i<len; i++){
            
            if(nest[i].key !== "Astrometry" && nest[i].key !== "Eclipse Timing Variations") {
                methodsD[a] = nest[i].key;
            a = a+1;
            }
            
        }
        methodsD.sort();
       
        methods1 = methodsD
    // methods = test;


        for(var i = 0, len = data.length; i < len-4; i++){

            if (Object.prototype.toString.call(data[i].disc_pubdate) === "[object Date]"){
                if (isNaN(data[i].disc_pubdate.getTime())) {  
                    data.splice(i,1);
                } 
            }
        }
    

        data.sort(function(a,b){
            return a.disc_pubdate - b.disc_pubdate;
        })
        dataF1 = data;

        var domainByTrait = {},
        traits = d3.keys(dataF[0]).filter(v => columns.includes(v)),
        n = traits.length;
      
        if(selectedData == 1){
            render()
          }
           

    });

    d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/clusterP_AC.csv').then(data => {
       
    
        data.forEach(clearFunction);

        function clearFunction(i,n) {
            for(var k in i){
                if (i[k] === ""){
                    i[k] = "no";
                };
            }
        };

        data.forEach(d => { 

            d.pl_bmasse = +d.pl_bmasse;
            d.pl_rade = +d.pl_rade;
            // d.st_mass = +d.st_mass;
            // d.st_teff = +d.st_teff;
            // d.st_rad = +d.st_rad;
            // d.st_lum = +d.st_lum;
           
            d.pl_orbsmax = +d.pl_orbsmax;
            d.pl_dens = +d.pl_dens;
            d.pl_eqt = +d.pl_eqt;
        // d.cluster = +d.cluster;
        // d.disc_pubdate = new Date(d.disc_pubdate);
        });
    // console.log(loadedData);

        var nest = d3.nest()
        .key(function(d) { return d.cluster; })
        .entries(data);
        
        var methodsD = []
        var a = 0;
        for(var i = 0, len=nest.length; i<len; i++){
            
            if(nest[i].key !== "Astrometry" && nest[i].key !== "Eclipse Timing Variations") {
                methodsD[a] = nest[i].key;
            a = a+1;
            }
            
        }
        methodsD.sort();
      
        methods2 = methodsD
    // methods = test;


        for(var i = 0, len = data.length; i < len-4; i++){

            if (Object.prototype.toString.call(data[i].disc_pubdate) === "[object Date]"){
                if (isNaN(data[i].disc_pubdate.getTime())) {  
                    data.splice(i,1);
                } 
            }
        }
    

        data.sort(function(a,b){
            return a.disc_pubdate - b.disc_pubdate;
        })
        
        dataF2 = data;
   
        var domainByTrait = {},
        traits = d3.keys(dataF[0]).filter(v => columns.includes(v)),
        n = traits.length;

      if(selectedData == 2){
        render()
      }
       
        
    });

var dataTest = [];
    d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_doubleHist.csv", function(data) {
    dataTest  = data
})


const render = () => {
    var dataFF = [];
    var methodsAux = []
   
    switch(selectedData) {
        case 0:
             dataFF = dataF0.filter(
            
                v => methodsFF.includes(v.cluster)
        );
        methodsAux= methods0
        break;
        case 1:
             dataFF = dataF1.filter(
            
                v => methodsFF.includes(v.cluster)
        );
        methodsAux = methods1
        break;
        case 2:
            dataFF = dataF2.filter(
           
               v => methodsFF.includes(v.cluster)
       );
       methodsAux = methods2
       break;
    }
    // console.log(selectedData)
    // console.log(methodsFF)

  var domainByTrait = {},
  traits = d3.keys(dataFF[0]).filter(v => columns.includes(v)),
  n = traits.length;

  traits.forEach(function(trait) {
    domainByTrait[trait] = d3.extent(dataFF, function(d) { return d[trait]; });
  });

  
  colorScale = d3.scaleOrdinal()
  .domain(methodsAux)
  .range(["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#ede279","#a6761d","#ffcabd"])

  xAxis.tickSize(size * n);
  yAxis.tickSize(-size * n);

  var brush = d3.brush()
  .on("start", brushstart)
  .on("brush", brushmove)
  .on("end", brushend)
  .extent([[0,0],[size,size]]);


  
  const gLegendEnter = svgL.append('g')
      .attr('class', 'legend');
  
  const gLegend = svgL.selectAll('.legend').data([null]);

  gLegendEnter
  .attr('transform', `translate(${offset},${25})`)
  .merge(gLegendEnter)
  .call(colorLegend, {
      colorScale,
      circleRadius: 12,
      spacing: 40,
      textOffset: 3.5,
      onLegendChange: onLegendChange,
      nClusters: methodsAux,
      selectedData
  });

  gLegend.exit().remove();

  const g = svg.selectAll('.container').data([null]);
  const gEnter = g.enter().append('g')
    .attr('class', 'container')
    .attr("transform", "translate(" + padding  + "," + padding / 2 + ")");;
   
  gEnter.selectAll(".x.axis")
      .data(traits)
    .enter().append("g")
      .attr("class", "x axis")
      .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
      .each(function(d) { x.domain(domainByTrait[d]); d3.select(this).call(xAxis); });

  gEnter.selectAll(".y.axis")
      .data(traits)
    .enter().append("g")
      .attr("class", "y axis")
      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
      .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });


  // const cellG = g.select('.cell');
  // const cellGEnter = gEnter.append('g')
  // .attr('class', 'cell')
  
  // var cell = cellG.merge(cellGEnter)
  // .data(cross(traits, traits))
  // .enter().append("g")
  //   .attr("class", function(d) {return "cell" + d.i + d.j})
  //   .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
  //   .each(plot);

  // cell.selectAll('.domain')
  // .remove();
  
//   var cellG = g.selectAll('.cell');
//   var cellGEnter = gEnter.append('g')
//   .attr('class', 'xAxis')
//   .attr('transform', `translate(0,${innerHeight})`);

  var cellg =  g.merge(gEnter).selectAll('.cell').data(cross(traits, traits));

  var cell = cellg
    .enter().append("g")
    .merge(cellg)
      .attr("class", function(d) {return "cell" + d.i + d.j})
      .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
      .each(plot);

//   var cell = gEnter.selectAll(".cell")
//       .data(cross(traits, traits))
//     .enter().append("g")
//       .attr("class", function(d) {return "cell" + d.i + d.j})
//       .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
//       .each(plot);
  d3.selectAll('.textLabs').remove()
  // Titles for the diagonal.
  cell.filter(function(d) { return d.i === d.j; }).append("text")
  .attr('class', 'textLabs')
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(function(d) { switch(d.x){
        case 'pl_bmasse':
            return 'Planet Mass'
        case 'pl_rade':
            return 'Planet Radius'
        case 'pl_orbsmax':
            return 'Orbit Semi-Major Axis'
        case 'pl_eqt':
            return 'Planet Temperature'
        case 'pl_dens':
            return 'Planet Density'
      }});
 
  cell.call(brush);

var pp = cross(traits, traits);



function plot(p) {
 
    
    var cell = d3.select(this);

  

    x.domain(domainByTrait[p.x]);
    y.domain(domainByTrait[p.y]);

    

    cell.append("rect")
        .attr("class", "frame")
        .attr("x", padding / 2)
        .attr("y", padding / 2)
        .attr("width", size - padding)
        .attr("height", size - padding);

    const circles =  cell.merge(cell).selectAll('circle').data(dataFF);

    if(p.i === p.j){
        // console.log(dataFF .filter( function(d){return d.cluster === "0"} ))

        const y2 = d3.scaleLinear()
        .range([padding / 2, size - padding / 2])
        .domain([10,0]);

        var kde = kernelDensityEstimator(kernelEpanechnikov(0.1), x.ticks(100))
        var density1 =  kde( dataFF
            .filter( function(d){return d.cluster === "0"} )
            .map(function(d){  return d[p.x]; }) )

            // ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]
        var density2 =  kde( dataFF
            .filter( function(d){return d.cluster === "1"} )
            .map(function(d){  return d[p.x]; }) )

        var density3 =  kde( dataFF
            .filter( function(d){return d.cluster === "2"} )
            .map(function(d){  return d[p.x]; }) )

        var density4 =  kde( dataFF
                .filter( function(d){return d.cluster === "3"} )
                .map(function(d){  return d[p.x]; }) )

        var density5 =  kde( dataFF
            .filter( function(d){return d.cluster === "4"} )
            .map(function(d){  return d[p.x]; }) )

       if(methodsFF.includes("0")){
            cell.append("path")
            .attr("class", "cluster0")
            .datum(density1)
            .attr("fill", "#1b9e77")
            .attr("opacity", ".6")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d",  d3.area()
                .curve(d3.curveBasis)
                .x(function(d) { return x(d[0]); })
                .y1(function(d) { return y2(d[1]); })
                .y0(y2(0))
            )
            .on('mouseover', onMouseover)
            .on('mouseout', onMouseout);
       }
           
       
       if(methodsFF.includes("1")){
            cell.append("path")
            .attr("class", "cluster1")
            .datum(density2)
            .attr("fill", "#d95f02")
            .attr("opacity", ".6")
            .attr("stroke", "#000")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .attr("d",  d3.area()
                .curve(d3.curveBasis)
                .x(function(d) { return x(d[0]); })
                .y1(function(d) { return y2(d[1]); })
                .y0(y2(0))
            )
            .on('mouseover', onMouseover)
            .on('mouseout', onMouseout);

       }
        
       if(methodsFF.includes("2")){

        cell.append("path")
        .attr("class", "cluster2")
        .datum(density3)
        .attr("fill", "#7570b3")
        .attr("opacity", ".6")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.area()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y1(function(d) { return y2(d[1]); })
            .y0(y2(0))
        )
        .on('mouseover', onMouseover)
        .on('mouseout', onMouseout);

       }

       if(methodsFF.includes("3")){

        cell.append("path")
        .attr("class", "cluster3")
        .datum(density4)
        .attr("fill", "#e7298a")
        .attr("opacity", ".6")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.area()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y1(function(d) { return y2(d[1]); })
            .y0(y2(0))
        )
        .on('mouseover', onMouseover)
        .on('mouseout', onMouseout);

       }

       if(methodsFF.includes("4")){

        cell.append("path")
        .attr("class", "cluster4")
        .datum(density5)
        .attr("fill", "#66a61e")
        .attr("opacity", ".6")
        .attr("stroke", "black")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d",  d3.area()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y1(function(d) { return y2(d[1]); })
            .y0(y2(0))
        )
        .on('mouseover', onMouseover)
        .on('mouseout', onMouseout);

       }


      
          

        return;
    }

   circles
      .enter().append("circle")
        .merge(circles)
        .attr('class', 'circleSP')
        .attr("cx", function(d) { return x(d[p.x]); })
        .attr("cy", function(d) { return y(d[p.y]); })
        .attr("r",function(d) { 
            if (isNaN(x(d[p.x])) || isNaN(y(d[p.y])) ) {
                return 0;
            }
            else {
                return 3;
            }
        })
        .style("fill", function(d) { return colorScale(d.cluster); })
        .style("opacity", 0.9);
       
    d3.selectAll('.circleSP').exit().remove()
}
   
//     function brushstart(p) {
//     if (brushCell !== this) {
//       d3.select(brushCell).call(brush.move, null);
//       brushCell = this;
//       x.domain(domainByTrait[p.x]);
//       y.domain(domainByTrait[p.y]);
//     }
//   }
  
 
//   function brushmove(p) {
//     var e = d3.brushSelection(this);
//     //console.log(e[0])
//     svg.selectAll("circle").classed("hidden", function(d) {
//       return !e
//         ? false
//         : (
//           e[0][0] > x(+d[p.x]) || x(+d[p.x]) > e[1][0]
//           || e[0][1] > y(+d[p.y]) || y(+d[p.y]) > e[1][1]
//         );
//     });
//   }
//     function brushend() {
//     var e = d3.brushSelection(this);
//     if (e === null) svg.selectAll(".hidden").classed("hidden", false);
  
//     };
var brushCell;
var nn = 0;
  // Clear the previously-active brush, if any.
  function brushstart(p) {

//     d3.selectAll('.cluster0')
//     .style("opacity", "0.1")
//    .style("fill", "grey")
//     d3.selectAll('.cluster1')
//     .style("opacity", "0.1")
//      .style("fill", "grey")
//     d3.selectAll('.cluster2')
//     .style("opacity", "0.1")
//     .style("fill", "grey")
//     d3.selectAll('.cluster3')
//     .style("opacity", "0.1")
//     .style("fill", "grey")
//     d3.selectAll('.cluster4')
//     .style("opacity", "0.1")
//      .style("fill", "grey")
    if (brushCell !== this) {
        console.log(p)
      d3.select(brushCell).call(brush.move, null);
      brushCell = this;
      //console.log(d3.select(brushCell).attr("class"))
      
      switch(d3.select(brushCell).attr("class")) {
        case "cell00":
            nn = 0
            break;
        case"cell01":
            nn = 1
            break;
        case "cell02":
            nn = 2
            break;
        case"cell03":
            nn = 3
            break;
        case "cell04":
            nn = 4
            break;
        case "cell10":
            nn = 5
            break;
        case "cell11":
            nn = 6
            break;
        case "cell12":
            nn = 7
            break;
        case "cell13":
            nn = 8
            break;
        case "cell14":
            nn = 9
            break;
         case "cell20":
            nn = 10
            break;
        case "cell21":
            nn = 11
            break;
        case "cell22":
            nn = 12
            break;
        case "cell23":
            nn = 13
            break;
        case "cell24":
            nn = 14
            break;
        case "cell30":
            nn = 15
            break;
        case "cell31":
            nn = 16
            break;
        case "cell32":
            nn = 17
            break;

        case "cell33":
            nn = 18
            break;

        case "cell34":
            nn = 19
            break;
        case "cell40":
            nn = 20
            break;
        case "cell41":
            nn = 21
            break;
        case "cell42":
            nn = 22
            break;
        case "cell43":
            nn = 23
            break;
        case "cell44":
            nn = 24
            break;
  
                                      
      }
     x.domain(domainByTrait[pp[nn].x]);
     y.domain(domainByTrait[pp[nn].y]);
    }
  }

  // Highlight the selected circles.
  function brushmove(p) {
    var e = d3.brushSelection(this);
  
    cell.selectAll("circle").classed("hidden", function(d) {
       
      return !e
        ? false
        : (
          e[0][0] > x(+d[pp[nn].x]) || x(+d[pp[nn].x]) > e[1][0]
          || e[0][1] > y(+d[pp[nn].y]) || y(+d[pp[nn].y]) > e[1][1]
          || isNaN(x(+d[pp[nn].x])) || isNaN(y(+d[pp[nn].y]))
        );
    });
    // cell.selectAll("circle").classed("selected", function(d) {
       
    //     return !e
    //       ? false
    //       : (
    //         e[0][0] < x(+d[pp[nn].x]) || x(+d[pp[nn].x]) < e[1][0]
    //         || e[0][1] < y(+d[pp[nn].y]) || y(+d[pp[nn].y]) < e[1][1]
    //         || isNaN(x(+d[pp[nn].x])) || isNaN(y(+d[pp[nn].y]))
    //       );
    //   });
  }

  // If the brush is empty, select all circles.
  function brushend() {
    // d3.selectAll('.cluster0')
    // .style("opacity", "0.6")
    // .style("fill", "#1b9e77")
    // d3.selectAll('.cluster1')
    // .style("opacity", "0.6")
    // .style("fill", "#d95f02")
    // d3.selectAll('.cluster2')
    // .style("opacity", "0.6")
    // .style("fill", "#7570b3")
    // d3.selectAll('.cluster3')
    // .style("opacity", "0.6")
    // .style("fill", "#e7298a")
    // d3.selectAll('.cluster4')
    // .style("opacity", "0.6")
    // .style("fill", "#66a61e")
    var e = d3.brushSelection(this);
    if (e === null) cell.selectAll(".hidden").classed("hidden", false);
  }
  d3.selectAll('.cell00').select('.overlay').remove()
  d3.selectAll('.cell11').select('.overlay').remove()
  d3.selectAll('.cell22').select('.overlay').remove()
  d3.selectAll('.cell33').select('.overlay').remove()
  d3.selectAll('.cell44').select('.overlay').remove()

}

function cross(a, b) {
  var c = [], n = a.length, m = b.length, i, j;
  for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: b[i], i: i, y: a[j], j: j});
  return c;
}

function kernelDensityEstimator(kernel, X) {
    return function(V) {
      return X.map(function(x) {
        return [x, d3.mean(V, function(v) { return kernel(x - v); })];
      });
    };
  }
  function kernelEpanechnikov(k) {
    return function(v) {
      return Math.abs(v /= k) <= 1 ? 0.75* (1 - v * v) / k : 0;
    };
  }
  
  

  const onMouseover = function(event, d){

    var numC = d3.select(this).attr("class")
    var n = numC.toString();
    var colL;
    var circleCol;
  // ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]

    switch(numC){
        case "cluster0":
            circleCol = "0";
            colL = "#1b9e77"
            break;
         case "cluster1":
            circleCol = "1";
            colL = "#d95f02"
            break;
        case "cluster2":
            circleCol = "2";
            colL = "#7570b3"
            break;
        case "cluster3":
            circleCol = "3";
            colL = "#e7298a"
            break;
        case "cluster4":
            circleCol = "4";
            colL = "#66a61e"
            break;
    }

    console.log(circleCol)

    d3.selectAll('.circleSP')
    .style('fill',function(d){
      if(d.cluster !== circleCol){
        return "grey"
      }
      else{
        return  colorScale(d.cluster)
      }
    })

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

    d3.selectAll('.'+numC)
    .style("opacity", "1")
    .style("fill", colL)

    
  }

  const onMouseout = function(event, d){

    var colL

    d3.select(this).selectAll('circle')
    .attr("stroke", "none")
    .attr('stroke-width', '2');

    d3.selectAll('.circleSP')
    .style('fill',function(d){
        colL =  colorScale(d.cluster)
        // d3.selectAll('.mypath')
        // .style("opacity", "0.6")
        // .style("fill", colL)
        return  colorScale(d.cluster)
      
    })

      // ["#1b9e77","#d95f02","#7570b3","#e7298a","#66a61e","#e6ab02","#a6761d","#666666"]

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

   

    // d3.select(this)
    // .style("opacity", "1")
    // .style("fill", colL)

    
  }

