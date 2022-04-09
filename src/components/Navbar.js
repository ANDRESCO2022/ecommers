import '../styles/home.css'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  getFavoritesThunk, getPurchesThunk, loginThunk } from '../redux/actions';
import Favorites from './Favorites';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isLogin,setIslogin] =useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [LoginCatch, setLoginCatch]= useState("")
    const [isFavorites, setIsFavorites] = useState(false)
    const dispatch = useDispatch();

  
    const login = e => {
        e.preventDefault();
        const credentialKey={email , password};
        dispatch(loginThunk(credentialKey))
        .then((res =>{localStorage.setItem("token", res.data.data.token);
        console.log(res.data.data);
              setLoginCatch("");
              setIslogin(false);
              setEmail("");
              setPassword("");
           }))
            .catch(error => setLoginCatch(error.response.data.message) )
    }
    const openFavorites = () =>{
       setIsFavorites(!isFavorites);
       dispatch(getFavoritesThunk())
    }
    const openPuches = () =>{
          dispatch(getPurchesThunk())
    }
   
   
    return (
      <div className="login__navbar">
        <nav className="Nav_bar">
          <div className="Nav__container">
            <h1>E-commerce</h1>
          </div>
          <button onClick={() => setIslogin(!isLogin)} className="Nav_btn">
            <b>
              <i className="fa-solid fa-user-plus"></i>
            </b>
          </button>
          {localStorage.getItem("token") ? (
            <Link to={"/purchase"}>
              <button className="Nav_btn" onClick={openPuches}>
                <b>
                  <i className="fa-solid fa-store"></i>
                </b>
              </button>
            </Link>
          ) : (
            <button
              onClick={() => setIslogin(!isLogin)}
              className="Nav_btn"
            >
              <b>
                <i className="fa-solid fa-store"></i>
              </b>
            </button>
          )}
          {localStorage.getItem("token") ? (
            <button onClick={openFavorites} className="Nav_btn">
              <b>
                <i className="fa-solid fa-cart-shopping"></i>
              </b>
            </button>
          ) : (
            <button
              onClick={() => setIslogin(!isLogin)}
              className="Nav_btn__warning"
            >
              <b>
                <i className="fa-solid fa-cart-shopping"></i>
              </b>
            </button>
          )}
        </nav>

        <form onSubmit={login} className={`login ${isLogin ? "open" : ""}`}>
          <div className="login__icon">
            <img
              src="https://rcmi.fiu.edu/wp-content/uploads/sites/30/2018/02/no_user.png"
              alt="register-login"
            />
          </div>

          {localStorage.getItem("token") ? (
            <button
              onClick={() => localStorage.setItem("token", "")}
              type="button"
            >
              log out
            </button>
          ) : (
            <>
              <input
                type="email"
                placeholder="your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <p>{LoginCatch}</p>
              <button>Login</button>
            </>
          )}
        </form>

        <Favorites isFavorites={isFavorites} />
      </div>
    );
};

export default Navbar;