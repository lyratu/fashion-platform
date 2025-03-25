import { useState } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = location.href;
  const routes = [
    {
      to: "/",
      label: "首页",
      active: pathname === "/",
    },
    {
      to: "/outfits",
      label: "穿搭分享",
      active: pathname === "/outfits",
    },
    {
      to: "/mall",
      label: "商城",
      active: pathname === "/mall",
    },
    {
      to: "/community",
      label: "社区",
      active: pathname === "/community",
    },
    {
      to: "/wardrobe",
      label: "衣橱",
      active: pathname === "/wardrobe",
    },
  ];

  return (
    <div className="flex items-center">
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={route.to}>
                <Link to={route.to}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={route.active}
                  >
                    {route.label}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4 mt-8">
              {routes.map((route) => (
                <Link
                  key={route.to}
                  to={route.to}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    route.active ? "text-primary" : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
