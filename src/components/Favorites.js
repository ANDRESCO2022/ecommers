import '../styles/favorites.css'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFavoritesThunk } from '../redux/actions';

const Favorites = ({isFavorites}) => {
    const favorites = useSelector(state=> state.favorites)
    const navigate =useNavigate()
     const dispatch = useDispatch();
   
    console.log(favorites);
    return (
      <div className={`products__modal ${isFavorites ? "open" : ""}`}>
        <h3>shopping cart</h3>

        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            onClick={() => navigate(`/Products/${favorite.id}`)}
          > 
            <li>{favorite.title}</li>
            <li>{favorite.productsInCart.quantity}</li>
            <li>{favorite.price}</li>

            <button onClick={() =>dispatch(deleteFavoritesThunk(favorite.id))}> delete</button>
          </div>
        ))}
      </div>
    );
};

export default Favorites;