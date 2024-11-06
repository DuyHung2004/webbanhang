import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ROUTERS } from 'utils/router';
import { useNavigate } from "react-router-dom";
import './style.scss';
function CreateProduct() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/identity/api/v1/categories')
     .then(response => {
        setCategories(response.data.result)
      })
     .catch(error => console.error('Error fetching categories:', error));
  },[])
  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", productName);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("description", description);
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("http://localhost:8080/identity/api/v1/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${ Cookies.get('token')}`,
        },
      });
      console.log("Sản phẩm đã được tạo:", response.data);
      navigate(ROUTERS.ADMIN.PRODUCT)
      toast.success("them san pham thanh cong")
    } catch (error) {
        toast.error("them san pham khong thanh cong")
      console.error("Lỗi khi tạo sản phẩm:", error);
    }
  };

  return (
    <div className='container'>
        <div className='form_add'>
    <form onSubmit={handleSubmit}>
      <div className='text_add_product'>
        <label>Tên sản phẩm:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>

      <div className='text_add_product'>
        <label>Giá:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className='select_id'>
        <label>Danh mục ID:</label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
        <option value="" disabled>Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>
      <div className='text_add_product'>
        <label>Mô tả:</label>
        <textarea
        type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Ảnh sản phẩm:</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>

      <button type="submit">Tạo sản phẩm</button>
    </form>
    </div>
    </div>
  );
}

export default CreateProduct;
