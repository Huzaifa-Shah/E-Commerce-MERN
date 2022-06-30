import React, { useState, useEffect } from "react";

//Dependencies
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

//styles and components
import "../Admin.css";
import "./Create.css";
import "../Setting/Setting.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Loader from "../../../components/Loader/Loader";
import { createProduct } from "../../../store/asyncMethods/ProductMethod";

export default function Create() {
  //States
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState("Choose Image");
  const [uploading, setUploading] = useState(false);

  //Reducers
  const { user } = useSelector((state) => state.AuthReducer);
  const { productError } = useSelector((state) => state.CreateProductReducer);
  const dispatch = useDispatch();
  const userId = user._id;

  //Error Checking
  useEffect(() => {
    if (productError.length > 0) {
      productError.map((error) => toast.error(error.msg));
    }
  }, [productError]);

  //Functions
  const fileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setCurrentImage(file.name);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        user: userId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <div className="container_admin">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          style: {
            fontSize: "14px",
          },
        }}
      />
      <div className="sidebar_panel">
        <Sidebar />
      </div>
      <div className="create_form_panel">
        <form onSubmit={submitHandler}>
          <div className="col-8 p-15">
            <div className="row ml-minus-15 mr-minus-15">
              <div className="create_card">
                <h3 className="card_h3">Create Product</h3>
                <div className="group">
                  <label htmlFor="name">Product Name</label>
                  <input
                    type="text"
                    id="name"
                    className="group__control"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="price">Product Price</label>
                  <input
                    type="number"
                    id="price"
                    className="group__control"
                    placeholder="Enter Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="image" className="image__label">
                    {currentImage}
                  </label>
                  <input type="file" id="image" onChange={fileHandler} />
                  {uploading && <Loader />}
                </div>
                <div className="group">
                  <label htmlFor="brand">Product Brand</label>
                  <input
                    type="text"
                    id="brand"
                    className="group__control"
                    placeholder="Enter brand name"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="InStock">Count In Stock</label>
                  <input
                    type="number"
                    id="InStock"
                    className="group__control"
                    placeholder="Enter CountInStock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="category">Product Category</label>
                  <input
                    type="text"
                    id="category"
                    className="group__control"
                    placeholder="Enter Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="group">
                  <label htmlFor="description">Product Description</label>
                  <textarea
                    type="text"
                    id="description"
                    rows="6"
                    cols="50"
                    className="group__control"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="group">
                  <button className="btn btn_status" type="submit">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
