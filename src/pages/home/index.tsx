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
      <div className="grid grid-cols-2 gap-3">
        <div>
          <HomeCarousel />
        </div>
        <section className="mb-6">
          <FeaturedArticles />
        </section>
      </div>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-6">潮流服饰</h2>
        <TrendingOutfits />
      </section>

      {/* <section className="mb-6">
        <h2 className="text-2xl font-bold mb-6">热门评论</h2>
        <CommunityHighlights />
      </section> */}

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
