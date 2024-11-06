import login from "pages/users/login";

export const ROUTERS={
    USER:{
        HOME:"/",
        PROFILE:"profile",
        PRODUCTS:"/category/:id",
        PRODUCT:"/san-pham/chi-tiet/:id",
        LOGIN: "/login",
        REGISTER: "/register",
        CART:"/gio-hang",
        PAYMENT:"/thanh-toan",
        HISTORY:"/history",
        ORDERDETAIL:"/don-hang/:id",
    },
    ADMIN:{
        LOGIN: "/adminlogin",
        HOME:"/admin",
        ORDER:"/admin/orders",
        PRODUCT:"/admin/products",
        CATEGORY:"/admin/categories",
        ADDPRODUCT:"/admin/add-products",
        EDITPRODUCT:"/admin/edit-product/:id",
        EDITUSER:"/admin/edit-user/:id",
        ADDCATEGORY:"/admin/addcategory",
        EDITORDER:"/admin/editorder/:id",
    }
}