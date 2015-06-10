DROP TABLE IF EXISTS app.user CASCADE;

CREATE TABLE app.user (
  user_id uuid PRIMARY KEY,
  user_name text,
  password text,
  date_created timestamp without time zone DEFAULT now(),
  date_modified timestamp without time zone,
  date_deleted timestamp without time zone
)
WITH (
  OIDS=FALSE
);
ALTER TABLE app.user
  OWNER TO auth;
