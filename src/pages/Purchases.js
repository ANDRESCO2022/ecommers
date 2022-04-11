import '../styles/purchases.css'
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
const Purchases = () => {
    const purches = useSelector((state) => state.purches);
 
   return (
     <div className="container__row__purchases">
       <div className="home__ecommers">
         <a href="#/" className="home__ecommers__rute">
           Home
         </a>
         <div className="point__ecommers"></div>
         <b>purchases</b>
       </div>

       <h1> My Purchases</h1>
       {purches?.map((p) => (
         <div key={p.cartId} className="container__purchases">
           <li>
             <b>{moment(p.createdAt).format("DD/MM/YYYY")}</b>
           </li>
           {p.cart.products.map((params) => (
             <Link to={`/products/${params.id}`} key={params.id}>
               <ul className="cart_purchases">
                 <h6>{params.title}</h6>
                 <div className="cart__purchases__conter">
                   {params.productsInCart.quantity}
                 </div>
                 <div className="cart_purchases__price">{params.price}</div>
               </ul>
             </Link>
           ))}
         </div>
       ))}
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

export default Purchases;
