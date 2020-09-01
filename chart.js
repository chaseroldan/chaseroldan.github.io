// create dataset

// USA
var data1 = [
    {group: "Gold", value: 2333},
    {group: "Silver", value: 1241},
    {group: "Bronze", value: 1112}
 ];
 
 // Soviet Union
 var data2 = [
    {group: "Gold", value: 830},
    {group: "Silver", value: 635},
    {group: "Bronze", value: 596}
 ];
 
 // Germany
 var data3 = [
    {group: "Gold", value: 610},
    {group: "Silver", value: 564},
    {group: "Bronze", value: 513}
 ];

 // Great Britain
 var data4 = [
    {group: "Gold", value: 576},
    {group: "Silver", value: 541},
    {group: "Bronze", value: 481}
 ];

 // France
 var data5 = [
    {group: "Gold", value: 502},
    {group: "Silver", value: 485},
    {group: "Bronze", value: 421}
 ];

 // Italy
 var data6 = [
    {group: "Gold", value: 492},
    {group: "Silver", value: 467},
    {group: "Bronze", value: 425}
 ];

 // Australia
 var data7 = [
    {group: "Gold", value: 504},
    {group: "Silver", value: 450},
    {group: "Bronze", value: 336}
 ];

 // Hungary
 var data8 = [
    {group: "Gold", value: 432},
    {group: "Silver", value: 363},
    {group: "Bronze", value: 328}
 ];

 // Sweden
 var data9 = [
    {group: "Gold", value: 350},
    {group: "Silver", value: 330},
    {group: "Bronze", value: 326}
 ];

 // Russia
 var data10 = [
    {group: "Gold", value: 322},
    {group: "Silver", value: 294},
    {group: "Bronze", value: 278}
 ];
 
 // set the dimensions and margins of the graph
 var margin = {top: 30, right: 30, bottom: 70, left: 60},
     width = 800 - margin.left - margin.right,
     height = 400 - margin.top - margin.bottom;
 
 // append the svg object to the body of the page
 var svg = d3.select("#my_dataviz")
   .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
   .append("g")
     .attr("transform",
           "translate(" + margin.left + "," + margin.top + ")");
 
 // X axis
 var x = d3.scaleBand()
   .range([ 0, width ])
   .domain(data1.map(function(d) { return d.group; }))
   .padding(0.2);
 svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x))
 
 // Add Y axis
 var y = d3.scaleLinear()
   .domain([0, 2400])
   .range([ height, 0]);
 svg.append("g")
   .attr("class", "myYaxis")
   .call(d3.axisLeft(y));
 
 // A function that create / update the plot for a given variable:
 function update(data) {
 
   var u = svg.selectAll("rect")
     .data(data)
 
   u
     .enter()
     .append("rect")
     .merge(u)
     .transition()
     .duration(1000)
       .attr("x", function(d) { return x(d.group); })
       .attr("y", function(d) { return y(d.value); })
       .attr("width", x.bandwidth())
       .attr("height", function(d) { return height - y(d.value); })
       .attr("fill", "steelblue")
 }
 
 // Initialize the plot with the first dataset
 update(data1)
 