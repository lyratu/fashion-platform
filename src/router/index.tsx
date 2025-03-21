import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/default";
import Login from "@/pages/auth/login";
export const routes = createRoutesFromElements(
  <Route>
    <Route path="/login" element={<Login />} />
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
