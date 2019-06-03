// Store our API endpoint as queryUrl
// Returned Json is based on one week's worth of data
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Perform a GET request to the query URL
d3.json(queryUrl, function (data) {
    console.log(data.features);
    // Using the features array sent back in the API data, create a GeoJSON layer and add it to the map
    createFeatures(data.features);
});

// Create a bind function to for the magnitude feature
function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3> Earthquake Magnitude: " + feature.properties.mag + "<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Determining marker size based on earthquakeData magnitude
    function markerSize(magnitude) {
        return magnitude * 30000;
    }

    // Defined function to set the circle color based on the magnitude
    function markerColor(magnitude) {

        if (magnitude <= 1) {
            return "#90ee90"
        }
        else if (magnitude <= 2) {
            return "#f0e72b"
        }
        else if (magnitude <= 3) {
            return "#ff6600"
        }
        else if (magnitude <= 4) {
            return "#99ccff"
        }
        else if (magnitude <= 5) {
            return "#33cccc"
        }
        else if (magnitude <= 6) {
            return "#009999"
        }
        else if (magnitude <= 7) {
            return "#ff6600"
        }
        else if (magnitude <= 8) {
            return "#cc0099"
        }
        else if (magnitude <= 9) {
            return "#9933ff"
        }
        else if (magnitude <= 10) {
            return "#006600"
        }
        else {
            return "#ffcc00"
        }
    }

    // GeoJSON layer added to the map with the magnitude circles

    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (earthquakeData, latlng) {
            return L.circle(latlng, {
                radius: markerSize(earthquakeData.properties.mag),
                color: markerColor(earthquakeData.properties.mag),
                stroke: true,
                weight: .8,
                fillOpacity: 0.5
            });
        },
        onEachFeature: onEachFeature
    });
    createMap(earthquakes);
}


function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    // Define variables for our base layers
    var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    var outdoormap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
    });

    // BaseMaps object to hold our base layers
    var baseMaps = {
        "Light Map": lightmap,
        "Outdoors Map": outdoormap
    };

    // Overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create a new map
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [lightmap, earthquakes]
    });

    // Create a layer control containing our baseMaps
    // Overlay Layer containing the earthquake GeoJSON

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);


    var legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend');
        var magnitude = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var colors = ["#90ee90", "#f0e72b", "#ff6600", "#99ccff", "#33cccc", "#009999", "#ff6600", "#cc0099", "#9933ff", "#0066ff", "#006600", "#ffcc00"];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < magnitude.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
        }
        return div;
    };

    legend.addTo(myMap);
}