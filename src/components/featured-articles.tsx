import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
export default function FeaturedArticles() {
  const articles = [
    {
      id: 1,
      title: "Summer Fashion Trends 2025",
      excerpt: "Discover the hottest styles for the upcoming summer season.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Emma Style",
      category: "Seasonal",
      date: "March 15, 2025",
    },
    {
      id: 2,
      title: "How to Build a Capsule Wardrobe",
      excerpt:
        "Simplify your closet with these essential pieces that mix and match perfectly.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Alex Fashion",
      category: "Essentials",
      date: "March 10, 2025",
    },
    {
      id: 3,
      title: "Sustainable Fashion Brands to Watch",
      excerpt:
        "These eco-friendly brands are changing the fashion industry for the better.",
      image: "/placeholder.svg?height=300&width=500",
      author: "Taylor Green",
      category: "Sustainability",
      date: "March 5, 2025",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <div className="relative h-48">
            <img
              src={article.image || "/placeholder.svg"}
              alt={article.title}
              className="object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="secondary">{article.category}</Badge>
              <span className="text-xs text-muted-foreground">
                {article.date}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {article.excerpt}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs">By {article.author}</span>
              <Link
                to={`/articles/${article.id}`}
                className="text-sm font-medium text-primary"
              >
                Read More
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
