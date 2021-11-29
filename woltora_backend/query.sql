CREATE TABLE restaurants(
  restaurant_id uuid DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  operating_hours VARCHAR(15) NOT NULL,
  type VARCHAR(25) NOT NULL,
  price_level VARCHAR(4) NOT NULL,
  image varchar(255),
  PRIMARY KEY (restaurant_id),
  FOREIGN KEY (owner_id) REFERENCES owners(owner_id)
);
CREATE TABLE menus (
  menu_id uuid DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL,
  category VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price VARCHAR(10) NOT NULL,
  image varchar(255),
  PRIMARY KEY (menu_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);
CREATE TABLE owners(
  owner_id uuid DEFAULT uuid_generate_v4(),
  fname VARCHAR(45) NOT NULL,
  lname VARCHAR(45) NOT NULL,
  user_name VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (owner_id)
);
CREATE TABLE customers(
  customer_id uuid DEFAULT uuid_generate_v4(),
  fname VARCHAR(45) NOT NULL,
  lname VARCHAR(45) NOT NULL,
  address VARCHAR(255) NOT NULL,
  user_name VARCHAR(45) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (customer_id)
);
CREATE TABLE orders(
  order_id uuid DEFAULT uuid_generate_v4(),
  customer_id UUID,
  date TIMESTAMP NOT NULL,
  total_price VARCHAR(10) NOT NULL,
  status VARCHAR(45) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
CREATE TABLE menu_order(
  menu_id UUID NOT NULL,
  order_id UUID NOT NULL
);
INSERT INTO
  owners (fname, lname, user_name, password)
VALUES
  ('John', 'Doe', 'john', 'ghi789');
SELECT
  owner_id
FROM
  owners
WHERE
  fname = 'John';
SELECT
  *
FROM
  pg_catalog.pg_tables;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE restaurants;
SELECT
  *
FROM
  restaurants;
SELECT
  *
FROM
  menus;
DELETE FROM
  restaurants;
DELETE FROM
  menus;