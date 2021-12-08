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
CREATE TABLE menus (
  menu_id uuid DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL,
  category VARCHAR(50) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image varchar(255),
  PRIMARY KEY (menu_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);
CREATE TABLE orders(
  order_id uuid DEFAULT uuid_generate_v4(),
  customer_id UUID,
  date TIMESTAMP NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(45),
  delivery_address VARCHAR(255) NOT NULL,
  payment_method VARCHAR(15) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
CREATE TABLE menus_orders(
  menu_id UUID NOT NULL,
  order_id UUID NOT NULL,
  FOREIGN KEY (menu_id) REFERENCES menus(menu_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
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
  menus;
SELECT
  *
FROM
  orders;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
DROP TABLE orders cascade;
SELECT
  *
FROM
  orders;
SELECT
  *
FROM
  restaurants;
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
    39.90,
    'Delivered',
    'Kauppurienkatu 24',
    'c0a8547f-3bde-4c6f-aba9-0f4d2feb2aeb'
  );
INSERT INTO
  menu_order (order_id, menu_id)
VALUES
  (
    '2e61016d-11d4-41da-8e1f-c8377252de9e',
    '342ca5fc-7d3e-4cdd-ada5-aee7327234d2'
  );
SELECT
  orders.order_id,
  date,
  price,
  status,
  delivery_address
FROM
  orders
  JOIN menus_orders ON orders.order_id = menus_orders.order_id
  JOIN menus ON menus.menu_id = menus_orders.menu_id
  JOIN restaurants ON restaurants.restaurant_id = menus.restaurant_id
WHERE
  restaurants.restaurant_id = '82f468e6-f923-4109-8e55-d148c45f44cc';
SELECT
  *
FROM
  menus
  JOIN menus_orders ON menus.menu_id = menus_orders.menu_id
  JOIN orders ON orders.order_id = menus_orders.order_id 
  JOIN customers ON customers.customer_id = orders.customer_id
WHERE
  orders.customer_id = "c0a8547f-3bde-4c6f-aba9-0f4d2feb2aeb";
UPDATE
  orders
SET
  status = 'Closed'
WHERE
 delivery_address = 'Yliopistokatu 16';
SHOW TIMEZONE;
SET
  TIMEZONE = + 2;
DELETE FROM
  orders;
SELECT
  menu_id,
  order_id
FROM
  menus
  CROSS JOIN orders;