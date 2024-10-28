import { memo } from "react";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./style.scss";
import { formatter } from "utils/fomater";
import { useParams } from "react-router-dom";
import Quantity from "component/Quantity";
import { useLocation } from "react-router-dom";

const ProductDetailPage = ()=>{
    const [products, setProducts] = useState([]);
    const[product, setProduct]=useState("")
    const {id}= useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const price = queryParams.get("price");
    const imgs=[]
    useEffect(() => {
        axios.get(`http://localhost:8080/identity/api/v1/products/product/${id}`)
            .then(response => {
                console.log(response.data.result)
                console.log("gadsfg")
                setProducts(response.data.result || [])
                setProduct(`http://localhost:8080/identity/api/v1/products/images/${response.data.result[0].image_url}`)
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, [id]);
    products.forEach(element => {
        imgs.push(`http://localhost:8080/identity/api/v1/products/images/${element.image_url}`)
   });
   const swapImages = (imgg) => {
    setProduct(imgg)
   }
   const addToCart = (product, quantity) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    const existingProduct = cart.find(item => item.id === Number(id));
  
    if (existingProduct) {
      existingProduct.quantity += quantity; 
    } else {
      const productToAdd = {
        id: Number(id),
        name: name,
        price: Number(price),
        imageUrl:`http://localhost:8080/identity/api/v1/products/images/${product.image_url}` , // Đảm bảo dùng đúng thuộc tính từ API
        quantity: quantity
      };
      cart.push(productToAdd);  
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  

  const handleAddToCart = (quantity) => {
    addToCart(products[0], quantity);
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
  };
    return (
    <>
        <div className="container">
            <div className="row">
                <div className="col-lg-6 product_detail">
                    
                        <img src={product} alt=""/>
                        <div className="main" >
                            {
                                imgs.map((imgg, key)=>(
                                    <img key={key} src={imgg} alt="" onClick={()=> swapImages(imgg)}/>
                                ))
                            }
                        </div>
                    
                </div>
                <div className="col-lg-6 product_detail_text">
                    <h2>{name}</h2>
                    <h3>{formatter(20000000)}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum vel orci quis neque dignissim tempor. Donec vel enim nec felis hendrerit consectetur. Sed vel massa id turpis luctus congue. Sed vel velit auctor, malesuada tellus in, commodo ligula.</p>
                    <Quantity onAddToCart={handleAddToCart}/>
                    <ul>
                        <li>
                            <b>Tinh Trang:<span> con hang</span></b>
                        </li>
                        <li><b>So luong: <span>20</span></b></li>
                    </ul>
                </div>
            </div>
            <div className="product_detail_tab">
                <h4>thong tin chi tiet</h4>
                <div>
                    <ul>
                        <li>CPU: Apple A15 Bionic</li>
                        <li>RAM: 4GB</li>
                        <li>HDD: 256GB</li>
                        <li>Camera: 12MP, 12MP</li>
                        <li>Pin: 39W</li>
                        <li>Kich thuoc: 153.6 x 75.6 x 7.5mm</li>
                        <li>Mau sac: Black, White, Red, Blue</li>
                        <li>Pin: Li-Ion 3600 mAh</li>
                        <li>Thoi gian bao hanh: 12 thang</li>
                        <li>Thoi gian bao hanh: 12 thang</li>
                        <li>Thoi gian bao hanh: 12 thang</li>
                    </ul>
                </div>                    
            </div>
        </div>
    </>
    )
}

export default memo(ProductDetailPage);