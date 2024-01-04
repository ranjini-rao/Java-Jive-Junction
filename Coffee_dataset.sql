-- Create the 'countries' table as the parent table
CREATE TABLE countries (
    Country_ID SERIAL PRIMARY KEY,
    Country VARCHAR(255) UNIQUE NOT NULL
);

-- Create the group of tables that are time series
-- Each Uses Country as the foreign key to the parent table

-- Because we are populating the tables with data later 
-- We will use a drop table function as well

DROP TABLE IF EXISTS coffee_consumption;

CREATE TABLE coffee_consumption (
    Country VARCHAR(255) REFERENCES countries(Country) NOT NULL,
    Coffee_Type VARCHAR(255) NOT NULL,
    Year_1990 NUMERIC,
    Year_1991 NUMERIC,
	Year_1992 NUMERIC,
    Year_1993 NUMERIC,
	Year_1994 NUMERIC,
    Year_1995 NUMERIC,
	Year_1996 NUMERIC,
    Year_1997 NUMERIC,
	Year_1998 NUMERIC,
    Year_1999 NUMERIC,
	Year_2000 NUMERIC,
	Year_2001 NUMERIC,
	Year_2002 NUMERIC,
	Year_2003 NUMERIC,
	Year_2004 NUMERIC,
	Year_2005 NUMERIC,
	Year_2006 NUMERIC,
	Year_2007 NUMERIC,
	Year_2008 NUMERIC,
	Year_2009 NUMERIC,
	Year_2010 NUMERIC,
	Year_2011 NUMERIC, 
	Year_2012 NUMERIC,
	Year_2013 NUMERIC, 
	Year_2014 NUMERIC,
	Year_2015 NUMERIC, 
	Year_2016 NUMERIC,
	Year_2017 NUMERIC, 
	Year_2018 NUMERIC,
	Year_2019 NUMERIC, 
    Total_Domestic_Consumption NUMERIC
);

DROP TABLE IF EXISTS coffee_exporters;

CREATE TABLE coffee_exporters (
    Country VARCHAR(255) REFERENCES countries(Country) NOT NULL,
    Year_1990 NUMERIC,
    Year_1991 NUMERIC,
	Year_1992 NUMERIC,
    Year_1993 NUMERIC,
	Year_1994 NUMERIC,
    Year_1995 NUMERIC,
	Year_1996 NUMERIC,
    Year_1997 NUMERIC,
	Year_1998 NUMERIC,
    Year_1999 NUMERIC,
	Year_2000 NUMERIC,
	Year_2001 NUMERIC,
	Year_2002 NUMERIC,
	Year_2003 NUMERIC,
	Year_2004 NUMERIC,
	Year_2005 NUMERIC,
	Year_2006 NUMERIC,
	Year_2007 NUMERIC,
	Year_2008 NUMERIC,
	Year_2009 NUMERIC,
	Year_2010 NUMERIC,
	Year_2011 NUMERIC, 
	Year_2012 NUMERIC,
	Year_2013 NUMERIC, 
	Year_2014 NUMERIC,
	Year_2015 NUMERIC, 
	Year_2016 NUMERIC,
	Year_2017 NUMERIC, 
	Year_2018 NUMERIC,
	Year_2019 NUMERIC, 
    Total_Exports NUMERIC
);

DROP TABLE IF EXISTS coffee_green_inventory;

CREATE TABLE coffee_green_inventory (
    Country VARCHAR(255) REFERENCES countries(Country) NOT NULL,
    Year_1990 NUMERIC,
    Year_1991 NUMERIC,
	Year_1992 NUMERIC,
    Year_1993 NUMERIC,
	Year_1994 NUMERIC,
    Year_1995 NUMERIC,
	Year_1996 NUMERIC,
    Year_1997 NUMERIC,
	Year_1998 NUMERIC,
    Year_1999 NUMERIC,
	Year_2000 NUMERIC,
	Year_2001 NUMERIC,
	Year_2002 NUMERIC,
	Year_2003 NUMERIC,
	Year_2004 NUMERIC,
	Year_2005 NUMERIC,
	Year_2006 NUMERIC,
	Year_2007 NUMERIC,
	Year_2008 NUMERIC,
	Year_2009 NUMERIC,
	Year_2010 NUMERIC,
	Year_2011 NUMERIC, 
	Year_2012 NUMERIC,
	Year_2013 NUMERIC, 
	Year_2014 NUMERIC,
	Year_2015 NUMERIC, 
	Year_2016 NUMERIC,
	Year_2017 NUMERIC, 
	Year_2018 NUMERIC,
	Year_2019 NUMERIC, 
    Total_Inventory NUMERIC
);

DROP TABLE IF EXISTS coffee_importers;

CREATE TABLE coffee_importers (
    Country VARCHAR(255) REFERENCES countries(Country) NOT NULL,
    Year_1990 NUMERIC,
    Year_1991 NUMERIC,
	Year_1992 NUMERIC,
    Year_1993 NUMERIC,
	Year_1994 NUMERIC,
    Year_1995 NUMERIC,
	Year_1996 NUMERIC,
    Year_1997 NUMERIC,
	Year_1998 NUMERIC,
    Year_1999 NUMERIC,
	Year_2000 NUMERIC,
	Year_2001 NUMERIC,
	Year_2002 NUMERIC,
	Year_2003 NUMERIC,
	Year_2004 NUMERIC,
	Year_2005 NUMERIC,
	Year_2006 NUMERIC,
	Year_2007 NUMERIC,
	Year_2008 NUMERIC,
	Year_2009 NUMERIC,
	Year_2010 NUMERIC,
	Year_2011 NUMERIC, 
	Year_2012 NUMERIC,
	Year_2013 NUMERIC, 
	Year_2014 NUMERIC,
	Year_2015 NUMERIC, 
	Year_2016 NUMERIC,
	Year_2017 NUMERIC, 
	Year_2018 NUMERIC,
	Year_2019 NUMERIC, 
    Totsl_Imports NUMERIC
);

DROP TABLE IF EXISTS coffee_importers_consumption;

CREATE TABLE coffee_importers_consumption (
    Country VARCHAR(255) REFERENCES countries(Country) NOT NULL,
    Year_1990 NUMERIC,
    Year_1991 NUMERIC,
	Year_1992 NUMERIC,
    Year_1993 NUMERIC,
	Year_1994 NUMERIC,
    Year_1995 NUMERIC,
	Year_1996 NUMERIC,
    Year_1997 NUMERIC,
	Year_1998 NUMERIC,
    Year_1999 NUMERIC,
	Year_2000 NUMERIC,
	Year_2001 NUMERIC,
	Year_2002 NUMERIC,
	Year_2003 NUMERIC,
	Year_2004 NUMERIC,
	Year_2005 NUMERIC,
	Year_2006 NUMERIC,
	Year_2007 NUMERIC,
	Year_2008 NUMERIC,
	Year_2009 NUMERIC,
	Year_2010 NUMERIC,
	Year_2011 NUMERIC, 
	Year_2012 NUMERIC,
	Year_2013 NUMERIC, 
	Year_2014 NUMERIC,
	Year_2015 NUMERIC, 
	Year_2016 NUMERIC,
	Year_2017 NUMERIC, 
	Year_2018 NUMERIC,
	Year_2019 NUMERIC, 
    Totsl_Imports_Consumption NUMERIC
);

DROP TABLE IF EXISTS coffee_production;

CREATE TABLE coffee_production (
    Country VARCHAR(255) REFERENCES countries(Country) NOT NULL,
    Coffee_Type VARCHAR(255) NOT NULL,
	Year_1990 NUMERIC,
    Year_1991 NUMERIC,
	Year_1992 NUMERIC,
    Year_1993 NUMERIC,
	Year_1994 NUMERIC,
    Year_1995 NUMERIC,
	Year_1996 NUMERIC,
    Year_1997 NUMERIC,
	Year_1998 NUMERIC,
    Year_1999 NUMERIC,
	Year_2000 NUMERIC,
	Year_2001 NUMERIC,
	Year_2002 NUMERIC,
	Year_2003 NUMERIC,
	Year_2004 NUMERIC,
	Year_2005 NUMERIC,
	Year_2006 NUMERIC,
	Year_2007 NUMERIC,
	Year_2008 NUMERIC,
	Year_2009 NUMERIC,
	Year_2010 NUMERIC,
	Year_2011 NUMERIC, 
	Year_2012 NUMERIC,
	Year_2013 NUMERIC, 
	Year_2014 NUMERIC,
	Year_2015 NUMERIC, 
	Year_2016 NUMERIC,
	Year_2017 NUMERIC, 
	Year_2018 NUMERIC,
	Year_2019 NUMERIC, 
    Totsl_Production NUMERIC
);

DROP TABLE IF EXISTS coffee_re_exported;

CREATE TABLE coffee_re_exported (
    Country VARCHAR(255) REFERENCES countries(Country) NOT NULL,
    Year_1990 NUMERIC,
    Year_1991 NUMERIC,
	Year_1992 NUMERIC,
    Year_1993 NUMERIC,
	Year_1994 NUMERIC,
    Year_1995 NUMERIC,
	Year_1996 NUMERIC,
    Year_1997 NUMERIC,
	Year_1998 NUMERIC,
    Year_1999 NUMERIC,
	Year_2000 NUMERIC,
	Year_2001 NUMERIC,
	Year_2002 NUMERIC,
	Year_2003 NUMERIC,
	Year_2004 NUMERIC,
	Year_2005 NUMERIC,
	Year_2006 NUMERIC,
	Year_2007 NUMERIC,
	Year_2008 NUMERIC,
	Year_2009 NUMERIC,
	Year_2010 NUMERIC,
	Year_2011 NUMERIC, 
	Year_2012 NUMERIC,
	Year_2013 NUMERIC, 
	Year_2014 NUMERIC,
	Year_2015 NUMERIC, 
	Year_2016 NUMERIC,
	Year_2017 NUMERIC, 
	Year_2018 NUMERIC,
	Year_2019 NUMERIC, 
    Totsl_Re_Exported_Coffee NUMERIC
);


-- Load in the csv documents 

COPY countries(Country_ID, Country)
FROM '/path/to/resources/Coffee_Countries.csv' DELIMITER ',' CSV HEADER;

COPY coffee_consumption(Country, Coffee_Type, Year_1991, Year_1992, Year_1993, Year_1994, Year_1995, Year_1996, Year_1997, Year_1998, Year_1999, Year_2000, Year_2001, Year_2002, Year_2003, Year_2004, Year_2005, Year_2006, Year_2007, Year_2008, Year_2009, Year_2010, Year_2011, Year_2012, Year_2013, Year_2014, Year_2015, Year_2016, Year_2017, Year_2018, Year_2019, Total_Domestic_Consumption)
FROM '/path/to/resources/Coffee_domestic_consumption.csv' DELIMITER ',' CSV HEADER;

COPY coffee_exporters(Country, Year_1990, Year_1991, Year_1992, Year_1993, Year_1994, Year_1995, Year_1996, Year_1997, Year_1998, Year_1999, Year_2000, Year_2001, Year_2002, Year_2003, Year_2004, Year_2005, Year_2006, Year_2007, Year_2008, Year_2009, Year_2010, Year_2011, Year_2012, Year_2013, Year_2014, Year_2015, Year_2016, Year_2017, Year_2018, Year_2019, Total_Exports)
FROM '/path/to/resources/Coffee_export.csv' DELIMITER ',' CSV HEADER;

COPY coffee_green_inventory(Country, Year_1991, Year_1992, Year_1993, Year_1994, Year_1995, Year_1996, Year_1997, Year_1998, Year_1999, Year_2000, Year_2001, Year_2002, Year_2003, Year_2004, Year_2005, Year_2006, Year_2007, Year_2008, Year_2009, Year_2010, Year_2011, Year_2012, Year_2013, Year_2014, Year_2015, Year_2016, Year_2017, Year_2018, Year_2019, Green_Inventory)
FROM '/path/to/resources/Coffee_green_inventory.csv' DELIMITER ',' CSV HEADER;

COPY coffee_importers(Country, Year_1991, Year_1992, Year_1993, Year_1994, Year_1995, Year_1996, Year_1997, Year_1998, Year_1999, Year_2000, Year_2001, Year_2002, Year_2003, Year_2004, Year_2005, Year_2006, Year_2007, Year_2008, Year_2009, Year_2010, Year_2011, Year_2012, Year_2013, Year_2014, Year_2015, Year_2016, Year_2017, Year_2018, Year_2019, Total_Imports)
FROM '/path/to/resources/Coffee_import.csv' DELIMITER ',' CSV HEADER;

COPY coffee_importers_consumption(Country, Year_1991, Year_1992, Year_1993, Year_1994, Year_1995, Year_1996, Year_1997, Year_1998, Year_1999, Year_2000, Year_2001, Year_2002, Year_2003, Year_2004, Year_2005, Year_2006, Year_2007, Year_2008, Year_2009, Year_2010, Year_2011, Year_2012, Year_2013, Year_2014, Year_2015, Year_2016, Year_2017, Year_2018, Year_2019, Total_Imports_Consumption)
FROM '/path/to/resources/Coffee_importers_consumption.csv' DELIMITER ',' CSV HEADER;

COPY coffee_production(Country, Year_1991, Year_1992, Year_1993, Year_1994, Year_1995, Year_1996, Year_1997, Year_1998, Year_1999, Year_2000, Year_2001, Year_2002, Year_2003, Year_2004, Year_2005, Year_2006, Year_2007, Year_2008, Year_2009, Year_2010, Year_2011, Year_2012, Year_2013, Year_2014, Year_2015, Year_2016, Year_2017, Year_2018, Year_2019, Total_Production)
FROM '/path/to/resources/Coffee_production.csv' DELIMITER ',' CSV HEADER;

COPY coffee_re_exported(Country, Year_1991, Year_1992, Year_1993, Year_1994, Year_1995, Year_1996, Year_1997, Year_1998, Year_1999, Year_2000, Year_2001, Year_2002, Year_2003, Year_2004, Year_2005, Year_2006, Year_2007, Year_2008, Year_2009, Year_2010, Year_2011, Year_2012, Year_2013, Year_2014, Year_2015, Year_2016, Year_2017, Year_2018, Year_2019, Re_Exported)
FROM '/path/to/resources/Coffee_re_export.csv' DELIMITER ',' CSV HEADER;

COPY coffe_consumption FROM 'resources/Coffee_domestic_consumption.csv' WITH CSV HEADER DELIMITER ',' QUOTE '"';


