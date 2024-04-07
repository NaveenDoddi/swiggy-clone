const express = require("express");
const cors = require('cors');
const mongoose= require('mongoose');
const items = require("./modelItem");
const restaurants = require("./modelRestraurant");
const customers = require("./modelCustomer");
const cartItems = require("./modelCartItem");
const app = express();
const path = require('path');


app.use(cors()); 
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const url = "mongodb+srv://naveendoddi:zQTrjUrwyKXeIEZ2@swiggy.jbdpwef.mongodb.net/swiggy?retryWrites=true&w=majority&appName=swiggy";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    ()=> console.log("DB connected...", mongoose.connection.name)
).catch(err => console.log(err))


app.post("/postCustomer", async (req, res)=>{ // customer registration process
  const { username, email, mobile, address } = req.body;
  try{
      const newData = new customers({ username, email, mobile, address });
      await newData.save();
      res.status(201).json({ message: "User registered successfully" });
  }catch(err){
    res.status(400).json({ error: "exists" });
  }
})
app.post("/postRestaurant", async (req, res) => { // restaurant registration process
  const { name, address, email, mobile, username, password } = req.body;
  try {
      const newData = new restaurants({ name, address, email, mobile, username, password });
      await newData.save();
      res.status(201).json({ message: "Restaurant registered successfully" });
  } catch (err) {
    if (err.code == 11000 && err.keyPattern.email) {
        // Duplicate key error for the "username" field
        res.status(400).json({ error: "exists" });
    } else {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
  }
});


app.post("/postItem", async (req, res)=>{ // add item used in restraurant page
  const { restaurant, email, dishName, price, discription, pic } = req.body;
  try{
      const newData = new items({ restaurant, email, dishName, price, discription, pic });
      await newData.save();
      res.status(200).json({ message: "Item registered successfully" });
  }catch(err){
    res.status(400);
  }
})

app.post("/postCart", async (req, res)=>{ // add item used in restraurant page
  const { restaurant, mobile, dishName, price, image, discription } = req.body;
  try{
      const newData = new cartItems({ restaurant, mobile, dishName, price, image, discription });
      await newData.save();
      res.status(200).json({ message: "Item added to cart successfully" });
  }catch(err){
    res.status(400);
  }
})

app.get("/getCartItems/:mobile", async (req, res)=>{ // display all items on customer dashboard
  try{
    const mobile = req.params.mobile;

    const allData = await cartItems.find( {mobile} );
    return res.status(200).json(allData);

  }catch(err){
    console.log(err)
  }
})

app.get("/getAllItems", async (req, res)=>{ // display all items on customer dashboard
  try{
    const allData = await items.find();
    return res.status(200).json(allData);
  }catch(err){
    console.log(err)
  }
})


app.get("/customers/:mobile", async (req, res)=>{ // login for customer
  try{
      const mobile = req.params.mobile;

      const user = await customers.findOne({ mobile });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
      
  }catch(err){
      console.log(err.message)
  }
})


app.get("/restaurant/:email", async (req, res)=>{  // login for restraurant
  try{
      const email = req.params.email;

      const restaurant = await restaurants.findOne({ email });

      if (!restaurant) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(restaurant);
      
  }catch(err){
      console.log(err.message)
  }
})

app.get("/items/:email", async (req, res)=>{ // display items based on the mail for restraurants
  try{
      const email = req.params.email;

      const user = await items.find({ email });

      if (!user) {
        return res.status(404).json({ error: 'items not found' });
      }

      res.json(user);
      
  }catch(err){
    return res.status(400);
  }
})

app.get("/searchItems/:dishName", async (req, res)=>{ // display items based on the mail for restraurants
  try{
      const dishName = req.params.dishName;

      const user = await items.find({ dishName });

      if (!user) {
        return res.status(404).json({ error: 'items not found' });
      }

      res.json(user);
      
  }catch(err){
    return res.status(400);
  }
})


// app.post('/updateDocument', async (req, res) => {
//   var id = req.params.id
//       try {
//           // Assuming swiggy is your MongoDB model
//           const updateResult = await swiggy.updateOne({ sale : "on"}, { $push: { tags: "newItem" } });
//           console.log('Updated documents =>', updateResult);
//           // Send JSON response with the update result
//           res.json({ success: true, message: 'New item added to the array successfully', data: updateResult });
//       } catch (error) {
//           console.error('Error updating documents:', error);
//           // Send JSON response with error message
//           res.status(500).json({ success: false, message: 'An error occurred while updating documents' });
//       }
  
// });



// app.post('/updateOne', async (req, res) => {
//   var updateData = req.body
//   const updateResult = await swiggy.updateOne(
//       { _id: ObjectId("6606a5d539d08bbbcb04bb09"), brandname: "samsung2.Oa", price: 299 }, // Filter: Find the document by its _id and other specific criteria
//       { $push: { tags: "newTag" } } // Update: Push "newTag" into the tags array
//   )
//   console.log('Updated documents =>', updateResult);
// });


app.delete("/delItems/:id", async (req, res)=>{ // delete items form the restraurant page
  try{
      await items.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: "Item removed successfully" });
  }catch(err){
    res.status(400);
  }
})

app.delete("/delCartItems/:id", async (req, res)=>{ // delete items form the cart page
  try{
      await cartItems.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: "Item removed successfully" });
  }catch(err){
    res.status(400);
  }
})

app.delete("/cartEmpty/:mobile", async (req, res)=>{ // delete items form the cart page
  var mobile = req.params.mobile
  try{
      await cartItems.deleteMany({mobile})
      res.status(200).json({ message: "Items removed successfully.... cart empty" });
  }catch(err){
    res.status(400);
  }
})

app.patch("/updateItem/:id", async (req, res) => {
  const restaurantId = req.params.id;
  const updates = req.body;

  try {
    const updatedRestaurant = await items.findByIdAndUpdate(restaurantId, updates, { new: true });

    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


app.listen(3000, ()=> console.log("server is running..."))

