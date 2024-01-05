// Call the functions
salesSummaryPlot();
profitPiePlot();
salesProfitPlot();

// Function to plot the sales plot
function salesSummaryPlot(){

  fetch('http://127.0.0.1:5000/get_order_data')
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
              ['Line 1',arabicaData2019, arabicaData2020, arabicaData2021, arabicaData2022],
              ['Line 2', robustaData2019, robustaData2020, robustaData2021, robustaData2022],
              ['Line 3', libericaData2019, libericaData2020, libericaData2021, libericaData2022],
              ['Line 4', excelsaData2019, excelsaData2020, excelsaData2021, excelsaData2022]
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


//  Function to draw the profit plot
function profitPiePlot(){

  fetch('http://127.0.0.1:5000/products')
    .then(response => response.json())
      .then(data => {
        console.log('Data from Flask API:', data);

        // Initialize the variables that hold the profits for the 4 coffee types
        let profit_Ara = 0;
        let profit_Rob = 0;
        let profit_Lib = 0;
        let profit_Exc = 0;

        for(i=0;i<data.length;i++){
          if(data[i].Coffee_Type === 'Ara'){
            profit_Ara += data[i].Profit;
            }
          else  if(data[i].Coffee_Type === 'Rob'){
            profit_Rob += data[i].Profit;
            }
          else  if(data[i].Coffee_Type === 'Lib'){
            profit_Lib += data[i].Profit;
            }
          else  if(data[i].Coffee_Type === 'Exc'){
            profit_Exc += data[i].Profit;
            }
          }

            let xValues = ["Arabica","Robusta","Liberica","Excelsa"]
            let yValues = [profit_Ara,profit_Rob,profit_Lib,profit_Exc];


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

        })
      }



    function salesProfit(){      
      let arabicaSales = [];
      let robustaSales = [];
      let libericaSales = [];
      let excelsaSales = [];
      let arabicaProfit = [];
      let robustaProfit = [];
      let libericaProfit = [];
      let excelsaProfit = [];

    fetch('http://127.0.0.1:5000/get_order_data')
      .then(response => response.json())
       .then(data => {
        console.log(data);
         // Loop through the the data fetched from the API 
      for(i=0;i<data.length;i++){
        console.log(data[i].quantity);
        console.log(data[i].unit_price);
        console.log(data[i].profit.toFixed(4));

        // Sales data for coffee type Arabica
        if (data[i].product_id.substring(0,1)=='A'){
          console.log(data[i].quantity);
          console.log(data[i].unit_price);
          if (data[i].order_date.substring(0,4)=='2019'){
            value1 = data[i].quantity * data[i].unit_price;
            value2 = data[i].quantity*data[i].profit.toFixed(4);
            console.log(value1)
            arabicaSales[0] += value1;
            arabicaProfit[0] += value2;
            console.log(arabicaSales[0]);
            console.log(arabicaProfit[0]);
          }
          
          else if (data[i].order_date.substring(0,4)=='2020'){
            arabicaSales[1] += data[i].quantity*data[i].unit_price;
            arabicaProfit[1] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            arabicaSales[2] += data[i].quantity*data[i].unit_price;
            arabicaProfit[2] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            arabicaSales[3] += data[i].quantity*data[i].unit_price;
            arabicaProfit[3] += data[i].quantity*data[i].profit.toFixed(4);
          }

        }
        // Sales data for coffee type Robusta
        else if (data[i].product_id.substring(0,1)=='R'){
          if (data[i].order_date.substring(0,4)=='2019'){
            robustaSales[0] += data[i].quantity*data[i].unit_price;
            robustaProfit[0] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            robustaSales[1] += data[i].quantity*data[i].unit_price;
            robustaProfit[1] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            robustaSales[2] += data[i].quantity*data[i].unit_price;
            robustaProfit[2] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            robustaSales[3] += data[i].quantity*data[i].unit_price;
            robustaProfit[3] += data[i].quantity*data[i].profit.toFixed(4);
          }
        }
        // Sales data for coffee type Librica
        else if (data[i].product_id.substring(0,1)=='L'){
          if (data[i].order_date.substring(0,4)=='2019'){
            libericaSales[0] += (data[i].quantity*data[i].unit_price);
            libericaProfit[0] += (data[i].quantity*data[i].profit.toFixed(4));
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            libericaSales[1] += data[i].quantity*data[i].unit_price;
            libericaProfit[1] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            libericaSales[2] += data[i].quantity*data[i].unit_price;
            libericaProfit[2] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            libericaSales[3] += data[i].quantity*data[i].unit_price;
            libericaProfit[3] += data[i].quantity*data[i].profit.toFixed(4);
          }
        }
        // Sales data for coffee type Excelsa
        else if (data[i].product_id.substring(0,1)=='E'){
          if (data[i].order_date.substring(0,4)=='2019'){
            excelsaSales[0] += data[i].quantity*data[i].unit_price;
            excelsaProfit[0] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2020'){
            excelsaSales[1] += data[i].quantity*data[i].unit_price;
            excelsaProfit[1] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2021'){
            excelsaSales[2] += data[i].quantity*data[i].unit_price;
            excelsaProfit[2] += data[i].quantity*data[i].profit.toFixed(4);
          }
          else if (data[i].order_date.substring(0,4)=='2022'){
            excelsaSales[3] += data[i].quantity*data[i].unit_price;
            excelsaProfit[3] += data[i].quantity*data[i].profit.toFixed(4);
          }
        }
      }
      console.log(arabicaSales[0]);
      console.log(arabicaSales[1]);
      console.log(arabicaSales[2]);
      console.log(excelsaProfit[3]);

      var chartData = {
        columns: [
          ['Year 2019 Sales', arabicaSales[0], robustaSales[0], libericaSales[0], excelsaSales[0]],
          ['Year 1 Profit', arabicaProfit[0], robustaProfit[0], libericaProfit[0], excelsaProfit[0]],
          ['Year 2 Sales', arabicaSales[1], robustaSales[1], libericaSales[1], excelsaSales[1]],
          ['Year 2 Profit',arabicaProfit[1], robustaProfit[1], libericaProfit[1], excelsaProfit[1]],
          ['Year 3 Sales', arabicaSales[2], robustaSales[2], libericaSales[2], excelsaSales[2]],
          ['Year 3 Profit',arabicaProfit[2], robustaProfit[2], libericaProfit[2], excelsaProfit[2]],
          ['Year 4 Sales', arabicaSales[3], robustaSales[3], libericaSales[3], excelsaSales[3]],
          ['Year 4 Profit', arabicaProfit[3], robustaProfit[3], libericaProfit[3], excelsaProfit[3]],
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
          }
        }

      };
    
      // Generate the Sales profit chart
      var chart = c3.generate(chartConfig);

         })}

      

// Function to plot sales and profit

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

fetch('http://127.0.0.1:5000/get_order_data')
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

   console.log(arabicaSales2019);
   console.log(arabicaProfit2019);


   var chartData = {
    columns: [
      ['Year 2019 Sales', arabicaSales2019, robustaSales2019, libericaSales2019, excelsaSales2019],
      ['Year 2019 Profit', arabicaProfit2019*50, robustaProfit2019*50, libericaProfit2019*50, excelsaProfit2019*50],
      ['Year 2020 Sales', arabicaSales2020, robustaSales2020, libericaSales2020, excelsaSales2020],
      ['Year 2020 Profit', arabicaProfit2020*50, robustaProfit2020*50, libericaProfit2020*50, excelsaProfit2020*50],
      ['Year 2021 Sales', arabicaSales2021, robustaSales2021, libericaSales2021, excelsaSales2021],
      ['Year 2021 Profit', arabicaProfit2021*50, robustaProfit2021*50, libericaProfit2021*50, excelsaProfit2021*50],
      ['Year 2022 Sales', arabicaSales2022, robustaSales2022, libericaSales2022, excelsaSales2022],
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

  // Generate the Sales profit chart
  var chart = c3.generate(chartConfig);

   
  })}