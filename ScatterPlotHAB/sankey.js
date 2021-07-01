const data = {
    "nodes":[
    {"name":"Total Number of Exoplanets","id":"a1"},
    {"name":"Terrestial","id":"a2"},
    {"name":"Super-Earth","id":"a3"},
    {"name":"Neptune-Like","id":"a4"},
    {"name":"Gas Giant","id":"a5"},
    {"name":"Super-Jupiter","id":"a6"},
    {"name":"Too close to their star","id":"a7"},
    {"name":"Inside Habitable Zone","id":"a8"},
    {"name":"Too far from their star","id":"a9"},
    {"name":"ESI > 0.8","id":"a10"},
    {"name":"ESI < 0.8","id":"a11"},
    {"name":"Non-Habitable","id":"a12"},
    {"name":"Hyperthermoplanet","id":"a13"},
    {"name":"Thermoplanet","id":"a14"},
    {"name":"Mesoplanet","id":"a15"},
    {"name":"Psychroplanet","id":"a16"},
    {"name":"Hypopsychroplanet","id":"a17"},
    ],
    "links":[
    {"source":"Total Number of Exoplanets","target":"Terrestial","value":366},
    {"source":"Total Number of Exoplanets","target":"Super-Earth","value":1304},
    {"source":"Total Number of Exoplanets","target":"Neptune-Like","value":868},
    {"source":"Total Number of Exoplanets","target":"Gas Giant","value":467},
    {"source":"Total Number of Exoplanets","target":"Super-Jupiter","value":163},

    {"source":"Terrestial","target":"Non-Habitable","value":336},
    {"source":"Terrestial","target":"Hyperthermoplanet","value":13},
    {"source":"Terrestial","target":"Thermoplanet","value":4},
    {"source":"Terrestial","target":"Mesoplanet","value":5},
    {"source":"Terrestial","target":"Psychroplanet","value":4},
    {"source":"Terrestial","target":"Hypopsychroplanet","value":4},

    {"source":"Super-Earth","target":"Non-Habitable","value":1173},
    {"source":"Super-Earth","target":"Hyperthermoplanet","value":56},
    {"source":"Super-Earth","target":"Thermoplanet","value":30},
    {"source":"Super-Earth","target":"Mesoplanet","value":30},
    {"source":"Super-Earth","target":"Psychroplanet","value":10},
    {"source":"Super-Earth","target":"Hypopsychroplanet","value":5},

    {"source":"Non-Habitable","target":"Too close to their star","value":1509},

    {"source":"Hyperthermoplanet","target":"Too close to their star","value":68},
    {"source":"Hyperthermoplanet","target":"Inside Habitable Zone","value":1},

    {"source":"Thermoplanet","target":"Too close to their star","value":32},
    {"source":"Thermoplanet","target":"Inside Habitable Zone","value":2},

    {"source":"Mesoplanet","target":"Too close to their star","value":17},
    {"source":"Mesoplanet","target":"Inside Habitable Zone","value":18},

    {"source":"Psychroplanet","target":"Inside Habitable Zone","value":14},
    
    {"source":"Hypopsychroplanet","target":"Inside Habitable Zone","value":6},
    {"source":"Hypopsychroplanet","target":"Too far from their star","value":3},

    {"source":"Neptune-Like","target":"Too close to their star","value":837},
    {"source":"Neptune-Like","target":"Inside Habitable Zone","value":28},
    {"source":"Neptune-Like","target":"Too far from their star","value":3},

    {"source":"Gas Giant","target":"Too close to their star","value":432},
    {"source":"Gas Giant","target":"Inside Habitable Zone","value":5},
    {"source":"Gas Giant","target":"Too far from their star","value":30},

    {"source":"Super-Jupiter","target":"Too close to their star","value":153},
    {"source":"Super-Jupiter","target":"Inside Habitable Zone","value":0},
    {"source":"Super-Jupiter","target":"Too far from their star","value":10},

    {"source":"Too close to their star","target":"ESI > 0.8","value":276},
    {"source":"Too close to their star","target":"ESI < 0.8","value":2772},
    {"source":"Inside Habitable Zone","target":"ESI > 0.8","value":73},
    {"source":"Inside Habitable Zone","target":"ESI < 0.8","value":1},
    {"source":"Too far from their star","target":"ESI > 0.8","value":2},
    {"source":"Too far from their star","target":"ESI < 0.8","value":44},

    ]
   };
   var edgeColor = "input"
   var width = 1254
   var height = 760;
   var padding = 20;
   const svgBackground = "#eee";
   const svgBorder = "1px solid #333";
   const nodeWidth = 24;
   const nodePadding = 16;
   const nodeOpacity = 0.8;
   const linkOpacity = 0.5;
   const nodeDarkenFactor = 0.3;
  
   const arrow = "\u2192";
   let initialMousePosition = {};
   let initialNodePosition = {};
   const path = d3.sankeyLinkHorizontal();

   function getGradientId(d) {
       tt = d.source
     
    return `gradient_${d.source.id}_${d.target.id}`;
   }
    function addGradientStop(gradients, offset, fn) {
        return gradients.append("stop")
                        .attr("offset", offset)
                        .attr("stop-color", fn);
    }

   function getMousePosition(event, e) {
    e = e || event;
    return {
        x: e.x,
        y: e.y
    };
}
function setInitialMousePosition(e) {
    initialMousePosition.x = e.x;
    initialMousePosition.y = e.y;
}

function setInitialNodePosition(node) {
    let pos = node ? getNodePosition(node) : { x: 0, y: 0, width: 0, height: 0 };
    initialNodePosition.x = pos.x;
    initialNodePosition.y = pos.y;
    initialNodePosition.width = pos.width;
    initialNodePosition.height = pos.height;
}
function getNodePosition(node) {
    return {
        x: +node.attr("x"),
        y: +node.attr("y"),
        width: +node.attr("width"),
        height: +node.attr("height")
    };
}
  
    const color = d3.scaleOrdinal()
    .range(["#b8b2b4",'#44ebe2','#48eb36',
    '#787375','#c91616','#d16c1f','#34d11f','#1fb6d1','#d1e5ff',
    '#4e51ed', '#edcd4e','#eb635b',"#f25252","#52f262","#5252f2","#a5f252","#f2ad52","#a6761d","#666666"]);


   var svg = d3.selectAll('#sankey').append('svg')
   .attr('class', 'svgSank')
   .attr('width', width)
   .attr('height', height)
   .attr('transform', `translate(${ 300},${0})`)

   const sankey = d3
   .sankey()
   .size([width, height])
   .nodeId(d => d.name)
   .nodeWidth(20)
   .nodePadding(padding)
   .nodeAlign(d3.sankeyCenter);

let graph = sankey(data);

// let nodes = svg
//     .append("g")
//     .attr("stroke", "#000")
//     .classed("nodes", true)
//     .selectAll("rect")
//     .data(graph.nodes)
//     ;



// let links = svg
//     .append("g")
//     .classed("links", true)
//     .selectAll("path")
//     .data(graph.links)
//     .enter()
//     .append("path")
//     .classed("link", true)
//     .attr("d", d3.sankeyLinkHorizontal())
//     .attr("fill", "none")
//     .attr("stroke", d => color(d.target.name))
//     .attr("stroke-width", d => d.width)
//     .attr("stoke-opacity", 0.5)

let svgLinks = svg.append("g")
.classed("links", true)
.selectAll("g")
.data(graph.links)
.enter()
.append("g");

let gradients = svgLinks.append("linearGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", d => d.source.x1)
      .attr("x2", d => d.target.x0)
      .attr("id", d => getGradientId(d));
addGradientStop(gradients, 0.0, d => color(d.source.name));
addGradientStop(gradients, 1.0, d => color(d.target.name));
svgLinks.append("path")
.classed("link", true)
.attr("d", path)
.attr("fill", "none")
.attr("stroke", d => `url(#${getGradientId(d)})`)
.attr("stroke-width", d => Math.max(1.0, d.width))
.attr("stroke-opacity", linkOpacity);
   

// var labels = svg.append("g")
//     .attr("font-family", "sans-serif")
//     .attr("font-size", 12)
//   .selectAll("text")
//   .data(graph.nodes)
//   .join("text")
//     .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
//     .attr("y", d => (d.y1 + d.y0) / 2)
//     .attr("dy", "0.35em")
//     .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
//     .style("fill", "#bababa")
//     .text(d => d.name + " ("+d.value+")");

var nodes = svg.append("g").selectAll(".node")
.data(graph.nodes)
.enter().append("g")
.classed("nodes", true)

  let nodesR = nodes.append("rect")
    .classed("node", true)
    .attr("x", d => d.x0)
    .attr("y", d => d.y0)
    .attr("width", d => d.x1 - d.x0)
    .attr("height", d => d.y1 - d.y0)
    .attr("fill",  d => color(d.name))
    .attr("opacity", 0.8)
  
    nodes.append("text")
    .attr('class', 'textSan')
        .attr("x", d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
    .attr("y", d => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", d => d.x0 < width / 2 ? "start" : "end")
    .style("fill", "#bababa")
        .style("font-family", "sans-serif")
    .style("font-size", 14)
    .text(d => d.name + " ("+d.value+")");
    nodesR.call(d3.drag()
    .on("start", onDragStart)
    .on("drag", onDragDragging)
    .on("end", onDragEnd));

    const graphSize = [width, height ];
    const nodeStrokeWidth = 2;
   

   

    function moveNode(node, position, text) {
        position.width = position.width || +(node.attr("width"));
        position.height = position.height || +(node.attr("height"));
        if (position.x < 0) {
            position.x = 0;
        }
        if (position.y < 0) {
            position.y = 0;
        }
        if (position.x + position.width > graphSize[0]) {
            position.x = graphSize[0] - position.width;
        }
        if (position.y + position.height > graphSize[1]) {
            position.y = graphSize[1] - position.height;
        }
        node.attr("x", position.x)
            .attr("y", position.y);
        let nodeData = node.data()[0];
        nodeData.x0 = position.x
        nodeData.x1 = position.x + position.width;
        nodeData.y0 = position.y;
        nodeData.y1 = position.y + position.height;
        sankey.update(graph);
        svgLinks.selectAll("linearGradient")
                .attr("x1", d => d.source.x1)
                .attr("x2", d => d.target.x0);
        svgLinks.selectAll("path")
                .attr("d", path);

        if ( d3.select(text).attr("x")<position.x) {
            d3.select(text)      
            .attr("x", position.x -node.attr("width")/2 -4)
            .attr("y",position.y +node.attr("height")/2);
        }
        else {
            d3.select(text)      
            .attr("x", position.x +node.attr("width")/2 +16)
            .attr("y",position.y +node.attr("height")/2);
        }
       
        
           
    //    nodes.selectAll('.textSan')
    //    .attr("x", position.x)
    //    .attr("y",position.y);
    }

    function onDragDragging(event) {
        let currentMousePosition = getMousePosition(event);
        let delta = {
            x: currentMousePosition.x - initialMousePosition.x,
            y: currentMousePosition.y - initialMousePosition.y
        };
        let thisNode = d3.select(this);
        let newNodePosition = {
            x: initialNodePosition.x + delta.x,
            y: initialNodePosition.y + delta.y,
            width: initialNodePosition.width,
            height: initialNodePosition.height
        };
         let aa = this.parentNode
         let text = aa.childNodes
    
        moveNode(thisNode, newNodePosition, text[0]);        
    }
    
    function onDragEnd() {
        let node = d3.select(this)
                     .attr("stroke-width", 0);
    }
    
    function onDragStart(event) {
        let node = d3.select(this)
                     .raise()
                     .attr("stroke-width", nodeStrokeWidth);
        setInitialNodePosition(node);
        initialNodePosition = getNodePosition(node);
        initialMousePosition = getMousePosition(event);
    }

   
//     d3.selectAll('.links')
//     .on('mouseover', tipMouseover)
//     .on('mouseout', tipMouseout);

//    // d3.selectAll('.tooltipSank').remove();
   
//     var tooltip = d3.select("body").append("div")
//     .attr("class", "tooltipSank")
//     .style("fill-opacity", 0);

//   //  var hideT = document.getElementsByClassName("tooltip");
//     var tipMouseover = function(event,d) {
//         console.log("oo")
//        // hideT.style.display = "block";
        
//         // var color = colorScale(colorValue(d));
//         // var color2 = colorScaleSol(d.pl_name);

//         // d3.select(this)
//         // .attr('stroke-width', '2')
//         // .attr("stroke", "black")
//         // .attr('fill-opacity', 1 );

//         // const colsel = function(d){
//         //     if (d.st_mass == null){
//         //         return color2
//         //     }
//         //     else{
//         //         return color 
//         //     }
//         // } 

//         tooltip.html( "<b>" + d.value + "</b>" 
//         )
//         .style("left", (event.pageX -68) + "px")
//         .style("top", (event.pageY -103) + "px")
//         .transition()
//             .duration(200) 
//             .style("fill-opacity", .9) 
//             .style('display','block'); 

//     };
//     var tipMouseout = function(d) {

//         // d3.selectAll('.circleG')
//         // .attr('fill-opacity', opacity);

//         // d3.select(this)
//         // .attr('stroke-width', '0')
//         // .attr('fill-opacity', opacity(dataF) );

//         tooltip.transition()
//             .duration(200) 
//             .style("fill-opacity", 0)
//             .style('display','none'); 

//        // hideT.style.display = "none";
//     };
