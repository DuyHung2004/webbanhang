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
  const [open, setOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
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
        if (formData.payment_method === "COD") {
      products.forEach(element => {
        handleSubmit2(element, response.data.result.id);
      });
      localStorage.removeItem('cart');
      navigate(ROUTERS.USER.HOME);
      toast.success('Đặt hàng thành công');
    } else if (formData.payment_method === "VNPAY") {
      const paymentUrl = response.data.data;
      products.forEach(element => {
        handleSubmit2(element, response.data.user_id);
      });
      localStorage.removeItem('cart');
      if (paymentUrl) {
        window.location.href = paymentUrl; 
      } else {
        toast.error("Không tìm thấy link thanh toán VNPAY");
      }
    }
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data.code);
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
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8080/identity/users/myinfo", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        if (res.data.code === 1000) {
          const u = res.data.result;

          setFormData((prev) => ({
            ...prev,
            fullname: u.fullname || "",
            phone_number: u.phonenumber || "",
            address: u.address || "",
            shipping_address: u.address || "",
          }));
        }
      } catch (error) {
        console.log("Fetch user info error:", error);
      }
    };

    fetchUserInfo();
  }, []);
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
      <div className="formsb"> 
        <form onSubmit={handleSubmit} >
          <div className="form_order">
              <label htmlFor="fullname">Tên người nhận</label>
              <input
                id="fullname"
                type="text"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>
          <div className="form_order">
              <label htmlFor="phone_number">Số điện thoại nhận hàng</label>
              <input
                id="phone_number"
                type="text"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className="form_order">
            <label htmlFor="address" >Quận, huyện - thành phố</label>
            <input onChange={handleChange} type="text" id="address"/>
          </div>
          <div className="form_order">
              <label htmlFor="shipping_address">Địa chỉ chi tiết</label>
              <input
                id="shipping_address"
                type="text"
                value={formData.shipping_address}
                onChange={handleChange}
              />
            </div>
          <div className="form_order">
              <label htmlFor="note">Ghi chú</label>
              <input
                id="note"
                type="text"
                value={formData.note}
                onChange={handleChange}
              />
            </div>
          <div className="form_order">
  <label>Phương thức giao hàng</label>
  <div className="select_box" onClick={() => setOpen(!open)}>
    {formData.shipping_method === "" ? "Chọn phương thức" : formData.shipping_method === "economy" ? "Giao hàng tiết kiệm" : "Giao hàng nhanh"}
    <span className="arrow">▼</span>
  </div>

  {open && (
    <div className="select_options">
      <div
        className="option"
        onClick={() => {
          handleChange({ target: { name: "shipping_method", value: "economy" } });
          setOpen(false);
        }}
      >
        Giao hàng tiết kiệm
      </div>

      <div
        className="option"
        onClick={() => {
          handleChange({ target: { name: "shipping_method", value: "express" } });
          setOpen(false);
        }}
      >
        Giao hàng nhanh
      </div>
    </div>
  )}
</div>
          <div className="form_order">
  <label>Phương thức thanh toán</label>

  <div className="select_box" onClick={() => setOpenPayment(!openPayment)}>
    {formData.payment_method === ""
      ? "Chọn phương thức thanh toán"
      : formData.payment_method === "COD"
        ? "Thanh toán khi nhận hàng"
        : "Thanh toán VNPAY"}
    <span className="arrow">▼</span>
  </div>

  {openPayment && (
    <div className="select_options">
      <div
        className="option"
        onClick={() => {
          handleChange({ target: { name: "payment_method", value: "COD" } });
          setOpenPayment(false);
        }}
      >
        Thanh toán khi nhận hàng (COD)
      </div>

      <div
        className="option"
        onClick={() => {
          handleChange({ target: { name: "payment_method", value: "VNPAY" } });
          setOpenPayment(false);
        }}
      >
        Thanh toán VNPAY
      </div>
    </div>
  )}
</div>
        <button type="submit" >Dat Hang</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default memo(PaymentPage);
