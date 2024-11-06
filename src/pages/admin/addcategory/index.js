import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ROUTERS } from 'utils/router';
import { useNavigate } from "react-router-dom";
import './style.scss';
function CreateCategory() {
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/identity/api/v1/categories", { name: category }, {
        headers: {
          Authorization: `Bearer ${ Cookies.get('token')}`,
        },
      });
      console.log("Sản phẩm đã được tạo:", response.data);
      navigate(ROUTERS.ADMIN.CATEGORY)
      toast.success("them category thanh cong")
    } catch (error) {
        toast.error("them category khong thanh cong")
      console.error("Lỗi khi tạo sản phẩm:", error);
    }
  };

  return (
    <div className='container'>
        <div className='form_add'>
    <form onSubmit={handleSubmit}>
      <div className='text_add_product'>
        <label>Tên danh muc:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>
      <button type="submit">Tạo danh muc</button>
    </form>
    </div>
    </div>
  );
}

export default CreateCategory;
