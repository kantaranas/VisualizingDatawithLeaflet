
# Homework - Visualizing Data with Leaflet

## Level 1 - Basic Visualization 

Goal: Visualize the last seven days of sismic activity recorded around the globe.

**Data provided by United States Geological Survey.**

Visualization Facts:
* Highlight areas, using markers, where the earthquakes ocurred.

* Illustrate the magnitude of the earthquakes using different criteria such as:
    * Colors
    * Size of the marker
    
* Popups providing additional information about the earthquake such as: magnitude, date, the distance from the epicenter to the nearest town.

* Add grayscale and outdoor layers to the map.

* Add color coded legend illustrating the correlation between the color designation and the earthquake magnitude.

## Code Snipet 

```js
// Store our API endpoint as queryUrl
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
```

## Grayscale Map 

## Outdoors Layer 


```python

```
