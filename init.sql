-- Sequence for users
CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Sequence for uris
CREATE SEQUENCE public.uris_uri_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Sequence for monitors
CREATE SEQUENCE public.monitors_monitor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Sequence for stats
CREATE SEQUENCE public.stats_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Table: uris
CREATE TABLE public.uris (
    uri_id integer NOT NULL DEFAULT nextval('public.uris_uri_id_seq'::regclass),
    uri text NOT NULL,
    PRIMARY KEY (uri_id)
);

-- Table: users
CREATE TABLE public.users (
    user_id integer NOT NULL DEFAULT nextval('public.users_user_id_seq'::regclass),
    username character varying(32) NOT NULL,
    password character varying(255) NOT NULL,
    uri_id integer NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE (username),
    FOREIGN KEY (uri_id) REFERENCES public.uris(uri_id)
);

-- Table: monitors
CREATE TABLE public.monitors (
    monitor_id integer NOT NULL DEFAULT nextval('public.monitors_monitor_id_seq'::regclass),
    type character varying(16) NOT NULL,
    user_id integer NOT NULL,
    parameters json,
    PRIMARY KEY (monitor_id),
    FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);

-- Table: alerts
CREATE TABLE public.alerts (
    alert_id uuid NOT NULL,
    user_id integer,
    alert_obj json NOT NULL,
    PRIMARY KEY (alert_id),
    FOREIGN KEY (user_id) REFERENCES public.users(user_id)
);

-- Table: stats
CREATE TABLE public.stats (
    stats_id integer NOT NULL DEFAULT nextval('public.stats_stats_id_seq'::regclass),
    monitor_id integer,
    table_name character varying(255),
    num_rows integer,
    stats_obj json,
    starting timestamp with time zone,
    ending timestamp with time zone,
    PRIMARY KEY (stats_id),
    FOREIGN KEY (monitor_id) REFERENCES public.monitors(monitor_id)
);