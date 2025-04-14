import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Navbar = ({count, restaurant_name}) => (
  <div className="navbar">
    <h1>{restaurant_name}</h1>
    <div className="cart-container">
      <h4>My Orders</h4>
      <div className="cart-counts">
        <span className="cart-count">{count}</span>
        <AiOutlineShoppingCart className="cart-icon" />
      </div>
    </div>
  </div>
)
export default Navbar
