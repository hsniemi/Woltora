const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const pool = require('./db');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());



app.get('/', async (req, res) => {
  try {
    const restaurants = await pool.query(
      "SELECT * FROM restaurants"
    );
    res.json(restaurants.rows);
  } catch (err) {
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
        const {owner_id} = req.body;
        const {image} = req.body;
        const restaurant = await pool.query(
            "INSERT INTO restaurants (name, address, operating_hours, type, price_level, owner_id, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, address, operating_hours, type, price_level, owner_id, image]
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
  //     const fileStr = req.body.image;
  //     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
  //     upload_preset: 'dev_setups',
  //     });
  //     console.log(uploadResponse);
  //     res.json(uploadResponse.secure_url);

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

// app.post('/owner/addrestaurant/addmenu', uploadMenu.single('image'), (req, res) => {
//   console.log(req.body);
//     menuData.menus.push({
//       "id": menuData.menus.length + 1,
//       "Category": req.body.category,
//       "Name": req.body.name,
//       "Description": req.body.description,
//       "Price": req.body.price,
//       "Image": req.file
//     })
//     console.log("menu added");
//     console.log(menuData.menus);
// })









// app.post('/owner/addrestaurant', upload.single('Image'), (req, res) => {
//     console.log(req.body);
//     restaurantData.restaurants.push({
//         "id":restaurantData.restaurants.length + 1,
//         "Name": req.body.Name,
//         "Address": req.body.Address,
//         "Type": req.body.Type,
//         "OperatingHours": req.body.OperatingHours,
//         "PriceLevel": req.body.PriceLevel,
//         "OwnerId": req.body.OwnerId,
//         "Image": req.file     
//     })
//     console.log("restaurant added");
//     console.log(restaurantData.restaurants);
//     res.json(restaurantData.restaurants);
//   })
  
 
  
  app.listen(4000, () => {
    console.log(`Example app listening at http://localhost:4000`)
  })