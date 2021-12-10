const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const pool = require('./db');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());

app.use((req, res, next) => { 
    console.log('middleware executing...');
    next();
});

const users = [
  {
    id: 1,
    username: 'demouser',
    password: '123456'
  },
  {
    id: 2,
    username: 'testuser',
    password: '789876'
  }
]

passport.use(new BasicStrategy(
  async (username, password, done) => {
    console.log('username: ' + username);
    console.log('password: ' + password);
 
    pool.query(
      "SELECT * FROM users WHERE user_name = $1",
      [username],
      (err, result) => {
        if(err) {
          throw err;
        }
        console.log(result.rows[0]);
        
        if(result.rows.length > 0) {
          if(bcrypt.compareSync(password, result.rows[0].password)) {
            done(null, result.rows[0]);
          }else{
            done(null, false);
          }
        }else{
          done(null, false);
        }
      }
    )
  }
))

app.get('/login', passport.authenticate('basic', {session: false}), (req, res) => {
  console.log('Protected Resource accessed');

  res.send('Hello protected world!');
})

app.get('/OwnerLogin', passport.authenticate('basic', {session: false}), (req, res) => {
  console.log('Another Protected Resource accessed');
  res.send('Moro eli terve admin');
})


app.post('/register', async (req, res) => {
  console.log(req.body);
  const salt = bcrypt.genSaltSync(6);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  try{
    const {fname} = req.body;
    const {lname} = req.body;
    const {street_address} = req.body;
    const {post_code} = req.body;
    const {user_name} = req.body;
    const password = passwordHash

    const result = await pool.query(
      "INSERT INTO users (fname, lname, street_address, post_code, user_name, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING*",
      [fname, lname, street_address, post_code, user_name, password]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  }catch(err){
    console.log(err.message);
  }
})

app.get('/', async (req, res) => {
  try {
    const restaurants = await pool.query(
      "SELECT * FROM restaurants"
    );
    console.log(restaurants.rows);
    res.json(restaurants.rows);
  } catch (err) {
    console.log(err.message);
  }
});
app.post('/menus', async (req, res) => {
  try{

    const menus = await pool.query(
      "SELECT * FROM menus"
    );
    res.json(menus.rows);
  }catch(err){
    console.log(err.message);
  }
})

app.post('/owner/addrestaurant/image', async (req, res) => {
  try {
      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'woltora',
      });
      console.log("uploadresponse: " + uploadResponse.secure_url);
      res.json(uploadResponse.secure_url);
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
  }
});

app.post('/owner/addrestaurant/data', async (req, res) => {
  console.log(req.body);
    try {
        const {name} = req.body;
        const {address} = req.body;
        const {operating_hours} = req.body;
        const {type} = req.body;
        const {price_level} = req.body;
        const {user_id} = req.body;
        const {image} = req.body;
        const restaurant = await pool.query(
            "INSERT INTO restaurants (name, address, operating_hours, type, price_level, user_id, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, address, operating_hours, type, price_level, user_id, image]
        );
        console.log(restaurant.rows[0]);
        res.json(restaurant.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

app.post('/owner/addrestaurant/addmenu', async (req, res) => {
  try {
      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          upload_preset: 'woltora',
      });
      console.log("uploadresponse: " + uploadResponse.secure_url);
      res.json(uploadResponse.secure_url);
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
  }
});

app.post('/owner/addrestaurant/addmenu/data', async (req, res) => {
  console.log("req.body: " + req.body.data);
  try {
      console.log(req.body);
      const {restaurant_id} =req.body;
      const {category} = req.body;
      const {name} = req.body;
      const {description} = req.body;
      const {price} = req.body;
      const {image} = req.body;

      const menu = await pool.query(
        "INSERT INTO menus (restaurant_id, category, name, description, price, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [restaurant_id, category, name, description, price, image]
      );
      res.json(menu.rows[0]);
      console.log(menu.rows[0]);
  } catch (err) {
      console.error("error: " + err.message);
  }
});

app.post('/shoppingcart', async (req, res) => {
  console.log("req.body.data: " + req.body.data);
  try {
    const {user_id} = req.body;
    const {total_price} = req.body;
    const {status} = req.body;
    const {delivery_address} = req.body;
    const {payment_method} = req.body;


    const result = await pool.query(
      "INSERT INTO orders (user_id, date, total_price, status, eta, delivery_address, payment_method) VALUES($1, now(), $2, $3, 'Unspecified', $4, $5) RETURNING *",
      [user_id, total_price, status, delivery_address, payment_method]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

app.post('/shoppingcart/menuorder', async (req, res) => {
  try {
    const {menu_id} = req.body;
    const {order_id} = req.body;

    const result = await pool.query(
    "INSERT INTO menus_orders (menu_id, order_id) VALUES($1, $2) RETURNING *",
    [menu_id, order_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

app.get('/menu/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await pool.query(
      "SELECT * FROM menus WHERE restaurant_id = $1",
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
})

app.get('/owner/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const results = await pool.query(
      "SELECT orders.order_id, date, total_price, status, delivery_address, orders.user_id FROM orders JOIN menus_orders ON orders.order_id = menus_orders.order_id JOIN menus ON menus.menu_id = menus_orders.menu_id JOIN restaurants ON restaurants.restaurant_id = menus.restaurant_id WHERE restaurants.restaurant_id = $1 ORDER BY date DESC",
      [req.params.id]
    );
    console.log(results.rows);
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data:{
        orders: results.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
});


app.get('/customer/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await pool.query(
      "SELECT order_id, date, status, eta, total_price FROM orders WHERE user_id = $1 AND status NOT IN ('Closed') ORDER BY orders.date",
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/customerhistory/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await pool.query(
      "SELECT order_id, date, status, total_price FROM orders WHERE user_id = $1 AND status = 'Closed' ORDER BY date DESC",
      [req.params.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
})

app.put('/customer/receivedorder/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await pool.query(
      "UPDATE orders SET status = 'Received' WHERE order_id = $1 RETURNING *",
      [req.params.id]
    );
    res.json(result);
  } catch (err) {
    console.log(err.message);
  }
})

app.put('/updatestatus', async (req, res) => {
  console.log(req.body);
  try {
    const result = await pool.query(
      "UPDATE orders SET status = $1, eta = $2 WHERE order_id = $3 RETURNING *",
      [req.body.status, req.body.eta, req.body.order_id]
    );
    console.log(result.rows[0]);
    res.json("update success");
  } catch (err) {
    console.log(err.message);
  }
})

app.put('/closeorder', async (req, res) => {
  console.log(req.body);
  try {
    const result = await pool.query(
      "UPDaTE orders SET status = $1 WHERE order_id = $2 RETURNING *",
      [req.body.status, req.body.order_id]
    );
   res.json(result.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})
  
 
  
  app.listen(4000, () => {
    console.log(`Example app listening at http://localhost:4000`)
  })