import "../styles/favorites.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFavoritesThunk, getMarketThunk } from "../redux/actions";

const Favorites = ({ isFavorites }) => {
  const favorites = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [total, setTotal]= useState(0)
const updatePurches = () => {
    dispatch(getMarketThunk());
  };
  useEffect(() =>{
    const totalPrice=()=>{
      let totalValue = 0;
      favorites.forEach((favorit) =>{ 
        totalValue += Number(favorit.productsInCart.quantity * favorit.price)
        
      }
      );
      setTotal(totalValue)
      console.log(totalValue);
    }
    
    totalPrice()
  },[favorites])
  return (
    <div className={`products__modal ${isFavorites ? "open" : ""}`}>
      <h3>shopping cart</h3>

      {favorites.map((favorite) => (
        <div
          key={favorite.id}
          onClick={() => navigate(`/Products/${favorite.id}`)}
          className="product__cart"
        >
          <h3>{favorite.title}</h3>

          <div className="product__cart__info">
            <li>
              <b>Quantify: </b>
              <br />
              {favorite.productsInCart.quantity}
            </li>
            <li>
              <b>Price: </b>${favorite.price}
              <br />
            </li>

          </div>
        
        {favorite.productsInCart.quantity * favorite.price}                  

          <button onClick={() => dispatch(deleteFavoritesThunk(favorite.id))}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      ))}
      <div>Total Price:{total}</div>

      <button onClick={updatePurches} className="checkout__product">
        {" "}
        Ckeckout{" "}
      </button>
    </div>
  );
};

export default Favorites;
