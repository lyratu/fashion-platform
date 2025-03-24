import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Home from "@/pages/home";
import DefaultLayout from "@/layouts/default";
import Login from "@/pages/auth/login";
import Test from "@/test/reactQuery_Test";
import { Providers } from "@/providers";
import ErrorBoundary from "@/pages/error/errorBoundary";
export const routes = createRoutesFromElements(
  <Route element={<Providers />} errorElement={<ErrorBoundary />}>
    <Route path="/test" element={<Test />} />
    <Route path="/auth" element={<Login />} />
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
