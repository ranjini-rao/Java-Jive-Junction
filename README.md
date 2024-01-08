# Java-Jive-Junction
Project-3

Database Management System: MySQL with PGAdmin4
Other Dependencies:
Python
Pandas
The [Database Name] is open-sourced software licensed under the [MIT License](LICENSE).

The data was gathered from Kaggle: https://www.kaggle.com/datasets/michals22/coffee-dataset/code

Before I put the csv tables into pandas some work was done in excel: inclduding shortening many countries name to common usage (such as Laos and Ivory Coast), combining Beligum and Luxembourg into one row, fixing some spelling mistakes and making sure each number was saved in the number format and not as a string when loaded into PGAdmin or python.

There was not a suitable parent table in the existing csv files, pandas was used to join the tables on the country so that a unique function could be run. This gave a list of all unique countries, and that list was used to create the parent table in the SQL database. 

For flask purposes the primary key of each table is the country name. 


For the second SQL database Vinaya and I worked together with multiple SQL queries to find a compelling story for sales data based on the type of coffee, in order to create a visualization based on sales data. 






