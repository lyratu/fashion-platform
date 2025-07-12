// ... existing code ...
import React, { Suspense } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";

// ⚠️ ErrorBoundary 应该保持同步导入，因为它需要立即捕获错误。
import ErrorBoundary from "@/pages/error";

// 使用 React.lazy() 懒加载所有其他组件
const Home = React.lazy(() => import("@/pages/home"));
const DefaultLayout = React.lazy(() => import("@/layouts/default"));
// 修正 Test 的懒加载方式
const Login = React.lazy(() => import("@/pages/auth"));
const Test = React.lazy(() =>
  import("@/test/reactQuery_Test").then((module) => ({ default: module.Test }))
); // <-- 修复这里
// 修正 Providers 的懒加载方式
const Providers = React.lazy(() =>
  import("@/providers").then((module) => ({ default: module.Providers }))
); // <-- 修复这里
const Outfits = React.lazy(() => import("@/pages/outfits"));
const OutfitsDetail = React.lazy(() => import("@/pages/outfits/detail"));
const Mall = React.lazy(() => import("@/pages/mall"));
const Cart = React.lazy(() => import("@/pages/mall/cart"));
const Community = React.lazy(() => import("@/pages/community"));
const PostDetail = React.lazy(() => import("@/pages/community/detail"));
const Wardrobe = React.lazy(() => import("@/pages/wardrobe"));
const Checkout = React.lazy(() => import("@/pages/mall/checkout"));
const Product = React.lazy(() => import("@/pages/mall/product"));
const Profile = React.lazy(() => import("@/pages/profile"));
const OtherProfile = React.lazy(() => import("@/pages/otherProfile"));
const Payment = React.lazy(() => import("@/pages/mall/payment"));

export const routes = createRoutesFromElements(
  <Route
    element={
      <Suspense>
        <Providers />
      </Suspense>
    }
    errorElement={<ErrorBoundary />}
  >
    <Route
      path="/test"
      element={
        <Suspense>
          <Test />
        </Suspense>
      }
    />
    <Route
      path="/auth"
      element={
        <Suspense>
          <Login />
        </Suspense>
      }
    />
    <Route
      element={
        <Suspense>
          <DefaultLayout />
        </Suspense>
      }
    >
      <Route
        path="/"
        element={
          <Suspense>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/outfits"
        element={
          <Suspense>
            <Outfits />
          </Suspense>
        }
      />
      <Route
        path="/outfits/:id"
        element={
          <Suspense>
            <OutfitsDetail />
          </Suspense>
        }
      />
      <Route
        path="/mall"
        element={
          <Suspense>
            <Mall />
          </Suspense>
        }
      />
      <Route
        path="/mall/cart"
        element={
          <Suspense>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="/mall/cart/checkout"
        element={
          <Suspense>
            <Checkout />
          </Suspense>
        }
      />
      <Route
        path="/mall/product/:id"
        element={
          <Suspense>
            <Product />
          </Suspense>
        }
      />
      <Route
        path="/community"
        element={
          <Suspense>
            <Community />
          </Suspense>
        }
      />
      <Route
        path="/community/post/:id"
        element={
          <Suspense>
            <PostDetail />
          </Suspense>
        }
      />
      <Route
        path="/wardrobe"
        element={
          <Suspense>
            <Wardrobe />
          </Suspense>
        }
      />
      <Route
        path="/profile"
        element={
          <Suspense>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <Suspense>
            <OtherProfile />
          </Suspense>
        }
      />
    </Route>
    <Route
      path="/payment"
      element={
        <Suspense>
          <Payment />
        </Suspense>
      }
    />
  </Route>
);

export const router = createBrowserRouter(routes);
