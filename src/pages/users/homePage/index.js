import { memo, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Iphone from "assets/users/images/categories/dt4.jpg";
import lapTop from "assets/users/images/categories/laptop.jpg";
import samSung from "assets/users/images/categories/samsung.jpg";
import sacip from "assets/users/images/categories/sacip.jpg";
import taiNghe from "assets/users/images/categories/tainghe.jpg";
import ip16 from "assets/users/images/featured/ip16.jpg";
import ip15 from "assets/users/images/featured/ip15.jpg";
import ip14 from "assets/users/images/featured/ip14.jpg";
import ss10 from "assets/users/images/featured/ss10.jpg";
import ss20 from "assets/users/images/featured/ss20.jpg";
import sszp from "assets/users/images/featured/sszp.jpg";
import laptop from "assets/users/images/featured/laptop.jpg";
import laptop2 from "assets/users/images/featured/laptop2.jpg";
import laptop3 from "assets/users/images/featured/laptop3.jpg";
import tainghe1 from "assets/users/images/featured/tainghe1.jpg";
import tainghe2 from "assets/users/images/featured/tainghe2.jpg";
import tainghe3 from "assets/users/images/featured/tainghe3.jpg";
import cusac1 from "assets/users/images/featured/cusac1.png";
import capsac1 from "assets/users/images/featured/capsac1.jpg";
import combosac1 from "assets/users/images/featured/combosac1.jpg";
import combosac2 from "assets/users/images/featured/combosac2.jpg";
import banner1 from "assets/users/images/featured/banner1.jpg";
import banner2 from "assets/users/images/featured/banner2.jpg";
import "./style.scss";
import ProductsCard from '../../../component/productCard';

import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { AiOutlineEye, AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import { formatter } from "utils/fomater";
import { Link } from "react-router-dom";
import TokenChecker from "component/tokenCheck";

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
      const [featProducts, setfeatProducts]= useState([])
      useEffect(() =>{
        axios.get('http://localhost:8080/identity/api/v1/products/topproduct')
       .then(response=>{
        setProducts(response.data.result)
        setfeatProducts(products.map(featProduct =>{
          return{
            title:featProduct.category.name,
            products:[
              {
                img: featProduct.thumbnail,
                name: featProduct.name,
                price: formatter.format(featProduct.price),
                id:featProduct.id
              }
            ]
          }
        }))
       }) .catch(error => console.error('Error fetching categories:', error));
      },[])
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

      const featProducts={
        all:{
          title: "Toan bo",
          products:[
            {
              img: ip16,
              name:"Iphone 16 pro max",
              price:59999999
            },
            {
              img: ip15,
              name:"Iphone 15 pro max",
              price:34000000
            },
            {
              img: ip14,
              name:"Iphone 14 pro max",
              price:29000000
            },
            {
              img: ss10,
              name:"Samsung galaxy S10",
              price:20000000
            },
            {
              img: ss20,
              name:"Samsung galaxy S20",
              price:20000000
            },
            {
              img: sszp,
              name:"Sungsung Zplip",
              price:20000000
            },
            {
              img: laptop,
              name:"Laptop 1",
              price:20000000
            },
            {
              img: laptop2,
              name:"Laptop 2",
              price:20000000
            },
            {
              img: laptop3,
              name:"Laptop 3",
              price:20000000
            },
            {
              img: tainghe1,
              name:"Tai Nghe chup",
              price:20000000
            },
            {
              img: tainghe2,
              name:"Tai Nghe chup 2",
              price:20000000
            },
            {
              img: tainghe3,
              name:"Airpod 2 pro",
              price:20000000
            },
            {
              img: cusac1,
              name:"Cu sac iphone chinh hang",
              price:20000000
            },
            {
              img: capsac1,
              name:"Cap sac Type-C to Lightning",
              price:20000000
            },
            {
              img: combosac1,
              name:"Bo cap sac 1",
              price:20000000
            },
            {
              img: combosac2,
              name:"Bo cap sac 2",
              price:20000000
            }
          ]
        },
        dtiphone:{
          title: "Iphone",
          products:[
            {
              img: ip16,
              name:"Iphone 16 pro max",
              price:59999999
            },
            {
              img: ip15,
              name:"Iphone 15 pro max",
              price:34000000
            },
            {
              img: ip14,
              name:"Iphone 14 pro max",
              price:29000000
            },
          ]
        },
        dtsamsung:{
          title: "Samsung",
          products:[
            {
              img: ss10,
              name:"Samsung galaxy S10",
              price:20000000
            },
            {
              img: ss20,
              name:"Samsung galaxy S20",
              price:20000000
            },
            {
              img: sszp,
              name:"Sungsung Zplip",
              price:20000000
            },
          ]
        },
        laptop:{
          title: "Laptop",
          products:[
            {
              img: laptop,
              name:"Laptop 1",
              price:20000000
            },
            {
              img: laptop2,
              name:"Laptop 2",
              price:20000000
            },
            {
              img: laptop3,
              name:"Laptop 3",
              price:20000000
            },
          ]
        },
        tainghe:{
          title: "Tai Nghe",
          products:[
            {
              img: tainghe1,
              name:"Tai Nghe chup",
              price:20000000
            },
            {
              img: tainghe2,
              name:"Tai Nghe chup 2",
              price:20000000
            },
            {
              img: tainghe3,
              name:"Airpod 2 pro",
              price:20000000
            },
          ]
        },
        phukien:{
          title: "Phu Kien",
          products:[
            {
              img: cusac1,
              name:"Cu sac iphone chinh hang",
              price:20000000
            },
            {
              img: capsac1,
              name:"Cap sac Type-C to Lightning",
              price:20000000
            },
            {
              img: combosac1,
              name:"Bo cap sac 1",
              price:20000000
            },
            {
              img: combosac2,
              name:"Bo cap sac 2",
              price:20000000
            },
          ]
        }
      }

      const renderFeaturedProperties=(data)=>{
        const tabsList=[];
        const tabPanels=[];
        Object.keys(data).forEach((key,index)=>{           
          tabsList.push(<Tab key={index}>{data[key].title}</Tab>)
          const tabPanel=[];
            data[key].products.forEach((item,j)=>{
              tabPanel.push(
                <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12" key={j}>
                  <ProductsCard img={item.img} name={item.name} price={item.price} id={j} />
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