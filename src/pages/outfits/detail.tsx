import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, Calendar, Share2, ThumbsUp } from "lucide-react";
// import { ArticleTableOfContents } from "./components/article-table-of-contents";
import { RelatedArticles } from "./components/related-articles";
import { CommentSection } from "./components/comment-section";
// import { AuthorCard } from "./components/author-card";
import { useNavigate, useParams } from "react-router";
import { useDoCollect, useDoLike, useGetOutfitsDet } from "@/services/outfits";
import { toast } from "sonner";
import dateTool from "@/utils/dateTool";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ArticlePage() {
  const { id } = useParams();

  const { data: info, isError } = useGetOutfitsDet(id as string);

  const { doLikeFn } = useDoLike();
  const { doCollectFn } = useDoCollect();
  const navigate = useNavigate();
  if (isError) navigate("/error", { replace: true });
  return (
    <>
      <div className="container max-w-screen-xl mx-auto px-4 py-8">
        {info ? (
          <div className="grid grid-cols-2 gap-8 container mx-auto">
            <div>
              {/* Featured Image */}
              <div className="relative overflow-hidden rounded-lg h-full bg-[#f7f7f7] flex items-center">
                <img
                  src={info.coverImage || "/placeholder.svg"}
                  alt={info.title}
                  className="w-full object-cover max-h-[calc(100vh-12.5rem)]"
                />
              </div>
            </div>
            <ScrollArea className="max-h-[calc(100vh-12.5rem)] pr-4">
              {/* Article Header */}
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-4 cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  返回
                </Button>

                <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">
                  {info.title}
                </h1>
                <div>{info.description}</div>
                {info.categoryText?.name ? (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 hover:bg-primary/20"
                  >
                    {info.categoryText?.name}
                  </Badge>
                ) : null}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground select-none">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {dateTool.formattedDate(info.createTime as string)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="richText prose prose-lg dark:prose-invert max-w-none pb-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: info.content as string,
                  }}
                />
              </div>

              {/* Article Stats */}
              <div className="flex items-center justify-between border-y py-4">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {info.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={async () => {
                      await doLikeFn(info.id, {
                        onSuccess: (res) => {
                          info.likeStatus = res.likeStatus;
                          info.likeCount = res.likeCount;
                        },
                      });
                    }}
                  >
                    <ThumbsUp
                      className={`h-4 w-4 ${
                        info.likeStatus ? "fill-chart-1 text-chart-1" : ""
                      }`}
                    />
                  </Button>
                  <span className="text-sm text-muted-foreground select-none">
                    {info.likeCount}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={async () => {
                      await doCollectFn(info.id, {
                        onSuccess: (res) => {
                          info.collectStatus = res.collectStatus;
                          info.collectCount = res.collectCount;
                        },
                      });
                    }}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        info.collectStatus ? "fill-chart-4 text-chart-4" : ""
                      }`}
                    />
                  </Button>
                  <span className="text-sm text-muted-foreground select-none">
                    {info.collectCount}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("已复制分享链接，请分享给好友吧~", {
                        duration: 1500,
                      });
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">分享</span>
                  </Button>
                </div>
              </div>

              {/* Comments Section */}
              <CommentSection userId={info.authorId} />
            </ScrollArea>
          </div>
        ) : (
          ""
        )}

        {/* 相关推荐 */}
        {/* <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-20 space-y-8">
            <div className="space-y-4">
              <RelatedArticles />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
