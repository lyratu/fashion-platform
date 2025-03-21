import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FeaturedArticles from "@/components/featured-articles";
import TrendingOutfits from "@/components/trending-outfits";
import CommunityHighlights from "@/components/community-highlights";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to StyleConnect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Your fashion community for inspiration, shopping, and creating your
            perfect wardrobe
          </p>
          <div className="flex gap-4 mt-6">
            <Button asChild size="lg">
              <Link to="/register">Join Now</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/explore">Explore</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
        <FeaturedArticles />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Trending Outfits</h2>
        <TrendingOutfits />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Community Highlights</h2>
        <CommunityHighlights />
      </section>

      <section className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Dressing Sharing</h3>
            <p className="mb-4">
              Expert fashion advice and curated outfits from our style
              professionals.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/articles">View Articles</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Fashion Mall</h3>
            <p className="mb-4">
              Shop the latest trends and find pieces to complete your perfect
              look.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/mall">Shop Now</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-2">Virtual Wardrobe</h3>
            <p className="mb-4">
              Create and customize your outfits with our interactive wardrobe
              tool.
            </p>
            <Button variant="outline" asChild className="w-full">
              <Link to="/wardrobe">Try It Out</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
