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
        <button onClick={() => setIsCategories(!isCategories)} className="filter__categories__condition">
          <b>
            <i class="fa-solid fa-filter"></i>
          </b>
        </button>
        <div  className={ `btn__filter_fixed ${isCategories ? 'open': ''}`}>
        
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => dispatch(filterCategoriesThunk(category.id))}
            >
              {category.name}
            </button>
          ))}
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
                <img src={productItem.productImgs[1]} alt="img_hover" className="over" />
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
                  <button className="list__block__add" >
                    <b>
                      <i className="fa-solid fa-cart-plus"></i>
                    </b>
                  </button>
              </Link>
            </ul>
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
