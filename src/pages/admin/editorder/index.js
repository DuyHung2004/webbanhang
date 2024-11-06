import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ROUTERS } from 'utils/router';
import { useNavigate, useParams } from "react-router-dom";
import './style.scss';
import { formatter } from 'utils/fomater';
function EditOrder() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const {id}= useParams();
  const [total_money, setTotalmoney] = useState()
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({})
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
  useEffect(() => {
    axios.get(`http://localhost:8080/identity/api/v1/orders/${id}`,{
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    })
     .then(response => {
      setOrder(response.data.result);
      setFullname(response.data.result.fullname)
      setEmail(response.data.result.email)
      setPhonenumber(response.data.result.phone_number)
      setAddress(response.data.result.address)
      setNote(response.data.result.note)
      setStatus(response.data.result.status)
      setTotalmoney(response.data.result.total_money)
      })
     .catch(error => console.error('Error fetching categories:', error));
  },[id])
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("address", address);
    formData.append("note", note);
    formData.append("status", status);
    formData.append("total_money", total_money);

    try {
      const response = await axios.put(`http://localhost:8080/identity/api/v1/orders/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${ Cookies.get('token')}`,
        },
      });
      console.log("order đã được edit:", response.data);
      navigate(ROUTERS.ADMIN.ORDER)
      toast.success("chinh sua thanh cong")
    } catch (error) {
        toast.error("chinh sua khong thanh cong")
      console.error("Lỗi :", error);
    }
  };

  return (
    <div className='container'>
        <div className='form_edit'>
   <form onSubmit={handleSubmit}>
      <div className='text_edit_product'>
        <label>Tên nguoi nhan:</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          defaultValue={order.fullname}
          required
        />
      </div>

      <div className='text_edit_product'>
        <label>email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={order.email}
        />
      </div>

      <div className='select_id'>
        <label>phone_number</label>
        <input
          type="number"
          value={phone_number}
          onChange={(e) => setPhonenumber(e.target.value)}
          defaultValue={order.phone_number}
          required
        />
      </div>
      <div className='text_edit_product'>
        <label>Dia chi:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          defaultValue={order.address}
          required
        />
      </div>
      <div className='text_edit_product'>
        <label>Note:</label>
        <input
          type="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          defaultValue={order.note}
          required
        />
      </div>
      <div className='text_edit_product'>
        <label>status:</label>
        <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            >
                <option value="pending">
                pending
                </option>
                <option value="processing">
                processing
                </option>
                <option value="shipped">
                shipped
                </option>
                <option value="delivered">
                delivered
                </option>
                <option value="cancelled">
                cancelled
                </option>
        </select>
      </div>
      <div className='text_edit_product'>
        <label>total_money:</label>
        <input
          type="number"
          value={total_money}
          onChange={(e) => setTotalmoney(e.target.value)}
          defaultValue={order.total_money}
          required
        />
      </div>
      <div  className="table_cart">
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
        </div>
      <button type="submit">Luu</button>
    </form>  
    </div>
    </div>
  );
}

export default EditOrder;
