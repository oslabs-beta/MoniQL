--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9 (Ubuntu 13.9-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.10 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- Name: dict_int; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;


--
-- Name: EXTENSION dict_int; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';


--
-- Name: dict_xsyn; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;


--
-- Name: EXTENSION dict_xsyn; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';


--
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgrowlocks; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;


--
-- Name: EXTENSION pgrowlocks; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';


--
-- Name: pgstattuple; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;


--
-- Name: EXTENSION pgstattuple; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';


--
-- Name: tablefunc; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;


--
-- Name: EXTENSION tablefunc; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: xml2; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;


--
-- Name: EXTENSION xml2; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alerts; Type: TABLE; Schema: public; Owner: zdjrortn
--

CREATE TABLE public.alerts (
    alert_id uuid NOT NULL,
    user_id integer,
    alert_obj json NOT NULL
);


ALTER TABLE public.alerts OWNER TO zdjrortn;

--
-- Name: monitors; Type: TABLE; Schema: public; Owner: zdjrortn
--

CREATE TABLE public.monitors (
    monitor_id integer NOT NULL,
    type character varying(16) NOT NULL,
    user_id integer NOT NULL,
    parameters json
);


ALTER TABLE public.monitors OWNER TO zdjrortn;

--
-- Name: monitors_monitor_id_seq; Type: SEQUENCE; Schema: public; Owner: zdjrortn
--

CREATE SEQUENCE public.monitors_monitor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.monitors_monitor_id_seq OWNER TO zdjrortn;

--
-- Name: monitors_monitor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdjrortn
--

ALTER SEQUENCE public.monitors_monitor_id_seq OWNED BY public.monitors.monitor_id;


--
-- Name: stats; Type: TABLE; Schema: public; Owner: zdjrortn
--

CREATE TABLE public.stats (
    stats_id integer NOT NULL,
    monitor_id integer,
    table_name character varying(255),
    num_rows integer,
    stats_obj json,
    starting timestamp with time zone,
    ending timestamp with time zone
);


ALTER TABLE public.stats OWNER TO zdjrortn;

--
-- Name: stats_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: zdjrortn
--

CREATE SEQUENCE public.stats_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.stats_stats_id_seq OWNER TO zdjrortn;

--
-- Name: stats_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdjrortn
--

ALTER SEQUENCE public.stats_stats_id_seq OWNED BY public.stats.stats_id;


--
-- Name: uris; Type: TABLE; Schema: public; Owner: zdjrortn
--

CREATE TABLE public.uris (
    uri_id integer NOT NULL,
    uri text NOT NULL
);


ALTER TABLE public.uris OWNER TO zdjrortn;

--
-- Name: uris_uri_id_seq; Type: SEQUENCE; Schema: public; Owner: zdjrortn
--

CREATE SEQUENCE public.uris_uri_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.uris_uri_id_seq OWNER TO zdjrortn;

--
-- Name: uris_uri_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdjrortn
--

ALTER SEQUENCE public.uris_uri_id_seq OWNED BY public.uris.uri_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: zdjrortn
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(32) NOT NULL,
    password character varying(255) NOT NULL,
    uri_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO zdjrortn;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: zdjrortn
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO zdjrortn;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zdjrortn
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: monitors monitor_id; Type: DEFAULT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.monitors ALTER COLUMN monitor_id SET DEFAULT nextval('public.monitors_monitor_id_seq'::regclass);


--
-- Name: stats stats_id; Type: DEFAULT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.stats ALTER COLUMN stats_id SET DEFAULT nextval('public.stats_stats_id_seq'::regclass);


--
-- Name: uris uri_id; Type: DEFAULT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.uris ALTER COLUMN uri_id SET DEFAULT nextval('public.uris_uri_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: alerts alerts_pkey; Type: CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_pkey PRIMARY KEY (alert_id);


--
-- Name: monitors monitors_pkey; Type: CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.monitors
    ADD CONSTRAINT monitors_pkey PRIMARY KEY (monitor_id);


--
-- Name: stats stats_pkey; Type: CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT stats_pkey PRIMARY KEY (stats_id);


--
-- Name: uris uris_pkey; Type: CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.uris
    ADD CONSTRAINT uris_pkey PRIMARY KEY (uri_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: alerts alerts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.alerts
    ADD CONSTRAINT alerts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: monitors monitors_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.monitors
    ADD CONSTRAINT monitors_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: stats stats_monitor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.stats
    ADD CONSTRAINT stats_monitor_id_fkey FOREIGN KEY (monitor_id) REFERENCES public.monitors(monitor_id);


--
-- Name: users users_uri_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: zdjrortn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_uri_id_fkey FOREIGN KEY (uri_id) REFERENCES public.uris(uri_id);


--
-- PostgreSQL database dump complete
--

