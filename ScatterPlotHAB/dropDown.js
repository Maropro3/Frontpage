export const dropDown = (selection, props) => {
    const {
        options,
        onOptionClick,
        selectedOption,
        axis,
        data,
        
    } = props;

    let dataF = data;
    let range = [];
    let select = selection.selectAll('select').data([null]);
    let xOffset;
    let units = "";
    
    select = select.enter().append('select')
    .merge(select)
    .attr('id', 'drop')
    .on('change', function() {
        switch(this.value){
            case 'ESI':
             
                units = ""

                onOptionClick('ESI_in','ESI_ext', 'Interior ESI', 'Exterior ESI',this.value,'ESI_t', units);
                break;
                
            case 'CDHS':
           
                units = ""

                onOptionClick('cdhs_in','cdhs_sur', 'Interior CDHS', 'Surface CDHS',this.value,'cdhs_t',units);
                break;

            default:
             
                units = ""

                onOptionClick('hzdI','hzdO', 'Interior ESI', 'Exterior ESI',this.value,'ESI_t', units);
             
        }
    });

    const option = select.selectAll('option').data(options);
    option.enter().append('option').merge(option)
    .attr('value', d => d)
    .property('selected', d => d === selectedOption)
    .text(d => d);

};