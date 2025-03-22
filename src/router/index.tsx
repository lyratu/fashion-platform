import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Home from "@/pages/Home";
import DefaultLayout from "@/layouts/default";
import Login from "@/pages/auth/login";
import Test from "@/test/reactQuery_Test";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

export const routes = createRoutesFromElements(
  <Route>
    <Route path="/test" element={<Test />} />
    <Route path="/login" element={<QueryClientProvider client={queryClient} />}>
      <Route element={<Login />}></Route>
    </Route>
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
