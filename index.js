// initializing our map and defining the coordinates of our place(Nairobi)

let map = L.map('map').setView([-1.2921, 36.8219], 7);

// adding the leaflet to our map and leaflet links to the map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// events
map.on('click', function(e){

var popupContent = `Latitude: ${e.latlng.lat}, <br/> Longitude: ${e.latlng.lng}`

 L.popup(e.latlng).addTo(map)
        .bindPopup(popupContent)
        .openPopup();
 });

// Kenya forest layer
let kenya_forest = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: "GEOVISUALIZATION:ken_forests",
    transparent: true,
    format: 'image/png',
});
// Kenya grasslands
// let kenya_grassland = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
//     layers: "GEOVISUALIZATION:ken_grasslands",
//     transparent: true,
//     format: 'image/png',
// });
let kenya_grassland = L.tileLayer.wms('https://geoportal.icpac.net/geoserver/wms?', {
    layers:"geonode:ken_grasslands",
    transparent: true,
    format: 'image/png',
}).addTo(map);
// https://geoportal.icpac.net/geoserver/wms?service=WMS&request=GetMap&layers=geonode%3Aken_grasslands&format=image%2Fjpeg&height=550&width=445&srs=EPSG%3A4326&bbox=33.94909999999982%2C-4.389349999999467%2C41.9032900000002%2C5.428019999999378
// Kenya croplands
let kenya_croplands_2015 = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: "GEOVISUALIZATION:kenya_croplands_2015",
    transparent: true,
    format: 'image/png',
});

// overlay maps
let overlayMaps = {
    "kenyaForest": kenya_forest,
    "kenyaCropland 2015": kenya_croplands_2015,
    // "kenyagrassland": kenya_grassland,
    "kenya_grassland":kenya_grassland,
};

//adding google hybrid as base_map
let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//adding google streets as base_map

let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//adding google satellite as base_map

let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//adding google terrain as base_map

let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//adding carto_db as base_map

let cartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png', {
   attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>',
   subdomains: 'abcd',
   maxZoom: 20,
   minZoom: 0
});

// Initializing baseMaps
let baseMaps = {
    "Google Hybrid":googleHybrid,
    "Google Streets": googleStreets,
    "Google Satellite":googleSat,
    "Google Terrain":googleTerrain,
    "CartoDB": cartoDB,
}

// declaring layer controls to overlay our maps
let layerControl = L.control.layers(baseMaps, overlayMaps,{collapsed:false}).addTo(map);
// Adding a search location to the map
L.Control.geocoder().addTo(map);
