
import '../styles/product.css'
import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addFavoritesThunk, getProductsThunk } from '../redux/actions';
import axios from 'axios';

const ProductNew = () => {
    const {id}= useParams();
    const dispatch = useDispatch();
    const  products = useSelector(state=> state.products);
    const [productsFilter, setProductsFilter]=useState([])
    const [counter, setCounter] = useState(0);
    const  productsFound = products.find(productItem => productItem.id === Number(id))
    useEffect(() => dispatch(getProductsThunk()),[dispatch])
   useEffect(() =>{
       if(productsFound){
           axios.get(
              `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productsFound?.category.id}`
            )
            .then((res) => setProductsFilter(res.data.data.products));
       }

   },[dispatch,productsFound])

   const addProduct =() => {
     const products ={id: id,
    quantity: counter}
    dispatch(addFavoritesThunk(products))

   }
    return (
      <div className="container__detail">
        <div className="home__ecommers">
          <a href="#/" className="home__ecommers__rute">
            Home
          </a>
          <div className="point__ecommers"></div>
          <b>{productsFound ? productsFound.title : ""}</b>
        </div>
        <div className="container__select">
          <div className="container__galery">
            <img src={productsFound ? productsFound.productImgs[0] : ""} alt="Product_img" />
          </div>
          <div className="container__info">
            <h1>{ productsFound ? productsFound.title:""}</h1>
            <div className="container__row">
              <div className="product__conter">
                <div className="product__post">
                  <div>
                    <span>price:</span>
                    <br />
                    <span>{productsFound ? productsFound.price:""}</span>
                  </div>
                  <span> quantity: </span>
                  <div className="product__number">
                    <br />

                    <button
                      onClick={() => setCounter(counter - 1)}
                      disabled={counter <= 1}
                    >
                      <b>
                        <i className="fa-solid fa-minus"></i>
                      </b>
                    </button>

                    <div>{counter}</div>

                    <button onClick={() => setCounter(counter + 1)}>
                      <b>
                        <i className="fa-solid fa-plus"></i>
                      </b>
                    </button>
                  </div>
                </div>

                <button onClick={addProduct} className="add_product">
                  add to cart
                </button>
              </div>
              <p className="product_description">{productsFound ? productsFound.description:""}</p>
            </div>
          </div>
        </div>
           <div className="block__products">
          {productsFilter.map((productItem) => (
            <ul className="block__card" key={productItem.id}>
              <Link to={`/products/${productItem.id}`}>
                <div className=" block__img">
                  <img src={productItem.productImgs} alt="img_product" />
                </div>
                <div className="block__info">
                  <h3>{productItem.title}</h3>
                  <li>{productItem.price}</li>
                </div>
                <button className="block__add">
                  <b>
                    <i className="fa-solid fa-cart-plus"></i>
                  </b>
                </button>
              </Link>
            </ul>
          ))}
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
      </div>
    );
};

export default ProductNew;