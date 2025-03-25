import {
  createRoutesFromElements,
  createBrowserRouter,
  Route
} from "react-router-dom";
import Home from "@/pages/home";
import DefaultLayout from "@/layouts/default";
import Login from "@/pages/auth/login";
import Test from "@/test/reactQuery_Test";
import { Providers } from "@/providers";
import Outfits from "@/pages/outfits";
import Mall from "@/pages/mall";
import Cart from "@/pages/mall/cart";
import Community from "@/pages/community";
import Wardrobe from "@/pages/wardrobe";
import Product from "@/pages/mall/product";
import Profile from "@/pages/profile";
import ErrorBoundary from "@/pages/error/errorBoundary";
export const routes = createRoutesFromElements(
  <Route element={<Providers />} errorElement={<ErrorBoundary />}>
    <Route path="/test" element={<Test />} />
    <Route path="/auth" element={<Login />} />
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/outfits" element={<Outfits />} />
      {/* <Route path="/outfits/:id" element={<Outfits />} /> */}
      <Route path="/mall" element={<Mall />} />
      <Route path="/mall/cart" element={<Cart />} />
      <Route path="/mall/product/:id" element={<Product />} />
      <Route path="/community" element={<Community />} />
      <Route path="/wardrobe" element={<Wardrobe />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
