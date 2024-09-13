import { useRoutes } from "react-router-dom";

import { Cart } from "@/pages/cart/cart";
import Login from "@/pages/login/login";
import { GiftCard } from "@/pages";
import Layout from "@/layouts/layout/layout";
import Checkout from "@/pages/checkout/checkout";
import { PaymentSuccess } from "@/pages/payment-success";
import HomePage from "@/pages/home/home-page";
import Wishlist from "@/pages/wishlist/wishlist";
import Profile from "@/pages/profile/profile";

export default function Router() {
  const element = useRoutes([
    {
      element: <Layout />,
      children: [
        {
          element: <HomePage />,
          index: true
        },
        {
          path: "/gift-cards/:productCode",
          element: <GiftCard />
        },
        {
          path: "/checkout",
          element: <Checkout />
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/payment-success",
          element: <PaymentSuccess />
        },
        {
          path: "/wishlist",
          element: <Wishlist />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/profile",
          element: <Profile />
        },
        {
          path: "/category/:categoryId",
          element: <HomePage />
        }
      ]
    }
  ]);
  return element;
}
