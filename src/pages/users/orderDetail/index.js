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
import { formatter } from "utils/fomater";

const OrderDetail = () => {
  const navigate = useNavigate();
  const {id}= useParams();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate(ROUTERS.USER.HOME);
    }
  }, [navigate]);

  useEffect(()=>{
    axios.get(`http://localhost:8080/identity/api/v1/ordersdetails/${id}`,{
      headers: {
        'Authorization': `Bearer ${ Cookies.get('token')}`
      }
    })
     .then(res => {
      console.log(res.data);
        setProducts(res.data.result);
      })
     .catch(err => {
        console.log(err);
      })
  },[id])
  useEffect(()=>{
    axios.get(`http://localhost:8080/identity/api/v1/orders/${id}`,
      {headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }}
    ).then(res=>{
      setOrder(res.data.result);
    }).catch(err => {
      console.log(err);
    })
  },[id])

  return (
    <>
    <TokenChecker />
    <div className="container">
      <div className="table_cart">
        <h2>Thong Tin Don Hang</h2>
        <h4>Trang Thai Don Hang:{order.status}</h4>
        <h4>Dia Chi Nhan Hang: {order.shipping_address},{order.address}</h4>
        <h4>Nguoi Nhan: {order.fullname}</h4>
        <h4>Ma Don Hang: {order.tracking_number}</h4>
        <h4>Phuong Thuc Thanh Toan : {order.payment_method}</h4>
        <table>
          <thead>
            <tr>
              <th>Tên Sản Phẩm</th>
              <th>Giá</th>
              <th>Số Lượng</th>
              <th>Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product,key) => (
                <tr key={key}>
                  <td>
                    <img src={`http://localhost:8080/identity/api/v1/products/images/${product.product_id.thumbnail}`} alt={product.product_id.name} />
                    <h4>{product.product_id.name}</h4>
                  </td>
                  <td>
                    <span>{formatter(product.price)}</span>
                  </td>
                  <td>
                    <span>{product.number_of_products}</span>
                  </td>
                  <td>
                    <span>{formatter( product.total_money)}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">xay ra loi</td>
              </tr>
            )}
          </tbody>
        </table>
          <p className="total_money_order">Tong Tien: {formatter( order.total_money)}</p>
      </div>
    </div>
    </>
  );
};

export default memo(OrderDetail);
