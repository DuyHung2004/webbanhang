import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ROUTERS } from 'utils/router';
import { useNavigate, useParams } from "react-router-dom";
import './style.scss';
function EditUser() {
  const [fullname, setFullname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');
  const [date_of_birth, setDateofbirth] = useState('');
  const {id}= useParams();
  const [is_active, setIsActive] = useState()
  const [role, setRole] = useState();
  const [roles, setRoles]= useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/identity/users/${id}`,{
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    })
     .then(response => {
        setFullname(response.data.result.fullname)
        setPhonenumber(response.data.result.phonenumber)
        setAddress(response.data.result.address)
        setDateofbirth(response.data.result.date_of_birth)
        setIsActive(response.data.result.is_active)
        setRole(response.data.result.role_id.id)
      })
     .catch(error => console.error('Error fetching categories:', error));
  },[id])
  useEffect(()=>{
    axios.get('http://localhost:8080/identity/users/role',{
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    })
     .then(response => {
        setRoles(response.data.result)
      })
     .catch(error => console.error('Error fetching categories:', error));
  })
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("phonenumber", phonenumber);
    formData.append("address", address);
    formData.append("date_of_birth", date_of_birth);
    formData.append("role_id", role);
    formData.append("is_active", is_active);

    try {
      const response = await axios.put(`http://localhost:8080/identity/users/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${ Cookies.get('token')}`,
        },
      });
      console.log("user đã được edit:", response.data);
      navigate(ROUTERS.ADMIN.HOME)
      toast.success("chinh sua thanh cong")
    } catch (error) {
        toast.error("chinh sua khong thanh cong")
      console.error("Lỗi khi tạo sản phẩm:", error);
    }
  };

  return (
    <div className='container'>
        <div className='form_edit'>
          <form onSubmit={handleSubmit}>
      <div className='text_edit_product'>
        <label>fullname</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          defaultValue={fullname}
          required
        />
      </div>

      <div className='text_edit_product'>
        <label>phonenumber:</label>
        <input
          type="number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          defaultValue={phonenumber}
          required
        />
      </div>

      <div className='select_id'>
        <label>dia chi:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          defaultValue={address}
          required
        />
      </div>
      <div className='text_edit_product'>
        <label>ngay sinh</label>
        <input
        type="date"
          value={date_of_birth}
          onChange={(e) => setDateofbirth(e.target.value)}
          defaultValue={date_of_birth}
          required
        ></input>
      </div>
      <div>
      <label>role</label>
      <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            >
            {roles.map((role) => (
                <option key={role.id} value={role.id}>
                {role.name}
                </option>
            ))}
        </select>
      </div>
      <div>
        <label> trang thai: {is_active ? ("khoa"):("binh thuong")}</label>
      </div>
      <button type="submit">Luu</button>
      </form>
    </div>
    </div>
  );
}

export default EditUser;
