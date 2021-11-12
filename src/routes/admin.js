import Account from "../pages/Admin/Account/Account";
import Product from "../pages/Admin/ProductAdmin/Product";
import Cart from "../pages/Admin/CartAdmin/Cart";

const admin  =[
    {
        path:'/account',
        exact:false,
        component:Account,
    },
    {
        path:'/product-admin',
        exact:false,
        component:Product,
    },
    {
        path:'/cart-admin',
        exact:false,
        component:Cart,
    },
]

export default admin;