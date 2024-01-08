//Function to initialize the page with default values and plot
function init(){
  initializeImportCountries();
  initializeExportCountries();
};

function initializeImportCountries(){
  //fetch the data from the flask API
  fetch('http://127.0.0.1:5000/getCountries')
  .then(response => response.json())
    .then(data => {
      console.log('Data from Flask API:', data);

    // Select the coffee type dropdown
    let idDropDown1 = d3.select("#selDatasetCountries");
    // Loop through coffee types list and add each item to the dropdown
    for(let i=0;i<data.length;i++){
      let newOption = idDropDown1.append("option");
      newOption.attr("value", data[i]);
      newOption.text(data[i]);    

    }  
    
})
.catch(error => console.error('Error fetching data:', error))
}

function initializeExportCountries(){
  //fetch the data from the flask API
  fetch('http://127.0.0.1:5000/getCountriesExport')
  .then(response => response.json())
    .then(data => {
      console.log('Data from Flask API:', data);

    // Select the coffee type dropdown
    let idDropDown1 = d3.select("#selExportCountries");
    // Loop through coffee types list and add each item to the dropdown
    for(let i=0;i<data.length;i++){
      let newOption = idDropDown1.append("option");
      newOption.attr("value", data[i]);
      newOption.text(data[i]);    
    }  
    
  }).catch(error => console.error('Error fetching data:', error))
} 

//Call the init function
init();


function countrySelected(selected) { 
  console.log(selected);  
  createImportBar(selected);
}

function createImportBar(selected){
  fetch('http://127.0.0.1:5000/coffeeImport/'+selected+'')
      .then(response => response.json())
        .then(resdata => {
          console.log('Data from Flask API:', resdata[0]);

          var labels = [];
          var values = [];
          let i=0;
          Object.entries(resdata[0]).forEach(([key, value]) => {
            if(i>0){
              labels.push(key);
              values.push(value);
            }
            i++;
          });
          
          
          console.log(labels); 
          console.log(values); 
          let trace1 = {
            y: values,
            x: labels,
            type: 'line',
          };
          plotdata = [trace1];
          d3.select('#importTimeSeries').html("");
          Plotly.newPlot("importTimeSeries", plotdata);

        })
        .catch(error => console.error('Error fetching data:', error))
}

countrySelected('Austria');

function exportCountrySelected(selected) { 
  console.log(selected);  
  createExportBar(selected);
}

function createExportBar(selected){
  fetch('http://127.0.0.1:5000/CoffeeExport/'+selected+'')
      .then(response => response.json())
        .then(resdata => {
          console.log('Data from Flask API:', resdata[0]);

          var labels = [];
          var values = [];
          let i=0;
          Object.entries(resdata[0]).forEach(([key, value]) => {
            if(i>0){
              labels.push(key);
              values.push(value);
            }
            i++;
          });
          
          
          console.log(labels); 
          console.log(values); 
          let trace1 = {
            y: values,
            x: labels,
            type: 'line',
          };
          plotdata = [trace1];
          d3.select('#exportTimeSeries').html("");
          Plotly.newPlot("exportTimeSeries", plotdata);

        })
        .catch(error => console.error('Error fetching data:', error))
}

exportCountrySelected('Angola');
