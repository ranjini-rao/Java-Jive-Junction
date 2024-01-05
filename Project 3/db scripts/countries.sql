-- Table: public.countries

-- DROP TABLE IF EXISTS public.countries;

CREATE TABLE IF NOT EXISTS public.countries
(
    country_id integer NOT NULL DEFAULT nextval('countries_country_id_seq'::regclass),
    country character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT countries_pkey PRIMARY KEY (country_id),
    CONSTRAINT countries_country_key UNIQUE (country)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.countries
    OWNER to postgres;

GRANT ALL ON TABLE public.countries TO postgres;

GRANT ALL ON TABLE public.countries TO read_app;