import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-6 max-w-md mx-auto">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-9xl font-extrabold tracking-tighter text-primary/10 sm:text-[12rem]">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
              <svg
                className="h-12 w-12 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            页面未找到
          </h2>
          <p className="text-muted-foreground">
            很抱歉，我们找不到您要查找的页面。它可能已被移动、删除或从未存在过。
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link to="javascript:;" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回
            </Link>
          </Button>
        </div>
      </div>

      {/* Animated dots (decorative) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="dots-pattern" />
      </div>
    </div>
  );
}
