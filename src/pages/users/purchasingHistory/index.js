import { memo, useState, useEffect } from "react";
import "./style.scss";
import ProductsCard from '../../../component/productCard';
import { generatePath, useParams } from "react-router-dom";
import axios from 'axios'; 
import Quantity from "component/Quantity";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import Cookies from "js-cookie";
import TokenChecker from "component/tokenCheck";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { formatter } from "utils/fomater";

const PurchasingHistory = () => {
  const navigate = useNavigate();
  const [userid, setUserId] = useState();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate(ROUTERS.USER.HOME);
    } else {
      const decoded = jwtDecode(token);
      setUserId(decoded.userid);
    }
  }, [navigate]);

  useEffect(() => {
    axios.get(`http://localhost:8080/identity/api/v1/orders/user/${userid}`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
 
    })
     .then((response) => {
        setOrders(response.data.result);
      })
     .catch((error) => {
        console.log(error);
      });
  },[userid])
  const orderdetail=(id)=>{
    navigate(generatePath(ROUTERS.USER.ORDERDETAIL,{id}))
  }
  return (
    <>
    <TokenChecker />
    <div className="container">
    <div className="table_cart">
        <table>
          <thead>
            <tr>
              <th>Don Hang</th>
              <th>Tong so tien</th>
              <th>Trang thai</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} onClick={()=>orderdetail(order.id)} className="order_detail">
                  <td>
                    <h4>{order.tracking_number}</h4>
                  </td>
                  <td>
                    <span>{formatter(order.total_money)} </span>
                  </td>
                  <td>
                    <span>{order.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Chua co don hang nao</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default memo(PurchasingHistory);
