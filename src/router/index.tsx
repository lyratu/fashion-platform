import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/default";
import Login from "@/pages/auth/login";
import Test from "@/test/reactQuery_Test";
import { Providers } from "@/providers";
export const routes = createRoutesFromElements(
  <Route element={<Providers />}>
    <Route path="/test" element={<Test />} />
    <Route path="/auth" element={<Login />} />
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
