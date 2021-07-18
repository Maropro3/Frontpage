
import {colorLegend} from './colorLegend'
import {scatterPlotS} from './scatterStars'
import {colorSlider} from './colorSlider'
import {treemap} from './treemap'

d3.selectAll('#menus')
.style('top', '560px')

var widthS = 1000,
    heightS = 860,
    paddingS = 100,
    offsetS = 260,
    flagChangeL = 0;
var dataSt = [];
var dataSt2 = [];
var dataJ = [];
var dropSelect ="Star Colour (B-V) Range"
var svgS = d3.select(".transZ").append("svg")
  .attr('class', 'svgS')
  .attr("width", 1520)
  .attr("height", 1000)
  .attr("transform", "translate(" + paddingS*2  + "," + -160+ ")")

var rr = Float32Array.from({ length: 1000 }, d3.randomNormal(0.55, 0.85));

const scale = d3.scaleSequentialQuantile(d3.interpolateRdYlBu); 
const interpolator = scale.interpolator(); 
const mirror = t => interpolator(1 - t); 

var scale2 = scale.interpolator(mirror); 

var sss = scale2.domain(rr)

var xLreAux = [];
const pointNum = 36;
const pointNum2 = 200;
const xDomain = 0.42;
var pp, xTemp, yTemp;

for(let i = -12; i<=pointNum2; i++){
    xTemp = xDomain / pointNum * i;
    yTemp =  1.42437  -2.32118*xTemp +9.58316*xTemp**2 -36.71320*xTemp**3  +54.05569*xTemp**4  -37.56820*xTemp**5 + 12.45696 *xTemp**6  -1.59237*xTemp**7//+0.3812 *xTemp**6
    pp = {x:xTemp,y:yTemp}
    xLreAux.push(pp)
}

var xLre = xLreAux

d3.selectAll('#toggleS')
.style('right', '1200')
.attr("transform", "translate(1000,1000)")

d3.select("#habButton")
.on("click",onHabChange)

d3.select("#habButton2")
.on("click",onHabChange2)

function onHabChange(){

    if(flagChangeL === 0){
        d3.selectAll('.rectP').style('visibility', 'hidden')
        flagChangeL = 1;
    }
    else{
      d3.selectAll('.rectP').style('visibility', 'visible')
      flagChangeL = 0;
    }
}

function onHabChange2(){

  if(flagChangeL === 0){
      d3.selectAll('.line-pathS').style('visibility', 'hidden')
      flagChangeL = 1;
  }
  else{
    d3.selectAll('.line-pathS').style('visibility', 'visible')
    flagChangeL = 0;
  }
}

const renderS = () =>{

    dataJ = dataSt.concat(dataSt2)
    var nest1= d3.nest()
    .key(d => d.st_spectype)
    .entries(dataSt2)

    const gLegendEnter = svgS.append('g')
    .attr('class', 'legend');

    const gLegend = svgS.selectAll('.legend').data([null]);

    gLegendEnter
    .attr('transform', `translate(${ 300},${heightS })`)
    .merge(gLegendEnter)
    .call(colorSlider, {
        colorScale: sss,
        circleRadius: 10,
        spacing: 30,
        textOffset: 20,
        label: dropSelect,
    });

    gLegend.exit().remove();

    svgS.call(scatterPlotS, {
      title: `Hertzsprung–Russell diagram`,
      xValue: d => d.st_bv,
      xLabel: "Colour(B-V)",
      x2Value: d => d.st_teff,
      x2Label: "Temperature (K)",
      xColName: "st_bv",
      yValue: d => d.st_lum,
      yLabel: "Luminosity (log(Solar))",
      yColName: "st_lum",
      margin: { top:70, right: 80, bottom: 150, left:70},
      widthS,
      heightS,
      colorScale:sss,
      colorValue: d => d.st_bv,
      data: dataSt,
      data2: dataSt2,
      xLre
   });

   d3.selectAll('.treemap').remove()

   const gTreeEnter = svgS.append('g')
   .attr('class', 'treemap');

   const gTree = svgS.selectAll('.treemap').data([null]);

   gTreeEnter
   .attr('transform', `translate(${ widthS+60},${heightS -440})`)
   .merge(gTreeEnter)
   .call(treemap, {
       dataJ,
       sss,
       gZEnter: gTreeEnter
   });

   gTree.exit().remove();

   const shapeP = d3.symbol().size(40)

   var plNames = ["Pre-Labeled Stars","Classified Stars"]
   const shape = d3.scaleOrdinal().domain(plNames).range(["M8.368283871884005,0A8.368283871884005,8.368283871884005,0,1,1,-8.368283871884005,0A8.368283871884005,8.368283871884005,0,1,1,8.368283871884005,0","M-9.9498743710662,-3.3166247903554L-3.3166247903554,-3.3166247903554L-3.3166247903554,-9.9498743710662L3.3166247903554,-9.9498743710662L3.3166247903554,-3.3166247903554L9.9498743710662,-3.3166247903554L9.9498743710662,3.3166247903554L3.3166247903554,3.3166247903554L3.3166247903554,9.9498743710662L-3.3166247903554,9.9498743710662L-3.3166247903554,3.3166247903554L-9.9498743710662,3.3166247903554Z"])

   const colorScaleSol = d3.scaleOrdinal()
   .domain(plNames)
   .range(["#edd79a"
   ]);

   d3.selectAll('.legendST').remove()

   const gLegendEnterS = svgS.append('g')
   .attr('class', 'legendST');

   const gLegendS = svgS.selectAll('.legendST').data([null]);

   gLegendEnterS
   .attr('transform', `translate(${ widthS +80},${ 206})`)
   .merge(gLegendEnterS)
   .call(colorLegend, {
       colorScale: colorScaleSol,
       shapes: shape,
       spacing: 30,
       textOffset: 20,
       label: plNames,
   });

   gLegendS.exit().remove();
}

d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/AAStarsComp.csv').then(dataS => {

    dataS.forEach(d => { 
      
        d.st_mass = +d.st_mass;
        d.st_teff = +d.st_teff;
        d.st_rad = +d.st_rad;
        d.st_lum = +d.st_lum;
        d.st_met = +d.st_met;
        d.st_logg = +d.st_logg;
        d.st_age = +d.st_age
        d.st_dens = +d.st_dens
        d.sy_gaiamag = +d.sy_gaiamag
        d.sy_bmag = +d.sy_bmag 
        d.sy_vmag = +d.sy_vmag 
    });

    dataS.forEach(d => { 

      d.st_lumN = 10**d.st_lum
      d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      if(d.st_teff > 11000 && d.st_teff < 21000 ){
        d.st_bv = (0.012*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      }
      if(d.st_teff > 21000 && d.st_teff < 30000){
        d.st_bv = (0.010*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      }
      if(d.st_teff > 30000){
        d.st_bv = (0.008*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      }
      if(d.st_teff < 2600){
        d.st_bv = (0.018*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      }
    });
    dataSt = dataS 
})


d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/NNStarsComp.csv').then(dataS2 => {

    dataS2.forEach(d => { 

        d.st_mass = +d.st_mass;
        d.st_teff = +d.st_teff;
        d.st_rad = +d.st_rad;
        d.st_lum = +d.st_lum;
        d.st_met = +d.st_met;
        d.st_logg = +d.st_logg;
        d.st_age = +d.st_age
        d.st_dens = +d.st_dens
        d.sy_gaiamag = +d.sy_gaiamag
        d.sy_bmag = +d.sy_bmag 
        d.sy_vmag = +d.sy_vmag 
        d.sub_class  = ""
        d.lum_class =  d.lum_class
    });

    dataS2.forEach(d => { 
     
      d.st_lumN = 10**d.st_lum
      d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      if(d.st_teff > 11000 && d.st_teff < 21000 ){
        d.st_bv = (0.012*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      }
      if(d.st_teff > 21000 && d.st_teff < 30000){
        d.st_bv = (0.008*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      }
      if(d.st_teff > 30000){
        d.st_bv = (0.010*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      }
      if(d.st_teff < 2600){
        d.st_bv = (0.018*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
      }
    });
    
    dataSt2 = dataS2
    renderS();
})






