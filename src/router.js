import ProductsPage from "pages/users/productsPage";
import HomePage from "./pages/users/homePage";
import ProfilePage from "./pages/users/profilePage";
import MasterLayout from "./pages/users/theme/masterLayout";
import {ROUTERS} from "./utils/router";
import {Routes,Route,useLocation} from "react-router-dom"
import ProductDetailPage from "pages/users/ProductDetailPage";
import Login from "pages/users/login";
import Register from "pages/users/register";
import ShoppingCartPage from "pages/users/shoppingCartPage";
import PaymentPage from "pages/users/paymentPage";
import TokenChecker from "component/tokenCheck";
import PurchasingHistory from "pages/users/purchasingHistory";
import OrderDetail from "pages/users/orderDetail";
import AppHeader from "pages/admin/header/AppHeader";
import MasterLayoutAdmin from "./pages/admin/masterLayoutAdmin";
import ListUser from "pages/admin/listuser";
import ListOrder from "pages/admin/orders"
import ListProducts from "pages/admin/listproducts";
import ListCategorys from "pages/admin/listcategorys";
import CreateProduct from "pages/admin/addproduct";
import EditProduct from "pages/admin/editproduct";
import LoginAdmin from "pages/admin/login";
import EditUser from "pages/admin/edituser";
import CreateCategory from "pages/admin/addcategory";
import EditOrder from "pages/admin/editorder";
import ProtectedRoute from "./component/ProtectedRoute";
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
        },
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

const renderAdminRouter = () => {
    const adminRouters=[
        {
            path: ROUTERS.ADMIN.HOME,
            component: <ListUser />
        },{
            path: ROUTERS.ADMIN.ORDER,
            component: <ListOrder />
        },{
            path: ROUTERS.ADMIN.PRODUCT,
            component: <ListProducts/>
        },{
            path: ROUTERS.ADMIN.CATEGORY,
            component: <ListCategorys />
        },{
            path: ROUTERS.ADMIN.ADDPRODUCT,
            component: <CreateProduct />
        },{
            path: ROUTERS.ADMIN.EDITPRODUCT,
            component: <EditProduct />
        },{
            path: ROUTERS.ADMIN.EDITUSER,
            component: <EditUser />
        },{
            path: ROUTERS.ADMIN.ADDCATEGORY,
            component: <CreateCategory />
        },{
            path: ROUTERS.ADMIN.EDITORDER,
            component: <EditOrder />
        }
    ]
    return (
         <ProtectedRoute>
            <MasterLayoutAdmin>
                <Routes>
                    {adminRouters.map((route, index) => (
                        <Route path={route.path} key={index} element={route.component} />
                    ))}
                </Routes>
            </MasterLayoutAdmin>
        </ProtectedRoute>
    );
}

const renderLoginAdmin=()=>{
    const adminlogin=[
        {
            path: ROUTERS.ADMIN.LOGIN,
            component: <LoginAdmin />
        }
    ]
    return (
        <Routes>
            {
                adminlogin.map((route,index)=>(
                    <Route path={route.path} key={index} element={route.component} />
                    
                ))
            }
        </Routes>
    );
}

const RouterCustom = () => {
    const location = useLocation();
    const isLoginPath = location.pathname.startsWith("/adminlogin");

    const isAdminPath = location.pathname.startsWith("/admin"); 

    return (
        <>
            {isLoginPath ? renderLoginAdmin() : (
            isAdminPath ? renderAdminRouter() : renderUserRouter())
            }   
        </>
    );
}
export default RouterCustom;