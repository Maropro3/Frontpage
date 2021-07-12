export const dropDown = (selection, props) => {
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
                units = " (Solar Mass)"

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