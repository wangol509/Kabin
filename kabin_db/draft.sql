-- Table: kabin_db.audience

-- DROP TABLE kaffbin_db.audience;

CREATE TABLE kabin_db.audience
(
    audience_id serial PRIMARY KEY,
    employe_id integer NOT NULL,
    folder_id integer NOT NULL,
    audience_date date,
    audience_for character varying(100) COLLATE pg_catalog."default" NOT NULL,
    audience_juridiction character varying(100) COLLATE pg_catalog."default" NOT NULL,
    audience_statut character varying(100) COLLATE pg_catalog."default" NOT NULL,
    audience_details text,
    created_by character varying(45) COLLATE pg_catalog."default",
    date_created timestamp(6) without time zone,
    modified_by character varying(45) COLLATE pg_catalog."default",
    date_modified timestamp(6) without time zone,

    CONSTRAINT audience_folder_fk FOREIGN KEY (folder_id)
        REFERENCES kabin_db.folder (folder_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,

    CONSTRAINT audience_employee_fk FOREIGN KEY (employe_id)
        REFERENCES kabin_db.employee (employe_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE kabin_db.audience
    OWNER to postgres;


