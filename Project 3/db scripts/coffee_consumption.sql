-- Table: public.coffee_consumption

-- DROP TABLE IF EXISTS public.coffee_consumption;

CREATE TABLE IF NOT EXISTS public.coffee_consumption
(
    country character varying(255) COLLATE pg_catalog."default" NOT NULL,
    coffee_type character varying(255) COLLATE pg_catalog."default" NOT NULL,
    year_1990 numeric,
    year_1991 numeric,
    year_1992 numeric,
    year_1993 numeric,
    year_1994 numeric,
    year_1995 numeric,
    year_1996 numeric,
    year_1997 numeric,
    year_1998 numeric,
    year_1999 numeric,
    year_2000 numeric,
    year_2001 numeric,
    year_2002 numeric,
    year_2003 numeric,
    year_2004 numeric,
    year_2005 numeric,
    year_2006 numeric,
    year_2007 numeric,
    year_2008 numeric,
    year_2009 numeric,
    year_2010 numeric,
    year_2011 numeric,
    year_2012 numeric,
    year_2013 numeric,
    year_2014 numeric,
    year_2015 numeric,
    year_2016 numeric,
    year_2017 numeric,
    year_2018 numeric,
    year_2019 numeric,
    total_domestic_consumption numeric,
    CONSTRAINT coffee_consumption_pkey PRIMARY KEY (country),
    CONSTRAINT coffee_consumption_country_fkey FOREIGN KEY (country)
        REFERENCES public.countries (country) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.coffee_consumption
    OWNER to postgres;

GRANT ALL ON TABLE public.coffee_consumption TO postgres;

GRANT ALL ON TABLE public.coffee_consumption TO read_app;