import {dropDown} from './dropDown'
import {scatterPlot} from './scatterPlotComp'
import {colorLegend} from './colorLegend'
import {colorLegendSol} from './colorLegendS'
import {planetLegend} from './planetLegend'
  
const svg = d3.select('#svgM')
 .attr('transform', `translate(${250},${0})`);;


const width = 1600;
const height = 800;

svg
.attr('width', width)
.attr('height', height);


let data;
let xColumn = 'ESI_in';
let xLabelColumn = 'Interior ESI';
let yColumn = 'ESI_ext';
let yLabelColumn = 'Exterior ESI';
let dropSelect = 'ESI';
let cfill = 'ESI_t';
const columns = ['ESI', 'CDHS'];
var methods = [];
var planetTypes = [];
let dateRange = [new Date("1990"), new Date ("2021")]; 
let dataFilter = [];
var xRange = [0, 3];
var yRange = [2000, 11000];
var gRangeX;
var gRangeY;
var sliderRangeX;
var sliderRangeY;
var xOff = -170;
var yOff = -250;
var xUnits = " "
var yUnits = " "
var contD = 0;
var flag = 0;
var flagCol = 0;
var dataBuffer = [];
var sliderWidth = innerWidth/4.5 -50;
var filterHab = 0;
var flagChangeL = 1;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

let menusCSS = document.querySelector("#menus");
menusCSS.style.left = `${(width- width/4 +1100)/6}px`;
menusCSS.style.top = `10px`;

let switchCSS = document.querySelector(".switchH");
//menusCSS.style.left = `${(width- width/4 +800)/6}px`;
switchCSS.style.top = `10px`;

d3.select("#habButton")
.on("click",onHabChange)

function onHabChange(){
    flagChangeL = 0;

    if(filterHab === 0){
        filterHab = 1
        d3.selectAll('.textLines').style('visibility', 'hidden')
    }
    else{
        filterHab = 0
    }
  
    flag = 1;
    render();
    if(filterHab === 1){
       
        d3.selectAll('.textLines').style('visibility', 'hidden')
    }
    flagChangeL = 1;
    
}

const onLegendChange = (methodsF) => {
    methods = methodsF;
    flag = 1;
    render();
    
}

const onLegendPLChange = (methodsF) => {
    flagChangeL = 0;
    planetTypes = methodsF;
    flag = 1;
    render();
    d3.selectAll('.textLines').style('visibility', 'hidden')
    flagChangeL = 1;
}

const onXColumnClick = (x, y, xlabel, ylabel, sel,fill,units) => {
    xColumn = x;
    yColumn = y;
    xLabelColumn = xlabel;
    yLabelColumn = ylabel;
    cfill = fill
    xUnits = units
    dropSelect = sel
  

    flag = 0;
    flagCol = 0;

    render();
};


// const colorScale = d3.scaleOrdinal()
//   .domain(methods)
//   .range(['#f27777',  '#77d3f2',
//   '#d577f2','#777ff2',
//   '#f2d977', '#77f2bb',
//   '#c1eb73', '#eb83c8',
//   '#edb861'
//  ]);




//   ["Pulsar Timing", "Radial Velocity", 
//   "Transit", "Microlensing", 
//   "Imaging", "Eclipse Timing Variations", 
//   "Transit Timing Variations", "Orbital Brightness Modulation", 
//   "Disk Kinematics"]

// ['#e3c91e', '#FF0000', 
//   '#60a9e4','#00FF00',
//   '#8000FF', '#FF00BF',
//   '#FF8000', '#0000FF',
//   '#005704']



const render = () => {

    const dataSol = [
        {pl_name: "Earth", ESI_in: 1, ESI_ext: 1, ESI_t: 1, cdhs_in:1 , cdhs_sur: 1, cdhs_t: 1, inHZD: "in",pl_type: "Terrestial" },
        {pl_name: "Mars", ESI_in: 0.82, ESI_ext: 0.6, ESI_t: 0.7, cdhs_in:0.5815 , cdhs_sur: 0.763, cdhs_t: 0.583, inHZD: "in",pl_type: "Terrestial"},
        {pl_name: "Mercury", ESI_in: 0.84, ESI_ext:0.4, ESI_t: 0.6, cdhs_in:0.46 , cdhs_sur: 1.274, cdhs_t: 0.468,inHZD: "under",pl_type: "Terrestial"},
        {pl_name: "The Moon", ESI_in: 0.67, ESI_ext: 0.46, ESI_t: 0.56, cdhs_in:0.333 , cdhs_sur: 0.6896, cdhs_t: 0.336, inHZD:"in",pl_type: "Terrestial Moon"},
        {pl_name: "Venus", ESI_in: 0.98, ESI_ext: 0.2, ESI_t: 0.44, cdhs_in:0.95 , cdhs_sur: 2.089, cdhs_t: 0.961, inHZD: "in",pl_type: "Terrestial"},
        {pl_name: "Jupiter", ESI_in: 0.36, ESI_ext: 0.34, ESI_t: 0.29, cdhs_in:5.89 , cdhs_sur: 0.709, cdhs_t: 5.838, inHZD: "over",pl_type: "Gas Giant"},
        {pl_name: "Saturn", ESI_in: 0.28, ESI_ext: 0.2, ESI_t: 0.25, cdhs_in:4.75, cdhs_sur: 0.6096, cdhs_t: 4.708, inHZD:"over",pl_type: "Gas Giant"},
    ]
    var hzdFilter = ["in"]
    var colorScale = d3.scaleSequential(d3.interpolateWarm)
    .domain(d3.extent(data, d => d[cfill]));

    var dataM2 = []
    if(filterHab == 1){
        
        dataM2 = data.filter(
        
            v => hzdFilter.includes(v.inHZD)
        );
    }
    else{
       
        dataM2 = data;
    }
    var dataM1 = [];
 
    dataM1 = dataM2.filter(
        
        v => planetTypes.includes(v.pl_type)
    );
   
    var dataM = dataM1.filter(
        
        v => methods.includes(v.discoverymethod)
    );
   
    if(dataM.length == 0) {
        dataM = dataM2;
    }
   
    // const dataF1 = dataM.filter( v =>
    //         !Number.isNaN(v[yColumn]));
    
    // const dataF2 = dataF1.filter( v =>
    //         !Number.isNaN(v[xColumn]));
    
    const dataFX = dataM.filter(function (v) {
            if (v.disc_pubdate < dateRange[1] && v.disc_pubdate > dateRange[0]) {
                return v
            }
    });

   
   // console.log(flag)
  
    // const dataF = dataFX.filter(function (v) {
    //     if ((isNaN(v[xColumn]) || isNaN(v[yColumn])) && flag ==0) {
    //       v.sizeP = 0;
    //        return v
    //     }
    //     else {
    //         if (v[xColumn] < xRange[1] && v[xColumn] > xRange[0]) {
    //             if (v[yColumn] < yRange[1] && v[yColumn] > yRange[0]) {
    //                 v.sizeP = 0;
    //                 return v
    //             }
    //         }
            
    //         if (flag == 0) {return v}
    
    //      }
    // });
   // console.log(dataFX)
   var dataF = dataFX
  
  // console.log(dataF)
    const dataF11 = dataF.filter(function (v) {
        if (isNaN(v[xColumn]) || isNaN(v[yColumn])) {
            return v.sizeP = 0;
        }
        else{return v.sizeP = 4.5}
        }
    );
 
    

    var dataPush= [];
    
     
    if (cfill === 'cdhs_t') {
        
            colorScale = d3.scaleSequential(d3.interpolateWarm)
            .domain(d3.extent(data, d => d[cfill]).reverse());
   
      
     
    }
    

    var fillLabel;
   // var colorScale;
   
        if (cfill === 'ESI_t') {
            if(flagChangeL == 1){
                colorScale = d3.scaleSequential(d3.interpolateWarm)
                .domain(d3.extent(dataF, d => d[cfill]));
            }
          
            fillLabel = "Total ESI"
        }
    
        if (cfill === 'cdhs_t') {
            if(flagChangeL == 1){
                colorScale = d3.scaleSequential(d3.interpolateWarm)
                .domain(d3.extent(dataF, d => d[cfill]).reverse());
            }
          
            fillLabel = "Total CDHS"
        }
    
        if (cfill === 'hzd') {
            if(flagChangeL == 1){
             colorScale = d3.scaleSequential(d3.interpolateWarm)
            .domain(d3.extent(dataF, d => d[cfill]).reverse());
            }
            fillLabel = "Total CDHS"
        }
    

   
    d3.select('#h_menu')
    .call(dropDown, {
        options: columns,
        onOptionClick: onXColumnClick,
        selectedOption: dropSelect,
        data: dataF,
       
        }
    ); 

  
   svg.call(scatterPlot, {
        title: `${yLabelColumn}/${xLabelColumn} distribution`,
        xValue: d => d[xColumn],
        xLabel: xLabelColumn,
        xColName: xColumn,
        yValue: d => d[yColumn],
        yLabel: yLabelColumn,
        yColName: yColumn,
        cfill,
        margin: { top:70, right: 80, bottom: 150, left:180},
        width,
        height,
        xUnits,
        yUnits,
        flag,
        dateRange: dateRange,
        colorScale: colorScale,
        colorValue: d => d[cfill],
        data: dataF,
        dataSol,
        fillLabel,
        flagChangeL
   });

  d3.selectAll('.legend').remove()

   const gLegendEnter = svg.append('g')
   .attr('class', 'legend');

   const gLegend = svg.selectAll('.legend').data([null]);

   gLegendEnter
   .attr('transform', `translate(${ width- width/4 -90},${height/8 - 15 })`)
   .merge(gLegendEnter)
   .call(colorLegend, {
       colorScale,
       circleRadius: 10,
       spacing: 30,
       textOffset: 20,
       label: dropSelect,
       onLegendChange: onLegendChange,
   });

   gLegend.exit().remove();

   var plNames = dataSol.map(d => d.pl_name)
   const shape = d3.scaleOrdinal(dataSol.map(d => d.pl_name), d3.symbols.map(s => d3.symbol().size(220).type(s)()))
   const colorScaleSol = d3.scaleOrdinal()
   .domain(plNames)
   .range(['#4adeff',  '#f7543b',
   '#b3acab','#d2b0ff',
   '#aaf2a2', '#ff3636',
   '#fcee90', '#eb83c8',
   '#edb861'
   ]);
   
    
   //
   d3.selectAll('.legendSol').remove()

   const gLegendEnterS = svg.append('g')
   .attr('class', 'legendSol');

   const gLegendS = svg.selectAll('.legendSol').data([null]);

   gLegendEnterS
   .attr('transform', `translate(${ width- width/4 -90},${height/8 + 345 })`)
   .merge(gLegendEnterS)
   .call(colorLegendSol, {
       colorScale: colorScaleSol,
       shapes: shape,
       spacing: 30,
       textOffset: 20,
       label: plNames,
       onLegendChange: onLegendChange,
   });

   gLegendS.exit().remove();

    const nested1 = d3.nest().key(d => d.pl_type)
    .entries(dataF);

   var plTypes = ["Terrestial", "Super-Earth", "Neptune-Like", "Gas Giant", "Super-Jupiter"]
   
   //const shape = d3.scaleOrdinal(dataSol.map(d => d.pl_name), d3.symbols.map(s => d3.symbol().size(220).type(s)()))
//    const colorScalePl = d3.scaleOrdinal()
//    .domain(plTypes)
//    .range(['#44ebe2','#48eb36',
//    '#4e51ed', '#edcd4e','#eb635b'
//    ]);
   
const colorScalePl = d3.scaleOrdinal()
.domain(plTypes)
.range(['#2196F3'
]);
   //
  // d3.selectAll('.legendPl').remove()

   const gLegendEnterPl = svg.append('g')
   .attr('class', 'legendPl');

   const gLegendPl = svg.selectAll('.legendPl').data([null]);

   gLegendEnterPl
   .attr('transform', `translate(${ width/4 -220},${height-30 })`)
   .merge(gLegendEnterPl)
   .call(planetLegend, {
       colorScale: colorScalePl,
       circleRadius: 10,
       spacing: 160,
       textOffset: 20,
       label: plTypes,
       onLegendChange: onLegendPLChange,
   });

   gLegendPl.exit().remove();
//
//    const gLegendEnter = svg.append('g')
//    .attr('class', 'legend');

//    const gLegend = svg.selectAll('.legend').data([null]);

//    gLegendEnter
//    .attr('transform', `translate(${ width- width/4 -190},${height/8 + 15 })`)
//    .merge(gLegendEnter)
//    .call(colorLegendSP, {
//        colorScale,
//        circleRadius: 10,
//        spacing: 30,
//        textOffset: 20,
//        onLegendChange: onLegendChange,
//        methodsF
//    });

//    gLegend.exit().remove();

   dataBuffer = dataF;

   flag = 0;

   

};
//ExoplanetsHab.csv'
d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/ExoplanetsCompClean.csv').then(loadedData => {
   
    loadedData.forEach(clearFunction);

    function clearFunction(i,n) {
        for(var k in i){
            if (i[k] === ""){
                i[k] = "no";
            };
        }
    };

    var wR = 0.57
    var wD = 1.07
    var wV = 0.70
    var wT = 5.58

    var alpha = 0.8;
    var beta = 0.1;
    var gamma = 0.8;
    var lambda = 0.1;

    

    loadedData.forEach(d => { 

        d.pl_bmasse = +d.pl_bmasse;
        d.pl_rade = +d.pl_rade;
        d.st_mass = +d.st_mass;
        d.st_teff = +d.st_teff;
        d.st_rad = +d.st_rad;
        d.st_lum = +d.st_lum;
        d.pl_orbper = +d.pl_orbper;
        d.pl_orbeccen = +d.pl_orbeccen
        d.pl_orbsmax = +d.pl_orbsmax;
        d.pl_dens = +d.pl_dens;
        d.pl_eqt = +d.pl_eqt;
        d.pl_dense = +d.pl_dens/5.51;
        d.pl_escv = +(Math.sqrt((2*6.674*(10**-11)*d.pl_bmasse*5.97237*(10**24))/(d.pl_rade*6371*(10**3))))/(11.186*(10**3))
        d.disc_pubdate = new Date(d.disc_pubdate);
        d.esiR = 1-Math.abs((1-d.pl_rade)/(1+d.pl_rade)) 
        d.esiD = 1-Math.abs((1-d.pl_dense)/(1+d.pl_dense)) 
        d.esiV = 1-Math.abs((1-d.pl_escv)/(1+d.pl_escv)) 
        d.esiT = 1-Math.abs((288-d.pl_eqt)/(288+d.pl_eqt))  
        d.cdhs_in = (d.pl_rade**alpha)*(d.pl_dense**beta)
        d.cdhs_sur = ((d.pl_eqt/288)**gamma)*(d.pl_escv**lambda)
        d.habI = Math.sqrt(10**d.st_lum)*(0.72-2.761*(10**-5)*(d.st_teff-5700)-3.809*(10**-9)*(d.st_teff-5700)**2)
        d.habO = Math.sqrt(10**d.st_lum)*(1.77-1.378*(10**-4)*(d.st_teff-5700)-1.428*(10**-9)*(d.st_teff-5700)**2)
       
    });

    loadedData.forEach(d => {
        d.ESI_in = Math.sqrt((d.esiR**wR)*(d.esiD**wD))
        d.ESI_ext = Math.sqrt((d.esiV**wV)*(d.esiT**wT))
        d.ESI_t = Math.sqrt(d.ESI_ext*d.ESI_in)
        d.cdhs_t = d.cdhs_in*0.99+d.cdhs_sur*0.01
      

        d.hzd = (2*d.pl_orbsmax-d.habO-d.habI)/(d.habO-d.habI)
        if(d.hzd > 1) {
            d.inHZD = "over"
        }
        else if (d.hzd < -1){
            d.inHZD = "under"
        }
        else {
            d.inHZD = "in"
        }
    })
  //  console.log(loadedData);

    // var nestR = d3.nest()
    // .key(function(d) { return d.esiT; })
    // .entries(loadedData);

    // console.log(d3.max(loadedData, d => d.pl_eqt))
    // console.log(d3.min(loadedData,d => d.pl_eqt))


    var nest = d3.nest()
    .key(function(d) { return d.discoverymethod; })
    .entries(loadedData);
    

    var test = []
    var a = 0;
    for(var i = 0, len=nest.length; i<len; i++){
        
        if(nest[i].key !== "Astrometry" && nest[i].key !== "Eclipse Timing Variations") {
            test[a] = nest[i].key;
           a = a+1;
        }
        
    }

   // console.log(nest)

    methods = test;


    for(var i = 0, len = loadedData.length; i < len-4; i++){

        if (Object.prototype.toString.call(loadedData[i].disc_pubdate) === "[object Date]"){
            if (isNaN(loadedData[i].disc_pubdate.getTime())) {  
                loadedData.splice(i,1);
              } 
        }
    }
 

    loadedData.sort(function(a,b){
        return a.disc_pubdate - b.disc_pubdate;
    })


    // dataFilter.push({type: xColumn,name: NaN},
    //     {type: yColumn,name: NaN});
    
    // const dataF1 = loadedData.filter( v =>
    //         !Number.isNaN(v[yColumn]));
    
    // const dataF2 = dataF1.filter( v =>
    //         !Number.isNaN(v[xColumn]));
    
    // const dataF = loadedData.filter(function (v) {
    //         if (v.disc_pubdate < dateRange[1] && v.disc_pubdate > dateRange[0]) {
    //             return v
    //         }
    // });
    //console.log(dataF);
  //  console.log(loadedData);



    loadedData.forEach(d => {
     
        if(d.esiT > 0.8) {
            d.bigESI = "yes"
        }
        else {
            d.bigESI= "no"
        }

        if(d.pl_rade<1.25){
            d.pl_type = "Terrestial"
            d.pl_tphc = "Non-Habitable"
            if(173 <= d.pl_eqt && d.pl_eqt<223){
                d.pl_tphc = "Hypopsychroplanet"
            }
            if(223 <= d.pl_eqt && d.pl_eqt<273){
                d.pl_tphc = "Psychroplanet"
            }
            if(273 <= d.pl_eqt && d.pl_eqt<323){
                d.pl_tphc = "Mesoplanet"
            }
            if(323 <= d.pl_eqt && d.pl_eqt<373){
                d.pl_tphc = "Thermoplanet"
            }
            if(373 <= d.pl_eqt && d.pl_eqt<423){
                d.pl_tphc = "Hyperthermoplanet"
            }
           
        }
        if(1.25 <= d.pl_rade && d.pl_rade<2){
            d.pl_type = "Super-Earth"
            d.pl_tphc = "Non-Habitable"
            if(173 <= d.pl_eqt && d.pl_eqt<223){
                d.pl_tphc = "Hypopsychroplanet"
            }
            if(223 <= d.pl_eqt && d.pl_eqt<273){
                d.pl_tphc = "Psychroplanet"
            }
            if(273 <= d.pl_eqt && d.pl_eqt<323){
                d.pl_tphc = "Mesoplanet"
            }
            if(323 <= d.pl_eqt && d.pl_eqt<373){
                d.pl_tphc = "Thermoplanet"
            }
            if(373 <= d.pl_eqt && d.pl_eqt<423){
                d.pl_tphc = "Hyperthermoplanet"
            }
          
        }
       if(2 <= d.pl_rade && 6 > d.pl_rade){
            if(d.pl_dens > 2.5) {
                d.pl_type = "Super-Earth"
                d.pl_tphc = "Non-Habitable"
                if(173 <= d.pl_eqt && d.pl_eqt<223){
                    d.pl_tphc = "Hypopsychroplanet"
                }
                if(223 <= d.pl_eqt && d.pl_eqt<273){
                    d.pl_tphc = "Psychroplanet"
                }
                if(273 <= d.pl_eqt && d.pl_eqt<323){
                    d.pl_tphc = "Mesoplanet"
                }
                if(323 <= d.pl_eqt && d.pl_eqt<373){
                    d.pl_tphc = "Thermoplanet"
                }
                if(373 <= d.pl_eqt && d.pl_eqt<423){
                    d.pl_tphc = "Hyperthermoplanet"
                }
            }
            else{
                d.pl_type = "Neptune-Like"
            }
        }
        if(6 <= d.pl_rade && 15 > d.pl_rade){
            d.pl_type = "Gas Giant"
        }
        if(15 < d.pl_rade ){
            d.pl_type = "Super-Jupiter"
        }
      
    })


    data = loadedData;
   
    var nest1 = d3.nest()
    .key(d => d.inHZD)
    .key(d => d.bigESI)
    .entries(loadedData)

    var nest2 = d3.nest()
    .key(d => d.pl_type)
    .key(d => d.inHZD)
    .entries(loadedData)

    var nest3 = d3.nest()
    .key(d => d.pl_type)
    .key(d => d.pl_tphc)
    .entries(loadedData)

    var nest4 = d3.nest()
    .key(d => d.pl_tphc)
    .key(d => d.inHZD)
    .entries(loadedData)

   
    // console.log(nest4)
  render();
  
});


