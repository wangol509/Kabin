--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

-- Started on 2018-07-10 17:09:56 EDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET SESSION AUTHORIZATION 'postgres';

--
-- TOC entry 6 (class 2615 OID 148365)
-- Name: kabin_db; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA kabin_db;


--
-- TOC entry 3203 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA kabin_db; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA kabin_db IS 'standard public schema';


SET search_path = kabin_db, pg_catalog;

--
-- TOC entry 227 (class 1255 OID 166102)
-- Name: createclient(integer, character varying, character varying, character varying, character varying, character varying, character varying, character, character varying, character varying, boolean, character varying, timestamp without time zone, character varying, timestamp without time zone, date); Type: FUNCTION; Schema: kabin_db; Owner: postgres
--

CREATE FUNCTION createclient(addr_id integer, firstname character varying, lastname character varying, funct character varying, card_id character varying, etype character varying, details character varying, sex character, tels character varying, email character varying, isactive boolean, cby character varying, dcreated timestamp without time zone, mby character varying, dmodified timestamp without time zone, bdate date) RETURNS integer
    LANGUAGE plpgsql
    AS $$

    DECLARE 
        tmp int;
    BEGIN
        SELECT client_id into tmp FROM kabin_db.client 
        WHERE address_id = addr_id
        AND client_firstname = lastname
        AND client_lastname = firstname
        AND client_email = email
        AND client_tels = tels ;

        if tmp IS NOT NULL THEN
            RETURN tmp;

        ELSE
            INSERT INTO kabin_db.client(
                address_id, 
                client_firstname, 
                client_lastname, 
                client_func, 
                client_card_id, 
                client_type, 
                client_details,
                client_sex, 
                client_tels, 
                client_email, 
                client_active, 
                created_by, 
                date_created, 
                modified_by, 
                date_modified,
                client_birthday)
            values(
                    addr_id,
                    firstname,
                    lastname,
                    funct,
                    card_id,
                    etype,
                    details,
                    sex,
                    tels,
                    email,
                    isactive,
                    cby,
                    dcreated,
                    mby,
                    dmodified,
                    bdate);
            SELECT CURRVAL('kabin_db.client_client_id_seq') into tmp;
            RETURN tmp;
        END IF;
   END;

$$;


--
-- TOC entry 221 (class 1255 OID 148366)
-- Name: createemployee(integer, character varying, character varying, character varying, character varying, character varying, character varying, character, character varying, character varying, boolean, character varying, timestamp without time zone, character varying, timestamp without time zone, date); Type: FUNCTION; Schema: kabin_db; Owner: postgres
--

CREATE FUNCTION createemployee(addr_id integer, firstname character varying, lastname character varying, funct character varying, card_id character varying, etype character varying, details character varying, sex character, tels character varying, email character varying, isactive boolean, cby character varying, dcreated timestamp without time zone, mby character varying, dmodified timestamp without time zone, bdate date) RETURNS integer
    LANGUAGE plpgsql
    AS $$

    DECLARE 
        tmp int;
    BEGIN
        SELECT employee_id into tmp FROM kabin_db.employee 
        WHERE address_id = addr_id
        AND employee_firstname = lastname
        AND employee_lastname = firstname
        AND employee_email = email
        AND employee_tels = tels ;

        if tmp IS NOT NULL THEN
            RETURN tmp;

        ELSE
            INSERT INTO kabin_db.employee(
                address_id, 
                employee_firstname, 
                employee_lastname, 
                employee_func, 
                employee_card_id, 
                employee_type, 
                employee_details,
                employee_sex, 
                employee_tels, 
                employee_email, 
                employee_active, 
                created_by, 
                date_created, 
                modified_by, 
                date_modified,
                employee_birthday)
            values(
                    addr_id,
                    firstname,
                    lastname,
                    funct,
                    card_id,
                    etype,
                    details,
                    sex,
                    tels,
                    email,
                    isactive,
                    cby,
                    dcreated,
                    mby,
                    dmodified,
                    bdate);
            SELECT CURRVAL('kabin_db.employee_employee_id_seq') into tmp;
            RETURN tmp;
        END IF;
   END;

$$;


--
-- TOC entry 226 (class 1255 OID 165633)
-- Name: createstudent(integer, integer, integer, integer, character varying, character varying, date, character varying, character, character varying, character varying, character varying, character varying, character varying, character varying, character varying, timestamp without time zone, character varying, timestamp without time zone, character varying, boolean, integer, text, text); Type: FUNCTION; Schema: kabin_db; Owner: postgres
--

CREATE FUNCTION createstudent(ins_id integer, par_id integer, pref_id integer, inscid integer, std_firstname character varying, std_lastname character varying, std_birthday date, std_birthplace character varying, std_sex character, std_mtonge character varying, std_skills character varying, std_tels character varying, std_email character varying, std_addr character varying, std_religion character varying, cby character varying, dcreated timestamp without time zone, mby character varying, dmodified timestamp without time zone, std_img character varying, std_active boolean, pf_id integer, std_address text, old_school text) RETURNS integer
    LANGUAGE plpgsql
    AS $$

    DECLARE 
        tmp int;
    BEGIN
        SELECT student_id into tmp FROM kabin_db.student 
        WHERE parent_id = par_id
        AND  person_ref_id  = pref_id
        AND institution_class_id = inscid
        AND student_lastname = std_lastname
        AND student_birthplace = std_birthplace
        AND student_firstname = std_firstname
        AND student_birthday = std_birthday ;

        if tmp IS NOT NULL THEN
            RETURN tmp;

        ELSE
         
            INSERT INTO kabin_db.student(
            institution_id,
            parent_id,
            person_ref_id,
            institution_class_id,
            student_firstname,
            student_lastname,
            student_birthday,
            student_birthplace,
            student_sex,
            student_mother_tonge,
            student_skills,
            student_tels,
            student_email,
            student_addr,
            student_religion,
            created_by,
            date_created,
            modified_by,
            date_modified,
            student_img,
            student_active,
            parentf_id,
            student_address,
            student_old_school)
            values(
                ins_id,
                par_id,
                pref_id,
                inscid,
                std_firstname,
                std_lastname,
                std_birthday,
                std_birthplace,
                std_sex,
                std_mtonge,
                std_skills,
                std_tels,
                std_email,
                std_addr,
                std_religion,
                cby,
                dcreated,
                mby,
                dmodified,
                std_img,
                std_active,
                pf_id,
                std_address,
            	old_school);
            SELECT CURRVAL('kabin_db.student_student_id_seq') into tmp;
            RETURN tmp;
        END IF;
   END;
$$;


--
-- TOC entry 225 (class 1255 OID 148368)
-- Name: insertaddress(character varying, character varying, character varying, character varying, character varying, character varying, character varying, timestamp without time zone, character varying, timestamp without time zone); Type: FUNCTION; Schema: kabin_db; Owner: postgres
--

CREATE FUNCTION insertaddress(country character varying, cstate character varying, city character varying, street character varying, zipcode character varying, details character varying, cby character varying, dcreated timestamp without time zone, mby character varying, dmodified timestamp without time zone) RETURNS integer
    LANGUAGE plpgsql
    AS $$
	DECLARE 
    	tmp int;
    BEGIN
        SELECT address_id into tmp FROM kabin_db.address 
        WHERE address_country = country
        AND address_state = cstate 
        AND address_city = city
        AND address_street = street;

        if tmp IS NOT NULL THEN
        	RETURN tmp;
        ELSE
            INSERT INTO kabin_db.address(address_country, address_state, address_city, address_street, address_zipcode, address_details, created_by, date_created, modified_by, date_modified) 
            values(country, cstate, city, street, zipcode, details, cby, dcreated, mby, dmodified);
            SELECT CURRVAL('kabin_db.address_address_id_seq') into tmp;
            RETURN tmp;
        END IF;
   END;

$$;


--
-- TOC entry 222 (class 1255 OID 148369)
-- Name: insertinstclass(integer, character varying, character varying, character varying, character varying, character varying, timestamp without time zone, character varying, timestamp without time zone); Type: FUNCTION; Schema: kabin_db; Owner: postgres
--

CREATE FUNCTION insertinstclass(inst_id integer, inst_class_name character varying, inst_class_level character varying, inst_class_desc character varying, inst_class_code character varying, cby character varying, dcreated timestamp without time zone, mby character varying, dmodified timestamp without time zone) RETURNS integer
    LANGUAGE plpgsql
    AS $$

    DECLARE 
        tmp int;
    BEGIN
        SELECT institution_class_id into tmp FROM kabin_db.institution_class 
        WHERE institution_id = inst_id
        AND institution_class_name = inst_class_name
        AND institution_class_level = inst_class_level
        AND institution_class_code = inst_class_code;

        if tmp IS NOT NULL THEN
            RETURN tmp;
        ELSE
            INSERT INTO kabin_db.institution_class(institution_id, institution_class_name, institution_class_level, institution_class_desc, institution_class_code, created_by, date_created, modified_by, date_modified) 
            values(inst_id, inst_class_name, inst_class_level, inst_class_desc, inst_class_code, cby, dcreated, mby, dmodified);
            SELECT CURRVAL('kabin_db.institution_class_institution_class_id_seq') into tmp;
            RETURN tmp;
        END IF;
   END;

$$;


--
-- TOC entry 223 (class 1255 OID 148370)
-- Name: insertparent(character varying, character varying, character varying, character, character varying, character varying, character varying, character varying, timestamp without time zone, character varying, timestamp without time zone, text); Type: FUNCTION; Schema: kabin_db; Owner: postgres
--

CREATE FUNCTION insertparent(firstname character varying, lastname character varying, title character varying, sex character, tels character varying, email character varying, religion character varying, cby character varying, dcreated timestamp without time zone, mby character varying, dmodified timestamp without time zone, p_addr text) RETURNS integer
    LANGUAGE plpgsql
    AS $$

    DECLARE 
        tmp int;
    BEGIN
        SELECT parent_id into tmp FROM kabin_db.parent 
        WHERE parent_firstname = firstname
        AND parent_lastname = lastname
        AND parent_email = email
        AND parent_tels = tels ;

        if tmp IS NOT NULL THEN
            RETURN tmp;
        ELSE
            INSERT INTO kabin_db.parent(parent_firstname, parent_lastname, parent_title, parent_sex, parent_tels, parent_email, parent_religion, created_by, date_created, modified_by, date_modified, parent_address)
            values(firstname, lastname, title, sex, tels, email, religion, cby, dcreated, mby, dmodified, p_addr);
            SELECT CURRVAL('kabin_db.parent_parent_id_seq') into tmp;
            RETURN tmp;
        END IF;
   END;

$$;


--
-- TOC entry 224 (class 1255 OID 148371)
-- Name: insertpref(character varying, character varying, character, character varying, character varying, character varying, character varying, timestamp without time zone, character varying, timestamp without time zone, text); Type: FUNCTION; Schema: kabin_db; Owner: postgres
--

CREATE FUNCTION insertpref(firstname character varying, lastname character varying, sex character, tels character varying, email character varying, pdesc character varying, cby character varying, dcreated timestamp without time zone, mby character varying, dmodified timestamp without time zone, p_ref text) RETURNS integer
    LANGUAGE plpgsql
    AS $$

    DECLARE 
        tmp int;
    BEGIN
        SELECT person_ref_id into tmp FROM kabin_db.person_ref 
        WHERE person_ref_firstname = firstname
        AND person_ref_lastname = lastname
        AND person_ref_email = email
        AND person_ref_tels = tels ;

        if tmp IS NOT NULL THEN
            RETURN tmp;

        ELSE
            INSERT INTO kabin_db.person_ref(person_ref_firstname, person_ref_lastname, person_ref_sex, person_ref_tels, person_ref_email, person_ref_desc, created_by, date_created, modified_by, date_modified, person_ref_address)
            values(firstname, lastname, sex, tels, email, pdesc, cby, dcreated, mby, dmodified, p_ref);
            SELECT CURRVAL('kabin_db.person_ref_person_ref_id_seq') into tmp;
            RETURN tmp;
        END IF;
   END;

$$;

