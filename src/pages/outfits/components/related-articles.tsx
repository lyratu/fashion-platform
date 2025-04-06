import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useGetRelatedArticles } from "@/services/outfits";

export function RelatedArticles() {
  const { id } = useParams();
  const { data: related } = useGetRelatedArticles(id as string);

  return (
    <>
      {related && related?.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-xl font-bold tracking-tight">相关文章</h3>
          {related?.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <Link to={`/outfits/${article.id}`} className="block">
                <div className="relative">
                  <img
                    src={article.coverImage || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover object-top aspect-[4/3] w-full"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold line-clamp-2 mb-1">
                    {article.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>{article.categoryText.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground select-none line-clamp-2">
                    {article.description}
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
