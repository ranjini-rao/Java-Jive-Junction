# Java-Jive-Junction
* Our coffee project seeks to provide an insight into the coffee industry in the United States and around the World.
* We aim to provide the analysis and visualization on global coffee consumption, production, import, export.
* We analyze the price, sales and profit data for various coffee and their roasts types available in our source dataset.

## Project Architecture:
<img width="715" alt="image" src="https://github.com/ranjini-rao/Java-Jive-Junction/assets/143301151/5d7275ec-94df-412f-be9e-4fa331ff0aff">


## Team members:
* Bryson Wersonske
* Madhavi Pandey
* Vinaya Kusuma
   * Constructed the workflow for the web application.  
   * Created flask api to get prices and sales information from the Postgres database.
   * Created the `cofeePrice.html`, `logic.js` files to provide visually engaging pricing information charts from the data fetched from the flask api.
   * Used the c3.js Javascript library to build interactive visualizations.
* Ranjini Rao
  * Created Postgres database and ERD diagram `database/Schema_new_name.sql`
  * Worked on `coffeeSales.html` and `saleslogic.js` for obtaining the coffee sales information for the visualization
  * Worked on the Pie and line graphs interactive visualizations
  * Created PPT for the project presentation
* Reetu Jakhar
   * Created the Home page ( `index.html` ) for website application and designed it using box containers to show the information for end users. Created custom css functions for this page (`style.css`)
   * Developed flask API to get coffee order data by year, country and coffee type. All flask API functions are in appconsumption.py file.
   * Created `CoffeeConsumption.html` and `appCoffeeConsumption.js` file to show dynamic world map and highlight the cities with coffee consumption data based on coffee orders.
   * Used open street maps & open cage api to get lat and lan of cities using zipcode and country. Also used leaflet, d3 and axios.min js libraries for visualization.
* Pallavi Tripathi
  * Created flask apis to get coffee import, export, production and consumption data from the DB. Also, created api to get country codes to be used in **jVectorMap** library to display world map.
  * Created `coffeetradeusagestats.js` and `coffeeTradeUsageStats.html` to interact with flask apis created above and show the visualization.
  * Edited `index.html` to include hyperlink for [Coffee Trade and Usage statistics](coffeeTradeUsageStats.html)
  * Merged changes from other team members into one branch.


## Important files and location
### Front end files
* **Main HTML:** [index.html](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/index.html)
* **Coffee consumption**
  * *HTML:* [CoffeeConsumption.html](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/CoffeeConsumption.html)
  * *JS:* [js/appCoffeConsumption.js](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/js/appCoffeConsumption.js)  
* **Coffee Trade and Usage statistics**
  * *HTML:* [coffeeTradeUsageStats.html](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/coffeeTradeUsageStats.html)
  * *JS:* [js/coffeetradeusagestats.js](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/js/coffeetradeusagestats.js)
* **Coffee pricing**
  * *HTML:* [CoffeePrice.html](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/CoffeePrice.html)
  * *JS:* [js/logic.js](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/js/logic.js) 
* **Coffee Sales HTML**
  * *HTML:* [CoffeeSales.html](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/CoffeeSales.html)
  * *JS:* [js/salesLogic.js](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/js/salesLogic.js)
* **Coffee Import/Export HTML**
  * *HTML:* [coffeeImportExport.html](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/coffeeImportExport.html)
  * *JS:* [js/importexportlogic.js](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/js/importexportlogic.js)  
 
### Api files
* **Flash python file:** [app.py](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/app.py)

### Database schema files
* [database/Coffee_dataset.sql](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/database/Coffee_dataset.sql)
* [database/Schema_new_name.sql](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/database/Schema_new_name.sql)

### Database input files
CSV files in [database](https://github.com/ranjini-rao/Java-Jive-Junction/tree/vinaya_branch/database) folder.

### Database original source
* https://www.kaggle.com/datasets/michals22/coffee-dataset

* https://www.kaggle.com/datasets/saadharoon27/coffee-bean-sales-raw-dataset/data

### Style files
[CSS](https://github.com/ranjini-rao/Java-Jive-Junction/tree/vinaya_branch/CSS)

### Libraries used
* World map 3rd party lib : https://jvectormap.com/
* d3.js : https://d3js.org/d3.v5.min.js
* c3.js : https://unpkg.com/c3@0.7.20/c3.min.js
* leaflet : https://unpkg.com/leaflet/dist/leaflet.js
* axios.min : https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js

  
## Visualizations

### Coffee Consumption
This visualization shows the amount of coffee consumed in different parts of the world over the past few years.
Here we can select and see which country consumed the max amount of coffee based on the orders placed for different types of coffee.
There's filter for selecting different countries, coffee types and years on the top left corner of the page to toggle between different visualizations.
If we hover and click over the appearing city it will show us the amount and type of coffee ordered in that area.

### Coffee import/export per country
This visualization shows 2 different types of analysis for countries selected, 1st one is import analysis, and 2nd one is export analysis.
* Import visualization shows per country Coffee Import over years. A user can select country from the drop down and it will show the import volumn over years from 1990 till 2019 in a line graph, like a time series data. By this we can understand how the import pattern changed for the specific country. 
* Export visualization also provides Coffee Export over years. Similar to import data, user can select the export country, and the line chart time series data will show how the pattern for export changed for the country selected. By this we can understad how the export pattern changed for the country over years.

### Coffee Trade and Usage statistics
This visualization shows per year statistics for Coffee Import, Export, Production and Domestic Consumption. A user can select year (1990-2019) and category (Import, Export, Production and Consumption) from the drop down and it will show following two statistics:
* Top 10 countries for that year in the given category. This is a bar graph type of chart.
* World wide map view of data in the given category. For example, if 2019 year and Import is selected, the map will show world wide imports with color shades, dark color means more import and light color means lesser import.

### Coffee pricing
The coffee price visualization provides the pricing information for the 4 types of coffee beans by their roast types. For the selected coffee type and the roast type, prices are displayed for the 4 different package sizes. The price comparison visualization shows the comparison of prices of coffee types and their roast types.

### Coffee sales
In the coffee sales visualization we look at the four major types of coffee sold from the years 2019 to 2022. The stacked bars show the relative quantities of both total sales amount and total profit amount per year. The results for 2022 have been extrapolated, with a correction for seasonality, since the last sales record was from August 19th, 2022


## Steps to setup and run the project
* Use the database schema files listed above to create the database schema in postgres.
* Use the data input files in csv to populate the database.
* To install the required libraries run the following commands
   * pip install Flask Flask_SQLAlchemy
   * pip install flask-cors
* Edit the api file (app.py) with postgres username and password at line 19 and 23 to enable api to access the database.
* Run the command `python app.py` to start the localhost server for the api access. The api will get hosted locally at `http://127.0.0.1:5000/`
* open the index.html file to access the website.

*Note: The step 4 may fail for a few times due to absence of dependencies in your system. Please note the error and install appropriate dependencies and try again.*

## Data Ethics: 

* Both datasets used for our project come from Kaggle, and open sourced website. There is no personal identifying information in the our data. Our team double checked the sales data to make sure it is generated, and does not represent real people. No data in the international coffee trade set is sensitive or requires any extra security.

