// Function to intialize the plots
function init(){
// Call the functions
salesSummaryPlot();
salesProfitPlot();
loyaltyplot();
}
// Function to plot the sales plot
function salesSummaryPlot(){

  fetch('http://127.0.0.1:5001/get_order_data')
   .then(response => response.json())
     .then(data => {
      // Initialize the variables that hold the sales data 
      let arabicaData2019 = 0;
      let robustaData2019 = 0;
      let libericaData2019 = 0;
      let excelsaData2019 = 0;

      let arabicaData2020 = 0;
      let robustaData2020 = 0;
      let libericaData2020 = 0;
      let excelsaData2020 = 0;

      let arabicaData2021 = 0;
      let robustaData2021 = 0;
      let libericaData2021 = 0;
      let excelsaData2021 = 0;

      let arabicaData2022 = 0;
      let robustaData2022 = 0;
      let libericaData2022 = 0;
      let excelsaData2022 = 0;
      
      // Loop through the the data fetched from the API 
      for(i=0;i<data.length;i++){
        // Sales data for coffee type Arabica
        if (data[i].product_id.substring(0,1)=='A'){
          if (data[i].order_date.substring(0,4)=='2019'){
            arabicaData2019 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            arabicaData2020 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            arabicaData2021 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            arabicaData2022 += data[i].quantity*data[i].unit_price;
          }

        }
        // Sales data for coffee type Robusta
        else if (data[i].product_id.substring(0,1)=='R'){
          if (data[i].order_date.substring(0,4)=='2019'){
            robustaData2019 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            robustaData2020 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            robustaData2021 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            robustaData2022 += data[i].quantity*data[i].unit_price;
          }
        }
        // Sales data for coffee type Librica
        else if (data[i].product_id.substring(0,1)=='L'){
          if (data[i].order_date.substring(0,4)=='2019'){
            libericaData2019 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            libericaData2020 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            libericaData2021 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            libericaData2022 += data[i].quantity*data[i].unit_price;
          }
        }
        // Sales data for coffee type Excelsa
        else if (data[i].product_id.substring(0,1)=='E'){
          if (data[i].order_date.substring(0,4)=='2019'){
            excelsaData2019 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            excelsaData2020 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            excelsaData2021 += data[i].quantity*data[i].unit_price;
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            excelsaData2022 += data[i].quantity*data[i].unit_price;
          }
        }
      }
       
    
        // Plot the sales data
        var data = {
          x: 'x',
          columns: [
              ['x','2019','2020','2021','2022'],
              ['Line 1',arabicaData2019.toFixed(4), arabicaData2020.toFixed(4), arabicaData2021.toFixed(4), arabicaData2022.toFixed(4)],
              ['Line 2', robustaData2019.toFixed(4), robustaData2020.toFixed(4), robustaData2021.toFixed(4), robustaData2022.toFixed(4)],
              ['Line 3', libericaData2019.toFixed(4), libericaData2020.toFixed(4), libericaData2021.toFixed(4), libericaData2022.toFixed(4)],
              ['Line 4', excelsaData2019.toFixed(4), excelsaData2020.toFixed(4), excelsaData2021.toFixed(4), excelsaData2022.toFixed(4)]
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
  let arabicaSales2019 = 0;
  let arabicaSales2020 = 0;
  let arabicaSales2021 = 0;
  let arabicaSales2022 = 0;

  let robustaSales2019 = 0;
  let robustaSales2020 = 0;
  let robustaSales2021 = 0;
  let robustaSales2022 = 0;

  let libericaSales2019 = 0;
  let libericaSales2020 = 0;
  let libericaSales2021 = 0;
  let libericaSales2022 = 0;

  let excelsaSales2019 = 0;
  let excelsaSales2020 = 0;
  let excelsaSales2021 = 0;
  let excelsaSales2022 = 0;

  let arabicaProfit2019 = 0;
  let arabicaProfit2020 = 0;
  let arabicaProfit2021 = 0;
  let arabicaProfit2022 = 0;

  let robustaProfit2019 = 0;
  let robustaProfit2020 = 0;
  let robustaProfit2021 = 0;
  let robustaProfit2022 = 0;

  let libericaProfit2019 = 0;
  let libericaProfit2020 = 0;
  let libericaProfit2021 = 0;
  let libericaProfit2022 = 0;

  let excelsaProfit2019 = 0;
  let excelsaProfit2020 = 0;
  let excelsaProfit2021= 0;
  let excelsaProfit2022 = 0;

  let idDropDown1 = d3.select("#selDataset1");
  let sel_year = idDropDown1.property("value");
  
  

fetch('http://127.0.0.1:5001/get_order_data')
  .then(response => response.json())
   .then(data => {
    
    for (i=0;i<data.length;i++){
      if (data[i].product_id.substring(0,1)=='A'){
        if (data[i].order_date.substring(0,4)=='2019'){
          arabicaSales2019 += data[i].quantity * data[i].unit_price;
          arabicaProfit2019 = data[i].quantity*data[i].profit.toFixed(4); 
        }

        else if (data[i].order_date.substring(0,4)=='2020'){
          arabicaSales2020 += data[i].quantity * data[i].unit_price;
          arabicaProfit2020 = data[i].quantity*data[i].profit.toFixed(4); 
        }

        else if (data[i].order_date.substring(0,4)=='2021'){
          arabicaSales2021 += data[i].quantity * data[i].unit_price;
          arabicaProfit2021 = data[i].quantity*data[i].profit.toFixed(4); 
        }

        else if (data[i].order_date.substring(0,4)=='2022'){
          arabicaSales2022 += data[i].quantity * data[i].unit_price;
          arabicaProfit2022 = data[i].quantity*data[i].profit.toFixed(4); 
        }
     }
     else if (data[i].product_id.substring(0,1)=='R'){
      if (data[i].order_date.substring(0,4)=='2019'){
        robustaSales2019 += data[i].quantity * data[i].unit_price;
        robustaProfit2019 = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2020'){
        robustaSales2020 += data[i].quantity * data[i].unit_price;
        robustaProfit2020 = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2021'){
        robustaSales2021 += data[i].quantity * data[i].unit_price;
        robustaProfit2021 = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2022'){
        robustaSales2022 += data[i].quantity * data[i].unit_price;
        robustaProfit2022 = data[i].quantity*data[i].profit.toFixed(4); 
      }

     }

     else if (data[i].product_id.substring(0,1)=='L'){
      if (data[i].order_date.substring(0,4)=='2019'){
        libericaSales2019 += data[i].quantity * data[i].unit_price;
        libericaProfit2019 = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2020'){
        libericaSales2020 += data[i].quantity * data[i].unit_price;
        libericaProfit2020 = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2021'){
        libericaSales2021 += data[i].quantity * data[i].unit_price;
        libericaProfit2021 = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2022'){
        libericaSales2022 += data[i].quantity * data[i].unit_price;
        libericaProfit2022 = data[i].quantity*data[i].profit.toFixed(4); 
      }

     }

     else if (data[i].product_id.substring(0,1)=='E'){
      if (data[i].order_date.substring(0,4)=='2019'){
        excelsaSales2019 += data[i].quantity * data[i].unit_price;
        excelsaProfit2019 = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2020'){
        excelsaSales2020 += data[i].quantity * data[i].unit_price;
        excelsaProfit2020 = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2021'){
        excelsaSales2021 += data[i].quantity * data[i].unit_price;
        excelsaProfit2021 = data[i].quantity*data[i].profit.toFixed(4); 
      }

      else if (data[i].order_date.substring(0,4)=='2022'){
        excelsaSales2022 += data[i].quantity * data[i].unit_price;
        excelsaProfit2022 = data[i].quantity*data[i].profit.toFixed(4); 
      }

     }

   }

   var chartData = {
    columns: [
      ['Year 2019 Sales', arabicaSales2019.toFixed(4), robustaSales2019.toFixed(4), libericaSales2019.toFixed(4), excelsaSales2019.toFixed(4)],
      ['Year 2019 Profit', arabicaProfit2019*50, robustaProfit2019*50, libericaProfit2019*50, excelsaProfit2019*50],
      ['Year 2020 Sales', arabicaSales2020.toFixed(4), robustaSales2020.toFixed(4), libericaSales2020.toFixed(4), excelsaSales2020.toFixed(4)],
      ['Year 2020 Profit', arabicaProfit2020*50, robustaProfit2020*50, libericaProfit2020*50, excelsaProfit2020*50],
      ['Year 2021 Sales', arabicaSales2021.toFixed(4), robustaSales2021.toFixed(4), libericaSales2021.toFixed(4), excelsaSales2021.toFixed(4)],
      ['Year 2021 Profit', arabicaProfit2021*50, robustaProfit2021*50, libericaProfit2021*50, excelsaProfit2021*50],
      ['Year 2022 Sales', arabicaSales2022.toFixed(4), robustaSales2022.toFixed(4), libericaSales2022.toFixed(4), excelsaSales2022.toFixed(4)],
      ['Year 2022 Profit',  arabicaProfit2022*50, robustaProfit2022*50, libericaProfit2022*50, excelsaProfit2022*50],
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
    profit_Ara = arabicaProfit2019;
    profit_Rob = robustaProfit2019;
    profit_Lib = libericaProfit2019;
    profit_Exc = excelsaProfit2019;
  }
  else if(sel_year == '2020'){
    profit_Ara = arabicaProfit2020;
    profit_Rob = robustaProfit2020;
    profit_Lib = libericaProfit2020;
    profit_Exc = excelsaProfit2020;
  }
  else if(sel_year == '2021'){
    profit_Ara = arabicaProfit2021;
    profit_Rob = robustaProfit2021;
    profit_Lib = libericaProfit2021;
    profit_Exc = excelsaProfit2021;
  }
  else if(sel_year == '2022'){
    profit_Ara = arabicaProfit2022;
    profit_Rob = robustaProfit2022;
    profit_Lib = libericaProfit2022;
    profit_Exc = excelsaProfit2022;

  }


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
    loyaltyplot();
  }

  function loyaltyplot(){
    fetch('http://127.0.0.1:5001/get_order_data')
   .then(response => response.json())
     .then(data => {
      let loyalty2019 = 0;
      let loyalty2019Sales = 0;
      let noloyalty2019 = 0;
      let noloyalty2019Sales = 0;
      let loyalty2020 = 0;
      let loyalty2020Sales = 0;
      let noloyalty2020 = 0;
      let noloyalty2020Sales = 0;
      let loyalty2021 = 0;
      let loyalty2021Sales = 0;
      let noloyalty2021 = 0;
      let noloyalty2021Sales = 0;
      let loyalty2022 = 0;
      let loyalty2022Sales = 0;
      let noloyalty2022 = 0;
      let noloyalty2022Sales = 0;

      let idDropDown1 = d3.select("#selDataset1");
  let sel_year = idDropDown1.property("value");
  for (i=0;i<data.length;i++){
    {if (data[i].order_date.substring(0,4)=='2019')
      {
        if (data[i].loyalty_card == "Yes"){
          loyalty2019++;
          loyalty2019Sales += data[i].quantity * data[i].unit_price;
        } else if(data[i].loyalty_card == "No"){
          noloyalty2019++;
          noloyalty2019Sales += data[i].quantity * data[i].unit_price;
        }
      }
      else if (data[i].order_date.substring(0,4)=='2020')
      {
        if (data[i].loyalty_card == "Yes"){
          loyalty2020++;
          loyalty2020Sales += data[i].quantity * data[i].unit_price
        } else if(data[i].loyalty_card == "No"){
          noloyalty2020++;
          noloyalty2020Sales += data[i].quantity * data[i].unit_price;
        }}
        else if (data[i].order_date.substring(0,4)=='2021')
      {
        if (data[i].loyalty_card == "Yes"){
          loyalty2021++;
          loyalty2021Sales += data[i].quantity * data[i].unit_price
        } else if(data[i].loyalty_card == "No"){
          noloyalty2021++;
          noloyalty2021Sales += data[i].quantity * data[i].unit_price;
        }}
        else if (data[i].order_date.substring(0,4)=='2022')
      {
        if (data[i].loyalty_card == "Yes"){
          loyalty2022++;
          loyalty2022Sales += data[i].quantity * data[i].unit_price
        } else if(data[i].loyalty_card == "No"){
          noloyalty2022++;
          noloyalty2022Sales += data[i].quantity * data[i].unit_price;
        }}
  }} 
  if (sel_year == 2019){
    yValues = [loyalty2019Sales, noloyalty2019Sales]
  }
  else if (sel_year == 2020){
    yValues = [loyalty2020Sales, noloyalty2020Sales]
  }
  else if (sel_year == 2021){
    yValues = [loyalty2021Sales, noloyalty2021Sales]
  }
  else if (sel_year == 2022){
    yValues = [loyalty2022Sales, noloyalty2022Sales]
  }

  var xValues = [1,2];
  var fixedYTicks = ['Yes','No'];
 
  // Create a bar chart using C3.js
  var chart = c3.generate({
    bindto: '#loyalty-container',
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
    text: "Loyalty VS Sales: "
  }

});
})}