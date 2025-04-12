import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FeaturedArticles from "@/pages/home/components/featured-articles";
import TrendingOutfits from "@/pages/home/components/featured-goods";
import CommunityHighlights from "@/pages/home/components/community-highlights";
import { Link } from "react-router-dom";
import HomeCarousel from "./components/homeCarousel";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <section className="mb-6">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to StyleConnect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
           您的时装社区的灵感，购物和创建完美的衣柜
          </p>
          <div className="flex gap-4 mt-6">
            <Button asChild size="lg">
              <Link to="/register">现在加入</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/explore">探索</Link>
            </Button>
          </div>
        </div>
      </section> */}
      <HomeCarousel />
      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-6">时尚分享</h2>
        <FeaturedArticles />
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-6">潮流服饰</h2>
        <TrendingOutfits />
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-6">热门评论</h2>
        <CommunityHighlights />
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">穿搭分享</h3>
            <p className="mb-4">
              我们的时尚专业人士提供专业的时尚建议和精心策划的服装。
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/outfits">查看更多</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">时尚购物</h3>
            <p className="mb-4">购买最新潮流，找到适合你完美造型的单品。</p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/mall">开始购物</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">虚拟衣橱</h3>
            <p className="mb-4">使用我们的交互式衣柜工具创建和定制您的服装。</p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/wardrobe">尝试一下</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
