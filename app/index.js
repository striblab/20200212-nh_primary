/**
 * Main JS file for project.
 */

/**
 * Define globals that are added through the js.globals in
 * the config.json file, here, mostly so linting won't get triggered
 * and its a good queue of what is available:
 */
// /* global $, _ */

/**
 * Adding dependencies
 * ---------------------------------
 * Import local ES6 or CommonJS modules like this:
 * import utilsFn from './shared/utils.js';
 *
 * Or import libraries installed with npm like this:
 * import module from 'module';
 */


// Dependencies
import utils from './shared/utils.js';

// DOM loaded
utils.documentReady(() => {
    // Mark page with note about development or staging
    utils.environmentNoting();
});



// import Map from './tinymaps.js';
import nh from '../sources/nh-pct-small.json';


var centerD = [-71.562839, 44.006521];
var zoom1 = 6.5;
var zoom2 = 7;


var centerM = [-71.562839, 44.006521];
var zoomM = 6.3;


if ($("#mainslide").width() < 520) {
    var minzoom1 = zoomM;
    var minzoom2 = zoomM;
} else {
    var minzoom1 = zoom1;
    var minzoom2 = zoom2;
}

// const colorScale = d3.scaleOrdinal()
//             .domain(['SANDERS', 'BIDEN', 'KLOBUCHAR', 'WARREN', 'BUTTEGIEG', 'YANG', 'STEYER', 'BLOOMBBERG', 'PATRICK', 'GABBARD', 'BENNET', 'DELANEY'])
//             .range(['#8CBF82','#DEA381','#80ADAD','#7D739C','#F2614C','#636363','##969696','#969696','#969696','#969696','#969696','#969696']);

const candidates = ['SANDERS', 'BIDEN', 'KLOBUCHAR', 'WARREN', 'BUTTIGIEG', 'YANG', 'STEYER', 'BLOOMBERG', 'PATRICK', 'GABBARD', 'BENNET', 'TIED'];
const colors = ['#8CBF82','#415B46','#80ADAD','#7D739C','#379B9B','#252525','#252525','#969696','#969696','#969696','#969696','#F7F7F7'];

mapboxgl.accessToken = 'pk.eyJ1Ijoic3RhcnRyaWJ1bmUiLCJhIjoiY2sxYjRnNjdqMGtjOTNjcGY1cHJmZDBoMiJ9.St9lE8qlWR5jIjkPYd3Wqw';


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: centerD,
    zoom: zoom2,
    minZoom: minzoom2
});


map.keyboard.disable();
map.scrollZoom.disable();
// map2.dragPan.disable();
// map2.boxZoom.disable();

if (utils.isMobile()) {
    map.dragRotate.disable();
    map.touchZoomRotate.disableRotation();
} else {
    map.getCanvas().style.cursor = 'grab';
    map.addControl(new mapboxgl.NavigationControl({
        showCompass: false
    }));
}


map.on('load', function() {

    map.addSource('nh', {
        type: 'geojson',
        data: nh
    });


    map.addLayer({
        'id': 'nh-layer',
        'interactive': true,
        'source': 'nh',
        'layout': {},
        'type': 'fill',
        'paint': {
            'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'results_KLOBRANK'],
                0,
                '#f7f7f7',
                1,
                '#556E7F',
                2,
                '#7F98AA',
                3,
                '#C6D1D9',
                4,
                '#DAE1E7',
                5,
                '#CCCCCC'
            ],
            'fill-opacity': 0.75,
            'fill-antialias': true,
            'fill-outline-color': '#333333'
        }
    }, 'settlement-label');

});


const map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/startribune/ck1b7427307bv1dsaq4f8aa5h',
    center: centerD,
    zoom: zoom1,
    minZoom: minzoom1
});

map2.keyboard.disable();
map2.scrollZoom.disable();
map2.dragPan.disable();
map2.boxZoom.disable();


map2.on('load', function() {

    map2.addSource('nh', {
        type: 'geojson',
        data: nh
    });

    map2.addLayer({
        'id': 'nh-layer2',
        'interactive': true,
        'source': 'nh',
        'layout': {},
        'type': 'fill',
        'paint': {
            'fill-color': [
                'match',
                ['get', 'results_GROUP'],
                'BLOC',
                '#7D739C',
                'PROG',
                '#C28059',
                'NONE',
                '#f7f7f7',
                '#f7f7f7'
            ],
            'fill-opacity': 0.75,
            'fill-antialias': true,
            'fill-outline-color': '#333333'
        }
    }, 'settlement-label');

});







$(document).ready(function() {

    if ($("#mainslide").width() < 520) {
        map.flyTo({
            center: centerM,
            zoom: zoomM,
        });
        map2.flyTo({
            center: centerM,
            zoom: zoomM,
        });
    } else {
        map.flyTo({
            center: centerD,
            zoom: zoom2,
        });
    }

    $(window).resize(function() {
        if ($("#mainslide").width() < 520) {
            map.flyTo({
                center: centerM,
                zoom: zoomM,
            });
            map2.flyTo({
                center: centerM,
                zoom: zoomM,
            });
        } else {
            map.flyTo({
                center: centerD,
                zoom: zoom2,
            });
        }
    });

    $(".reset").on("click", function() {
        map.flyTo({
          center: centerD,
          zoom: minzoom2
      });
    });

    var cities = [[-71.463089,42.990929],
        [-71.463951,42.757870],
        [-71.537292,43.209572],
        [-71.324173,42.881981],
        [-70.874509,43.193812],
        [-70.976140,43.305298],
        [-71.209995,42.780890],
        [-71.375586,42.868062]];

    $(".adjacent").on("click", function() {
        var index = Number($(this).attr("index"));
        map.flyTo({
          center: cities[index],
          zoom: 10
      });
    });

});