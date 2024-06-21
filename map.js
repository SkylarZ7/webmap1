//alt+shift+a 
'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token 
mapboxgl.accessToken = 'pk.eyJ1Ijoic2t5bGFyNyIsImEiOiJjbG1vcDBubnIxNTZ5MmpxYW1rNXBrMW4yIn0.jZYrBPww12aXYpLvVzEGRw'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
/*     style: 'mapbox://styles/mapbox/basic-v9',
    style: 'mapbox://styles/mapbox/outdoors-v10',
    style: 'mapbox://styles/mapbox/light-v9',
    style: 'mapbox://styles/mapbox/dark-v9',
    style: 'mapbox://styles/mapbox/satellite-v9',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',    
    style: 'mapbox://styles/mapbox/navigation-preview-day-v2',
    style: 'mapbox://styles/mapbox/navigation-preview-night-v2',
    style: 'mapbox://styles/mapbox/navigation-guidance-day-v2',
    style: 'mapbox://styles/mapbox/navigation-guidance-night-v2',
    style: 'mapbox://styles/brianhouse/cjn0u552b52kr2spdz6yhpqj4', */
    center: [-73.93324, 40.80877],
    zoom: 14
});

var blocks_url = "./data/blocks_joined_trees_um.geojson"
var trees_url = "./data/2015_Street_Tree_Census_subset_um.geojson"
map.on('load',function(){
    // define a 'source' for your polygons dataset
    map.addSource('blocks_data',{
      'type':'geojson',
      'data': blocks_url,
    });
    // add a new layer with your polygons
    /* map.addLayer({
      'id':'blocks',
      'type':'fill',
      'source':'blocks_data',
      'paint':{
        'fill-color':'#ffffff',
        'fill-outline-color':'#000000',
        'fill-opacity': 0.5
      }
    }) */
     // add a new layer with your polygons
    map.addLayer({
        'id':'blocks',
        'type':'fill',
        'source':'blocks_data',
        'paint':{
            'fill-color': 
            //['case perform the function of sorting out null values from the dataset,
            // and making them white. Without this Mapbox would default to making them black.
            ['case', 
            ['==', ['get', 'avg_diamet'], null],
            'white',
            ['step', ['get', 'avg_diamet'],
                '#ffffff',
                2.615, '#edf8e9',
                6.444, '#bae4b3',
                9.379, '#74c476',
                15.036, '#31a354',
                26.000, '#006d2c'
            ]],
        'fill-outline-color':'#000000',
        'fill-opacity': 0.5
        }
    })
      // define a 'source' for your point dataset
    map.addSource('trees_data',{
      'type':'geojson',
      'data': trees_url
    });
    // add a new layer with your points
    map.addLayer({
      'id':'trees',
      'type':'circle',
      'source':'trees_data',
      'paint':{
        'circle-color': '#349f27',
        'circle-opacity':0.7,
        /* 'circle-radius':4 */
        'circle-radius': ['/', ['get', 'tree_dbh'], 5],
        //Originally I had 'circle-radius': ['get', 'tree_dbh'],
        // which made the mapbox radius unit exactly the tree diameter
        // in feet contained in the tree_dbh variable. This was comically large, 
        //so I the code around it divided that value by 5.
      },
    })


  });


  

