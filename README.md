# Java-Jive-Junction
Add details

## Team members:
* Bryson Wersonske
* Madhavi Pandey
* Vinaya Kusuma
* Ranjini Rao
* Reetu Jakhar
* Pallavi Tripathi

## Project Architecture:
<img width="645" alt="Screenshot 2024-01-07 at 3 38 24 PM" src="https://github.com/ranjini-rao/Java-Jive-Junction/assets/139268721/87cda83c-b757-47fe-8eb8-8ddc128f6e5c">

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

### Style files
[CSS](https://github.com/ranjini-rao/Java-Jive-Junction/tree/vinaya_branch/CSS)

### Libraries used
* World map 3rd party lib: [js/jquery-jvectormap-2.0.5.min.js](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/js/jquery-jvectormap-2.0.5.min.js), [js/jquery-jvectormap-world-mill.js](https://github.com/ranjini-rao/Java-Jive-Junction/blob/vinaya_branch/js/jquery-jvectormap-world-mill.js)
* c3.js
  
## Visualizations

### Coffee Consumption
Add details

### Coffee import/export per country
This visualization shows 2 different typoe of analysis for countries selected, 1st one is import analysis, and 2nd one is export analysis.
* Import visualization shows per country Coffee Import over years. A user can select country from the drop down and it will show the import volumn over years from 1990 till 2019 in a line graph, like a time series data. By this we can understand how the import pattern changed for the specific country. 
* Export visualization also provides Coffee Export over years. Similar to import data, user can select the export country, and the line chart time series data will show how the pattern for export changed for the country selected. By this we can understad how the export pattern changed for the country over years.

### Coffee Trade and Usage statistics
This visualization shows per year statistics for Coffee Import, Export, Production and Domestic Consumption. A user can select year (1990-2019) and category (Import, Export, Production and Consumption) from the drop down and it will show following two statistics:
* Top 10 countries for that year in the given category. This is a bar graph type of chart.
* World wide map view of data in the given category. For example, if 2019 year and Import is selected, the map will show world wide imports with color shades, dark color means more import and light color means lesser import.

### Coffee pricing
The coffee price visualization provides the pricing information for the 4 types of cofee beans by their roast types.For the selected coffee type and the roast type, prices are displayed for the 4 different package sizes. The price comaprison visualization shows the comparison of prices of coffee types and their roast types.

### Coffee sales
Add details


## Steps to setup and run the project
* Use the database schema files listed above to create the database schema in postgres.
* Use the data input files in csv to populate the database.
* To install the required libraries run the following commands
   * pip install Flask Flask_SQLAlchemy
   * pip install flask-cors
* Edit the api file (app.py) with postgres username and password at line 19 and 23 to enable api to access the database.
* Run the command `python app.py` to start the localhost server for the api access. The api will get hosted locally at `http://127.0.0.1:5000/`
* open the index.html file to access the website.

*Note: the step 4 may fail for a few times due to absence of dependencies in your system. Please note the error and install appropriate dependencies and try again.*
