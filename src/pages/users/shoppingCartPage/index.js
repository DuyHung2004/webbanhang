import { memo, useState, useEffect } from "react";
import "./style.scss";
import ProductsCard from '../../../component/productCard';
import { useParams } from "react-router-dom";
import axios from 'axios'; 
import Quantity from "component/Quantity";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import Cookies from "js-cookie";
import TokenChecker from "component/tokenCheck";
import { Link } from "react-router-dom";

const ShoppingCartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate(ROUTERS.USER.HOME);
    }
  }, [navigate]);

  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const updateLocalStorage = (updatedProducts) => {
    localStorage.setItem('cart', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const increaseQuantity = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    updateLocalStorage(updatedProducts);
  };

  const decreaseQuantity = (productId) => {
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        const newQuantity = product.quantity > 1 ? product.quantity - 1 : 1;
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    updateLocalStorage(updatedProducts);
  };

  const removeProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    updateLocalStorage(updatedProducts);
  };

  return (
    <>
    <TokenChecker />
    <div className="container">
      <div className="table_cart">
        <table>
          <thead>
            <tr>
              <th>Tên Sản Phẩm</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Thành Tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img src={product.imageUrl} alt={product.name} />
                    <h4>{product.name}</h4>
                  </td>
                  <td>
                    <span>{product.price} đ</span>
                  </td>
                  <td>
                    <div className="quantity-controls">
                      <button onClick={() => decreaseQuantity(product.id)}>-</button>
                      <span>{product.quantity}</span>
                      <button onClick={() => increaseQuantity(product.id)}>+</button>
                    </div>
                  </td>
                  <td>
                    <span>{product.price * product.quantity} đ</span>
                  </td>
                  <td className="button_remove">
                    <AiOutlineClose onClick={() => removeProduct(product.id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Giỏ hàng của bạn đang trống</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="button_continue">
        <Link to={ROUTERS.USER.PAYMENT}>Tiep Tuc</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default memo(ShoppingCartPage);
