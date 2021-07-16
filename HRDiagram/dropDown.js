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
    let selCluster;
    let units = "";
    
    select = select.enter().append('select')
    .merge(select)
    .attr('id', 'drop')
    .on('change', function() {
        switch(this.value){
            case 'EM':
             
                selCluster = 1;
                units = ""

                onOptionClick(selCluster,this.value,);
                break;
            case 'KNN':
           
                selCluster = 0;
                units = ""

                onOptionClick(selCluster,this.value,);
                break;
          
            default:
             
                selCluster = 0;
                units = ""

                onOptionClick(selCluster,this.value,);
        }
    });

    const option = select.selectAll('option').data(options);
    option.enter().append('option').merge(option)
    .attr('value', d => d)
    .property('selected', d => d === selectedOption)
    .text(d => d);
};