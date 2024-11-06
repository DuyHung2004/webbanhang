import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ROUTERS } from 'utils/router';
import { useNavigate, useParams } from "react-router-dom";
import './style.scss';
function EditProduct() {
  const [productName, setProductName] = useState('');
  const [product, setProduct] = useState({});
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const {id}= useParams();
  const [images, setImages] = useState([])
  const [is_active, setIsActive] = useState(true)
  const [files, setFiles] = useState([]);
  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };
  const addimages= async()=>{
    const formimage = new FormData();
    formimage.append("productId", id);
    Array.from(files).forEach((file) => {
        formimage.append("files", file);
      });
      try {
        const response = await axios.post("http://localhost:8080/identity/api/v1/products/image", formimage, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${ Cookies.get('token')}`,
          },
        });
        window.location.reload();
        toast.success("them anh thanh cong")
      } catch (error) {
          toast.error("them anh khong thanh cong")
        console.error("Lỗi ", error);
      }
  }
  const deleteImage= async (id) => {
    axios.delete(`http://localhost:8080/identity/api/v1/products/${id}`,{
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
        },
  
    })
     .then(response => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
        toast.success("xoa anh thanh cong")
      })
     .catch(error => console.error('Error fetching categories:', error));
  }
  useEffect(() => {
    axios.get(`http://localhost:8080/identity/api/v1/products/${id}`)
     .then(response => {
        setProduct(response.data.result)
        setProductName(response.data.result.name)
        setCategoryId(response.data.result.categoryId.id)
        setPrice(response.data.result.price)
        setDescription(response.data.result.description)
      })
     .catch(error => console.error('Error fetching categories:', error));
  },[id])
  useEffect(() =>{
    axios.get(`http://localhost:8080/identity/api/v1/products/product/${id}`)
    .then(response => {
        setImages(response.data.result)
    })
    .catch(error => console.error('Error fetching categories:', error));
  },[id])
  useEffect(() => {
    axios.get('http://localhost:8080/identity/api/v1/categories')
     .then(response => {
        setCategories(response.data.result)
      })
     .catch(error => console.error('Error fetching categories:', error));
  },[])
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("categoryId", categoryId);
    formData.append("description", description);

    try {
      const response = await axios.put("http://localhost:8080/identity/api/v1/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${ Cookies.get('token')}`,
        },
      });
      console.log("Sản phẩm đã được edit:", response.data);
      navigate(ROUTERS.ADMIN.PRODUCT)
      toast.success("chinh sua thanh cong")
    } catch (error) {
        toast.error("chinh sua khong thanh cong")
      console.error("Lỗi khi tạo sản phẩm:", error);
    }
  };

  return (
    <div className='container'>
        <div className='form_edit'>
            <button onClick={()=>setIsActive(!is_active)}>{is_active ? "Chinh sua anh" : "chinh sua du lieu text"}</button>
    {is_active ? (<form onSubmit={handleSubmit}>
      <div className='text_edit_product'>
        <label>Tên sản phẩm:</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          defaultValue={product.name}
          required
        />
      </div>

      <div className='text_edit_product'>
        <label>Giá:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          defaultValue={product.price}
          required
        />
      </div>

      <div className='select_id'>
        <label>Danh mục ID:</label>
        <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
            >
            {categories.map((category) => (
                <option key={category.id} value={category.id}>
                {category.name}
                </option>
            ))}
        </select>
      </div>
      <div className='text_edit_product'>
        <label>Mô tả:</label>
        <textarea
        type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={product.description}
          required
        ></textarea>
      </div>

      <button type="submit">Luu</button>
    </form>) : (
        <div>
        <table>
            <tr>
                <th>image</th>
                <th></th>
                
            </tr>
            {
                images.map((image) => (
                    <tr key={image.id}>
                        <td>
                            <img src={`http://localhost:8080/identity/api/v1/products/images/${image.image_url}`} width="100" height="100" />
                        </td>
                        <td>
                            <button onClick={()=>{deleteImage(image.id)}}>Delete</button>
                        </td>
                    </tr>
                ))
            }
        </table>
        <div className='image_add'>
            <div>
        <label>Ảnh sản phẩm:</label>
        <input type="file" multiple onChange={handleFileChange} />
            </div>
        <div>
        <button onClick={() =>{addimages()}}>them anh</button>
        </div>
        </div>
      </div>
    )  }
    </div>
    </div>
  );
}

export default EditProduct;
