import React, { useEffect } from "react";

//Dependencies
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

//styles and components
import Footer from "../../components/Footer/Footer";
import { homeProducts } from "../../store/asyncMethods/ProductMethod";
import "./Home.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Rating from "../../components/Rating/Rating";
import Loader from "../../components/Loader/Loader";

export default function Home() {
  //Hooks
  const { loading, products, count, perPage } = useSelector(
    (state) => state.homeProducts
  );
  const dispatch = useDispatch();
  let { page } = useParams();

  //Reducer Functionality
  if (page === undefined) {
    page = 1;
  }
  useEffect(() => {
    dispatch(homeProducts(page));
  }, [page, dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="main">
            {products.map((product) => (
              <div className="products_detail" key={product._id}>
                <div className="card">
                  <h1>{product.name}</h1>
                  <div className="home_rating">
                    <Rating value={product.rating} />
                  </div>
                  <p className="information">
                    {product.description.slice(0, 100)}...
                  </p>
                  <div className="control">
                    <Link to={`/details/${product._id}`}>
                      <button className="COA_btn">
                        <span className="price">${product.price}</span>
                        <span className="shopping-cart">
                          <AiOutlineShoppingCart />
                        </span>
                        <span className="buy">Get now</span>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="products-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="products_img"
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
