//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var ctxradar = document.getElementById('radarChart').getContext('2d');
var radarChart;
var ctxline = document.getElementById('lineChart').getContext('2d');
var lineChart;
var ctxbar = document.getElementById('barChart').getContext('2d');
var barChart;
var ctxmap = d3.select('mapBoxChart');
var ctxOneDay = document.getElementById('oneDayWeather').getContext('2d');
var oneChart;
var lastTag;
var heatArray = [];

d3.selectAll(".labelMonth").on("click", function(){
    // console.log(d3.select(this).classed({color:"GREEN"}));
    if (lastTag){
        lastTag.style("font-weight", "normal");
        heatArray = [];
    }
    d3.select(this).style("font-weight", "bold");
    lastTag = d3.select(this);
    var numMonth;
    var value = d3.select(this).text();
    switch (value){
        case("January"): {numMonth = 0; break}
        case("February"): {numMonth = 1; break}
        case("March"): {numMonth = 2; break}
        case("April"): {numMonth = 3; break}
        case("May"): {numMonth = 4; break}
        case("June"): {numMonth = 5; break}
        case("July"): {numMonth = 6; break}
        case("August"): {numMonth = 7; break}
        case("September"): {numMonth = 8; break}
        case("October"): {numMonth = 9; break}
        case("November"): {numMonth = 10; break}
        case("December"): {numMonth = 11; break}
    };
    
    d3.csv("../static/js/joined_traffic_weather2.csv")
        .then(function(data){
            // console.log(data);
            return queryByMonth(numMonth, data);
        })
        .then(function(data){
        // FROM THIS POINT ON, the data has been separated by chosen month
            // console.log(data);
            // CALL FUNCTIONS THAT WILL RESKETCH CHARTS
            // reSketchHeatMap(data);
            // Erase data from existing charts, to render new information
            if (lineChart){
                eraseDataFromChart(radarChart);
                eraseDataFromChart(lineChart);
                // eraseDataFromChart(barChart);
                // console.log("true for radar")
            }
            // else{console.log("not radar chart")};

            radarChart = skecthRadar(data, ctxradar);
            lineChart = skecthLine(data, ctxline);
            // barChart = sketchBar(data, ctxbar);
            sketchMapbox(data);

        })
    
})


