// Function to determine marker size based on value
function markerSize(value) {
    return value * 300;
  }
  
  // An array containing all of the information needed to create markers
  var locations = [
    {
      coordinates: [41, -80],
      Total: {
        name: "United States",
        value: 4686
      },
      Gold: {
        name: "United States",
        value: 2333
      },
      Silver: {
        name: "United States",
        value: 1241
      },
      Bronze: {
        name: "United States",
        value: 1112
      }
    },
    {
      coordinates: [50, 48],
      Total: {
        name: "Soviet Union",
        value: 2061
      },
      Gold: {
        name: "Soviet Union",
        value: 830
      },
      Silver: {
        name: "Soviet Union",
        value: 635
      },
      Bronze: {
        name: "Soviet Union",
        value: 596
      }
    },
    {
      coordinates: [53, 12],
      Total: {
        name: "Germany",
        value: 1687
      },
      Gold: {
        name: "Germany",
        value: 610
      },
      Silver: {
        name: "Germany",
        value: 564
      },
      Bronze: {
        name: "Germany",
        value: 513
      }
    },
    {
      coordinates: [55, -3],
      Total: {
        name: "Great Britain",
        value: 1598
      },
      Gold: {
        name: "Great Britain",
        value: 576
      },
      Silver: {
        name: "Great Britain",
        value: 541
      },
      Bronze: {
        name: "Great Britain",
        value: 513
      }
    },
    {
      coordinates: [44, 2],
      Total: {
        name: "France",
        value: 1408
      },
      Gold: {
        name: "France",
        value: 502
      },
      Silver: {
        name: "France",
        value: 485
      },
      Bronze: {
        name: "France",
        value: 421
      }
    },
    {
      coordinates: [41, 14],
      Total: {
        name: "Italy",
        value: 1384
      },
      Gold: {
        name: "Italy",
        value: 492
      },
      Silver: {
        name: "Italy",
        value: 467
      },
      Bronze: {
        name: "Italy",
        value: 425
      }
    },
    {
      coordinates: [-31, 130],
      Total: {
        name: "Australia",
        value: 1290
      },
      Gold: {
        name: "Australia",
        value: 504
      },
      Silver: {
        name: "Australia",
        value: 450
      },
      Bronze: {
        name: "Australia",
        value: 336
      }
    },
    {
      coordinates: [47, 20],
      Total: {
        name: "Hungary",
        value: 1123
      },
      Gold: {
        name: "Hungary",
        value: 432
      },
      Silver: {
        name: "Hungary",
        value: 363
      },
      Bronze: {
        name: "Hungary",
        value: 328
      }
    },
    {
      coordinates: [60, 17],
      Total: {
        name: "Sweden",
        value: 1006
      },
      Gold: {
        name: "Sweden",
        value: 350
      },
      Silver: {
        name: "Sweden",
        value: 330
      },
      Bronze: {
        name: "Sweden",
        value: 326
      }
    },
    {
      coordinates: [55, 37],
      Total: {
        name: "Russia",
        value: 1006
      },
      Gold: {
        name: "Russia",
        value: 322
      },
      Silver: {
        name: "Russia",
        value: 294
      },
      Bronze: {
        name: "Russia",
        value: 278
      }
    }
  ];
  
  // Define arrays to hold markers
  var TotalMarkers = [];
  var GoldMarkers = [];
  var SilverMarkers = [];
  var BronzeMarkers = [];
  
 
  // Loop through locations and markers
  for (var i = 0; i < locations.length; i++) {
    // Setting the marker radius by passing value into the markerSize function
    TotalMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "red",
        fillColor: "red",
        radius: markerSize(locations[i].Total.value)
      })
    );
  
    GoldMarkers.push(
      L.circle(locations[i].coordinates, {
        stroke: false,
        fillOpacity: 0.75,
        color: "gold",
        fillColor: "gold",
        radius: markerSize(locations[i].Gold.value)
      })
    );

    SilverMarkers.push(
        L.circle(locations[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "silver",
          fillColor: "silver",
          radius: markerSize(locations[i].Silver.value)
        })
      );

    BronzeMarkers.push(
        L.circle(locations[i].coordinates, {
          stroke: false,
          fillOpacity: 0.75,
          color: "#b08d57",
          fillColor: "#b08d57",
          radius: markerSize(locations[i].Bronze.value)
        })
      );

    
  }
  
  // Create base layers
  
  // Streetmap Layer
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });
  
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });
  
  var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });
  
  // Create separate layer groups
  var Total = L.layerGroup(TotalMarkers);
  var Gold = L.layerGroup(GoldMarkers);
  var Silver = L.layerGroup(SilverMarkers);
  var Bronze = L.layerGroup(BronzeMarkers);
  
  
  
  // Create a baseMaps object
  var baseMaps = {
    "Dark Map": darkmap,
    "Street Map": streetmap,
    "Satellite Map": satellitemap
  };
  
  // Create an overlay object
  var overlayMaps = {
    "Total Medals": Total,
    "Gold Medals": Gold,
    "Silver Medals": Silver,
    "Bronze Medals": Bronze
    
  };
  
  // Define a map object
  var myMap = L.map("map", {
    center: [20, -2],
    zoom: 3,
    layers: [darkmap, Total, Gold, Silver, Bronze]
  });
  

  // Pass map layers into layer control
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
  
