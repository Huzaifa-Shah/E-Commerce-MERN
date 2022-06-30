//NPM Packages
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const app = express();

//Make these static for image upload so browser can process them
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//Project files and routes
const connect = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const profileRoutes = require("./routes/profileRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

//connect to database
connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/", userRoutes);
app.use("/", productRoutes);
app.use("/", profileRoutes);
app.use("/", orderRoutes);
app.use("/", uploadRoutes);

//Sending PayPal secret key to frontend
app.get("/user/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Your app is running");
});
