import {dropDown} from './dropDown'
import {scatterPlot} from './scatterPlotComp'
import {colorLegendSP} from './colorLegendSP'
//import {sliderRangeDate} from './app'
import {sliderR} from './sliderRange'
import {linePlot} from './linePlot'
import {colorLegend} from './colorLegend'
  
const svg = d3.select('#svgM')
 .attr('transform', `translate(${250},${0})`);;
const svgLP = d3.select('#svgLP');

const width = 1200;
const height = 800;

svg
.attr('width', width)
.attr('height', height);

let data;
let dataLP;
var dataL = [];
var dataP = [];
let xColumn = 'st_mass';
let xLabelColumn = 'Stellar Mass';
let yColumn = 'st_teff';
let yLabelColumn = 'Stellar Temperature';
const columns = ['Stellar Mass', 'Stellar Temperature', 'Stellar Radius', 'Stellar Luminosity', 'Planetary Mass', 'Planetary Radius', 'Orbital Period', 'Orbit Semi-Major Axis', 'Planet Density', 'Planet Temperature', 'BV'];
var methods = [];
let dateRange = [new Date("1992"), new Date ("2021")]; 
let dataFilter = [];
var xRange = [0, 3];
var yRange = [2000, 11000];
var gRangeX;
var gRangeY;
var sliderRangeX;
var sliderRangeY;
var sliderTime;
var xOff = -170;
var yOff = -250;
var xUnits = " (Solar Mass)"
var yUnits = " (K)"
var contD = 0;
var flag = 0;
var flagCol = 0;
var dataBuffer = [];
var dateRangeE = dateRange
var methodsF = []
//console.log(innerWidth)

var sliderWidth = 1920/4.5 -150;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

let menusCSS = document.querySelector("#menus");
menusCSS.style.left = `${(width- width/4 +700)/6+650}px`;
menusCSS.style.top = `10px`;

// let menus1CSS = document.querySelector("#graph");
// menus1CSS.style.left = `${(width- width/4 +700)/6}px`;

 d3.selectAll('#svgM')
.attr("transform", "translate(" +  900+ ", " +-780  + ")")

const onLegendChange = (methodsF) => {
    methods = methodsF;
    flag = 1;
    
    render();
    renderLP();
} 
var t = 0;
setTimeout(function(){
    t = 1
},1000);

const onTimeChange = (timeRange) => {
    dateRange = timeRange;
    flag = 1;
   
    if (t === 1){
        render();
    }
    
  
}


const onSliderChange = (sliderT) => {
    sliderTime = sliderT;
    
    sliderTime.on('onchange', val => {
            dateRange = sliderTime.value();
            dateRangeE = dateRange;
            
            flag = 1;
            render();
            renderLP();
        });  
}

const onXColumnClick = (column, label, slider, range, xOffset, units) => {
    xColumn = column;
    xLabelColumn = label;
    xRange = range;
    xOff = xOffset;
    xUnits = units
    sliderRangeX = slider;
    sliderRangeX.width(sliderWidth)
    .fill('#2196f3')
    .on('onchange', val => {
    //     sliderRangeX
    //     .min(d3.min(dataF, d => d[xColumn]))
    //     .max(d3.max(dataF, d => d[xColumn]))
    //     .ticks(0)
    //    ;
       // sleep(100);
        xRange = sliderRangeX.value();
        flag = 1;
        render();
    });
    gRangeX = d3
    .select('.sliderX')
    .append('g')
    //.attr('transform', `translate(${-xOff},10)`);

    // var gRangeXdef = d3
    // .select('div#slider-range')
    // .append('svg')
    // .attr('width', 900)
    // .attr('height', 100)
    // .attr('transform', 'translate(30,10)')
    // .attr('class', 'svgX')
    // .append('g')
    // .attr('transform', 'translate(180,10)');

    gRangeX.call(sliderRangeX)
    .append('text')
    .attr('width', '10px')
    .attr('height', '10px')
    .attr('transform', `translate(0,-18)`)
    .text(xLabelColumn + ":");

    flag = 0;
    flagCol = 0;

    render();
};
const onYColumnClick = (column, label, slider, range, xOffset, units) => {
    yColumn = column;
    yLabelColumn = label;
    yRange = range;
    yOff = xOffset;
    yUnits = units;
    sliderRangeY = slider;
    sliderRangeY
    .width(sliderWidth)
    .fill('#2196f3')
    .on('onchange', val => {
    //     sliderRangeX
    //     .min(d3.min(dataF, d => d[xColumn]))
    //     .max(d3.max(dataF, d => d[xColumn]))
    //     .ticks(0)
    //    ;
       // sleep(100);
        yRange = sliderRangeY.value();
        flag = 1;
        render();
    });
    gRangeY = d3
    .select('.sliderY')
    //.attr('transform', 'translate(700,-100)')
    .append('g')
  //  .attr('transform', `translate(${-yOff},20)`)

    gRangeY.call(sliderRangeY)
    .append('text')
    .attr('width', '10px')
    .attr('height', '10px')
    .attr('transform', `translate(0,-18)`)
    .text(yLabelColumn + ":");

    flag = 0;
    flagCol = 1;
    render();
}

const colorScale = d3.scaleOrdinal()
  .domain(methods)
  .range(['#f27777', '#d577f2',
   '#77d3f2','#777ff2',
  '#f2d977', '#77f2bb',
  '#c1eb73', '#eb83c8',
  '#edb861', "#18ab42"
 ]);

const colorScaleLP =  d3.scaleOrdinal()
    .domain(["Radial Velocity", 
        "Microlensing", "Transit", "Imaging", "Pulsar Timing", 
    "Transit Timing Variations"])
    .range(['#f27777', '#d577f2',
   '#77d3f2','#777ff2',
  '#f2d977', '#77f2bb',
  '#c1eb73', '#eb83c8',
  '#edb861'
 ]);


//  //END SLIDER 1

//SLIDER 2
var sliderRangeXdef = d3
.sliderBottom()
.min(0)
.max(2.8)
.width(sliderWidth)
.height(80)
.ticks(8)
.default([0, 2.8])
.fill('#2196f3')
.on('onchange', val => {
    //     sliderRangeX
    //     .min(d3.min(dataF, d => d[xColumn]))
    //     .max(d3.max(dataF, d => d[xColumn]))
    //     .ticks(0)
    //    ;
       // sleep(100);
    xRange = sliderRangeXdef.value();
    flag = 1;
    render();
});

var gRangeXdef = d3
.select('#svgM')
//.attr('width', innerWidth)
//.attr('height', innerWidth/20)
.append('g')
.attr('class', 'sliderX')
.attr('transform', `translate(${90},${height-150})`);

gRangeXdef.call(sliderRangeXdef);

gRangeXdef
.append('text')
.attr('class', 'text-sliderX')
.attr('width', '10px')
.attr('height', '10px')
.attr('transform', `translate(0,-18)`)
.text(xLabelColumn + ":");

//END SLIDER 2

//SLIDER 3
var sliderRangeYdef = d3
.sliderBottom()
.min(400)
.max(11000)
.width(sliderWidth)
.height(100)
.ticks(6)
.default([400, 11000])
.fill('#2196f3')
.on('onchange', val => {
    //     sliderRangeX
    //     .min(d3.min(dataF, d => d[xColumn]))
    //     .max(d3.max(dataF, d => d[xColumn]))
    //     .ticks(0)
    //    ;
       // sleep(100);
    yRange = sliderRangeYdef.value();
    flag = 1;
    render();
});

var gRangeYdef = d3
.select('#svgM')
//.attr('width', innerWidth)
//.attr('height', innerWidth/20)
.append('g')
.attr('class', 'sliderY')
.attr('transform', `translate(${190+sliderWidth},${height-150})`);

gRangeYdef.call(sliderRangeYdef);

gRangeYdef
.append('text')
.attr('class', 'text-sliderY')
.attr('width', '10px')
.attr('height', '10px')
.attr('transform', `translate(0,-18)`)
.text(yLabelColumn + ":");
//END SLIDER 3

// var gRange = d3
// .select('div#slider-range')
// .append('svg')
// .attr('class', 'svgTime')
// .attr('width', width)
// .attr('height', 100)
// .attr('transform', `translate(${width/4-90},8)`)
// .append('g')
// .attr('transform', `translate(${width/4},8)`);
// d3.select('#slider-range')
// .call(sliderR, {
//     width,
//     onSliderTime: onSliderChange
   
//     }
// ); 

const render = () => {

    // var mainscreenURL = "676.jpg";
    // svg.select(".mainScreen").transition().attr("height",0).remove();

    // svg.append("image")
    // .on('load', function() {
    //     alert('loaded');
    // })
    // .attr("xlink:href", mainscreenURL)
     

    // dataFilter.push({type: xColumn,name: NaN},
    //     {type: yColumn,name: NaN});
    //console.log(methods)
    var dataM = data.filter(
        
        v => methods.includes(v.discoverymethod)
    );

 

    if(dataM.length == 0) {
        dataM = data;
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
    //console.log(flag)
 
    const dataF = dataFX.filter(function (v) {
        if ((isNaN(v[xColumn]) || isNaN(v[yColumn])) && flag ==0) {
          v.sizeP = 0;
           return v
        }
        else {
            if (v[xColumn] < xRange[1] && v[xColumn] > xRange[0]) {
                if (v[yColumn] < yRange[1] && v[yColumn] > yRange[0]) {
                    v.sizeP = 0;
                    return v
                }
            }
            
            if (flag == 0) {return v}
    
         }
    });
   // console.log(dataFX)
    

    const dataF11 = dataF.filter(function (v) {
        if (isNaN(v[xColumn]) || isNaN(v[yColumn])) {
            return v.sizeP = 0;
        }
        else{return v.sizeP = 4.5}
        }
    );
   // console.log(dataF)

   // console.log(dataF)

    // function compare( a, b ) {
    //     if ( a.discoverymethod < b.discoverymethod ){
    //        return methods.indexOf(a) - methods.indexOf(b);
    //     }
    //     if ( a.discoverymethod > b.discoverymethod ){
    //       return methods.indexOf(a) - methods.indexOf(b);
    //     }
    //     return 0;
    //   }

    // function compareX( a, b ) {
    //     if ( a[xColumn] < b[xColumn] ){
    //     return -1;
    //     }
    //     if ( a[xColumn] > b[xColumn] ){
    //     return 1;
    //     }
    //     return 0;
    // }

    // function compareY( a, b ) {
    //     if ( a[yColumn] < b[yColumn] ){
    //     return -1;
    //     }
    //     if ( a[yColumn] > b[yColumn] ){
    //     return 1;
    //     }
    //     return 0;
    // }

    // if(flagCol == 0) {
    //     dataF.sort( compareX );
    // }
    // if(flagCol == 1) {
    //     dataF.sort( compareY );
    // }
      
  //  dataF.sort( compare );
    
  
    var dataPush= [];
   //  console.log(dataBuffer)
    // console.log(dataF[1].pl_name)
    // console.log(dataBuffer[1].pl_name)
    // console.log(dataF[1].pl_name === dataBuffer[1].pl_name)

    // if(dataBuffer.length !== 0) {
    //     if (true) {
     
    //         for(var i = 0, len = dataF.length; i < len; i++){
    //             if (dataBuffer.some(e => e.pl_name === dataF[i].pl_name)) {
                       
    //             }
    //             else { 
    //                 console.log("spl");
    //                 dataF.splice(i,1);
    //                // i = i-1;
    //             }
    
              
    //         }
    //     }
    //   //  console.log(dataPush)

    //     console.log(dataF)
    // }
    
  

    d3.select('#x_menu')
    .call(dropDown, {
        options: columns,
        onOptionClick: onXColumnClick,
        selectedOption: xLabelColumn,
        axis: "x",
        data: dataF,
       
        }
    ); 

    d3.select('#y_menu')
    .call(dropDown, {
        options: columns,
        onOptionClick: onYColumnClick,
        selectedOption: yLabelColumn,
        axis: "y",
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
        margin: { top:70, right: 180, bottom: 250, left:370},
        width,
        height,
        xUnits,
        yUnits,
        flag,
        dateRange: dateRange,
        colorScale: colorScale,
        colorValue: d => d.discoverymethod,
        data: dataF,
        data2: dataBuffer
   });

   const gLegendEnter = svg.append('g')
   .attr('class', 'legend');

   const gLegend = svg.selectAll('.legend').data([null]);

   gLegendEnter
   .attr('transform', `translate(${ width- width/4 -140},${height/8 - 20})`)
   .merge(gLegendEnter)
   .call(colorLegendSP, {
       colorScale,
       circleRadius: 8,
       spacing: 26,
       textOffset: 20,
       onLegendChange: onLegendChange,
       methodsF
   });

   gLegend.exit().remove();

   dataBuffer = dataF;

   flag = 0;

   

};

const widthLP = d3.select('#svgLP').attr('width');
const heightLP = d3.select('#svgLP').attr('height');

const renderLP = () => {

    const dataFM = dataLP;
    var data =[]
    if (methods.length == 0){
       
        data = dataFM;
    }
    else{
        data = dataFM.filter(
        
            v => methods.includes(v.discoverymethod)
        );
    }
   
 
 
    data.sort(function(a,b){
        return a.disc_pubdate - b.disc_pubdate;
    })
    //console.log(data);

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

    //console.log(data)
    var nest = d3.nest()
    .key(function(d) { return d.discoverymethod; })
    .key(function(d) { return d.disc_pubdate; })
    .rollup(function(values) { return +values.length; })
    .entries(data);

    const dataTest = nest;
   // console.log(dataTest)
    for(var i = 0, len = nest.length; i < nest.length; i++){
        var tt = nest[i].values;
        var acum = 0;
        for(var c = 0, len = tt.length; c < len; c++) {
            tt[c].key = new Date(tt[c].key);
            acum += tt[c].value;
            tt[c].value = acum;
        }
    }

   
    for(var i = 0, len = nest.length; i < len; i++){
        acum += nest[i].value;
        nest[i].value = acum;
    }
    //console.log(nest)
    const dataRR = nest.filter(function (v) {
            var tt = v.values;
             var aa = tt.filter( function(d) {
                if (d.key < dateRange[1] && d.key > dateRange[0]) {
                    return d
                }
            })
           
            return v.values=aa;

    });

    dataL = nest;
   // console.log(nest)

    svgLP.call(linePlot, {
        title: 'Exoplanets Discoveries',
       // xValue: d => d[xColumn],
        xLabel: 'Year',
        //xColName: xColumn,
        //yValue: d => d[yColumn],
        yLabel: 'Total number of exoplanets discovered',
        //yColName: yColumn,
        margin: { top:70, right: 10, bottom: 100, left:200},
        width: widthLP,
        height: heightLP,
        //xUnits,
        //yUnits,
        dateRange: dateRange,
        colorScale,
       // colorValue: d => d.discoverymethod,
        data: dataRR,
        dataP: dataRR,
        onTimeChange: onTimeChange
        
   });

   

   const gLegendEnterLP = svgLP.append('g')
   .attr('class', 'legendLP');

   const gLegendLP = svgLP.selectAll('.legendLP').data([null]);

   gLegendEnterLP
   .attr('transform', `translate(${160},${100 })`)
   .merge(gLegendEnterLP)
   .call(colorLegend, {
       colorScale,
       circleRadius: 16,
       spacing: 24,
       textOffset: 18,
       onLegendChange: onLegendChange,
      
   });
  
   gLegendLP.exit().remove();
    
}
//ExoplanetsConfirmed.csv
d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/ExoplanetsConfirmed.csv').then(loadedData => {
   
    loadedData.forEach(clearFunction);

    function clearFunction(i,n) {
        for(var k in i){
            if (i[k] === ""){
                i[k] = "no";
            };
        }
    };

    loadedData.forEach(d => { 

        d.pl_bmasse = +d.pl_bmasse;
        d.pl_rade = +d.pl_rade;
        d.st_mass = +d.st_mass;
        d.st_teff = +d.st_teff;
        d.st_rad = +d.st_rad;
        d.st_lum = +d.st_lum;
        d.pl_orbper = +d.pl_orbper;
        d.pl_orbsmax = +d.pl_orbsmax;
        d.pl_dens = +d.pl_dens;
        d.pl_eqt = +d.pl_eqt;
        d.disc_pubdate = new Date(d.disc_pubdate);

        d.st_bv = (0.021*(Math.sqrt(729*d.st_teff**2+52900000000)-58*d.st_teff+230000))/d.st_teff;
    });
   // console.log(loadedData);

    var nest = d3.nest()
    .key(function(d) { return d.discoverymethod; })
    .entries(loadedData);
    

    var test = []
    var a = 0;
    for(var i = 0, len=nest.length; i<len; i++){
        
        if(nest[i].key !== "Astrometry") {
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

    data = loadedData;

  render();
  
});

d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/ExoplanetsComp.csv').then(loadedDataLP => {
//     let dataC = data.filter(d => d.disc_pubdate !== "" );
//    // let dataC2 = data.filter(d => d.pl_bmasse !== "" );
//     let dataC3 = dataC.filter(d => d.pl_rade !== "" );
//     let dataF = dataC3.filter(d => d.st_teff !== "" );

    loadedDataLP.forEach(d => { 

        d.pl_bmasse = +d.pl_bmasse;
        d.pl_rade = +d.pl_rade;
        d.st_mass = +d.st_mass;
        d.st_teff = +d.st_teff;
        d.disc_year = +d.disc_year;
        d.disc_pubdate = new Date(d.disc_pubdate);

    });
    // var loadedData2LP = loadedDataLP.filter(
        
    //     v => methods.includes(v.discoverymethod)
    // );


    dataLP = loadedDataLP;
 
   
   
   renderLP();
});


