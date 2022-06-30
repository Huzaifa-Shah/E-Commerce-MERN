const formidable = require("formidable");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Product = require("../models/productModel");

module.exports.getProducts = async (req, res) => {
  const page = req.params.page;
  const perPage = 6;
  const skip = (page - 1) * perPage;

  try {
    const count = await Product.find({}).countDocuments();
    const posts = await Product.find({})
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    return res.status(200).json({ response: posts, count, perPage });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports.getProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ _id: id });
    return res.status(200).json({ product });
  } catch {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports.createProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    user,
  } = req.body;

  const errors = [];
  if (name === "") {
    errors.push({ msg: "Name is Required" });
  }
  if (price === 0) {
    errors.push({ msg: "Price is Required" });
  }
  if (description === "") {
    errors.push({ msg: "Description is Required" });
  }
  if (image === "") {
    errors.push({ msg: "Image is Required" });
  }
  if (brand === "") {
    errors.push({ msg: "Brand is Required" });
  }
  if (category === "") {
    errors.push({ msg: "Category is Required" });
  }
  if (countInStock === 0) {
    errors.push({ msg: "Count in Stock is Required" });
  }

  if (errors.length != 0) {
    return res.status(400).json({ errors });
  } else {
    try {
      const newProduct = await Product.create({
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        user,
      });
      return res
        .status(200)
        .json({ msg: "Product created successfully", newProduct });
    } catch (error) {
      return res.status(500).json({ errors: error, msg: error.message });
    }
  }
};

module.exports.getUserProducts = async (req, res) => {
  const id = req.params.id;
  try {
    const products = await Product.find({ user: id });
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports.deleteUserProduct = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.findOneAndDelete({ _id: id });
  } catch (error) {
    return res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports.updateUserProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    productId,
  } = req.body;

  const errors = [];
  if (name === "") {
    errors.push({ msg: "Name is Required" });
  }
  if (price === 0) {
    errors.push({ msg: "Price is Required" });
  }
  if (description === "") {
    errors.push({ msg: "Description is Required" });
  }
  if (image === "") {
    errors.push({ msg: "Image is Required" });
  }
  if (brand === "") {
    errors.push({ msg: "Brand is Required" });
  }
  if (category === "") {
    errors.push({ msg: "Category is Required" });
  }
  if (countInStock === 0) {
    errors.push({ msg: "Count in Stock is Required" });
  }

  if (errors.length != 0) {
    return res.status(400).json({ errors });
  } else {
    try {
      const updateProduct = await Product.findOneAndUpdate(
        { _id: productId },
        { name, price, description, image, brand, category, countInStock },
        { new: true }
      );
      return res.status(200).json({ msg: "Product updated succesfully", updateProduct });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
};
