let myMap;
let coffeeTypeFilter = 'All';
let productionYearFilter = null;
let coffeeCountryFilter = null;

const countryCodes = {
    'United States': 'US',
    'Ireland': 'IRE',
    'United Kingdom': 'UK'
    // Add more country mappings as needed
};

function init() {
    //fetch the data from the flask API
    const coffee_type = [];
    const coffee_year = [];
    const coffee_country = [];
    let idDropDown1 = d3.select("#selDataset1");
    // Select the coffee year dropdown
    let idDropDown2 = d3.select("#selDataset2");

    let idDropDown3 = d3.select("#selDataset3");
    

    fetch('http://127.0.0.1:5000/coffeeCountries')
        .then(response => response.json())
        .then(dataResp => {
            console.log('Data from Flask API:', dataResp);
            coffee_country.push('All');
            for (i = 0; i < dataResp.length; i++) {


                    coffee_country.push(dataResp[i].country);


            }
            // Loop through roast types list and add each item to the dropdown
            for (let i = 0; i < coffee_country.length; i++) {

                let newOption = idDropDown3.append("option");
                newOption.attr("value", coffee_country[i]);
                newOption.text(coffee_country[i]);

            }
        })

    fetch('http://127.0.0.1:5000/coffee')
        .then(response => response.json())
        .then(dataResp => {
            console.log('Data from Flask API:', dataResp);

            coffee_type.push('All');
            for (i = 0; i < dataResp.length; i++) {

                if (dataResp[i].country === 'United States') {
                    coffee_type.push(dataResp[i].coffee_type);

                }

            }


            // Loop through coffee types list and add each item to the dropdown
            for (let i = 0; i < coffee_type.length; i++) {
                let newOption = idDropDown1.append("option");
                newOption.attr("value", coffee_type[i]);
                if (coffee_type[i] === 'Ara') {
                    newOption.text("Arabica");
                }
                else if (coffee_type[i] === 'Rob') {
                    newOption.text("Robusta");
                }
                else if (coffee_type[i] === 'Lib') {
                    newOption.text("Liberica");
                }
                else if (coffee_type[i] === 'Exc') {
                    newOption.text("Excelsa");
                }
                else {
                    newOption.text(coffee_type[i]);
                }

            }
        })

    fetch('http://127.0.0.1:5000/coffeeYear')
        .then(response => response.json())
        .then(dataResp => {
            console.log('Data from Flask API:', dataResp);
            coffee_year.push('All');
            for (i = 0; i < dataResp.length; i++) {

                if (dataResp[i].country === 'United States') {
                    coffee_year.push(dataResp[i].order_year);

                }

            }
            // Loop through roast types list and add each item to the dropdown
            for (let i = 0; i < coffee_year.length; i++) {

                let newOption = idDropDown2.append("option");
                newOption.attr("value", coffee_year[i]);
                newOption.text(coffee_year[i]);

            }
        })

    console.log('Data from coffee_year:', coffee_year);
    console.log('Data from coffee_type:', coffee_type);
    // Select the coffee type dropdown
    initializeMap();
};

function isEmpty(value) {
    return (value == null || (typeof value === "string" && value.trim().length === 0) || value === "All");
}


function initializeMap() {
    myMap = L.map('map').setView([37.8, -96], 4); // Centered on the USA

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(myMap);

    updateMap();
}

function updateMap() {
    coffeeTypeFilter = document.getElementById('selDataset1').value;
    productionYearFilter = document.getElementById('selDataset2').value;
    coffeeCountryFilter =  document.getElementById('selDataset3').value;   

    let url = 'http://127.0.0.1:5000/get_order_City_CoffeeType';

    if (!isEmpty(coffeeTypeFilter) && isEmpty(productionYearFilter)) {
        url = 'http://127.0.0.1:5000/get_order_City_ByCoffeType';
    }
    if (isEmpty(coffeeTypeFilter) && !isEmpty(productionYearFilter)) {
        url = 'http://127.0.0.1:5000/get_order_City_ByYear';
    }
    if (isEmpty(coffeeTypeFilter) && isEmpty(productionYearFilter)) {
        url = 'http://127.0.0.1:5000/get_order_City';
    }
    // Clear existing markers
    myMap.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            myMap.removeLayer(layer);
        }
    });

    // OpenCage Geocoding API Key
    const apiKey = 'bb226dea3da142138c9617b3a588c5f3';
    const country = 'US';
    // Helper function to get latitude and longitude from a zipcode using OpenCage API


    fetch(url)
        .then(response => response.json())
        .then(dataResp => {
            console.log('Data from Flask API:', dataResp);
            const datacoffee = [];
            for (i = 0; i < dataResp.length; i++) {
                if (i < 50) {

                    //if (dataResp[i].country === "United States") {
                        //console.log('entry from dataResp[i]-1:', dataResp[i]);
                        if (isEmpty(coffeeCountryFilter) || dataResp[i].country === coffeeCountryFilter) {
                        datacoffee.push({ City: dataResp[i].city, ProductionYear: dataResp[i].order_year, Country: dataResp[i].country, ZipCode: dataResp[i].zipcode, Quantity: dataResp[i].quantity, CoffeeName: dataResp[i].coffee_type });
                        }
                    //}
                }
            }


            async function getLatLong(city,country,zipCode) {
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city},${country},${zipCode}&key=${apiKey}`);
                console.log('Data from Longitude:', response);
                const data = await response.json();
                const { lat, lng } = data.results[0].geometry;
                //console.log('Data from Longitude:', data.results[0].geometry);
                return [lat, lng];
            }

            // Add markers based on filtered data
            datacoffee.forEach(async entry => {
                console.log('Data from countryCode:', entry.Country);
                const countryCode = countryCodes[entry.Country] || entry.Country;
                console.log('Data from countryCode:', countryCode);
                const coordinates = await getLatLong(entry.City,countryCode,entry.ZipCode);
                if (coordinates) {
                    const marker = L.marker(coordinates).addTo(myMap);
                    marker.bindPopup(`<b>${entry.City}</b><br>Quantity: ${entry.Quantity} Kg<br>Latitude: ${coordinates[0]}<br>Longitude: ${coordinates[1]}`);
                }
            });

        })
}

init();