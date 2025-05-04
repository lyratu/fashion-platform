import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { Link } from "react-router-dom";
import { useGetOutfitsRec } from "@/services/outfits";
import dateTool from "@/utils/dateTool";
import { useNavigate } from "react-router";

interface props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export default function FeaturedArticles({ className }: props) {
  const { data } = useGetOutfitsRec();
  const navigate = useNavigate();
  return (
    <div className={`${className} grid grid-cols-2 gap-4 `}>
      {data?.map((article) => (
        <Card
          key={article.id}
          className={`overflow-hidden cursor-pointer h-fit ${
            data?.length > 2 ? "h-full" : ""
          }`}
          onClick={() => navigate(`/outfits/${article.id}`)}
        >
          <div className="relative z-0">
            <img
              src={article.coverImage || "/placeholder.svg"}
              alt={article.title}
              className="object-cover object-top aspect-[5/2] h-full"
            />
          </div>
          <CardContent className="p-2 xl:p-4 z-10 relative">
            <div className="flex justify-between items-center mb-2">
              <Badge variant="secondary">{article.categoryText.name}</Badge>
              <span className="text-xs text-muted-foreground">
                {dateTool.formattedDate(article?.createTime as string)}
              </span>
            </div>
            <h3 className="text-sm xl:text-md font-bold mb-2 line-clamp-1">
              {article.title}
            </h3>
            <span className="text-xs  line-clamp-2">{article.description}</span>
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
