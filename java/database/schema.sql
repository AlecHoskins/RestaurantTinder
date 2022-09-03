BEGIN TRANSACTION;

DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

DROP TABLE IF EXISTS restaurant;
DROP SEQUENCE IF EXISTS seq_restaurant_id;

CREATE SEQUENCE seq_restaurant_id
INCREMENT BY 1
NO MAXVALUE
NO MINVALUE
CACHE 1;

DROP TABLE IF EXISTS restaurant_hours;
DROP SEQUENCE IF EXISTS seq_hours_id;

CREATE SEQUENCE seq_hours_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

DROP TABLE IF EXISTS restaurant_type;
DROP SEQUENCE IF EXISTS seq_type_id;

CREATE SEQUENCE seq_type_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

DROP TABLE IF EXISTS restaurant_votes;

DROP TABLE IF EXISTS event;
DROP SEQUENCE IF EXISTS seq_event_id;

CREATE SEQUENCE seq_event_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

DROP TABLE IF EXISTS guest;
DROP SEQUENCE IF EXISTS seq_guest_id;

CREATE SEQUENCE seq_guest_id
INCREMENT BY 1
NO MAXVALUE
NO MINVALUE
CACHE 1;

DROP TABLE IF EXISTS guest_event;

CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE event (
   event_id int DEFAULT nextval('seq_event_id'::regclass) NOT NULL,
   event_time timestamp NOT NULL,
   zipcode int NOT NULL,
   host_id int NOT NULL,
   CONSTRAINT PK_event PRIMARY KEY (event_id),
   CONSTRAINT FK_host FOREIGN KEY (host_id) REFERENCES users(user_id)
);

CREATE TABLE restaurant_type (
   type_id int DEFAULT nextval('seq_type_id'::regclass) NOT NULL,
   restaurant_type varchar(50) NOT NULL,
   CONSTRAINT PK_type PRIMARY KEY (type_id)
);

CREATE TABLE restaurant (
   restaurant_id int DEFAULT nextval('seq_restaurant_id'::regclass) NOT NULL,
   type_id int NOT NULL,
   img_url varchar(200),
   restaurant_name varchar(200) NOT NULL,
   address varchar(200) NOT NULL,
   city_state varchar(50) NOT NULL,
   zip int NOT NULL,
   CONSTRAINT PK_restaurant PRIMARY KEY (restaurant_id),
   CONSTRAINT FK_type FOREIGN KEY (type_id) REFERENCES restaurant_type(type_id)
);

CREATE TABLE restaurant_hours (
   hours_id int DEFAULT nextval('seq_hours_id'::regclass) NOT NULL,
   restaurant_id int NOT NULL,
   day_of_week int NOT NULL,
   open_time time NOT NULL,
   close_time time NOT NULL,
   CONSTRAINT PK_hours PRIMARY KEY (hours_id),
   CONSTRAINT FK_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE restaurant_votes (
   restaurant_id int NOT NULL,
   event_id int NOT NULL,
   down_votes int NOT NULL,
   up_votes int NOT NULL,
   CONSTRAINT FK_event FOREIGN KEY (event_id) REFERENCES event(event_id),
   CONSTRAINT FK_restaurant FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
   CONSTRAINT PK_vote PRIMARY KEY (event_id, restaurant_id)
);


CREATE TABLE guest (
   guest_id int DEFAULT nextval('seq_guest_id'::regclass) NOT NULL,
   nickname varchar(50) NOT NULL,
   url varchar(200) NOT NULL,
   role varchar(200) NOT NULL,
   user_id int NOT NULL,
   CONSTRAINT PK_guest PRIMARY KEY (guest_id),
   CONSTRAINT FK_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE guest_event (
   guest_id int NOT NULL,
   event_id int NOT NULL,
   CONSTRAINT FK_event FOREIGN KEY (event_id) REFERENCES event(event_id),
   CONSTRAINT FK_guest FOREIGN KEY (guest_id) REFERENCES guest(guest_id),
   CONSTRAINT PK_guest_event PRIMARY KEY (event_id, guest_id)
);



INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');


COMMIT TRANSACTION;
