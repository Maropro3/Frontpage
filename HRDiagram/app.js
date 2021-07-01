
import {colorLegend} from './colorLegend'
import {scatterPlotS} from './scatterStars'
import {colorSlider} from './colorSlider'
import {treemap} from './treemap'
//import regression from 'regression';


// let menusCSS = document.querySelector("#menus");
// menusCSS.style.left = `${(width- width/4 +700)/6+650}px`;
// menusCSS.style.top = `10px`;

d3.selectAll('#menus')
.style('top', '1060px')

var widthS = 1000,
heightS = 860,
    paddingS = 100,
    offsetS = 260,
    flagChangeL = 0;
var dataSt = [];
var dataSt2 = [];
var dataJ = [];
var dropSelect ="Star Colour (B-V) Range"
var svgS = d3.select("body").append("svg")
  .attr('class', 'svgS')
  .attr("width", 1400)
  .attr("height", 1000)
  .attr("transform", "translate(" + paddingS*2  + "," + paddingS * 1.4+ ")")

var rr = Float32Array.from({ length: 1000 }, d3.randomNormal(0.55, 0.85));

const scale = d3.scaleSequentialQuantile(d3.interpolateRdYlBu); // same as t1
const interpolator = scale.interpolator(); // read its interpolator
const mirror = t => interpolator(1 - t); // creates a mirror image of the interpolator

var scale2 = scale.interpolator(mirror); // updates the scale’s interpolator

var sss = scale2.domain(rr)

d3.selectAll('#toggleS')
.style('right', '1200')
.attr("transform", "translate(1000,1000)")

d3.select("#habButton")
.on("click",onHabChange)

d3.select("#habButton2")
.on("click",onHabChange2)

function onHabChange(){
    //flagChangeL = 0;

    if(flagChangeL === 0){
        //filterHab = 1
        d3.selectAll('.rectP').style('visibility', 'hidden')
        flagChangeL = 1;
    
    }
    else{
      d3.selectAll('.rectP').style('visibility', 'visible')
      flagChangeL = 0;
    
    }
  
   // flag = 1;
    //renderS();
    // if(filterHab === 1){
       
    //     d3.selectAll('.textLines').style('visibility', 'hidden')
    // }
   
}

function onHabChange2(){
  //flagChangeL = 0;

  if(flagChangeL === 0){
      //filterHab = 1
      d3.selectAll('.line-pathS').style('visibility', 'hidden')
      flagChangeL = 1;
  
  }
  else{
    d3.selectAll('.line-pathS').style('visibility', 'visible')
    flagChangeL = 0;
  
  }

 // flag = 1;
  //renderS();
  // if(filterHab === 1){
     
  //     d3.selectAll('.textLines').style('visibility', 'hidden')
  // }
 
}
const renderS = () =>{

    dataJ = dataSt.concat(dataSt2)

  //  console.log(result)
  
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
        //flag,
       // dateRange: dateRange,
        colorScale:sss,
        colorValue: d => d.st_bv,
        data: dataSt,
        data2: dataSt2,
      

   });

   d3.selectAll('.legend').remove()

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
      // onLegendChange: onLegendChange,
   });

   gLegend.exit().remove();

   d3.selectAll('.treemap').remove()

   const gTreeEnter = svgS.append('g')
   .attr('class', 'treemap');

   const gTree = svgS.selectAll('.treemap').data([null]);

   gTreeEnter
   .attr('transform', `translate(${ widthS+60},${heightS -400})`)
   .merge(gTreeEnter)
   .call(treemap, {
       dataJ
      // onLegendChange: onLegendChange,
   });

   gTree.exit().remove();
}




d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/AAStars.csv').then(dataS => {

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
     
    //   if(d.sy_bmag == 0 || isNaN(d.sy_vmag)){
   
    //     d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
    //   }
    //   else{
    //     d.st_bv =  d.sy_bmag - d.sy_vmag 
    //   }
     
        d.st_lumN = 10**d.st_lum
      d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
  
     
    });

   

    dataSt = dataS

   
})


d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/NNStars.csv').then(dataS2 => {

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
        d.sub_class  = null
        d.lum_class = ""
    });

    dataS2.forEach(d => { 
     
    //   if(d.sy_bmag == 0 || isNaN(d.sy_vmag)){
   
    //     d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
    //   }
    //   else{
    //     d.st_bv =  d.sy_bmag - d.sy_vmag 
    //   }
     
        d.st_lumN = 10**d.st_lum
      d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
  
     
    });

   

    dataSt2 = dataS2

    renderS();
})






