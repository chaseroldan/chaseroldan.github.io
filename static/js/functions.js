function queryByMonth(monthNumber, data){
    //THIS FUNCTION RETURNS THE DATA FOR THE MONTH PASSED AS PARAMETER 
        var queriedData = data.filter(filterMonth);
        function filterMonth(entryValue){
            var dateOcc = `${entryValue.Date} ${entryValue.Time_of_Day}`;
            var month = new Date(dateOcc);
            return (monthNumber === month.getMonth());
        }
        return queriedData;
    };
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function groupedBy(colName, data){
    //THIS FUNCTION WILL RETURN AN OBJECT WITH KEYS THE UNIQUE VALUES
    //IN "colName"-COLUMN AND VALUES THE ROWS WITH THIS SPECIFIC VALUE.
        //GET UNIQUE VALUES IN COLUMN
        var columnValues = [];
        data.forEach(record => Object.entries(record)
            .forEach(([key, value]) => {
                if (key === colName){columnValues.push(value)}
            }));
        var uniques = columnValues.filter((value, index, self) => self.indexOf(value) === index);
        // console.log(uniques);
        // CREATE A LIST WITH THE GROUPS
        var groupedData = [];
        for (var i=0; i<uniques.length; i++){
            var group = data.filter(function(dataItem) {
                var booleanValue = false;
                Object.entries(dataItem).forEach(([key, value]) => {
                    if (key === colName){
                        if (value === uniques[i]){
                            booleanValue = true;
                        }else{
                            booleanValue = false;
                        }
                    }
                });
                return booleanValue;
            });
            groupedData.push({'key': uniques[i], 'values': group});
        }
        // console.log(groupedData);
        return groupedData;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function ageGroups(datos){
    //THIS FUNCTION TAKES AN OBJECT WITH DATA AND RETURN A DICTIONARY WITH
    //KEYS THE AGE GROUP TAG AND VALUES, THE ROWS BELONG TO THE GROUP.
        var ageGroups = [];
        // Using the column "VictimAge" from "datos", we'll group data.
        // The first group would be people 20 years old or younger
        var group1 = datos.filter(entryDatos => parseInt(entryDatos.Victim_Age) <= 20);
        ageGroups.push({"key": "-20", "values": group1});
        // the groups will be (21-30),(31-40),(41-50),(51-60)
        for (var i=2; 5; i=i+1){
            var group = datos.filter(entryDatos =>  {
                var booleanAge = false;
                if (parseInt(entryDatos.Victim_Age)> (i*10)){
                    if (parseInt(entryDatos.Victim_Age) < ((i*10) + 11)){
                        booleanAge = true;
                    }
                }
                return booleanAge;
            });
            ageGroups.push({"key": `${(i*10)+1}-${(i*10)+10}`, "values": group});
            if (i === 5){break;} //Note: have to stop the 'for-LOOP' manually...
        };
        // The last group would be people 61 years old or older
        var group6 = datos.filter(entryDatos => parseInt(entryDatos.Victim_Age) > 60);
        ageGroups.push({"key": "60-", "values": group6});
        // console.log(ageGroups);
        return ageGroups;
    };
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function skecthRadar(data, ctx){
    // RADAR MAP.- it will show the difference between the occurrence of collisions
    // through some age groups and divided by victims_sex (male, female, other)
        // sexGroups.- divides the data into groups by sex
        var sexGroups = groupedBy("Victim_Sex", data);
    
        // Each entry in sexGroup is an object: key=group, values=values
        var firstG = ageGroups(sexGroups[0].values);
        var secondG = ageGroups(sexGroups[1].values);
        var thirdG = ageGroups(sexGroups[2].values);
    
        var chartReturn = new Chart(ctx,{
            type : 'radar',
            data : {
                labels : firstG.map(entrada => entrada.key),
                datasets : [{
                    data : firstG.map(entrada => entrada.values.length),
                    label : sexGroups[0].key,
                    borderColor : "green"
                    },
                    {
                    data : secondG.map(entrada => entrada.values.length),
                    label : sexGroups[1].key,
                    borderColor : "red"
                    },
                    {
                    data : thirdG.map(entrada => entrada.values.length),
                    label : sexGroups[2].key,
                    borderColor : "blue"
                    }]},
            options : {
                title : {
                    display : true,
                    position : "top",
                    text: "Number of deaths per age group",
                    fontSize : 18
                },
                legend : {
                    display: true,
                    position: "bottom"
                }

            }
            
        })
        return chartReturn;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function skecthLine(datos, ctx){
    // LINE CHART: this chart will display information about the amount of collisions
    // in every day of the month separeted by column "Victim Sex"
        var sexGroup = groupedBy("Victim_Sex", datos);
        // the following groups contain data separated by day for sex groups
        var firstG = groupedBy("Date", sexGroup[0].values);
        var secondG = groupedBy("Date", sexGroup[1].values);
        var thirdG = groupedBy("Date", sexGroup[2].values);

        // console.log(firstG);
    
        firstG = firstG.sort(function(a,b){
            var num1 = new Date(`${b.key}`);
            var num2 = new Date(`${a.key}`);
            num1 = parseInt(num1.getDate());
            num2 = parseInt(num2.getDate());
            return num2-num1;
        });
        secondG = secondG.sort(function(a,b){
            var num1 = new Date(`${b.key}`);
            var num2 = new Date(`${a.key}`);
            num1 = parseInt(num1.getDate());
            num2 = parseInt(num2.getDate());
            return num2-num1;
        });
        thirdG = thirdG.sort(function(a,b){
            var num1 = new Date(`${b.key}`);
            var num2 = new Date(`${a.key}`);
            num1 = parseInt(num1.getDate());
            num2 = parseInt(num2.getDate());
            return num2-num1;
        });

        var chartReturn = new Chart (ctx,{
            type: 'line',
            data : {
                labels : firstG.map(entrada => entrada.key),
                datasets : [
                    {
                    data : firstG.map(entrada => entrada.values.length),
                    label : sexGroup[0].key,
                    borderColor : "green",
                    lineTension : 0,
                    fill : false,
                    radius : 1
                    },
                    {
                    data : secondG.map(entrada => entrada.values.length),
                    label : sexGroup[1].key,
                    borderColor : "red",
                    lineTension : 0,
                    fill : false,
                    radius : 1
                    },
                    {
                    data : thirdG.map(entrada => entrada.values.length),
                    label : sexGroup[2].key,
                    borderColor : "blue",
                    lineTension : 0,
                    fill : false,
                    radius : 1
                    }]},
            options : {
                responsive : true,
                title : {
                    display : true,
                    position : "top",
                    text: "Daily deaths per sex",
                    fontSize : 18
                },
                legend : {
                    display: true,
                    position: "bottom"
                },
                tooltips: {
                    mode: 'point',
                    intersect : true,
                    // custom : function(){
                    //     console.log(this);
                    //     console.log(this._data.labels)
                    // },
                    callbacks : {
                        label : function(tooltipItem){
                            // console.log(tooltipItem.index);
                            // the followin index is based on the idea that
                            // the dates are sort from least to high
                            // The index just represents the order in the array
                            if(oneChart){
                                eraseDataFromChart(oneChart);
                                eraseDataFromChart(twoChart);
                                // eraseDataFromChart(threeChart);
                            }
                            oneChart = weatherinformationBar(tooltipItem.index, datos);
                            twoChart = hourlyInformationBar(tooltipItem.index, datos);
                            // threeChart = sketchLineGroupageDays(tooltipItem.index, datos);
                        }
                    }
                    },
                },
            },
            
        )
        // console.log(chartReturn.options.tooltips);
        return chartReturn;
    };
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function weatherinformationBar(dateDay, datos){
        // console.log(datos);
        // LINE CHART: this chart will display information about the amount of collisions
        var specificDay = datos.filter(function(entry){
            var entryDay = new Date(entry.Date)
            return entryDay.getDate() === (dateDay+1)
        })

        // console.log(specificDay);

        var chartReturn = new Chart(ctxOneDay,{
            type : 'horizontalBar',
            data : {
                labels : ["Min Temperature", "Avg Temperature", "High Temperature"],
                datasets : [{
                    data : [specificDay[0].Min, specificDay[0].Average,specificDay[0].Max],
                    label : "Daily Weather Information",
                    backgroundColor : "lightorange"
                }]
                },
            options : {
                responsive : true,
                title : {
                    display : true,
                    position : "top",
                    text:`Weather Information: ${specificDay[0].Date}`,
                    fontSize : 18
                },
                legend : {
                    display: false,
                    position: "bottom"
                }} 
        })
        return chartReturn;
        };
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function hourlyInformationBar(dateDay, datos){
        var specificDay = datos.filter(function(entry){
            var entryDay = new Date(entry.Date)
            return entryDay.getDate() === (dateDay+1)
        })
        var deathsPerHour = groupedBy("Time_of_Day", specificDay);
        // console.log(deathsPerHour);
        deathsPerHour.sort(function(a,b){
            var num1 = new Date(`${b.values[0].Date} ${b.key}`);
            var num2 = new Date(`${a.values[0].Date} ${a.key}`);
            console.log(num1);
            num1 = parseInt(num1.getHours());
            num2 = parseInt(num2.getHours());
            return num2-num1;
        });
        // console.log(deathsPerHour);
        
        var chartReturn = new Chart(ctxbar,{
            type : 'bar',
            data : {
                labels : deathsPerHour.map(hour => hour.key),
                datasets : [{
                    data : deathsPerHour.map(hour => hour.values.length),
                    label : "Hourly deaths",
                    backgroundColor : "darkorange"
                }]
                },
            options : {
                responsive : true,
                title : {
                    display : true,
                    position : "top",
                    text: `Hourly deaths: ${specificDay[0].Date}`,
                    fontSize : 18
                },
                legend : {
                    display: true,
                    position: "bottom"
                }} 
        })
        return chartReturn;
    }
    
    
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //FUNCTION THAT RENDERS STATICALLY INFORMATION OF NUMBER OF DEATHS IN THE CURRENT MONTH

    function sketchLineGroupageDays(datos, ctx){
        var ageGroupsMonth = ageGroups(datos);
        
        var listGroups = [];
        for (var i =1; i<3; i++){
            var oneEntry = {
                "key" : ageGroupsMonth[i].key,
                "values" :  groupedBy("Date", ageGroupsMonth[i].values)
            }
            listGroups.push(oneEntry);
        }
        // console.log(listGroups);
   
        var colores = ['gray', 'orange','yellow', 'blue', 'red', 'purple', 'orange'];
        var datasets = [];
        for (i in listGroups){
            var entry = {
                data : listGroups[i].values.map(entrada => entrada.values.length),
                label : listGroups[i].key,
                backgroundColor : colores[i],
                lineTension : 0,
                fill : false, 
                radius : 1
            }
            datasets.push(entry);
        }
        
        var chartReturn = new Chart(ctx,{
            type : 'bar',
            data : {
                labels : listGroups[0].values.map(entry => entry.key),
                datasets : datasets
                },
            options : {
                responsive : true,
                title : {
                    display : true,
                    position : "top",
                    text: `Number of deaths sorted by age group`,
                    fontSize : 18
                },
                legend : {
                    display: true,
                    position: "bottom"
                }} 
        })
        return chartReturn;    

    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function eraseDataFromChart(chart){
    //THIS FUNCTION WILL DELETE ALL THE INFORMATION THAT IS RENDERED IN THE 
    //CURRENT CHART, SO THE CHART WILL ACCEPT NEW DATA.
        for(var i=0; i < chart.data.labels.length; i=i+1){
            chart.data.labels=[];
        }
        chart.data.datasets.forEach((entry)=>{
            entry.data = [];
        });
        chart.update();
    }
    

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TAG OF A BIREF DESCRIPTION OF THE CURRENT MONTH
    function paragraphMonth(data, totalDeaths){
        var averageTemp = data.map(entry => parseInt(entry.Average));
        var minTemp = data.map(entry => parseInt(entry.Min));
        var maxTemp = data.map(entry => parseInt(entry.Max));

        var sum = 0;
        for (i in averageTemp){
            sum = sum + averageTemp[i];
        }
        var avTemp = Math.floor(sum/(averageTemp.length) * 100);
        var porcentages = Math.floor(data.length/totalDeaths * 10000);

        var paragraphReturn = `In this month the reported average temperature was at ${avTemp/100}°F, the minimum temperature was ${Math.min(...minTemp)}°F,
        and the maximum got up to ${Math.max(...maxTemp)}°F. \n\n
        Aditionally, the total amount of deaths reported in this month represent the ${porcentages/100}% of total deaths registered in Los Angeles City during 2019 due to car collisions.`
        return paragraphReturn;
    }
