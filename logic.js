
//Function to initialize the page with default values and plot
function init(){
  //fetch the data from the flask API
  fetch('http://127.0.0.1:5000/products')
    .then(response => response.json())
      .then(data => {
        // log the data on console
        console.log('Data from Flask API:', data);
          
        //Coffe types and roast types 
        let coffee_type = ['Arabica', 'Robusta','Liberica','Excelsa'];
        let roast_type = ["Light","Medium","Dark"];

        // Select the coffee type dropdown
        let idDropDown1 = d3.select("#selDataset1");
       
        //Loop through coffee types list and add each item to the dropdown
        for(let i=0;i<coffee_type.length;i++){
          let newOption = idDropDown1.append("option");
          newOption.attr("value", coffee_type[i]);
          newOption.text(coffee_type[i]);    
        }

        // Select the coffee type dropdown
        let idDropDown2 = d3.select("#selDataset2");
        // Loop through roast types list and add each item to the dropdown
        for(let i=0;i<roast_type.length;i++){
            let newOption = idDropDown2.append("option");
            newOption.attr("value", roast_type[i]);
            newOption.text(roast_type[i]);    
        }

        // Selected coffee type and roast type
        let sel_coffee_type = idDropDown1.property("value");
        let sel_roast_type = idDropDown2.property("value");

        // Call the functions
        showCoffeeInfo(sel_coffee_type);
        barPlot(sel_coffee_type,sel_roast_type);  
        bubblePrices();        
      })
      .catch(error => console.error('Error fetching data:', error))
  };

//Call the init function
init();

// Funciton to plot bar plot
function barPlot(sel_coffee_type,sel_roast_type){

 fetch('http://127.0.0.1:5000/products')
  .then(response => response.json())
    .then(data => {
      console.log('Data from Flask API:', data);
      // Lists to hold product size and unit price
      let size = [];
      let price = [];
      // Loop through the data fetched to get the prices and size for the selected coffee type and roast type
      for(i=0;i<data.length;i++){
        if(data[i].coffee_type === sel_coffee_type.substring(0,3) && data[i].roast_type === sel_roast_type.substring(0,1)){
          size.push(data[i].size);
          price.push(data[i].unit_price);
      }
  }
             
  var chartContainer = document.getElementById("chartContainer");
  // Define x-values and y-values for he plot
  var xValues = size;
  var yValues = price;
  var fixedYTicks = [0, 5, 10, 15, 20, 25, 30];
 
  // Create a bar chart using C3.js
  var chart = c3.generate({
    bindto: chartContainer,
    data: {
      x: 'x',
      columns: [
        ['x'].concat(xValues),
        ['data'].concat(yValues)
      ],
    type: 'bar',
  },

  axis: {
    x: {
      label: 'Product Size',
      type: 'category',
      tick: {
        rotate: 0,
        multiline: false
      }
    },

    y: {
      label: 'Price',
      tick: {
        values: fixedYTicks 
      }
    }
  },
  bar: {
    width: {
      ratio: 0.4 
    }
  },
  legend: {
    show: false
  },

  title: {
    text: "Price for coffee type: "+ sel_coffee_type + ", roast type: " + sel_roast_type
  }

});

 })}

// Funciton to display coffee type information
function showCoffeeInfo(sel_coffee_type){
    // set it to empty string
    d3.select("#sample-metadata").html("");
    // For the slected coffee type, assign the information 
    let selectedId =   sel_coffee_type.substring(0,3);
    if (selectedId === 'Ara'){
      coffee_info = "Coffea arabica is a species of flowering plant in the family Rubiaceae. It is the first species of coffee to have been cultivated and is currently the dominant, representing 60% of global production" 
    }
    else if (selectedId === 'Rob'){
      coffee_info = "Robusta coffee bean is a species coming from the Coffea canephore plant. Its production amounts to around 30% of the world's total production, which in fact makes it the second most popular variety."
    }
    else if (selectedId === 'Lib'){
      coffee_info = "Coffea liberica, commonly known as the Liberian coffee, is a species of flowering plant in the family Rubiaceae. It is native to western and central Africa."
    }
    else if (selectedId === 'Exc'){
      coffee_info = "Excelsa coffee is known for its unique and complex flavor profile.It often exhibits fruity, floral, and spicy notes with a distinct and bold taste."
    }
      d3.select("#sample-metadata").append("h5").text(coffee_info);
}


// Function executed on option change
function optionChanged() { 
  // read the selected optons for coffee type and roast type
  let idDropDown1 = d3.select("#selDataset1");
  let idDropDown2 = d3.select("#selDataset2");
  let sel_coffee_type = idDropDown1.property("value");
  let sel_roast_type = idDropDown2.property("value");

  // Call all functions 
  showCoffeeInfo(sel_coffee_type);
  barPlot(sel_coffee_type,sel_roast_type);
};

// Function to plot the bubble plot to compare coffee prices
function bubblePrices(){
  // fetch the data from the flask API
  fetch('http://127.0.0.1:5000/products')
   .then(response => response.json())
     .then(data => {
      // Varibales to hold the coffee prices
      var lightRoastPrices = [0,0,0,0];
      var mediumRoastPrices = [0,0,0,0];
      var darkRoastPrices = [0,0,0,0];
    
      // Loop through the data to get the price data
      for (i=0;i<data.length;i++){
        console.log(data[i]);
        // price data for size 2.5
        if(data[i].size=='2.5')
        {
          console.log(data[i].unit_price);
          if (data[i].roast_type == "L"){
            if (data[i].coffee_type== "Ara"){
              
              lightRoastPrices[0] +=(data[i].unit_price);
            }
            else if  (data[i].coffee_type== "Rob"){
              lightRoastPrices[1] += data[i].unit_price;
            }
            else if  (data[i].coffee_type== "Lib"){
              lightRoastPrices[2] += (data[i].unit_price);
            }
            else if  (data[i].coffee_type== "Exc"){
              lightRoastPrices[3] += (data[i].unit_price);
            }
          }
          else if (data[i].roast_type == "M"){
            if (data[i].coffee_type== "Ara"){
              mediumRoastPrices[0] += (data[i].unit_price);
            }
            else if  (data[i].coffee_type== "Rob"){
              mediumRoastPrices[1] += (data[i].unit_price);
            }
            else if  (data[i].coffee_type== "Lib"){
              mediumRoastPrices[2] += (data[i].unit_price);
            }
            else if  (data[i].coffee_type== "Exc"){
              mediumRoastPrices[3] += (data[i].unit_price);
            }
          }

          else if (data[i].roast_type == "D"){
            if (data[i].coffee_type== "Ara"){
              darkRoastPrices[0] += (data[i].unit_price);
            }
            else if  (data[i].coffee_type== "Rob"){
              darkRoastPrices[1] +=(data[i].unit_price);
            }
            else if  (data[i].coffee_type== "Lib"){
              darkRoastPrices[2] +=(data[i].unit_price);
            }
            else if  (data[i].coffee_type== "Exc"){
              darkRoastPrices[3] +=(data[i].unit_price);
            }
          }
        }

      }

// Data to plot
var data = {
  columns: [
    ['Light', lightRoastPrices[0],lightRoastPrices[1],lightRoastPrices[2],lightRoastPrices[3]], // Replace with your actual prices for Light roast type
    ['Medium', mediumRoastPrices[0],mediumRoastPrices[1],mediumRoastPrices[2],mediumRoastPrices[3]], // Replace with your actual prices for Medium roast type
    ['Dark', darkRoastPrices[0],darkRoastPrices[1],darkRoastPrices[2],darkRoastPrices[3]] // Replace with your actual prices for Dark roast type
  ],
  type: 'scatter'
};

// generate plot using c3.js
var chart = c3.generate({
  bindto: '#compareChartContainer',
  data: data,
  axis: {
    x: {
      type: 'category',
      categories: ['Arabica', 'Robusta', 'Liberica','Excelsa'],
      label: "Coffee Type"
    },
    y: {
      label: 'Price',
      min: 18,
      max: 40

    }
  },
  grid: {
    y: {
      lines: [{value: 0.5, text: 'Light'}, {value: 1.5, text: 'Medium'}, {value: 2.5, text: 'Dark'}]
    }
  },
  point: {
    r: function(d) {
      // Scale the bubble size based on the price
      return d.value;
    }
  },
  title: {
    text: 'Coffee Price Comparison'
  }
});
     })}