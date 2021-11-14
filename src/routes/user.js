// import { lazy } from "react";

// const Login = lazy(() => import("../pages/User/Login/Login"));
// const RecoverPassword = lazy(() =>
//   import("../pages/User/RecoverPassword/RecoverPassword")
// );
// const RecoverPasswordSuccess = lazy(() =>
//   import("../pages/User/RecoverPassword/RecoverPasswordSuccess")
// );
// const Register = lazy(() => import("../pages/User/Register/Register"));
// const Home = lazy(() => import("../pages/Home/Home"));
// const Product = lazy(() => import("../pages/Product/Product"));
// // const ProductDetail = lazy(() =>
// //   import("../pages/ProductDetail/ProductDetail")
// // );
// const Cart = lazy(() => import("../pages/Cart/Cart"));
// const Activemail = lazy(() => import("../pages/User/ActiveMail/Activemail"));
import Login from "../pages/User/Login/Login";
import Register from "../pages/User/Register/Register";
import RecoverPassword from "../pages/User/RecoverPassword/RecoverPassword";
import RecoverPasswordSuccess from "../pages/User/RecoverPassword/RecoverPasswordSuccess";
import Activemail from "../pages/User/ActiveMail/Activemail";
import Product from "../pages/Product/Product";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import CartHistory from "../pages/User/CartHistory/CartHistory";
const user = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/login",
    exact: false,
    component: Login,
  },
  {
    path: "/recover-password",
    exact: false,
    component: RecoverPassword,
  },
  {
    path: "/password-reset",
    exact: false,
    component: RecoverPasswordSuccess,
  },
  {
    path: "/register",
    exact: false,
    component: Register,
  },
  {
    path: "/verified-mail",
    exact: false,
    component: Activemail,
  },
  {
    path: "/product",
    exact: false,
    component: Product,
  },
  {
    path: "/product-detail/:id",
    exact: false,
    component: ProductDetail,
  },
  {
    path: "/cart",
    exact: false,
    component: Cart,
  },
  {
    path: "/cart-history",
    exact: false,
    component: CartHistory,
  },
];

export default user;
