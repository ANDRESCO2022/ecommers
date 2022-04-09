import '../styles/purchases.css'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
const Purchases = () => {
    const purches = useSelector((state) => state.purches);
 
   return (
     <div className="container__row__purchases">

      <h1> My Purchases</h1>
       {purches?.map((p) => (
         <div key={p.cartId} className="container__purchases">
           <li>
             <b>{p.createdAt}</b>
           </li>
           {p.cart.products.map((params) => (
             <Link to={`/products/${params.id}`}>
             <ul key={params.id} className="cart_purchases" >              
                    <h6>{params.title}</h6>
                    <div className="cart__purchases__conter">{params.productsInCart.quantity}</div>
                    <div>{params.price}</div>                
              </ul>
             </Link>
           ))}
         </div>
       ))}
     </div>
   );
};

export default Purchases;
