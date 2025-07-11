import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { User, ShoppingCart, Search } from "lucide-react";
import { MainNav } from "@/layouts/main-nav";
import { Outlet } from "react-router-dom"; // 引入 Outlet 组件
import logo from "@/assets/logo.svg";
import { useCartQuantityStore } from "@/stores/cart";
import { useGetCartCount } from "@/services/mall";
import { useEffect } from "react";
export default function NavBar() {
  const navigate = useNavigate();
  // 获取购物车数量和操作方法
  const { getTotalQuantity, initializeCart } = useCartQuantityStore();
  const totalQuantity = getTotalQuantity();
  const token = localStorage.getItem("token");
  const { data: count } = useGetCartCount();
  useEffect(() => {
    if (count) {
      initializeCart(count);
    }
  }, [count, initializeCart]);
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className=" mx-auto container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="font-bold text-xl flex items-center">
              <img loading="lazy"  src={logo} className="w-8 h-8 mr-2" />
              <span>时尚穿搭交流平台</span>
            </Link>
            <MainNav />
          </div>
          {token ? (
            <div className="flex items-center gap-2">
              {/* <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button> */}
              <Button variant="ghost" size="icon" asChild className=" relative">
                <Link to="/mall/cart">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                  {totalQuantity ? (
                    <span
                      className="absolute -top-0 -right-0 bg-black text-white 
               rounded-full w-4 h-4 flex items-center justify-center 
               text-xs"
                    >
                      {totalQuantity}
                    </span>
                  ) : null}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className=" cursor-pointer"
                onClick={() => {
                  if (token) navigate("/profile");
                  else navigate("/auth");
                }}
              >
                <div>
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </div>
              </Button>
            </div>
          ) : null}
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="mx-auto container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Copyright © LYRATU | 鄂ICP备2025113993号
          </p>
          {/* <div className="flex gap-4">
            <Link
              to="/terms"
              className="text-sm text-muted-foreground select-none hover:underline"
            >
              条款
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground select-none hover:underline"
            >
              隐私
            </Link>
            <Link
              to="/about"
              className="text-sm text-muted-foreground select-none hover:underline"
            >
              关于
            </Link>
            <Link
              to="/contact"
              className="text-sm text-muted-foreground select-none hover:underline"
            >
              联系
            </Link>
          </div> */}
        </div>
      </footer>
    </div>
  );
}
