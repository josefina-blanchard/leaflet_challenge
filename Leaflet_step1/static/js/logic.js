const API_key = "pk.eyJ1IjoiamJsYW5jaGFyZCIsImEiOiJjazJydG1iZ2MwdGhqM2RvM2NnMnE1M2djIn0.enKerU3arXo30oiKV_vgZA"

// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
const myMap = L.map("map", {
    center: [45.52, -122.67],
    zoom: 2
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_key
}).addTo(myMap);

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data){
    console.log(data);
    function marker_color(magnitude){
        switch(true){
            case magnitude > 5: 
                return "#e83e35";
            case magnitude >3:
                return "#faa720";
            case magnitude > 0:
                return "#f5f11d";
        }
    }
    L.geoJson(data, {
        pointToLayer: function(feature, layer){
            //console.log(feature.properties.mag)
            return L.circleMarker(layer, {
                radius: feature.properties.mag*2,
                fillColor: marker_color(feature.properties.mag), 
                color: "#00000", 
                fillOpacity: 1
            });
        }
    }).addTo(myMap);




    
});