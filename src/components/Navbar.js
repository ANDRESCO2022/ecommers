import '../styles/home.css'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {  getFavoritesThunk, loginThunk } from '../redux/actions';
import Favorites from './Favorites';

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
          <button className="Nav_btn">
            <b>
              <i className="fa-solid fa-store"></i>
            </b>
          </button>
          <button  onClick ={openFavorites} className="Nav_btn">
            <b>
              <i className="fa-solid fa-cart-shopping"></i>
            </b>
          </button>
        </nav>

        <form onSubmit={login} className={`login ${isLogin ? "open" : ""}`}>
         <div className="login__icon">
           <img src="https://rcmi.fiu.edu/wp-content/uploads/sites/30/2018/02/no_user.png" alt="register-login"/>
         </div>

        {
          localStorage.getItem("token") ? (<button onClick={() => localStorage.setItem("token" , "")} type="button">
          log out
          </button> ): (
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

          )  }
       
        </form>

        <Favorites isFavorites={isFavorites}/>

      </div>
    );
};

export default Navbar;