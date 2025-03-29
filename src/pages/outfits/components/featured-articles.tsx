import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetOutfitsFea } from "@/services/outfits";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dateTool from "@/utils/dateTool";

export default function FeaturedArticles() {
  const { data } = useGetOutfitsFea();

  //   const featuredArticles = articles.filter((article) => article);

  return (
    <>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">精选文章</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data?.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="relative h-64 w-full z-0">
                <img
                  src={article.coverImage || "/placeholder.svg"}
                  alt={article.title}
                  className="object-cover object-top  h-full w-full"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{article.category}</Badge>
                </div>
              </div>
              <CardContent className=" relative p-6 z-10">
                <div className="flex items-center gap-2 mb-3">
                  {/* <div className="relative h-8 w-8 rounded-full overflow-hidden">
                    <img
                      src={article.user.avatarUrl || "/placeholder.svg"}
                      alt={article.user.nickName}
                      className="object-cover object-top"
                    />
                  </div> */}
                  <Avatar>
                    <AvatarImage
                      src={article.user.avatarUrl}
                      alt={article.user.avatarUrl}
                    />
                    <AvatarFallback>
                      {article.user.nickName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">
                      {article.user.nickName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {article.user.position}
                    </p>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {article.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {dateTool.formattedDate(article?.createTime as string)}
                  </div>
                  <Button asChild>
                    <Link to={`/articles/${article.id}`}>查看详情</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
