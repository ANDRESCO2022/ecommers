import "../styles/favorites.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFavoritesThunk } from "../redux/actions";

const Favorites = ({ isFavorites }) => {
  const favorites = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
              {" "}
              <b>Price: </b>
              <br />
              {favorite.price}
            </li>
          </div>

          <button onClick={() => dispatch(deleteFavoritesThunk(favorite.id))}>
            {" "}
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
