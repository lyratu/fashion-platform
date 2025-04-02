import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeaturedArticles from "./components/featured-articles";
import { outfits } from "@/types/outfits";
import dateTool from "@/utils/dateTool";
import { useGetOutfitsPage } from "@/services/outfits";
export default function ArticlesPage() {
  const categories = ["全部", "季节", "流行", "风格", "新闻"];
  const regularArticles: Array<outfits> = [];
  const { data } = useGetOutfitsPage({
    order: "createTime",
    page: 1,
    size: 20,
    sort: "desc",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">时尚穿搭分享</h1>
          <p className="text-muted-foreground">
            内容来自时尚专业人士和行业专家
          </p>
        </div>
      </div>
      <FeaturedArticles />
      {/* Category Tabs */}
      <Tabs defaultValue="全部" className="mb-8">
        <TabsList className="mb-6 flex flex-wrap h-auto">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="mb-1">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="全部" className="mt-0">
          <div className="grid md:grid-cols-3 gap-6">
            {regularArticles?.map((article) => (
              <Card key={article.id}>
                <div className="relative h-48 w-full">
                  <img
                    src={article.user.avatarUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="object-cover object-top"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="outline" className="mb-2">
                    {article.category}
                  </Badge>
                  <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.content}</span>
                    <span>
                      {dateTool.formattedDate(article?.createTime as string)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 pb-4 px-4">
                  <Button variant="outline" asChild className="w-full">
                    <Link to={`/outfits/${article.id}`}>查看详情</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Other category tabs would filter articles */}
        {categories.slice(0).map((category) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data?.list.map((article) => (
                <Card key={article.id}>
                  <div className="relative h-48 w-full">
                    <img
                      src={article.coverImage || "/placeholder.svg"}
                      alt={article.title}
                      className="h-full  object-cover object-top w-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {article.category}
                    </Badge>
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.content}</span>
                      <span>
                        {dateTool.formattedDate(article?.createTime as string)}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-4 px-4">
                    <Button variant="outline" asChild className="w-full">
                      <Link to={`/outfits/${article.id}`}>查看详情</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
