var janBut = document.getElementById("january");
var febBut = document.getElementById("february");
var marBut = document.getElementById("march");
var aprBut = document.getElementById("april");
var mayBut = document.getElementById("may");
var junBut = document.getElementById("june");
var julBut = document.getElementById("july");
var augBut = document.getElementById("august");
var sepBut = document.getElementById("september");
var octBut = document.getElementById("october");
var novBut = document.getElementById("november");
var decBut = document.getElementById("december");
// var yearBut = document.getElementById("year");

var monthluButtons = [janBut, febBut, marBut, aprBut,mayBut, junBut, julBut, augBut, sepBut, octBut, novBut, decBut];
for( i in monthluButtons){
    monthluButtons[i].addEventListener("click", pickedMonth);
}
var ctxradar = document.getElementById('radarChart').getContext('2d');
var radarChart;
var ctxline = document.getElementById('lineChart').getContext('2d');
var lineChart;
var ctxbar = document.getElementById('barChart').getContext('2d');
var barChart;
var ctxLineGroupAge = document.getElementById('lineGroupage').getContext('2d');
var ctxOneDay = document.getElementById('oneDayWeather').getContext('2d');
var oneChart;
var twoChart;
var lineAgeGroup;
var heatArray = [];
var initialLenght;
var jumbotron1Label = document.getElementById("jumbotron1");
var jumbotron1UnertextLabel = document.getElementById("jumbotron1Undertext");

d3.csv("../static/js/joined_traffic_weather2.csv")
        .then(function(data){
            // console.log(data);
            initialLength = data.length;
            return queryByMonth(0, data);
        })
        .then(function(data){
        // FROM THIS POINT ON, the data has been separated by chosen month
            // console.log(data);
            // CALL FUNCTIONS THAT WILL RESKETCH CHARTS
            // reSketchHeatMap(data);
            
            jumbotron1Label.textContent = "JANUARY";
            jumbotron1Undertext.textContent = paragraphMonth(data, initialLength);

            radarChart = skecthRadar(data, ctxradar);
            lineChart = skecthLine(data, ctxline);
            // lineGroupageDays = sketchLineGroupageDays(data, ctxLineGroupAge);          
            // barChart = sketchBar(data, ctxbar);
            lineAgeGroup = sketchLineGroupageDays(data, ctxLineGroupAge);
            sketchMapbox(data);

        })



function pickedMonth(){
    var currentMonth = this.id;
    var numMonth = null;
    if (heatArray.length > 0){
        heatArray = [];
    }

    switch (currentMonth){
        case("january"): {numMonth = 0; break}
        case("february"): {numMonth = 1; break}
        case("march"): {numMonth = 2; break}
        case("april"): {numMonth = 3; break}
        case("may"): {numMonth = 4; break}
        case("june"): {numMonth = 5; break}
        case("july"): {numMonth = 6; break}
        case("august"): {numMonth = 7; break}
        case("september"): {numMonth = 8; break}
        case("october"): {numMonth = 9; break}
        case("november"): {numMonth = 10; break}
        case("december"): {numMonth = 11; break}
    };

    if(numMonth>=0){
        d3.csv("../static/js/joined_traffic_weather2.csv")
        .then(function(data){
            // console.log(data);
            return queryByMonth(numMonth, data);
        })
        .then(function(data){
        // FROM THIS POINT ON, the data has been separated by chosen month
            console.log(data);
            // CALL FUNCTIONS THAT WILL RESKETCH CHARTS
            // reSketchHeatMap(data);
            // Erase data from existing charts, to render new information
            if (lineChart){
                eraseDataFromChart(radarChart);
                eraseDataFromChart(lineChart);
                eraseDataFromChart(lineAgeGroup);
                // eraseDataFromChart(barChart);
                // console.log("true for radar")
            }
            // else{console.log("not radar chart")};


            jumbotron1Label.textContent = currentMonth.toUpperCase();
            jumbotron1Undertext.textContent = paragraphMonth(data, initialLength);

            radarChart = skecthRadar(data, ctxradar);
            lineChart = skecthLine(data, ctxline);
            // barChart = sketchBar(data, ctxbar);
            lineAgeGroup = sketchLineGroupageDays(data, ctxLineGroupAge);
            sketchMapbox(data);

        })
    
    }

}