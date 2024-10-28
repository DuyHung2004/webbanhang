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
import { formatter } from "utils/fomater";
import { jwtDecode } from 'jwt-decode';
import TokenChecker from "component/tokenCheck";
import { toast } from 'react-toastify';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [userId, setUserId] = useState(""); 
  let total_money = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const [formData, setFormData] = useState({
    user_id: "",
    fullname: "",
    phone_number: "",
    address: "",
    total_money: total_money,
    note: "",
    shipping_method:"",
    shipping_address:"",
    payment_method:"",
});
const handleChange = (e) => {
  const { id, name, value } = e.target;
  setFormData((prevData) => ({
      ...prevData,
      [name || id]: value,  
  }));
};
const handleSubmit2= async (prduct,id) => {
  try {
    const response = await axios.post('http://localhost:8080/identity/api/v1/ordersdetails', 
       {
        order_id: id,
        product_id: prduct.id,
        number_of_products: prduct.quantity,
        color:""
       },
       {
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${ Cookies.get('token')}`,
        },
      }
    );  
    console.log(response.data);     
} 
  catch (error) {

  }
}
const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/identity/api/v1/orders', 
           formData,
           {
            headers: {
              'Content-Type': 'application/json', 
              Authorization: `Bearer ${ Cookies.get('token')}`,
            },
          }
    );
        console.log(response.data.result.id);
        products.forEach(element => {
          handleSubmit2(element,response.data.result.id)
        }
      );
      localStorage.removeItem('cart')
      navigate(ROUTERS.USER.HOME);
      toast.success('Dat Hang Thanh Cong'); 
      } catch (error) {
        if (error.response && error.response.data) {
            console.log(error.response.data.code);
        } else {
        }
      }
    };
  
  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      navigate(ROUTERS.USER.HOME);
    } else{
      const decoded = jwtDecode(token);
      setUserId(decoded.userid);
      setFormData((prevData) => ({
        ...prevData,
        user_id: decoded.userid, 
      }));
  console.log('User ID:', decoded.userid);
    }
    if(products.length==0){
      navigate(ROUTERS.USER.HOME);
    }
  }, [navigate]);
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
                      <span>{product.quantity}</span>
                    </div>
                  </td>
                  <td>
                    <span>{product.price * product.quantity} đ</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">khong co san pham nao</td>
              </tr>
            )}
            <tr>
              <td>
              </td>
              <td>
              </td>
              <td>
              </td>
              <td>
                Tong tien: 
              {total_money > 0 ? formatter(total_money) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div> 
        <form onSubmit={handleSubmit} >
          <div className="form_order">
            <label htmlFor="fullname" >ten nguoi nhan</label> 
            <input onChange={handleChange} type="text" id="fullname"/>
          </div>
          <div className="form_order">
            <label htmlFor="phone_number" >so dien thoai nhan hang</label>
            <input onChange={handleChange} type="text" id="phone_number"/>
          </div>
          <div className="form_order">
            <label htmlFor="address" >quan, huyen- thanh pho</label>
            <input onChange={handleChange} type="text" id="address"/>
          </div>
          <div className="form_order">
            <label htmlFor="note" >ghi chu</label>
            <input onChange={handleChange} type="text" id="note"/>
          </div>
          <div>
          <label>
            <input onChange={handleChange} checked={formData.shipping_method === "economy"} type="radio" name="shipping_method" value="economy" />
            Giao hàng tiết kiệm
          </label><br/>

          <label>
            <input onChange={handleChange} type="radio" checked={formData.shipping_method === "express"} name="shipping_method" value="express" />
            Giao hàng nhanh
          </label>
          </div>
          <div className="form_order">
            <label htmlFor="shipping_address" >dia chi chi tiet</label>
            <input onChange={handleChange} type="text" id="shipping_address"/>
          </div>
          <div>
          <label>
            <input onChange={handleChange} type="radio" name="payment_method" value="cod" checked={formData.payment_method === "cod"}  />
            thanh toan khi nhan hang
          </label><br/>
          <label>
            <input onChange={handleChange} type="radio" name="payment_method" value="transfer" checked={formData.payment_method === "transfer"} />
            thanh toan chuyen khoan
          </label>
          </div>
        <button type="submit" >Dat Hang</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default memo(PaymentPage);
