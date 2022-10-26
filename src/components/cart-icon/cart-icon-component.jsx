import { useContext } from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { CartContext } from "../../context/cart.context";

import "../cart-icon/cart-icon.styles.scss";

const CartIcon = () => {
  const { isCartOpen, setCartOpen, cartCount } = useContext(CartContext);
  const toogleIsCartOpen = () => setCartOpen(!isCartOpen);
  return (
    <div className="cart-icon-container" onClick={toogleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};
export default CartIcon;
