import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, Calendar, Share2, ThumbsUp } from "lucide-react";
// import { ArticleTableOfContents } from "./components/article-table-of-contents";
import { RelatedArticles } from "./components/related-articles";
import { CommentSection } from "./components/comment-section";
// import { AuthorCard } from "./components/author-card";
import { useParams } from "react-router";
import {
  useDoCollect,
  useDoLike,
  useGetCollectRecord,
  useGetLikeRecord,
  useGetOutfitsDet,
} from "@/services/outfits";
import { toast } from "sonner";
import dateTool from "@/utils/dateTool";

export default function ArticlePage() {
  const { id } = useParams();

  const { data: info } = useGetOutfitsDet(id as string);
  const { data: likeRec } = useGetLikeRecord(id as string);
  const { data: collectRec } = useGetCollectRecord(id as string);

  const { doLikeFn } = useDoLike();
  const { doCollectFn } = useDoCollect();

  return (
    <>
      <div className="container max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - 8 columns on desktop */}
        {info ? (
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {/* Article Header */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-primary/10 hover:bg-primary/20"
                  >
                    {info.categoryText}
                  </Badge>
                  {/* <div className="flex items-center text-sm text-muted-foreground select-none">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{article.readingTime} min read</span>
                  </div> */}
                </div>

                <h1 className="text-2xl font-bold tracking-tight lg:text-4xl">
                  {info.title}
                </h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={info.user.avatarUrl}
                        alt={info.user.nickName}
                      />
                      <AvatarFallback>
                        {info.user.nickName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {info.user.nickName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {info.user.position}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground select-none">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {dateTool.formattedDate(info.createTime as string)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src={info.coverImage || "/placeholder.svg"}
                  alt={info.title}
                  className="h-full"
                />
              </div>

              {/* Article Content */}
              <div className="richText prose prose-lg dark:prose-invert max-w-none">
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
                      const data = await doLikeFn(info.id);
                      if (likeRec) {
                        likeRec.likeStatus = data.likeStatus;
                        if (likeRec.likeStatus) info.likeCount++;
                        else info.likeCount--;
                      }
                    }}
                  >
                    <ThumbsUp
                      className={`h-4 w-4 ${
                        likeRec?.likeStatus ? "fill-chart-1 text-chart-1" : ""
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
                      const data = await doCollectFn(info.id);
                      if (collectRec) {
                        collectRec.collectStatus = data.collectStatus;
                        if (collectRec.collectStatus) info.collectCount++;
                        else info.collectCount--;
                      }
                    }}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        collectRec?.collectStatus
                          ? "fill-chart-4 text-chart-4"
                          : ""
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

              {/* 作者卡片 */}
              {/* <AuthorCard author={article.author} /> */}

              {/* Comments Section */}
              <CommentSection />
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Sidebar - 4 columns on desktop */}
        <div className="lg:col-span-4 space-y-8">
          {/* Sticky sidebar content */}
          <div className="sticky top-20 space-y-8">
            {/* Table of Contents */}
            {/* <ArticleTableOfContents toc={article.tableOfContents} /> */}

            {/* Related Articles */}
            <div className="space-y-4">
              <RelatedArticles />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
