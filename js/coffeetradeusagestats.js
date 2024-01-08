//Define all api urls to be used to fetch data
const url_years = "http://127.0.0.1:5000/get_all_years";
const url_data_types = "http://127.0.0.1:5000/get_all_data_types";
const url_production = "http://127.0.0.1:5000/get_production_data";
const url_consumption = "http://127.0.0.1:5000/get_consumption_data";
const url_import = "http://127.0.0.1:5000/get_import_data";
const url_export = "http://127.0.0.1:5000/get_export_data";
const url_country_codes = "http://127.0.0.1:5000/get_country_codes";


//Global variables to be populated and used in the functions.
var production_data;
var consumption_data;
var import_data;
var export_data;
var country_codes;

/**
 * Following code fetches all required data and stores on client side 
 * to be used once drop down values are selected.
 * */

//fetch data from url and populate the drop down list for year.
d3.json(url_years).then(function(data) {
    d3.select("#yearDataset").append("option").text("-select-").property("value","")
    for (i=0; i<data.length; i++) {
        //Populate drop down list with options with text as name and value as index
        d3.select("#yearDataset").append("option").text(data[i]).property("value",data[i])
    }
});

//fetch data from url and populate the drop down list for the data types.
d3.json(url_data_types).then(function(data) {
    d3.select("#typeDataset").append("option").text("-select-").property("value","")
    for (i=0; i<data.length; i++) {
        //Populate drop down list with options with text as name and value as index
        d3.select("#typeDataset").append("option").text(data[i]).property("value",data[i])
    }
});

//fetch country codes.
d3.json(url_country_codes).then(function(data) {
    country_codes = data;
});

//fetch consumption data
d3.json(url_consumption).then(function(data) {
    consumption_data = data;
});

//fetch import data
d3.json(url_import).then(function(data) {
    import_data = data;
});

//fetch export data
d3.json(url_export).then(function(data) {
    export_data = data;
});

//fetch production data
d3.json(url_production).then(function(data) {
    production_data = data;
});

/**
 * Following code populates the visualization based on options selected from the drop-down.
 * */

//This function gets triggered when year is selected from the drop down
function yearChanged(value) {

    //get the data type to be used for visualization.
    var typeId = document.getElementById("typeDataset");
    var selected_type = typeId.options[typeId.selectedIndex].value;
    if (selected_type.length === 0) {
        //if nothing is selected, dont proceed.
        return;
    }

    //create bar graph
    createBar(selected_type, value);
    //create world map
    createMapChart(selected_type, value);
}

function typeChanged(value) {

    //get the year to be used for visualization.
    var yearId = document.getElementById("yearDataset");
    var selected_year = yearId.options[yearId.selectedIndex].value;
    if (selected_year.length === 0) {
        //if nothing is selected, dont proceed.
        return;
    }
    //create bar graph
    createBar(value, selected_year);
    //create world map
    createMapChart(value, selected_year);

}

function createMapChart(type, year) {

    //fetch required data to be displayed depending on type selected.
    let data = {};
    if (type === "Production") {
        data = production_data[year];
        console.log(data);
    } else if (type === "Consumption") {
        data = consumption_data[year];
        console.log(data);
    } else if (type === "Import") {
        data = import_data[year];
        console.log(data);
    } else if (type === "Export") {
        data = export_data[year];
        console.log(data);
    }

    //create map data for the display.
    map_data = getMapData(data);

    //clean previous displayed map.
    d3.select("#map-heading").text("");
    d3.select("#map").text("");

    //Write new heading for map
    var mapHeadingDiv = document.querySelector('#map-heading');
    var h3 = document.createElement('h3');
    h3.textContent = 'Coffee ' + type + ' all over the world in the year ' + year;
    mapHeadingDiv.appendChild(h3);

    //create new map.
    $('#map').vectorMap({
      map: 'world_mill',
      series: {
        regions: [{
          values: map_data,
          scale: ['#c8fffa', '#191fe0'],
          normalizeFunction: 'polynomial'
        }]
      },
      onRegionTipShow: function(e, el, code) {
        el.html(el.html()+'('+map_data[code]+')');
        }
    });
}

//Vector map uses double letter country codes to display map. This function converts country name to double letter codes.
function getMapData(data) {
    let finalData = {};

    for (const [key, value] of Object.entries(data)) {
        let countryKey = country_codes[key];
        if (countryKey == null || countryKey === null) {
            console.log("Not found:" + key);
        }
        finalData[countryKey] = value;
    }
    return finalData;
}

//Create bar graph
function createBar(type, year) {
    let data = {};
    if (type === "Production") {
        data = production_data[year];
        console.log(data);
    } else if (type === "Consumption") {
        data = consumption_data[year];
        console.log(data);
    } else if (type === "Import") {
        data = import_data[year];
        console.log(data);
    } else if (type === "Export") {
        data = export_data[year];
        console.log(data);
    }

    //sort data based on values for countries.
    sortedData = sortData(data);

    //Get x and y axis.
    let x_axis = Object.keys(sortedData);
    let y_axis = Object.values(sortedData);
    console.log(x_axis);
    console.log(y_axis);
    //get top 10 x and y axis values
    let x_axis_10 = x_axis.slice(0,10);
    let y_axis_10 = y_axis.slice(0,10);
    
    //Create bar graph.
    let trace = {
        y: y_axis_10,
        x: x_axis_10,
        type: 'bar'
    };

    let layout = {
        height: 500,
        width: 700,
        yaxis: {
            title: 'Kilograms'
        },
        title: 'Top 10 countries in coffee ' + type + ' in year ' + year,
        font: {
            family: 'Tahoma',
            size: 15,
        }
    }   

    let plot_data = [trace];

    Plotly.newPlot("bar", plot_data, layout);
}

//Sort dictionary data based on values.
function sortData(data) {
    sortedData = {}
    let keys = Object.keys(data);
    let values = Object.values(data);

    let newKeys = keys.map((x) => x);
    let newValues = values.map((x) => x);

    for (i=0; i<newValues.length; i++) {
        for (j=i+1; j<newValues.length; j++) {
            if (parseInt(newValues[i])<parseInt(newValues[j])) {
                temp = newValues[i];
                newValues[i] = newValues[j];
                newValues[j] = temp;

                temp1 = newKeys[i];
                newKeys[i] = newKeys[j];
                newKeys[j] = temp1;
            }
        }
    }

    console.log(JSON.stringify(newValues));
    let newDict = {};
    for (i=0;i<newKeys.length;i++) {
        newDict[newKeys[i]] = newValues[i]; 
    }
    console.log(JSON.stringify(newDict));
    return newDict;
}