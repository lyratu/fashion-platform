import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useGetOutfitsRec } from "@/services/outfits";
import dateTool from "@/utils/dateTool";
export default function FeaturedArticles() {
  const { data } = useGetOutfitsRec();

  return (
    <div className="grid grid-cols-2  gap-3">
      {data?.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <div className="relative z-0">
            <img
              src={article.coverImage || "/placeholder.svg"}
              alt={article.title}
              className="object-cover object-top aspect-[5/2] h-full"
            />
          </div>
          <CardContent className="p-4 z-10 relative">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="secondary">{article.categoryText.name}</Badge>
              <span className="text-xs text-muted-foreground">
                {dateTool.formattedDate(article?.createTime as string)}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-2">{article.title}</h3>
            {/* <div className="flex justify-between items-center">
              <span className="text-xs"></span>
              <Link
                to={`/outfits/${article.id}`}
                className="text-sm font-medium text-primary"
              >
                查看更多
              </Link>
            </div> */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
