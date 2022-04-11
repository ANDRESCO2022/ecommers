import "../styles/home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterCategoriesThunk,
  filterHeadlineThunk,
  getCategoriesThunk,
  getProductsThunk,
} from "../redux/actions";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const [headline, setHeadline] = useState("");
  const [isCategories,setIsCategories] = useState(false)
  
  useEffect(() => {
    dispatch(getCategoriesThunk());
    dispatch(getProductsThunk());
  }, [dispatch]);
  const searchProducts = (e) => {
    e.preventDefault();
    dispatch(filterHeadlineThunk(headline));
  };
  return (
    <section className="container__default">
      <div className="block__searchProduct">
        <form onSubmit={searchProducts} className="form__searchProduct">
          <input
            type="text"
            placeholder="search product"
            onChange={(e) => setHeadline(e.target.value)}
            value={headline}
          />
          <button>
            <b>
              <i className="fa-solid fa-magnifying-glass"></i>
            </b>
          </button>
        </form>
        <br />
        <button
          onClick={() => setIsCategories(!isCategories)}
          className="filter__categories__condition"
        >
          <b>
            <i className="fa-solid fa-filter"> </i>
          </b>
          Filter Products
        </button>
        <div className={`btn__filter_fixed ${isCategories ? "openFixed" : ""}`}>
          <button
            onClick={() => setIsCategories(!isCategories)}
            className="filter__categories__closed"
          >
            <b>
              <i className="fa-solid fa-xmark"></i>
            </b>
          </button>
          <h3>Filter Products</h3>
          <div className="filter__map">
            <h4>Category:</h4>
            <br />
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => dispatch(filterCategoriesThunk(category.id))}
                className="filter__category__botton"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="list__block__products">
        {products.length === 0 ? (
          <p>product not found!!</p>
        ) : (
          products?.map((productItem) => (
            <ul key={productItem.id} className="list__block__card">
              <Link to={`/products/${productItem.id}`}>
                <div className="list__img">
                  <img
                    src={productItem.productImgs[1]}
                    alt="img_hover"
                    className="over"
                  />
                  <img src={productItem.productImgs[0]} alt="img_product" />
                </div>
                <div className="list__block__info">
                  <h2>{productItem.title}</h2>
                  <li>
                    {" "}
                    <b>price:</b>
                    <br />
                    {productItem.price}
                  </li>
                </div>
                <button className="list__block__add">
                  <b>
                    <i className="fa-solid fa-cart-plus"></i>
                  </b>
                </button>
              </Link>
            </ul>
          ))
        )}
      </div>
      <footer className="footer__container">
        <div className="copyrigth">© Academlo ||Andres Cordoba 2022</div>
        <div className="copyrigth__icons">
          <a href="https://www.linkedin.com/in/andres-cordoba-sistemas/">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://github.com/ANDRESCO2022">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="https://www.youtube.com/c/academlo">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </footer>
    </section>
  );
};

export default Home;
