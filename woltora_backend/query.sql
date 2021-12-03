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
  status VARCHAR(45) DEFAULT NULL,
  customer_address VARCHAR(255) NOT NULL,
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
DROP TABLE orders;
SELECT
  *
FROM
  menus;
SELECT
  *
FROM
  orders;
DELETE FROM
  restaurants;
DELETE FROM
  menus;
INSERT INTO
  customers (fname, lname, address, user_name, password)
VALUES
  (
    'Ossi',
    'Asiakas',
    'Kauppakatu 10',
    'ossi',
    'abc123'
  );
INSERT INTO
  orders (
    date,
    total_price,
    status,
    customer_address,
    customer_id
  )
VALUES
  (
    now(),
    29.90,
    'Closed',
    'Kauppakatu 10',
    '98fff5e7-54d1-4370-b264-85284c564258'
  );
INSERT INTO
  menu_order (order_id, menu_id)
VALUES
  (
    '7cb4e910-8a82-4700-837d-58f90114280c',
    '9a3af3bf-38db-48ea-b622-ac34811c3300'
  );
SELECT
  orders.order_id,
  date,
  total_price,
  status,
  customer_address
FROM
  orders
  JOIN menu_order ON orders.order_id = menu_order.order_id
  JOIN menus ON menus.menu_id = menu_order.menu_id
  JOIN restaurants ON restaurants.restaurant_id = menus.restaurant_id
WHERE
  restaurants.restaurant_id = 'a1511248-e85e-45bb-8e72-44891b8cc545';