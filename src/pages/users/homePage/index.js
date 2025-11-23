import { memo, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Iphone from "assets/users/images/categories/dt4.jpg";
import lapTop from "assets/users/images/categories/laptop.jpg";
import samSung from "assets/users/images/categories/samsung.jpg";
import sacip from "assets/users/images/categories/sacip.jpg";
import taiNghe from "assets/users/images/categories/tainghe.jpg";
import banner1 from "assets/users/images/featured/banner1.jpg";
import banner2 from "assets/users/images/featured/banner2.jpg";
import "./style.scss";
import ProductsCard from '../../../component/productCard';
import { toast } from 'react-toastify';
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AiOutlineEye, AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import { formatter } from "utils/fomater";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import TokenChecker from "component/tokenCheck";
import axios from "axios";

const HomePage = ()=>{
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      const [products, setProducts]= useState([])
      const [featProducts, setfeatProducts]= useState({})
      useEffect(() => {
        axios.get('http://localhost:8080/identity/api/v1/products/topproduct')
          .then(response => {
            const result = response.data.result;
            setProducts(result);
            const featProducts = {
              all: {
                title: "Toan bo",
                products: []
              }
            };
            result.forEach(featProduct => {
              const categoryName = featProduct.category.name;
              const productInfo = {
                img: featProduct.thumbnail,
                name: featProduct.name,
                price: featProduct.price, 
                id: featProduct.id,
              };
              featProducts.all.products.push(productInfo);
              if (!featProducts[categoryName]) {
                featProducts[categoryName] = {
                  title: categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
                  products: []
                };
              }
              featProducts[categoryName].products.push(productInfo);
            });
      
            setfeatProducts(featProducts);
          })
          .catch(error => {
            console.error("Error fetching products:", error);
          });
      }, []);
      
      const sliderItems=[
        {
          bgImg: Iphone
        },
        {
          bgImg: samSung
        },
        {
          bgImg: lapTop
        },
        {
          bgImg: sacip
        },
        {
          bgImg: taiNghe
        },
      ]
      const location = useLocation();
const navigate = useNavigate();

useEffect(() => {
  const query = new URLSearchParams(location.search);
  const status = query.get("status");
  const amount = query.get("amount");

  if (status === "success") {
    toast.success("Thanh toán thành công! Số tiền: " + amount + " VND");
    navigate("/", { replace: true });
  }

  if (status === "fail") {
    toast.error("Thanh toán thất bại!");
    navigate("/", { replace: true });
  }
}, [location.search, navigate]);
      

      const renderFeaturedProperties=(data)=>{
        const tabsList=[];
        const tabPanels=[];
        Object.keys(data).forEach((key,index)=>{           
          tabsList.push(<Tab key={index}>{data[key].title}</Tab>)
          const tabPanel=[];
            data[key].products.forEach((item,j)=>{
              tabPanel.push(
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={j}>
                  <ProductsCard img={item.img} name={item.name} price={item.price} id={item.id} />
                </div>
              )
            })
            tabPanels.push(tabPanel)
          })
        return  (<Tabs>
          <TabList>{tabsList}</TabList>
          {
            tabPanels.map((item,key)=>(
              <TabPanel key={key}>
                <div className="row">{item}</div>
              </TabPanel>
            ))
          }
      </Tabs>)
      }

    return (
    <>
    <TokenChecker />
    {/*Categories Begin*/}
        <div className="container container_categories_slider">
        <Carousel responsive={responsive} className="categories_slider">
          {
            sliderItems.map((item, key)=>(

            <div key={key} className="categories_slider_item" style={{backgroundImage:`url(${item.bgImg})`}}>
            </div>
            ))
          }
        </Carousel>
        </div>
        {/*Categories End*/}
        {/*Featured Begin*/}
        <div className="container">
          <div className="featured">
            <div className="section-title">
            <h2>San pham noi bat</h2>
            </div>
            {renderFeaturedProperties(featProducts)}
          </div>
        </div>
        {/*Featured End*/}
        {/*Banner Begin*/}
          <div className="container">
            <div className="banner"> 
              <div className="banner_pic">
                <img src={banner1} alt=""></img>
              </div>
              <div className="banner_pic">
                <img src={banner2} alt=""></img>
              </div>
            </div>
          </div>
        {/*Banner End*/}
    </>
    )
}
export default memo(HomePage);