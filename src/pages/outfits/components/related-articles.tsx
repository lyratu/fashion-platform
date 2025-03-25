import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface RelatedArticle {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  category: string;
  readingTime: number;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <Link to={`/articles/${article.id}`} className="block">
            <div className="relative aspect-[16/9]">
              <img
                src={article.coverImage || "/placeholder.svg"}
                alt={article.title}
                className="object-cover object-top transition-transform hover:scale-105"
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold line-clamp-2 mb-1">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span>{article.category}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{article.readingTime} min</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {article.excerpt}
              </p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
