import { memo, useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";
import { formatter } from "utils/fomater";
import { generatePath, Link } from "react-router-dom";
import "./style.scss";
import { ROUTERS } from "utils/router";
import { toast } from 'react-toastify';
import Cookies from "js-cookie";

const ProductsCard = ({ img, name, price, id }) => {
  const imageUrl = `http://localhost:8080/identity/api/v1/products/images/${img}`;
  const getCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  };
  const [cart, setCart] = useState(getCartFromLocalStorage);
  const addToCart = (product) => {
    if(Cookies.get("token")){
    const currentCart = getCartFromLocalStorage();

    const existingProduct = currentCart.find((item) => item.id === product.id);

    let updatedCart;
    if (existingProduct) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity: 1 }];
    }
    toast.success('Them san pham thanh cong, hay kiem tra gio hang');
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart); 
  }};

  useEffect(() => {
    setCart(getCartFromLocalStorage());
  }, []);

  return (
    <div className="featured_item">
      <div
        className="featured_item_pic"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <ul>
          <li>
            <AiOutlineEye />
          </li>
          <li>
            <AiOutlineShoppingCart
              onClick={() => addToCart({ id, name, price,imageUrl })}
            />
          </li>
        </ul>
      </div>
      <div className="featured_item_text">
        <h6>
          <Link to={`${generatePath(ROUTERS.USER.PRODUCT, { id })}?name=${encodeURIComponent(name)}&price=${price}`}>{name}</Link>
        </h6>
        <h5>{formatter(price)}</h5>
      </div>
    </div>
  );
};

export default memo(ProductsCard);
