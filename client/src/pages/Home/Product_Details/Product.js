import React, { useEffect, useState } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

//styles and components
import { getProduct } from "../../../store/asyncMethods/ProductMethod";
import "./Product.css";
import Rating from "../../../components/Rating/Rating";
import Loader from "../../../components/Loader/Loader";

export default function Product({history, match}) {
  //Hooks
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const { loading } = useSelector((state) => state.homeProducts);
  const { product } = useSelector((state) => state.getProduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);

  //Functions
  const addToCartHandler = () =>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  return (
    <div className="product_main">
      <Link className="btn" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : (
        <div className="product_container">
          <div className="product_img">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product_details">
            <h3>{product.name}</h3>
            <span className="product_rating">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </span>
            <p className="product_price">Price: ${product.price}</p>
            <p className="product_description">
              Description: {product.description}
            </p>
          </div>
          <div className="product_CTA">
            <p className="product_status">
              <span>Price:</span>
              <strong>${product.price}</strong>
            </p>
            <p className="product_status">
              <span>Staus:</span>
              <strong>
                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </strong>
            </p>
            {product.countInStock > 0 && (
              <div className="product_status">
                <span>Quantity:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  style={{ marginTop: "0.5rem", paddingLeft: "2rem" }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={addToCartHandler}
              className={
                product.countInStock === 0
                  ? "btn_status btn_disabled"
                  : "btn btn_status"
              }
              type="button"
              disabled={product.countInStock === 0}
            >
              {product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
