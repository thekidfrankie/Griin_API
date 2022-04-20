CREATE TABLE IF NOT EXISTS task(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE,
  description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users
(
    id integer NOT NULL DEFAULT nextval('griin_schema.user_id_seq'::regclass),
    name text COLLATE pg_catalog."default" NOT NULL,
    last_name text COLLATE pg_catalog."default" NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
)

insert into user values
  ("admin", "name", "agustinmoore13@gmail.com")
