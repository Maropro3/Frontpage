import {dropDown} from './dropDown'
import {scatterPlot} from './scatterPlotComp'
import {linePlot} from './linePlot'
import {colorLegend} from './colorLegend'
  
const svg = d3.select('#svgM')
.attr('transform', `translate(${290},${0})`);;
const svgLP = d3.select('#svgLP');

const width = 1200;
const height = 800;

svg
.attr('width', width)
.attr('height', height);

let lastKnownScrollPosition = 0;
var pagY = 0;
let ticking = false;
var up = 0;

function doSomething(scrollPos) {

    if (scrollPos< -150){
    up = 1

        window.scrollTo(0,150)
        up = 0
    }
}

document.addEventListener('scroll', function(e) {
    lastKnownScrollPosition = window.scrollY;
    pagY = window.screenY
    var yy = document.body.getBoundingClientRect().y

    lastKnownScrollPosition = (document.body.getBoundingClientRect()).top;

    if( lastKnownScrollPosition < -150){
    }
    ticking = true;
    }
);

let data;
let dataLP;
var dataL = [];
var dataP = [];
let xColumn = 'st_mass';
let xLabelColumn = 'Stellar Mass';
let yColumn = 'st_teff';
let yLabelColumn = 'Stellar Temperature';
const columns = ['Stellar Mass', 'Stellar Temperature', 'Stellar Radius', 'Stellar Luminosity', 'Planetary Mass', 'Planetary Radius', 'Orbital Period', 'Orbit Semi-Major Axis', 'Planet Density', 'Planet Temperature'];
var methods = [];
let dateRange = [new Date("1989"), new Date ("2021")]; 
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

var sliderWidth = 1920/4.5 -130;

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

let menusCSS = document.querySelector("#menus");
menusCSS.style.left = `${(width- width/4 +1260)/6+650}px`;
menusCSS.style.top = `10px`;

 d3.selectAll('#svgM')
.attr("transform", "translate(" +  920+ ", " +-780  + ")")

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
        xRange = sliderRangeX.value();
        flag = 1;
        render();
    });
    gRangeX = d3
    .select('.sliderX')
    .append('g')
 
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
        yRange = sliderRangeY.value();
        flag = 1;
        render();
    });
    gRangeY = d3
    .select('.sliderY')
    .append('g')

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
    xRange = sliderRangeXdef.value();
    flag = 1;
    render();
});

var gRangeXdef = d3
.select('#svgM')
.append('g')
.attr('class', 'sliderX')
.attr('transform', `translate(${90+40},${height-150})`);

gRangeXdef.call(sliderRangeXdef);

gRangeXdef
.append('text')
.attr('class', 'text-sliderX')
.attr('width', '10px')
.attr('height', '10px')
.attr('transform', `translate(0,-18)`)
.text(xLabelColumn + ":");

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
    yRange = sliderRangeYdef.value();
    flag = 1;
    render();
});

var gRangeYdef = d3
.select('#svgM')
.append('g')
.attr('class', 'sliderY')
.attr('transform', `translate(${190+sliderWidth+40},${height-150})`);

gRangeYdef.call(sliderRangeYdef);

gRangeYdef
.append('text')
.attr('class', 'text-sliderY')
.attr('width', '10px')
.attr('height', '10px')
.attr('transform', `translate(0,-18)`)
.text(yLabelColumn + ":");

const render = () => {

    var dataM = data.filter(
        
        v => methods.includes(v.discoverymethod)
    );

    if(dataM.length == 0) {
        dataM = data;
    }

    const dataFX = dataM.filter(function (v) {
            if (v.disc_pubdate < dateRange[1] && v.disc_pubdate > dateRange[0]) {
                return v
            }
    });
 
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
    
    const dataF11 = dataF.filter(function (v) {
        if (isNaN(v[xColumn]) || isNaN(v[yColumn])) {
            return v.sizeP = 0;
        }
        else{return v.sizeP = 3.5}
        }
    );

    var dataPush= [];

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
        margin: { top:70, right: 120, bottom: 250, left:370},
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

    var nest = d3.nest()
    .key(function(d) { return d.discoverymethod; })
    .key(function(d) { return d.disc_pubdate; })
    .rollup(function(values) { return +values.length; })
    .entries(data);

    const dataTest = nest;

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

    svgLP.call(linePlot, {
        title: 'Exoplanets Discoveries',
        xLabel: 'Year',
        yLabel: 'Total number of exoplanets discovered',
        margin: { top:70, right: 0, bottom: 100, left:200},
        width: widthLP,
        height: heightLP,
        dateRange: dateRange,
        colorScale,
        data: dataRR,
        dataP: dataRR,
        onTimeChange: onTimeChange
        
   });

   const gLegendEnterLP = svgLP.append('g')
   .attr('class', 'legendLP');

   const gLegendLP = svgLP.selectAll('.legendLP').data([null]);

   gLegendEnterLP
   .attr('transform', `translate(${200},${100 })`)
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

    data = loadedData;

    render();
  
});

d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/ExoplanetsComp.csv').then(loadedDataLP => {

    loadedDataLP.forEach(d => { 

        d.pl_bmasse = +d.pl_bmasse;
        d.pl_rade = +d.pl_rade;
        d.st_mass = +d.st_mass;
        d.st_teff = +d.st_teff;
        d.disc_year = +d.disc_year;
        d.disc_pubdate = new Date(d.disc_pubdate);

    });

    dataLP = loadedDataLP;
 
   renderLP();
});


