import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Home from "@/pages/home";
import DefaultLayout from "@/layouts/default";
import Login from "@/pages/auth";
import { Test } from "@/test/reactQuery_Test";
import { Providers } from "@/providers";
import Outfits from "@/pages/outfits";
import OutfitsDetail from "@/pages/outfits/detail";
import Mall from "@/pages/mall";
import Cart from "@/pages/mall/cart";
import Community from "@/pages/community";
import PostDetail from "@/pages/community/detail";
import Wardrobe from "@/pages/wardrobe";
import Checkout from "@/pages/mall/checkout";
import Product from "@/pages/mall/product";
import Profile from "@/pages/profile";
import ErrorBoundary from "@/pages/error";
import Payment from "@/pages/mall/payment";
export const routes = createRoutesFromElements(
  <Route element={<Providers />} errorElement={<ErrorBoundary />}>
    <Route path="/test" element={<Test />} />
    <Route path="/auth" element={<Login />} />
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/outfits" element={<Outfits />} />
      <Route path="/outfits/:id" element={<OutfitsDetail />} />
      <Route path="/mall" element={<Mall />} />
      <Route path="/mall/cart" element={<Cart />} />
      <Route path="/mall/cart/checkout" element={<Checkout />} />
      <Route path="/mall/product/:id" element={<Product />} />
      <Route path="/community" element={<Community />} />
      <Route path="/community/post/:id" element={<PostDetail />} />
      <Route path="/wardrobe" element={<Wardrobe />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="/payment" element={<Payment />} />
  </Route>
);

export const router = createBrowserRouter(routes);
