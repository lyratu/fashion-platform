import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FeaturedArticles from "./components/featured-articles";
import dateTool from "@/utils/dateTool";
import { useGetOutfitsPage } from "@/services/outfits";
import { useGetDictInfo } from "@/services/dict";
import { useRef, useState } from "react";
import UseScrollToBottom from "@/hooks/use-scroll";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

export default function ArticlesPage() {
  const loadRef = useRef(null);
  const { data: types } = useGetDictInfo(["category"]);
  const [category, setCategory] = useState("0");
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetOutfitsPage({
      order: "createTime",
      page: 1,
      size: 20,
      sort: "desc",
      title: searchText,
      category,
    });
  console.log(
    "%c [ data ]-18",
    "font-size:13px; background:pink; color:#bf2c9f;",
    data
  );

  UseScrollToBottom(loadRef, () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">时尚穿搭分享</h1>
          <p className="text-muted-foreground">
            内容来自时尚专业人士和行业专家
          </p>
        </div>
      </div>
      <FeaturedArticles />
      {/* Category Tabs */}
      <Tabs
        defaultValue="0"
        className="mb-8 mt-8"
        onValueChange={(i) => setCategory(i)}
      >
        <TabsList className="flex flex-wrap h-auto mb-2">
          <TabsTrigger key={0} value={"0"} className="mb-1 cursor-pointer">
            全部
          </TabsTrigger>
          {types?.category.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.value}
              className="mb-1 cursor-pointer"
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex justify-end">
          <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
            <Input
              type="email"
              value={inputText}
              placeholder="请输入关键词..."
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputText(e.target.value)
              }
            />
            <Button
              className=" cursor-pointer"
              onClick={() => {
                setSearchText(inputText);
              }}
            >
              搜索
            </Button>
            {inputText.trim() && (
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  setSearchText("");
                  setInputText("");
                }}
              >
                重置
              </Button>
            )}
          </div>
        </div>

        <TabsContent value={category} className="mt-0">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.pages.map((e) =>
              e?.list.map((article) => (
                <Card key={article.id} className="overflow-hidden h-fit">
                  <div className="relative w-full z-0">
                    <img
                      src={article.coverImage || "/placeholder.svg"}
                      alt={article.title}
                      className="object-cover object-top aspect-[4/3] w-full"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">
                      {article.categoryText.name}
                    </Badge>
                    <h3 className="text-lg font-bold mb-2 line-clamp-1">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground select-none line-clamp-2 mb-3">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
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
              ))
            )}
            <div ref={loadRef}>
              {isFetchingNextPage ? (
                <div className="flex items-center justify-center text-sm">
                  <Loader className="animate-spin" />
                  <span>加载中...</span>
                </div>
              ) : !hasNextPage ? (
                <div className="text-center text-gray-500"></div>
              ) : null}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
