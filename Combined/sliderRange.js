export const sliderR = (selection, props)  =>{ 

    const {
        width,
        onSliderTime
    } = props;

    let sliderT = d3
    .sliderBottom()
    .min(new Date("1992"))
    .max(new Date())
    .step(1000 * 60 * 60 * 24 * 30)
    .width(850)
    .height(50)
    .tickPadding(3)
    .tickFormat(d3.timeFormat('%Y'))
    .ticks(10)
    .default([new Date("1992"), new Date()])
    .fill('#2196f3');
    onSliderTime(sliderT);
    
    var gRange = d3
    .select('div#slider-range')
    .append('svg')
    .attr('class', 'svgTime')
    .attr('width', 1500)
    .attr('height', 100)
    .append('g')
    .attr('transform', `translate(${width/4},8)`);
    
    gRange.call(sliderT)
    .append('text')
    .attr('width', '10px')
    .attr('height', '10px')
    .attr('transform', `translate(-70,6)`)
    .text("Years:");
}