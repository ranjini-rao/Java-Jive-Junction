
//Function to initialize the page with default values and plot
function init(){
  //fetch the data from the flask API
  fetch('http://127.0.0.1:5000/products')
    .then(response => response.json())
      .then(data => {
        console.log('Data from Flask API:', data);
          
        //Coffe types and roast types 
        let coffee_type = ['Arabica', 'Robusta','Liberica','Excelsa'];
        let roast_type = ["Light","Medium","Dark"];

        // Select the coffee type dropdown
        let idDropDown1 = d3.select("#selDataset1");
        // Loop through coffee types list and add each item to the dropdown
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


        let sel_coffee_type = idDropDown1.property("value");
        let sel_roast_type = idDropDown2.property("value");

  console.log(sel_coffee_type);
  //   // get the subject ID
  // let selectedId  = dataset;

  showCoffeeInfo(sel_coffee_type);
  barPlot(sel_coffee_type,sel_roast_type);    
  profitBarPlot(); 


           
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
            let size = [];
            let price = [];
            for(i=0;i<data.length;i++){
              if(data[i].coffee_type === sel_coffee_type.substring(0,3) && data[i].roast_type === sel_roast_type.substring(0,1)){
                  size.push(data[i].size);
                  price.push(data[i].unit_price);

              }

            }

             
  var chartContainer = document.getElementById("chartContainer");

  // Define your x-values and y-values
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
    type: 'bar'
  },

  axis: {
    x: {
      label: 'Size',
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
    text: "Bean size vs Price for coffee type: "+ sel_coffee_type + ", roast type: " + sel_roast_type
  }

});



     })}


  function profitBarPlot(){

    fetch('http://127.0.0.1:5000/products')
        .then(response => response.json())
        .then(data => {
            console.log('Data from Flask API:', data);

            console.log("Called");

            let profit_Ara = 0;
            let profit_Rob = 0;
            let profit_Lib = 0;
            let profit_Exc = 0;


            for(i=0;i<data.length;i++){
              if(data[i].coffee_type === 'Ara'){
                profit_Ara += data[i].profit;
              }
              else  if(data[i].coffee_type === 'Rob'){
                profit_Rob += data[i].profit;
              }
              else  if(data[i].coffee_type === 'Lib'){
                profit_Lib += data[i].profit;
              }
              else  if(data[i].coffee_type === 'Exc'){
                profit_Exc += data[i].profit;
              }

            

            }

            let xValues = ["Arabica","Robusta","Liberica","Excelsa"]
            let yValues = [profit_Ara,profit_Rob,profit_Lib,profit_Exc];

            var barColors = ['#FF5733', '#33FF57', '#5733FF', '#FFFF33'];
            var chart = c3.generate({
              bindto: profitbarchartContainer,
              data: {
                x: 'x',
                columns: [
                  ['x'].concat(xValues),
                  ['data'].concat(yValues)
                ],
                type: 'bar',

                colors: {
                  data: function (d) {
                    return barColors[d.index];
                  }
                }

              },
            
              axis: {
                x: {
                  label: 'Coffee Type',
                  type: 'category',
                  tick: {
                    rotate: 45,
                    multiline: false
                  }
                },
            
                 y: {
            
                  label: 'Profit',
              
                }
              },
              bar: {
                width: {
                  ratio: 0.2// Adjust the ratio for a narrower bar width
                }
              },
              legend: {
                show: false
              },
            
              title: {
                text: "Coffee Type vs Profit"
            
              }
            
            });


        })
      }


function drawBarPlot(selectedId){
    d3.json(url).then(function(data){
        samplesData = data.samples;

        let val = samplesData.filter(values => values.id == selectedId);
        
        let yValues  = val[0]["otu_ids"].slice(0,10).map(id => `OTU ${id}`).reverse();
        let xValues = val[0]["sample_values"].slice(0,10).reverse();
        let otu_labels = val[0]["otu_labels"].slice(0,10).reverse();

        // Trace for bar plot
        let trace = {

            x: xValues,
            y: yValues,
            text : otu_labels,
            type : "bar",
            orientation : "h"
        };

        Plotly.newPlot("bar", [trace]);

        } )   

}

// Funciton to display coffee type information
function showCoffeeInfo(sel_coffee_type){
   
    d3.select("#sample-metadata").html("");

    let selectedId =   sel_coffee_type.substring(0,3);
    if (selectedId === 'Ara'){
      coffee_info = "Coffea arabica, also known as the Arabica coffee, is a species of flowering plant in the coffee and madder family Rubiaceae. It is believed to be the first species of coffee to have been cultivated and is currently the dominant cultivar, representing about 60% of global production" 

    }
    else if (selectedId === 'Rob'){
      coffee_info = "Robusta coffee bean is a species coming from the Coffea canephore plant. Its production amounts to around 30% of the world's total production, which in fact makes it the second most popular variety. Its typical features are a strong and harsh, yet deep flavor, given by a high caffeine content."

    }
    else if (selectedId === 'Lib'){
      coffee_info = "Coffea liberica, commonly known as the Liberian coffee, is a species of flowering plant in the family Rubiaceae from which coffee is produced. It is native to western and central Africa, and has become naturalised in areas including Colombia, Venezuela, the Philippines, Borneo and Java."

    }
    else if (selectedId === 'Exc'){
      coffee_info = "Excelsa coffee is known for its unique and complex flavor profile.It often exhibits fruity, floral, and spicy notes with a distinct and bold taste.The flavor can vary, but it is generally more robust and with a larger body compared to Arabica."
    }
      d3.select("#sample-metadata").append("h5").text(coffee_info);
}


// Function executed on option change
function optionChanged() { 

  let idDropDown1 = d3.select("#selDataset1");

  let idDropDown2 = d3.select("#selDataset2");

  let sel_coffee_type = idDropDown1.property("value");
  let sel_roast_type = idDropDown2.property("value");


    // Call all functions 
    showCoffeeInfo(sel_coffee_type);
    barPlot(sel_coffee_type,sel_roast_type);
};


