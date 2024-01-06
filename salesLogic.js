// Function to intialize the plots
function init(){
// Call the functions
salesSummaryPlot();
salesProfitPlot();
}

// Function to plot the sales plot
function salesSummaryPlot(){

  fetch('http://127.0.0.1:5000/get_order_data')
   .then(response => response.json())
     .then(data => {
      // Initialize the variables that hold the sales data 
      let arabicaData = [0,0,0,0];
      let robustaData = [0,0,0,0];
      let libericaData = [0,0,0,0];
      let excelsaData = [0,0,0,0];

      // Loop through the the data fetched from the API 
      for(i=0;i<data.length;i++){
        // Sales data for coffee type Arabica
        if (data[i].product_id.substring(0,1)=='A'){
          if (data[i].order_date.substring(0,4)=='2019'){
            arabicaData[0] += data[i].quantity*data[i].unit_price;
           }
          else if (data[i].order_date.substring(0,4)=='2020'){
            arabicaData[1] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            arabicaData[2] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            arabicaData[3] += data[i].quantity*data[i].unit_price;
          }

        }
        // Sales data for coffee type Robusta
        else if (data[i].product_id.substring(0,1)=='R'){
          if (data[i].order_date.substring(0,4)=='2019'){
            robustaData[0] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            robustaData[1] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            robustaData[2] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            robustaData[3] += data[i].quantity*data[i].unit_price;
          }
        }
        // Sales data for coffee type Librica
        else if (data[i].product_id.substring(0,1)=='L'){
          if (data[i].order_date.substring(0,4)=='2019'){
            libericaData[0] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            libericaData[1] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            libericaData[2] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            libericaData[3] += data[i].quantity*data[i].unit_price;
          }
        }
        // Sales data for coffee type Excelsa
        else if (data[i].product_id.substring(0,1)=='E'){
          if (data[i].order_date.substring(0,4)=='2019'){
            excelsaData[0] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            excelsaData[1] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            excelsaData[2] += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            excelsaData[3] += data[i].quantity*data[i].unit_price;
          }
        }
      }
    
        // Plot the sales data
        var data = {
          x: 'x',
          columns: [
              ['x','2019','2020','2021','2022'],
              ['Line 1',arabicaData[0].toFixed(4), arabicaData[1].toFixed(4), arabicaData[2].toFixed(4), arabicaData[3].toFixed(4)],
              ['Line 2', robustaData[0].toFixed(4), robustaData[1].toFixed(4), robustaData[2].toFixed(4), robustaData[3].toFixed(4)],
              ['Line 3', libericaData[0].toFixed(4), libericaData[1].toFixed(4), libericaData[2].toFixed(4), libericaData[3].toFixed(4)],
              ['Line 4', excelsaData[0].toFixed(4), excelsaData[0].toFixed(4), excelsaData[0].toFixed(4), excelsaData[0].toFixed(4)]
          ],
          type: 'line',
          names: {
              'Line 1': 'Arabica',
              'Line 2': 'Robusta',
              'Line 3': 'Liberica',
              'Line 4': 'Excelsa'
          },
          colors: {
              'Line 1': '#ff0000', // Red
              'Line 2': '#00ff00', // Green
              'Line 3': '#0000ff', // Blue
              'Line 4': '#ffa500'  // Orange
          },     
      };
      console.log(data);
  
      // C3 chart configuration
      var chart = c3.generate({
          bindto: '#chart-container',
          data: data,
          title: {
            text: "Sales Summary"
        
          }
      });   
    })}
         
// Function to plot profit pie chart and sales and profit chart

function salesProfitPlot(){      
  let arabicaSales = [0,0,0,0]; 
  let robustaSales = [0,0,0,0];
  let libericaSales= [0,0,0,0];
  let excelsaSales = [0,0,0,0];
  

  let arabicaProfit = [0,0,0,0];
  let robustaProfit = [0,0,0,0];
  let libericaProfit = [0,0,0,0];
  let excelsaProfit = [0,0,0,0];

  // selected year
  let idDropDown1 = d3.select("#selDataset1");
  let sel_year = idDropDown1.property("value");
  
// get the data
fetch('http://127.0.0.1:5000/get_order_data')
  .then(response => response.json())
   .then(data => {  
    for (i=0;i<data.length;i++){
      if (data[i].product_id.substring(0,1)=='A'){
        if (data[i].order_date.substring(0,4)=='2019'){
          arabicaSales[0] += data[i].quantity * data[i].unit_price;
          arabicaProfit[0] = data[i].quantity*data[i].profit.toFixed(4); 
        }
        else if (data[i].order_date.substring(0,4)=='2020'){
          arabicaSales[1] += data[i].quantity * data[i].unit_price;
          arabicaProfit[1] = data[i].quantity*data[i].profit.toFixed(4); 
        }
        else if (data[i].order_date.substring(0,4)=='2021'){
          arabicaSales[2] += data[i].quantity * data[i].unit_price;
          arabicaProfit[2] = data[i].quantity*data[i].profit.toFixed(4); 
        }
        else if (data[i].order_date.substring(0,4)=='2022'){
          arabicaSales[3] += data[i].quantity * data[i].unit_price;
          arabicaProfit[3] = data[i].quantity*data[i].profit.toFixed(4); 
        }
     }
     else if (data[i].product_id.substring(0,1)=='R'){
      if (data[i].order_date.substring(0,4)=='2019'){
        robustaSales[0] += data[i].quantity * data[i].unit_price;
        robustaProfit[0] = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2020'){
        robustaSales[1] += data[i].quantity * data[i].unit_price;
        robustaProfit[1] = data[i].quantity*data[i].profit.toFixed(4); 
      }
      else if (data[i].order_date.substring(0,4)=='2021'){
        robustaSales[2] += data[i].quantity * data[i].unit_price;
        robustaProfit[2] = data[i].quantity*data[i].profit.toFixed(4); 
      }
      else if (data[i].order_date.substring(0,4)=='2022'){
        robustaSales[3] += data[i].quantity * data[i].unit_price;
        robustaProfit[3] = data[i].quantity*data[i].profit.toFixed(4); 
      }
     }
     else if (data[i].product_id.substring(0,1)=='L'){
      if (data[i].order_date.substring(0,4)=='2019'){
        libericaSales[0] += data[i].quantity * data[i].unit_price;
        libericaProfit[0] = data[i].quantity*data[i].profit.toFixed(4); 
      }
      else if (data[i].order_date.substring(0,4)=='2020'){
        libericaSales[1] += data[i].quantity * data[i].unit_price;
        libericaProfit[1] = data[i].quantity*data[i].profit.toFixed(4); 
      }
      else if (data[i].order_date.substring(0,4)=='2021'){
        libericaSales[2] += data[i].quantity * data[i].unit_price;
        libericaProfit[2] = data[i].quantity*data[i].profit.toFixed(4); 
      }
      else if (data[i].order_date.substring(0,4)=='2022'){
        libericaSales[3] += data[i].quantity * data[i].unit_price;
        libericaProfit[3] = data[i].quantity*data[i].profit.toFixed(4); 
      }
     }
     else if (data[i].product_id.substring(0,1)=='E'){
      if (data[i].order_date.substring(0,4)=='2019'){
        excelsaSales[0] += data[i].quantity * data[i].unit_price;
        excelsaProfit[0]= data[i].quantity*data[i].profit.toFixed(4); 
      }
      else if (data[i].order_date.substring(0,4)=='2020'){
        excelsaSales[1] += data[i].quantity * data[i].unit_price;
        excelsaProfit[1] = data[i].quantity*data[i].profit.toFixed(4); 
      }
      else if (data[i].order_date.substring(0,4)=='2021'){
        excelsaSales[2] += data[i].quantity * data[i].unit_price;
        excelsaProfit[2] = data[i].quantity*data[i].profit.toFixed(4); 
      }
      else if (data[i].order_date.substring(0,4)=='2022'){
        excelsaSales[3] += data[i].quantity * data[i].unit_price;
        excelsaProfit[3] = data[i].quantity*data[i].profit.toFixed(4); 
      }
     }
   }

   var chartData = {
    columns: [
      ['Year 2019 Sales', arabicaSales[0].toFixed(4), robustaSales[0].toFixed(4), libericaSales[0].toFixed(4), excelsaSales[0].toFixed(4)],
      ['Year 2019 Profit', arabicaProfit[0]*50, robustaProfit[0]*50, libericaProfit[0]*50, excelsaProfit[0]*50],
      ['Year 2020 Sales', arabicaSales[1].toFixed(4), robustaSales[1].toFixed(4), libericaSales[1].toFixed(4), excelsaSales[1].toFixed(4)],
      ['Year 2020 Profit', arabicaProfit[1]*50, robustaProfit[1]*50, libericaProfit[1]*50, excelsaProfit[1]*50],
      ['Year 2021 Sales', arabicaSales[2].toFixed(4), robustaSales[2].toFixed(4), libericaSales[2].toFixed(4), excelsaSales[2].toFixed(4)],
      ['Year 2021 Profit', arabicaProfit[2]*50, robustaProfit[2]*50, libericaProfit[2]*50, excelsaProfit[2]*50],
      ['Year 2022 Sales', arabicaSales[3].toFixed(4), robustaSales[3].toFixed(4), libericaSales[3].toFixed(4), excelsaSales[3].toFixed(4)],
      ['Year 2022 Profit',  arabicaProfit[3]*50, robustaProfit[3]*50, libericaProfit[3]*50, excelsaProfit[3]*50],
    ],
    type: 'bar',
    groups: [
      ['Year 2019 Sales', 'Year 2019 Profit'],
      ['Year 2020 Sales', 'Year 2020 Profit'],
      ['Year 2021 Sales', 'Year 2021 Profit'],
      ['Year 2022 Sales', 'Year 2022 Profit'],
    ]
  };

  // Chart configuration
  var chartConfig = {
    bindto: '#salesProfitchart-container',
    data: chartData,
    axis: {
      x: {
        type: 'category', // Use category axis for grouping
        categories: ['Arabica', 'Robusta', 'Liberica', 'Excelsa']
      },
      title: {
        text: "Sales and Profit"
     }   
    
    }

  };

  // Generate the profit pie chart
  var chart = c3.generate(chartConfig);
  if (sel_year == '2019'){
    profit_Ara = arabicaProfit[0];
    profit_Rob = robustaProfit[0];
    profit_Lib = libericaProfit[0];
    profit_Exc = excelsaProfit[0];
  }
  else if(sel_year == '2020'){
    profit_Ara = arabicaProfit[1];
    profit_Rob = robustaProfit[1];
    profit_Lib = libericaProfit[1];
    profit_Exc = excelsaProfit[1];
  }
  else if(sel_year == '2021'){
    profit_Ara = arabicaProfit[2];
    profit_Rob = robustaProfit[2];
    profit_Lib = libericaProfit[2];
    profit_Exc = excelsaProfit[2];
  }
  else if(sel_year == '2022'){
    profit_Ara = arabicaProfit[3];
    profit_Rob = robustaProfit[3];
    profit_Lib = libericaProfit[3];
    profit_Exc = excelsaProfit[3];

  }
  console.log(arabicaProfit[3]);
    var data = {
      columns: [
        ['Arabica', profit_Ara],
        ['Robusta', profit_Rob],
        ['Liberica', profit_Lib],
        ['Excelsa',profit_Exc]
          ],
      type: 'pie'
        };
            
    // Configuration options for the chart
    var options = {
        bindto: '#profitchart-container',
        data: data,
        title: {
                text: "Coffee Type vs Profit"
            }   
        };
            
   // Generate the pie chart
    var chart = c3.generate(options);   
  })}

  init();
  // Function called on changing the year option
  function optionChanged(){
    salesProfitPlot();
  }