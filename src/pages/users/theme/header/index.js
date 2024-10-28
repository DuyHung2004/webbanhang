import { memo } from "react";
import { useState } from "react";
import "./style.scss"
import { AiOutlineFacebook, AiOutlineMenu } from "react-icons/ai";
import { CiInstagram } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link, Route, Router, useLocation } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { formatter } from "../../../../utils/fomater";
import { AiOutlineShopping } from "react-icons/ai";
import { ROUTERS } from "../../../../utils/router";
import { CiMenuBurger } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Header = ()=>{
    const [isShowCategories, setShowCategories]= useState(false);
    const location= useLocation();
    const [isHome, setIsHome]= useState(location.pathname.length<=1);
    const [categories, setCategories] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggedOut, setIsLoggedOut] = useState(false)
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [location]);
    useEffect(() => {
        axios.get('http://localhost:8080/identity/api/v1/categories')
            .then(response => {
                console.log(response.data.result)
                setCategories(response.data.result || [])})
            .catch(error => console.error('Error fetching categories:', error));
    }, []);
    useEffect(()=>{
        setIsHome(location.pathname.length<=1);
    },[location])
    const menus=[
        {
            path: ROUTERS.USER.HOME,
            name: "Trang Chủ",

        },
        {
            name:"Sản Phẩm",
            path: "",
            child: [
                {
                    name: "PHONE",
                    path:""
                },
                {
                    name: "LAPTOP",
                    path:""
                },
                {
                    name: "Phụ Kiện",
                    path:""
                },
                {
                    name: "Tablet",
                    path:""
                }
            ]
        },
        {
            path: "",
            name: "Giới Thiệu",
    
        },
        {
            path: "",
            name: "Liên Hệ",
    
        }
    ]
    const taikhoan=[
        {
            path: ROUTERS.USER.PROFILE,
            name: "Thong Tin Tai Khoan"
        },
        {
            path: ROUTERS.USER.HISTORY,
            name: "Lich su mua hang"
        }
    ]

    const images = [
        require('../../../../assets/users/images/hero/dt1.jpg'),
        require('../../../../assets/users/images/hero/dt2.png'),
        require('../../../../assets/users/images/hero/dt3.jpg')
      ];
      
      const [currentIndex, setCurrentIndex] = useState(0);
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000);
    
        return () => clearInterval(interval); 
      }, [images.length]);
      const navigate = useNavigate();
      const logout =()=>{
        Cookies.remove('token');
        localStorage.removeItem('cart');
        setIsLoggedIn(false);
        navigate(ROUTERS.USER.HOME); 
      }

    return (
        <>
        <div className="header_top">
            <div className="container">
                <div className="row">
                <div className="col-6 header_top_left">
                    <ul>
                        <li>
                            <Link to={""}>
                            <CiMail />
                            </Link>
                            <span>duyhung13102004@gmail.com</span>
                        </li>
                        <li>Miễn phí ship từ đơn {formatter(500000)}</li>
                    </ul>
                </div>
                <div className="col-6 header_top_right" >
                    <ul>
                        <li>
                            <Link to={""}>
                            <AiOutlineFacebook />
                            </Link>
                        </li>
                        <li>
                            <Link to={""}>
                            <CiInstagram />
                            </Link>
                        </li>
                    </ul>
                    <div className="account">
                    <ul>
                    {
                            isLoggedIn ? (
                                <li className="accuont_page">
                                    <Link onClick={()=>setIsLoggedOut(!isLoggedOut)}>
                                        <CiUser />
                                        <span >Tai Khoan</span>
                                        {
                                          isLoggedOut &&(
                                            <ul>
                                                {
                                                    taikhoan.map((item, key)=>(
                                                        <li key={key}>
                                                            <Link  onClick={()=>setIsLoggedOut(!isLoggedOut)} to={item.path}>{item.name}</Link>     
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <Link onClick={()=>logout()}>Đăng Xuất</Link>
                                                </li>
                                            </ul>
                                          )  
                                        }
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link to={ROUTERS.USER.LOGIN}>
                                        <CiUser />
                                        <span>Dang Nhap</span>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row ">
                <div className="col-lg-3 " >
                    <div className="hearder_logo" >
                        <h1>THE END 5x11</h1>
                    </div>
                </div>
                <div className="col-lg-6 " >

                    <nav className="header_menu">
                        <ul>
                            {
                                menus?.map((menu,index)=>(
                                    <li key={index} className="active">
                                        <Link to={menu.path} >{menu.name}</Link>   
                                         {
                                            menu.child &&(
                                                <ul className="header_menu_dropdown" >
                                                    {
                                                        menu.child.map((childItem, childKey)=>(
                                                            <li key={childKey}>
                                                                <Link to={childItem.path}>{childItem.name}</Link>    
                                                            </li>
                                                        ))
                                                    }
                                                </ul>
                                            )
                                         }                                     
                                    </li>
                                ))
                            }
                           
                        </ul>
                    </nav>

                </div>
                <div className="col-lg-3 " >
                    <div className="header_cart">
                        <div className="header_cart_cart" >
                            <Link to={ROUTERS.USER.CART}>
                                    Gio Hang 
                            </Link>
                        </div>
                        <ul>
                            <li>
                                <Link to={ROUTERS.USER.CART}>
                                    <AiOutlineShopping /> 
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="header_open">
                            <AiOutlineMenu onClick={()=>alert("a")}/>
                    </div>
                </div>
            </div>

        </div>
        <div className="container">
            <div className="row categories">
                <div className="col-lg-3 hero_categories">
                    <div className="hero_categories_all" onClick={()=>setShowCategories(!isShowCategories)} >
                         <CiMenuBurger />
                         Danh Sach San Pham</div>
                         {
                            isShowCategories &&(
                                <ul>
                                    <li>
                                        <Link to="/category/0" onClick={()=>setShowCategories(!isShowCategories)} >Tat ca</Link>
                                    </li>
                                {   
                                    categories.map(category => (
                                        <li key={category.id} value={category.id} onClick={()=>setShowCategories(!isShowCategories)}>
                                          <Link to={`/category/${category.id}`}>{category.name}</Link>
                                        </li>
                                    ))
                                }
                              </ul>
                              
                            )
                         }
                </div>
                <div className="col-lg-9 hero_search_container">
                    <div className="hero_search">
                        <div className="hero_search_form">  
                            <form>
                                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                                <button type="submit" >Tìm kiếm</button>
                            </form>
                        </div>
                        <div className="hero_search_phone">
                            <div className="phone_icon">
                            <FaPhone />
                            </div>
                            <div>
                                <p>+1234.5678</p>
                                <p>Tư vấn mua hàng</p>
                            </div>
                        </div>
                    </div>
                    { isHome && ( <div className="hero_item">
                        <div className="slideshow">
                            <img
                                src={images[currentIndex]} 
                                alt={`slide-${currentIndex}`} 
                                style={{ width: '100%', height: '400px', objectFit: 'cover' }} 
                            />
                            <div className="slideshow-dots">
                                {images.map((_, index) => (
                                <span 
                                    key={index} 
                                    className={`dot ${currentIndex === index ? 'active' : ''}`}
                                ></span>
                                ))}
                            </div>
                        </div>
                    </div>)
                    }   
                </div>
            </div>                 
        </div>
        </>
    )
}

export default memo(Header);