import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Address from "../pages/Address/Address";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import OrderConfirm from "../pages/OrderConfirm/OrderConfirm";
import Payment from "../pages/Payment/Payment";
import Signup from "../pages/Signup/Signup";
import Wishlist from "../pages/Wishlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Home />,
      },
      {
        path: "products-table",
        element: <Home />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "address",
        element: <Address />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "order-confirm",
        element: <OrderConfirm />,
      },
       {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);
