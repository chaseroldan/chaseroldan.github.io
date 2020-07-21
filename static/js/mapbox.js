var myMap;

function sketchMapbox(data){
  
  if(myMap){
    console.log("true")
    myMap.remove()
  }
  if(myMap === null){
    console.log("correct")
  }


  myMap = L.map("mapBoxChart",{
    center : [34.05, -118.24],
    zoom : 10,
    width : 400,
    height : 400
  });
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
    }).addTo(myMap);

  for (var i = 0; i < data.length; i++) {
    if (location) {
      heatArray.push([data[i].Latitude, data[i].Longitude]);
    }
  }

  heat = L.heatLayer(heatArray, {
      radius: 15,
      blur: 30,
      layout : {
        visibility : "visible"
      }
    }).addTo(myMap);

  return myMap;
}