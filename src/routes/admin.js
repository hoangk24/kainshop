import Account from "../pages/Admin/Account/Account";
import Product from "../pages/Admin/ProductAdmin/Product";
import Cart from "../pages/Admin/CartAdmin/Cart";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import CartChart from "../pages/Admin/Statistics/Cart/CartChart";
import Discount from "../pages/Admin/Discount/Discount";

const admin = [
  {
    path: "/admin",
    exact: false,
    component: Dashboard,
  },
  {
    path: "/account",
    exact: false,
    component: Account,
  },
  {
    path: "/product-admin",
    exact: false,
    component: Product,
  },
  {
    path: "/cart-admin",
    exact: false,
    component: Cart,
  },
  {
    path: "/statistics-cart",
    exact: false,
    component: CartChart,
  },
  {
    path: "/discount",
    exact: false,
    component: Discount,
  },
];

export default admin;
