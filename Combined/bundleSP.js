(function (factory) {
   typeof define === 'function' && define.amd ? define(factory) :
   factory();
}((function () { 'use strict';

   const dropDown = (selection, props) => {
       const {
           options,
           onOptionClick,
           selectedOption,
           axis,
           data,
           
       } = props;

       let slider = d3.sliderBottom();
       let dataF = data;
       let range = [];
       let axisD = axis;
       let select = selection.selectAll('select').data([null]);
       let xOffset;
       let units = "";
       
       select = select.enter().append('select')
       .merge(select)
       .attr('id', 'drop')
       .on('change', function() {
           switch(this.value){
               case 'Stellar Mass':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
                
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
                 
                   }
                   slider
                   .min(d3.min(dataF, d => d['st_mass']))
                   .max(d3.max(dataF, d => d['st_mass']))
                   .ticks(8)
                   .default([d3.min(dataF, d => d['st_mass']), d3.max(dataF, d => d['st_mass'])]);
                   range = [d3.min(dataF, d => d['st_mass']), d3.max(dataF, d => d['st_mass'])];
                   xOffset = -170;
                   units = " (Solar Mass)";

                   onOptionClick('st_mass', this.value, slider, range, xOffset, units);
                   break;
               case 'Stellar Temperature':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
                  
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
                   
                   }
                   slider
                   .min(d3.min(dataF, d => d['st_teff']))
                   .max(d3.max(dataF, d => d['st_teff']))
                   .ticks(6)
                   .default([d3.min(dataF, d => d['st_teff']), d3.max(dataF, d => d['st_teff'])]);
                   range = [d3.min(dataF, d => d['st_teff']), d3.max(dataF, d => d['st_teff'])];
                   xOffset = -250;
                   units = " (K)";

                   onOptionClick('st_teff', this.value, slider, range, xOffset, units);
                   break;
               case 'Stellar Radius':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
                 
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
               
                   }
                   slider
                   .min(d3.min(dataF, d => d['st_rad']))
                   .max(d3.max(dataF, d => d['st_rad']))
                   .ticks(10)
                   .default([d3.min(dataF, d => d['st_rad']), d3.max(dataF, d => d['st_rad'])]);
                   range = [d3.min(dataF, d => d['st_rad']), d3.max(dataF, d => d['st_rad'])];
                   xOffset = -185;
                   units = " (Solar Radius)";

                   onOptionClick('st_rad', this.value, slider, range, xOffset, units);
                   break;
               case 'Stellar Luminosity':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
      
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
    
                   }
                   slider
                   .min(d3.min(dataF, d => d['st_lum']))
                   .max(d3.max(dataF, d => d['st_lum']))
                   .ticks(6)
                   .default([d3.min(dataF, d => d['st_lum']), d3.max(dataF, d => d['st_lum'])]);
                   range = [d3.min(dataF, d => d['st_lum']), d3.max(dataF, d => d['st_lum'])];
                   xOffset = -230;
                   units = " (log(Solar))";

                   onOptionClick('st_lum', this.value, slider, range, xOffset, units);
                   break;
               case 'Planetary Mass':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
            
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
             
                   }
                   slider
                   .min(d3.min(dataF, d => d['pl_bmasse']))
                   .max(d3.max(dataF, d => d['pl_bmasse']))
                   .ticks(6)
                   .default([d3.min(dataF, d => d['pl_bmasse']), d3.max(dataF, d => d['pl_bmasse'])]);
                   range = [d3.min(dataF, d => d['pl_bmasse']), d3.max(dataF, d => d['pl_bmasse'])];
                   xOffset = -200;
                   units = " (Earth Mass)";

                   onOptionClick('pl_bmasse', this.value, slider, range, xOffset, units);
                   break;
               case 'Planetary Radius':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
               
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
       
                   }
                   slider
                   .min(d3.min(dataF, d => d['pl_rade']))
                   .max(d3.max(dataF, d => d['pl_rade']))
                   .ticks(10)
                   .default([d3.min(dataF, d => d['pl_rade']), d3.max(dataF, d => d['pl_rade'])]);
                   range = [d3.min(dataF, d => d['pl_rade']), d3.max(dataF, d => d['pl_rade'])];
                   xOffset = -225;
                   units = " (Earth Radius)";

                   onOptionClick('pl_rade', this.value, slider, range, xOffset, units);
                   break;
               case 'Orbital Period':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
                    
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
                    
                   }
                   slider
                   .min(d3.min(dataF, d => d['pl_orbper']))
                   .max(d3.max(dataF, d => d['pl_orbper']))
                   .ticks(6)
                   .default([d3.min(dataF, d => d['pl_orbper']), d3.max(dataF, d => d['pl_orbper'])]);
                   range = [d3.min(dataF, d => d['pl_orbper']), d3.max(dataF, d => d['pl_orbper'])];
                   xOffset = -225;
                   units = " (Days)";

                   onOptionClick('pl_orbper', this.value, slider, range, xOffset, units);
                   break;
               case 'Orbit Semi-Major Axis':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
                
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
               
                   }
                   slider
                   .min(d3.min(dataF, d => d['pl_orbsmax']))
                   .max(d3.max(dataF, d => d['pl_orbsmax']))
                   .ticks(10)
                   .default([d3.min(dataF, d => d['pl_orbsmax']), d3.max(dataF, d => d['pl_orbsmax'])]);
                   range = [d3.min(dataF, d => d['pl_orbsmax']), d3.max(dataF, d => d['pl_orbsmax'])];
                   xOffset = -270;
                   units = " (AU)";

                   onOptionClick('pl_orbsmax', this.value, slider, range, xOffset, units);
                   break;
               case 'Planet Density':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
                   
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
                 
                   }
                   slider
                   .min(d3.min(dataF, d => d['pl_dens']))
                   .max(d3.max(dataF, d => d['pl_dens']))
                   .ticks(10)
                   .default([d3.min(dataF, d => d['pl_dens']), d3.max(dataF, d => d['pl_dens'])]);
                   range = [d3.min(dataF, d => d['pl_dens']), d3.max(dataF, d => d['pl_dens'])];
                   xOffset = -188;
                   units = " (g/cm^3)";

                   onOptionClick('pl_dens', this.value, slider, range, xOffset, units);
                   break;
               case 'Planet Temperature':
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
                  
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
                
                   }
                   slider
                   .min(d3.min(dataF, d => d['pl_eqt']))
                   .max(d3.max(dataF, d => d['pl_eqt']))
                   .ticks(7)
                   .default([d3.min(dataF, d => d['pl_eqt']), d3.max(dataF, d => d['pl_eqt'])]);
                   range = [d3.min(dataF, d => d['pl_eqt']), d3.max(dataF, d => d['pl_eqt'])];
                   xOffset = -245;
                   units = " (K)";

                   onOptionClick('pl_eqt', this.value, slider, range, xOffset, units);
                   break;
               // case 'BV':
               //     if (axisD === "x") {
               //         d3.selectAll('.sliderX g').remove();
               //         d3.selectAll('.sliderX text').remove();
               //         console.log("okX");
               //     }
               //     if (axisD === "y") {
               //         d3.selectAll('.sliderY g').remove();
               //         d3.selectAll('.sliderY text').remove();
               //         console.log("okY");
               //     }
               //     slider
               //     .min(d3.min(dataF, d => d['st_bv']))
               //     .max(d3.max(dataF, d => d['st_bv']))
               //     .ticks(7)
               //     .default([d3.min(dataF, d => d['st_bv']), d3.max(dataF, d => d['st_bv'])]);
               //     range = [d3.min(dataF, d => d['st_bv']), d3.max(dataF, d => d['st_bv'])];
               //     xOffset = -245;
               //     units = " (K)";

               //     onOptionClick('st_bv', this.value, slider, range, xOffset, units);
               //     break;
               default:
                   if (axisD === "x") {
                       d3.selectAll('.sliderX g').remove();
                       d3.selectAll('.sliderX text').remove();
                    
                   }
                   if (axisD === "y") {
                       d3.selectAll('.sliderY g').remove();
                       d3.selectAll('.sliderY text').remove();
                      
                   }
                   slider
                   .min(d3.min(dataF, d => d['st_mass']))
                   .max(d3.max(dataF, d => d['st_mass']))
                   .ticks(10)
                   .default([d3.min(dataF, d => d['st_mass']), d3.max(dataF, d => d['st_mass'])]);
                   range = [d3.min(dataF, d => d['st_mass']), d3.max(dataF, d => d['st_mass'])];
                   xOffset = -170;
                   units = " (Solar Mass)";

                   onOptionClick('st_mass', this.value, slider, range, xOffset, units);
           }
       });

       const option = select.selectAll('option').data(options);
       option.enter().append('option').merge(option)
       .attr('value', d => d)
       .property('selected', d => d === selectedOption)
       .text(d => d);
   };

   const colorLegend = (selection, props) => {
     const { colorScale,circleRadius, spacing, textOffset, onLegendChange} = props;

     var contClick = 0;
     var methodsF = [];
     var sel;
     let select = selection.selectAll('select').data([null]);
     
     const onCLick = function(event, d){
      
       if(contClick == 0) {
         d3.selectAll('.gLegendLP')
         .attr('opacity', 0.2);
         d3.selectAll('.gLegend')
         .attr('opacity', 0.2);
         d3.select(this)   
         .attr('opacity', 1);
         sel = d3.select(this).selectAll('text').text();
         d3.selectAll('g.gLegend').each(function(d){
          
           if(d === sel){
            
             d3.select(this).attr('opacity', 1);
           }
         });
         contClick++;
         methodsF.push(d3.select(this).selectAll('text').text());
         onLegendChange(methodsF);
       }
       else if(methodsF.length === 9) {
         d3.selectAll('.gLegendLP')
         .attr('opacity', 0.2);
         d3.selectAll('.gLegend')
         .attr('opacity', 0.2);
         d3.select(this)   
         .attr('opacity', 1);
         sel = d3.select(this).selectAll('text').text();
         d3.selectAll('g.gLegend').each(function(d){
          
           if(d === sel){
             
             d3.select(this).attr('opacity', 1);
           }
         });
         methodsF = [];
         methodsF.push(d3.select(this).selectAll('text').text());
         onLegendChange(methodsF);
        }
       else {

         if ( d3.select(this).attr('opacity') == 1) { 
          
           d3.select(this)   
           .attr('opacity', 0.2);
           sel = d3.select(this).selectAll('text').text();
           d3.selectAll('g.gLegend').each(function(d){
           
             if(d === sel){
              
               d3.select(this).attr('opacity', 0.2);
             }
           });
           methodsF = methodsF.filter (
              v => v !== d3.select(this).selectAll('text').text()
           );
           if(methodsF.length === 0){
             d3.selectAll('.gLegendLP')
             .attr('opacity', 1);
             contClick = 0;
           }

           onLegendChange(methodsF);
           }
         else {
           d3.select(this)   
         .attr('opacity', 1);
         sel = d3.select(this).selectAll('text').text();
         d3.selectAll('g.gLegend').each(function(d){
         
           if(d === sel){
             
             d3.select(this).attr('opacity', 1);
           }
         });
         methodsF.push(d3.select(this).selectAll('text').text());
         onLegendChange(methodsF);
       
      
         }
       }
      
     };
     
     const onDBCLick = function(event, d){
       
      
         d3.selectAll('.gLegendLP')
         .attr('opacity', 1);
         d3.selectAll('.gLegend')
         .attr('opacity', 1);
         methodsF = [];
         onLegendChange(methodsF);
       
      
      
     };

     const onMouseover = function(event, d){

       d3.select(this).selectAll('rect')
       .attr("stroke", "white")
       .attr('stroke-width', '2');

       d3.select(this).selectAll('rect').attr('fill');

      d3.selectAll('.line-path');

      var numC = d3.select(this).selectAll('text').text();

      {
       d3.selectAll('.circleG')
       .style('fill',function(d){
         if(d.discoverymethod !== numC){
           return "grey"
         }
         else {
           return  colorScale(d.discoverymethod)
         }
       })
       .style("opacity",function(d){
        if(d.discoverymethod !== numC){
          return 0.3
        }
        else {
          return  1
        }
      });
    
      d3.selectAll('.line-path')
       .style('stroke',function(d){
         if(d.key !== numC){
           return "grey"
         }
         else {
           return  colorScale(d.key)
         }
       })
       .style("opacity",function(d){
        if(d.key !== numC){
          return 0.3
        }
        else {
          return  1
        }
      });
      }

     
     //   var cc;
     //   var gg = d3.selectAll('.line-path')._groups[0][0]
     //   console.log(d3.selectAll('.line-path'))
     //  for(var i = 0; i< linesP.length; i++){
     //   cc = linesP[i]
       
     //    if(cc.attr("stroke") == colorLn){
     //      linesP[i].style("opacity", 1)
     //    }
     //  }

       // d3.selectAll('.line-path')
       // .style("stroke", "red")
     };

     const onMouseout = function(event, d){

       d3.select(this).selectAll('rect')
       .attr("stroke", "none")
       .attr('stroke-width', '2');

       d3.selectAll('.circleG')
       .style('fill',function(d){
         
           return  colorScale(d.discoverymethod)
         
       })
       .style("opacity", 0.7);

       
     d3.selectAll('.line-path')
     .style('stroke',function(d){
         return  colorScale(d.key)
     })
     .style("opacity",0.9);
       
     };

     select.enter()
     .merge(select)
     .append('rect')
     .attr('class', 'legendBack')
     .attr('width', '230px')
     .attr('height', '282px')
     .attr('transform', 'translate(0, -25)');

     select.enter()
     .merge(select)
     .append('text')
     .attr('x', 0)
     .attr('y', 0)
     .attr('fill', 'black')
     .attr('font-family', 'Helvetica Neue, Arial')
     .attr('font-weight', 'bold')
     .attr('font-size', '8px')
     .text('Discovery Method:');

    
     const entries = select.enter()
     .merge(select).selectAll('g')
     .data(colorScale.domain())
     .join('g')
     .attr('transform', (d, i) =>
     `translate(0, ${i * spacing + 18})`)
     .attr('class', 'gLegendLP')
     .on('click', onCLick)
     .on('dblclick', onDBCLick)
     .on('mouseover', onMouseover)
     .on('mouseout', onMouseout);

   entries.append('rect')
     .attr('width', circleRadius) 
     .attr('height', circleRadius)
     .attr('fill',colorScale);



   entries.append('text')
     .attr('x', textOffset +5) 
     .attr('dy', '0.78em') 
     .attr('fill', 'black')
     .attr('font-family', 'Helvetica Neue, Arial')
     .style('font-size', '14px')
     .attr('class', 'legendText')
     .style('user-select', 'none') 
     .text(d => d);



     
   };

   const scatterPlot = (selection, props) => {

       const {
           title,
           xValue,
           xLabel,
           xColName,
           yValue,
           yLabel,
           yColName,
           margin,
           width,
           height,
           xUnits,
           yUnits,
           flag,
           dateRange,
           colorScale,
           colorValue,
           data,
           data2
           

       } = props;

       const innerWidth = width - margin.left - margin.right;
       const innerHeight = height - margin.top - margin.bottom;
       let dataF = data;

       const g = selection.selectAll('.container').data([null]);
       const gEnter = g.enter().append('g')
       .attr('class', 'container');
       
      // d3.selectAll('#svgG').remove();

       // const svgZ = selection.append('svg').attr('id', 'svgG');

       const svgZM = selection.selectAll('.svgG').data([null]);
       const svgZMEnter = svgZM.enter().append('svg')
       .attr('class', 'svgG')
       .attr('x',120)
       .attr('y', 60)
       .attr("width", innerWidth)
       .attr("height", innerHeight);


       svgZMEnter.merge(svgZM);
      // .attr('transform', `translate(${margin.left},${margin.top})`);
       
       // svgZ.append("rect")
       // .attr('x', margin.left)
       // .attr('y', margin.top)
       // .attr("width", innerWidth)
       // .attr("height", innerHeight)
       // .style("fill", "none")
       const svgZ = d3.selectAll('.svgG');

       const gZ = svgZ.selectAll('.containerZ').data([null]);
       const gZEnter = gZ.enter().append('g')
       .attr('class', 'containerZ');

       gEnter.merge(g)
       .attr('transform', `translate(${120},${60})`);


     //  d3.selectAll('.svgX').remove()


       const xScale = d3.scaleLinear()
       .domain(d3.extent(dataF, xValue))
       .range([0,innerWidth])
       .nice();

       const yScale = d3.scaleLinear()
       .domain(d3.extent(dataF, yValue))
       .range([ innerHeight, 0])
       .nice();
       
       const yAxis = d3.axisLeft(yScale)
       .tickSize(-innerWidth)
       .tickPadding(10);

       const xAxis = d3.axisBottom(xScale)
       .tickSize(-innerHeight)
       .tickPadding(10);

       const yAxisG = g.select('.yAxis');
       const yAxisGEnter = gEnter.append('g')
       .attr('class', 'yAxis');

       yAxisG.merge(yAxisGEnter)
       .call(yAxis)
       .selectAll('.domain')
       .remove();

       yAxisGEnter
       .append('text')
       .attr('class', 'axis-label')
       .attr('transform', `rotate(270)`)
       .attr('fill', 'black')
       .attr('text-anchor', 'middle')
       .attr('y', -60)
       .merge(yAxisG.select('.axis-label'))
       .attr('x', -innerHeight/2)
       .text(yLabel + yUnits);

       const xAxisG = g.select('.xAxis');
       const xAxisGEnter = gEnter.append('g')
       .attr('class', 'xAxis')
       .attr('transform', `translate(0,${innerHeight})`);

       xAxisG.merge(xAxisGEnter)
       .call(xAxis)
       .selectAll('.domain')
       .remove();

       xAxisGEnter
       .append('text')
       .attr('class', 'axis-label')
       .attr('fill', 'black')
       .attr('align', 'center')
       .attr('y', 50)
       .merge(xAxisG.select('.axis-label'))
       .attr('x', innerWidth/2)
       .text(xLabel + xUnits);

       const titleG = g.select('.title');
       const titleGEnter = gEnter.append('g')
       .attr('class', 'title');

       titleG.merge(titleGEnter)
       .selectAll('.domain')
       .remove();

       titleGEnter
       .append('text')
       .attr('class', 'title-text')
       .attr('fill', 'black')
       .attr('align', 'center')
       .attr('y', -10)
       .merge(titleG.select('.title-text'))
       .attr('x', innerWidth/2)
       .text(title);


      var opacity = function(val) {
       if (val.length < 500) {
             return 1;
         }
       if ( val.length < 1000) {
           return 0.8;
       }
       if ( val.length < 2000) {
           return 0.65;
       }
       if ( val.length < 5000) {
           return 0.45;
       }
       if ( val.length < 10000) {
           return 0.25;
       }
       if ( val.length < 20000) {
           return 0.1;
       }
       else {
           return 0.08;
       }
      };

     d3.selectAll('.tooltip').remove();
      
       var tooltip = d3.select("body").append("div")
       .attr("class", "tooltip")
       .style("fill-opacity", 0);

     //  var hideT = document.getElementsByClassName("tooltip");
       var tipMouseover = function(event,d) {

          // hideT.style.display = "block";
         
           
           var color = colorScale(colorValue(d));

           var xM = d3.pointer(event, gZEnter.node())[0];
          var  yM = d3.pointer(event, gZEnter.node())[1];

           d3.select(this)
           .attr('stroke-width', '2')
           .attr("stroke", "black")
           .attr('fill-opacity', 1 );

           tooltip.html( "<b>" + d.pl_name + "</b>" + "<br/>" +
           "<span style='color:" + color + ";'>" + d.discoverymethod + "</span><br/>" +
           yLabel + ": " + d[yColName] + "<br/>" + xLabel + ": " + + d[xColName] 
           )
           .style("left", (xM+945 ) + "px")
           .style("top", (yM +274) + "px")
           //.style("transform", "translate(" + event.pageX + ", " +event.pageY  + ")")
           .transition()
               .duration(200) 
               .style("fill-opacity", .9) 
               .style('display','block'); 

       };
       var tipMouseout = function(d) {

           // d3.selectAll('.circleG')
           // .attr('fill-opacity', opacity);

           d3.select(this)
           .attr('stroke-width', '0')
           .attr('fill-opacity', opacity(dataF) );

           tooltip.transition()
               .duration(200) 
               .style("fill-opacity", 0)
               .style('display','none'); 

          // hideT.style.display = "none";
       };


       d3.zoom()
       .extent([[0, 0], [innerWidth, innerHeight]])
       .on("zoom", zoomed);

       function zoomed(event) {
           // create new scale ojects based on event

           if(event.sourceEvent.x < 950 || event.sourceEvent.x >1780 || event.sourceEvent.y<220 || event.sourceEvent.y>740){
             
               window.scrollBy(0, event.sourceEvent.deltaY);
               return;

           }
           else {
              
                   var new_xScale = event.transform.rescaleX(xScale);
                   var new_yScale = event.transform.rescaleY(yScale);
               // update axes
                   // gX.call(xAxis.scale(new_xScale));
                   // gY.call(yAxis.scale(new_yScale));
       
                   // var yAxisZ = d3.axisLeft(new_yScale)
                   // .tickSize(-innerWidth)
                   // .tickPadding(10);
               
                   // var xAxisZ = d3.axisBottom(new_xScale)
                   // .tickSize(-innerHeight)
                   // .tickPadding(10);
       
                   xAxisG.merge(xAxisGEnter)
                   .call(xAxis.scale(new_xScale))
                   .selectAll('.domain')
                   .remove();
       
                   yAxisG.merge(yAxisGEnter)
                   .call(yAxis.scale(new_yScale))
                   .selectAll('.domain')
                   .remove();
       
                   // xAxisGEnter
                   // .call(xAxis.scale(new_xScale))
                   // .selectAll('.domain')
                   // .merge(xAxisG.select('.axis-label'))
                   // .call(xAxis.scale(new_xScale))
                   // .attr('x', innerWidth/2)
                   // .text(xLabel + xUnits)
                   // .remove();
                 
                   // yAxisGEnter
                   // .call(yAxis.scale(new_yScale))
                   // .selectAll('.domain')
                   // .merge(xAxisG.select('.axis-label'))
                   // .call(yAxis.scale(new_xScale))
                   // .attr('x', innerHeight/2)
                   // .text(yLabel + yUnits)
                   // .remove();
       
                   // var newX = event.transform.rescaleX(xScale);
                   // var newY = event.transform.rescaleY(yScale);
       
                   // xAxis.call(d3.axisBottom(newX));
                   // yAxis.call(d3.axisLeft(newY));
               
                     d3.selectAll('.circleG')
                      .attr('cy', d => new_yScale(yValue(d)))
                       .attr('cx', d => new_xScale(xValue(d)));
           }

         
       }
       
       const circles =  gZ.merge(gZEnter).selectAll('circle').data(dataF);

       // function size (d) {
       //     if(d)
       // }

       if(flag == 0) {
           circles.enter().append('circle')
           .attr('class', 'circleG')
           .attr('cx', innerWidth/2)
           .attr('cy', innerHeight/2)
           .attr('r', 2.2)
           .merge(circles)
           .attr('r', d => d.sizeP)
           .transition().duration(2000)
           .attr('fill', d => colorScale(colorValue(d)))
           .attr('fill-opacity', opacity(dataF))
           .attr('cy', d => yScale(yValue(d)))
           .attr('cx', d => xScale(xValue(d)));
           

       }

       if(flag == 1) {
           circles.enter().append('circle')
           .attr('class', 'circleG')
           .attr('cx', innerWidth/2)
           .attr('cy', innerHeight/2)
           .attr('r', 2.2)
           .merge(circles)
           .attr('fill', d => colorScale(colorValue(d)))
           .attr('fill-opacity', opacity(dataF))
           .attr('cy', d => yScale(yValue(d)))
           .attr('cx', d => xScale(xValue(d)))
           .attr('r', d => d.sizeP);
       }

           //  var u = d3.selectAll('.circleG')
           //   .data(data2)
       
           // circles.exit()
           //   .transition() // and apply changes to all of them
           //   .duration(2000)
           //   .style("opacity", 0)
           //   .remove()
         

     

           // // Create the u variable
           // var u = d3.selectAll('.circleG')
           //   .data(data2)
         
           // u
           //   .transition() // and apply changes to all of them
           //   .duration(2000)
           //     .attr("cx",  d => xScale(xValue(d)))
           //     .attr("cy", d => yScale(yValue(d)))
           //     .attr('fill', d => colorScale(colorValue(d)))
           //     .attr('fill-opacity', opacity(dataF))
           //     .attr("r", 4.5)

           // u
           // .enter()
           // .append("circle") // Add a new circle for each new elements
           // .merge(u) // get the already existing elements as well
           // .transition() // and apply changes to all of them
           // .duration(1000)
           // .attr("cx",  d => xScale(xValue(d)))
           // .attr("cy", d => yScale(yValue(d)))
           // .attr('fill', d => colorScale(colorValue(d)))
           // .attr('fill-opacity', opacity(dataF))
           // .attr("r", 4.5)
         
           // // If less group in the new dataset, I delete the ones not in use anymore
           // u
           //   .exit()
           //   .transition() // and apply changes to all of them
           //   .duration(2000)
           //   .style("opacity", 0)
           //   .remove()

    
       d3.selectAll('.circleG')
       .on('mouseover', tipMouseover)
       .on('mouseout', tipMouseout);

       d3.selectAll('.circleG').exit().remove();
       
       d3.selectAll('#svgM').call(d3.zoom().extent([[0, 0], [innerWidth, innerHeight]]).scaleExtent([1, 50]).translateExtent([[0, 0], [innerWidth, innerHeight]]).on("zoom",zoomed));

       circles.exit().remove();

       // d3.select('body')
       // .style('overflow-y', 'hidden')

      
   };

   const linePlot = (selection,props) => {


       const {
           title,
           xValue,
           xLabel,
           xColName,
           yValue,
           yLabel,
           yColName,
           margin,
           width,
           height,
           xUnits,
           yUnits,
           dateRange,
           colorScale,
           colorValue,
           data,
           dataP,
           onTimeChange

       } = props;

       const innerWidth = width - margin.left - margin.right;
       const innerHeight = height - margin.top - margin.bottom;
       const dataPure = dataP;
       var timeRange = [new Date("1992"), new Date("2022")];

       const svgZM = selection.selectAll('.svgGLP').data([null]);
       const svgZMEnter = svgZM.enter().append('svg')
       .attr('class', 'svgGLP')
       .attr('x',190)
       .attr('y', 60)
       .attr("width", innerWidth)
       .attr("height", innerHeight)
       .append("rect")
       .attr('x',190)
       .attr('y', 60)
       .attr("width", innerWidth)
       .attr("height", innerHeight)
       .style("fill", "none");

       svgZMEnter.merge(svgZM);
      // .attr('transform', `translate(${margin.left},${margin.top})`);
       
       // svgZ.append("rect")
       // .attr('x', margin.left)
       // .attr('y', margin.top)
       // .attr("width", innerWidth)
       // .attr("height", innerHeight)
       // .style("fill", "none")
       const svgZ = d3.selectAll('.svgGLP');

       const gZ = svgZ.selectAll('.containerZ').data([null]);
       const gZEnter = gZ.enter().append('g')
       .attr('class', 'containerZ');
       // gZEnter.merge(gZ)
       // .attr('transform', `translate(${310},${100})`);
       
      // console.log(data);
       
       const g = selection.selectAll('.container').data([null]);
       const gEnter = g.enter().append('g')
       .attr('class', 'container');

       gEnter.merge(g)
       .attr('transform', `translate(${190},${60})`);

       // var xValue = d => d[xColumn];

       
      // console.log(dataFF);

       var xScale = d3.scaleTime().range([0, innerWidth])
       .domain([dateRange[0],dateRange[1]]);

       var yScale = d3.scaleLinear().range([innerHeight ,0])
       .domain([0, d3.max(dataPure, function(d){
           return d3.max(d.values, function(d){
               return d.value;
           })
       })])
       .nice();
       
       const yAxis = d3.axisLeft(yScale)
       .tickSize(-innerWidth)
       .tickPadding(10);

       const xAxis = d3.axisBottom(xScale)
       .ticks(10)
       .tickSize(-innerHeight)
       .tickPadding(10);
     
       const yAxisG = g.select('.yAxisLP');
       const yAxisGEnter = gEnter.append('g')
       .attr('class', 'yAxisLP');
       
       yAxisG.merge(yAxisGEnter)
       .call(yAxis)
       .selectAll('.domain')
       .style('stroke', '#b3aca7');
       // .remove();

       yAxisGEnter.append('text')
       .attr('class', 'axis-label')
       .attr('transform', `rotate(270)`)
       .attr('y', -70)
       .attr('fill', 'black')
       .attr('text-anchor', 'middle')
       .merge(yAxisG.select('.axis-label'))
       .attr('x', -innerHeight/2)
       .text("Numer of Exoplanets")
       ;
      
       const xAxisG = g.select('.xAxisLP');
       const xAxisGEnter = gEnter.append('g')
       .attr('class', 'xAxisLP')
       .attr('transform', `translate(0,${innerHeight})`);
       
       xAxisG.merge(xAxisGEnter)
       .call(xAxis)
       .selectAll('.domain')
       .remove();

       xAxisGEnter.append('text')
       .attr('class', 'axis-label')
       .attr('y', 50)
       .attr('fill', 'black')
       .attr('text-anchor', 'middle')
       .merge(xAxisG.select('.axis-label'))
       .attr('x', innerWidth/2)
       .text("Years")
;
      
       const titleG = g.select('.title');
       const titleGEnter = gEnter.append('g')
       .attr('class', 'titleLP');

       titleG.merge(titleGEnter)
       .selectAll('.domain')
       .remove();

       const titleGText = titleGEnter
       .append('text')
       .attr('class', 'title-label')
       .attr('fill', 'black')
       .attr('align', 'center')
       .attr('y', -10)
       .merge(titleG.select('.title-label'))
       .attr('x', innerWidth/2)
       .text('Exoplanets discoveries per year ('+ timeRange[0].getFullYear() +'-'+timeRange[1] +')');

       //d3.colorScale.domain(nest.map(d => d.key));

       const lineGenerator = d3.line()
       .x(d => xScale(new Date(d.key)))
       .y(d => yScale(d.value))
       .curve(d3.curveBasis);
       //   var linesL = lines.enter()
       //   .append('rect')
       //   .attr('class', 'lineBox')
       //   .attr('width', innerWidth)
       //   .attr('height', innerHeight)
       //   .attr('opacity', 0)
       //   .append('path')
       //   .merge(lines)
       //     .attr('class', 'line-path')
       //     .attr('d', d => lineGenerator(d.values))
       //     .attr('stroke', d => colorScale(d.key))
       //     ;
       

       const tooltipLine = g.merge(gEnter).append('line');

       let tipBox = g.merge(gEnter).append('rect')
       .attr('class', 'tipBox')
       .attr('width', innerWidth)
       .attr('height', innerHeight)
       .attr('opacity', 0)
       .on('mousemove', onTooltip)
       .on('mouseout', offTooltip);
       

       d3.selectAll('.tooltipLP').remove();
      
       var tooltip = d3.select("body").append("div")
       .attr("class", "tooltipLP")
       .style("fill-opacity", 0);
       
       function offTooltip() {
           if (tooltip) tooltip.style('display', 'none');
           if (tooltipLine) tooltipLine.attr('stroke', 'none');
       }


       d3.bisector(function(d) { 
          var yy = d.values;
           return yy.key; 
       }).left;
         
       function onTooltip(event) {

           const year = Math.floor((xScale.invert(d3.pointer(event, tipBox.node())[0])) / 1) * 1;
           
           const yearP = new Date(year);
           const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
           const month = formatter.format(yearP);

           const xM = d3.pointer(event, tipBox.node())[0];
           const x2M = d3.pointer(event, tipBox.node())[0]+1;
           d3.pointer(event, tipBox.node())[1];


          
           const dataR = dataPure;
           
           const dataRR = dataR.filter(function (v) {
                   
               return v.value = d3.max(v.values, function(d){
                   if(d.key<yearP){
                       return d.value;
                   }
               
               })
           });

           dataRR.sort((a,b) => (a.value < b.value) ? 1:(b.value < a.value) ? -1:0);

           tooltipLine.attr('stroke', '#f5f0e1')
               .attr('x1', xM )
               .attr('x2', x2M )
               .attr('y1', 0)
               .attr('y2', innerHeight);
           
           tooltip.html( "<b>" + month + "-" + yearP.getFullYear() +"<p>")
               .style('display', 'block')
               .style("left", (xM +200 ) + "px")
               .style("top", (event.pageY -45) + "px")
               .selectAll()
               .data(dataRR).enter()
               .append('div')
               .style('color', d => colorScale(d.key))
               .html(d => d.key +': ' + d.value
                );
       }
       var yScale2 = d3.scaleLinear().range([50 ,0])
       .domain([0, d3.max(dataPure, function(d){
           return d3.max(d.values, function(d){
               return d.value;
           })
       })])
       .nice();


       const svgB = d3
       .select('div#slider-range').selectAll('.svgTime').data([null]);
       const svgBEnter = svgB.enter().append('svg')
       .attr('class', 'svgTime')
       .attr('width', width)
       .attr('height', 120)
       .attr('transform', `translate(${width/4-90},${-30})`);
       // .append('g')
       // .attr('transform', `translate(${width/4},8)`)
       // .append("rect")
       // .attr('width', width)
       // .attr('height', 100)
       // .style("fill", "none");

       svgBEnter.merge(svgB);
      // .attr('transform', `translate(${margin.left},${margin.top})`);
       
       // svgZ.append("rect")
       // .attr('x', margin.left)
       // .attr('y', margin.top)
       // .attr("width", innerWidth)
       // .attr("height", innerHeight)
       // .style("fill", "none")
   // d3.selectAll('.svgTime').append('g')
   // .attr('class', 'ddd')
       var xScale2 = d3.scaleTime().range([0, innerWidth]);
       xScale2.domain(xScale.domain());

       const xAxis2 = d3.axisBottom(xScale)
       .ticks(10)
       .tickSize(-60)
       .tickPadding(10);

       const svgBT = d3.selectAll('.svgTime');
      
       const gT = svgBT.selectAll('.context').data([null]);
      const gTEnter = gT.enter().append("g")
       .attr("class", "context")
      .attr("transform", "translate(" +50+ "," +  20+ ")");
    

       //gTEnter.merge(g)
       //.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

       const lineGenerator2 = d3.line()
       .x(d => xScale(new Date(d.key)))
       .y(d => yScale2(d.value))
       .curve(d3.curveBasis);

       const lines2 =  gTEnter.merge(gT).selectAll('.line-path2').data(dataPure);
       
       lines2.enter().append('path')
       .merge(lines2)
         .attr('class', 'line-path2')
         .attr('d', d => lineGenerator2(d.values))
         .attr('stroke', d => colorScale(d.key));

       lines2.exit().remove();
       

       // context.append("path")
       // .datum(data)
       // .attr("class", "line")
       // .attr("d", line2);

       const xAxisG2 = gT.select('.xAxis2');
       const xAxisGEnter2 = gTEnter.append('g')
       .attr('class', 'xAxis2')
       .attr('transform', `translate(0,${50})`);
       
       xAxisG2.merge(xAxisGEnter2)
       .call(xAxis2)
       .selectAll('.domain')
       .remove();

       // context.append("g")
       // .attr("class", "axis axis--x")
       // .attr("transform", "translate(0," + height2 + ")")
       // .call(xAxis2);

       // const gBrush = gTEnter.merge(gT)
       // .append("g")
       // .attr("class", "brush")
       // .attr('transform', `translate(${310},${-10})`)
        //.call(brush)
       // .call(brush.move, xScale.range());

       var brushg =  gT.merge(gTEnter).selectAll('.brush');

       brushg
         .enter().append("g")
         .merge(brushg)
         .attr("class", "brush");
       
         svgBT.append("g")
         .attr("class", "context");
         //.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");


         
       //   brushGEnter.call(brush)
       //   .call(brush.move, xScale.range());

       // d3.selectAll('.context').append("g")
       // .attr("class", "brush")
       // .call(brush)
       // .call(brush.move, xScale.range());

       var brush = d3.brushX()
       .extent([[0, 0], [innerWidth, 60]])
       .on("brush end", brushed);

       var zoom = d3.zoom()
       .scaleExtent([1, Infinity])
       .translateExtent([[0, 0], [innerWidth, innerHeight]])
       .extent([[0, 0], [innerWidth, innerHeight]])
       .on("zoom", zoomed);

       var focus = g.append("g")
           .attr("class", "focus")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

       
       
       var brushg =  gT.merge(gTEnter).selectAll('.cell').data([null]);

       var brushGenter = brushg
         .enter().append("g")
         .merge(brushg)
           .attr("class", 'cell')
            .attr("transform",  "translate(0,-10)");
           // .each(plot);
       // context.append("g")
       // .attr("class", "brush")
       // .attr('transform', `translate(${310},${-10})`)
       // .call(brush)
       // .call(brush.move, xScale.range());

       const lines =  gZ.merge(gZEnter).selectAll('.line-path').data(dataPure);
       
   lines.enter().append('path')
   .merge(lines)
     .attr('class', 'line-path')
     .attr('d', d => lineGenerator(d.values))
     .attr('stroke', d => colorScale(d.key));
     lines.exit().remove();

       brushGenter.call(brush)
       .call(brush.move, xScale.range());
   //    selection.append("rect")
   //       .attr("class", "zoom")
   //       .attr("width", innerWidth)
   //       .attr("height", innerHeight)
   //       .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
   //       .call(zoom);



       function brushed(event) {
           if (event.sourceEvent && event.sourceEvent.type === "wheel") return; 
           if (event.sourceEvent && event.sourceEvent.type === "zoom") return; 
    
           var s = event.selection || xScale.range();
     
           xScale.domain(s.map( xScale2.invert,  xScale2));
           timeRange = xScale.domain();
           //console.log(timeRange)
           // var t = 0;
           // setTimeout(function(){
           //     t = 1
           // },5000);
           // if (t === 1){
           //     onTimeChange(timeRange)
           // }
           // else{
           //     onTimeChange(timeRange)
           // }
         
           onTimeChange(timeRange);
           const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
           const month0 = formatter.format(timeRange[0]);
           const month1 = formatter.format(timeRange[1]);

           titleGText 
           .text('Exoplanets discoveries per year ('+ month0 +" "+ timeRange[0].getFullYear() +' to '+month1 +" "+timeRange[1].getFullYear() +')');
           
     
           lines.select(".line-path").attr("d", lineGenerator);
           focus.select(".xAxis").call(xAxis);

           xAxisG.merge(xAxisGEnter)
           .call(xAxis.scale(xScale))
           .selectAll('.domain')
           .remove();

           const lineGeneratorZ = d3.line()
           .x(d => xScale(new Date(d.key)))
           .y(d => yScale(d.value))
           .curve(d3.curveBasis);

           d3.selectAll(".line-path")
               .attr("d", d => lineGeneratorZ(d.values));
         }

       

       function zoomed(event) {
           if (event.sourceEvent && event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
           if (event.sourceEvent && event.sourceEvent.type === "end") return;
           if (event.sourceEvent && event.sourceEvent.type !=="brush") {
        
                xScale.domain(event.transform.rescaleX(xScale2).domain());
                
                xAxisG.merge(xAxisGEnter)
                .call(xAxis.scale(xScale))
                .selectAll('.domain')
                .remove();
        
                const lineGeneratorZ = d3.line()
                .x(d => xScale(new Date(d.key)))
                .y(d => yScale(d.value))
                .curve(d3.curveBasis);
        
        
                d3.selectAll(".line-path")
                    .attr("d", d => lineGeneratorZ(d.values));

                gT.merge(gTEnter).select(".cell").call(brush.move, [xScale2(event.transform.rescaleX(xScale2).domain()[0]),xScale2(event.transform.rescaleX(xScale2).domain()[1])]);
                
          }
               
         }

        
         
         
         tipBox.call(zoom);
   };

   const svg = d3.select('#svgM')
    .attr('transform', `translate(${290},${0})`);const svgLP = d3.select('#svgLP');

   const width = 1200;
   const height = 800;

   svg
   .attr('width', width)
   .attr('height', height);

   document.addEventListener('scroll', function(e) {
       document.body.getBoundingClientRect().y;

       

       // saves the new position for iteration.
       (document.body.getBoundingClientRect()).top;
       }
   );



   // function doSomething(scrollPos) {
       
   //   if(scrollPos>150){
   //     disableScroll()
   //   }
   //   else{
   //     enableScroll()
   //   }
   // }

   // document.addEventListener('scroll', function(e) {
   //   lastKnownScrollPosition = window.scrollY;

   //   if (!ticking) {
   //     window.requestAnimationFrame(function() {
   //       doSomething(lastKnownScrollPosition);
   //       ticking = false;
   //     });

   //     ticking = true;
   //   }
   // });



   let data;
   let dataLP;
   let xColumn = 'st_mass';
   let xLabelColumn = 'Stellar Mass';
   let yColumn = 'st_teff';
   let yLabelColumn = 'Stellar Temperature';
   const columns = ['Stellar Mass', 'Stellar Temperature', 'Stellar Radius', 'Stellar Luminosity', 'Planetary Mass', 'Planetary Radius', 'Orbital Period', 'Orbit Semi-Major Axis', 'Planet Density', 'Planet Temperature'];
   var methods = [];
   let dateRange = [new Date("1992"), new Date ("2021")]; 
   var xRange = [0, 3];
   var yRange = [2000, 11000];
   var gRangeX;
   var gRangeY;
   var sliderRangeX;
   var sliderRangeY;
   var xUnits = " (Solar Mass)";
   var yUnits = " (K)";
   var flag = 0;
   var dataBuffer = [];
   //console.log(innerWidth)

   var sliderWidth = 1920/4.5 -130;

   let menusCSS = document.querySelector("#menus");
   menusCSS.style.left = `${(width- width/4 +1260)/6+650}px`;
   menusCSS.style.top = `10px`;

   // let menus1CSS = document.querySelector("#graph");
   // menus1CSS.style.left = `${(width- width/4 +700)/6}px`;

    d3.selectAll('#svgM')
   .attr("transform", "translate(" +  920+ ", " +-780  + ")");

   const onLegendChange = (methodsF) => {
       methods = methodsF;
       flag = 1;
       
       render();
       renderLP();
   }; 
   var t = 0;
   setTimeout(function(){
       t = 1;
   },1000);

   const onTimeChange = (timeRange) => {
       dateRange = timeRange;
       flag = 1;
      
       if (t === 1){
           render();
       }
       
     
   };

   const onXColumnClick = (column, label, slider, range, xOffset, units) => {
       xColumn = column;
       xLabelColumn = label;
       xRange = range;
       xUnits = units;
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
       .append('g');
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

       render();
   };
   const onYColumnClick = (column, label, slider, range, xOffset, units) => {
       yColumn = column;
       yLabelColumn = label;
       yRange = range;
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
       .append('g');
     //  .attr('transform', `translate(${-yOff},20)`)

       gRangeY.call(sliderRangeY)
       .append('text')
       .attr('width', '10px')
       .attr('height', '10px')
       .attr('transform', `translate(0,-18)`)
       .text(yLabelColumn + ":");

       flag = 0;
       render();
   };

   const colorScale = d3.scaleOrdinal()
     .domain(methods)
     .range(['#f27777', '#d577f2',
      '#77d3f2','#777ff2',
     '#f2d977', '#77f2bb',
     '#c1eb73', '#eb83c8',
     '#edb861', "#18ab42"
    ]);

   d3.scaleOrdinal()
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
   .attr('transform', `translate(${90+40},${height-150})`);

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
   .attr('transform', `translate(${190+sliderWidth+40},${height-150})`);

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
       

       dataF.filter(function (v) {
           if (isNaN(v[xColumn]) || isNaN(v[yColumn])) {
               return v.sizeP = 0;
           }
           else {return v.sizeP = 3.5}
           }
       );
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

   //    const gLegendEnter = svg.append('g')
   //    .attr('class', 'legend');

   //    const gLegend = svg.selectAll('.legend').data([null]);

   //    gLegendEnter
   //    .attr('transform', `translate(${ width- width/4 -140},${height/8 - 20})`)
   //    .merge(gLegendEnter)
   //    .call(colorLegendSP, {
   //        colorScale,
   //        circleRadius: 8,
   //        spacing: 26,
   //        textOffset: 20,
   //        onLegendChange: onLegendChange,
   //        methodsF
   //    });

   //    gLegend.exit().remove();

      dataBuffer = dataF;

      flag = 0;

      

   };

   const widthLP = d3.select('#svgLP').attr('width');
   const heightLP = d3.select('#svgLP').attr('height');

   const renderLP = () => {

       const dataFM = dataLP;
       var data =[];
       if (methods.length == 0){
          
           data = dataFM;
       }
       else {
           data = dataFM.filter(
           
               v => methods.includes(v.discoverymethod)
           );
       }
      
    
    
       data.sort(function(a,b){
           return a.disc_pubdate - b.disc_pubdate;
       });
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
       });

       //console.log(data)
       var nest = d3.nest()
       .key(function(d) { return d.discoverymethod; })
       .key(function(d) { return d.disc_pubdate; })
       .rollup(function(values) { return +values.length; })
       .entries(data);
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
               });
              
               return v.values=aa;

       });
      // console.log(nest)

       svgLP.call(linePlot, {
           title: 'Exoplanets Discoveries',
          // xValue: d => d[xColumn],
           xLabel: 'Year',
           //xColName: xColumn,
           //yValue: d => d[yColumn],
           yLabel: 'Total number of exoplanets discovered',
           //yColName: yColumn,
           margin: { top:70, right: 0, bottom: 100, left:200},
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
       
   };
   //ExoplanetsConfirmed.csv
   d3.csv('https://raw.githubusercontent.com/Maropro3/DataUpload/main/ExoplanetsConfirmed.csv').then(loadedData => {
      
       loadedData.forEach(clearFunction);

       function clearFunction(i,n) {
           for(var k in i){
               if (i[k] === ""){
                   i[k] = "no";
               }        }
       }
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
       

       var test = [];
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
       });


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

})));
