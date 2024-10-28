import ProductsPage from "pages/users/productsPage";
import HomePage from "./pages/users/homePage";
import ProfilePage from "./pages/users/profilePage";
import MasterLayout from "./pages/users/theme/masterLayout";
import {ROUTERS} from "./utils/router";
import {Routes,Route} from "react-router-dom"
import ProductDetailPage from "pages/users/ProductDetailPage";
import Login from "pages/users/login";
import Register from "pages/users/register";
import ShoppingCartPage from "pages/users/shoppingCartPage";
import PaymentPage from "pages/users/paymentPage";
import TokenChecker from "component/tokenCheck";
import PurchasingHistory from "pages/users/purchasingHistory";
import OrderDetail from "pages/users/orderDetail";

const renderUserRouter=()=>{
    const userRouters=[
        {
            path: ROUTERS.USER.HOME,
            component: <HomePage />
        },
        {
            path: ROUTERS.USER.PROFILE,
            component: <ProfilePage />
        },
        {
            path: ROUTERS.USER.PRODUCTS,
            component: <ProductsPage />
        },
        {
            path: ROUTERS.USER.PRODUCT,
            component: <ProductDetailPage />
        },
        {
            path: ROUTERS.USER.LOGIN,
            component: <Login />
        },
        {
            path: ROUTERS.USER.REGISTER,
            component: <Register />
        },
        {
            path: ROUTERS.USER.CART,
            component: <ShoppingCartPage />
        },{
            path: ROUTERS.USER.PAYMENT,
            component: <PaymentPage />
        },{
            path: ROUTERS.USER.HISTORY,
            component: <PurchasingHistory />
        },{
            path: ROUTERS.USER.ORDERDETAIL,
            component: <OrderDetail />
        }
    ]
    return (
        <MasterLayout>
        <Routes>
            {
                userRouters.map((route,index)=>(
                    <Route path={route.path} key={index} element={route.component} />
                    
                ))
            }
        </Routes>
        </MasterLayout>
    )
}

const RouterCustom=()=>{
    return renderUserRouter() ;
}
export default RouterCustom;