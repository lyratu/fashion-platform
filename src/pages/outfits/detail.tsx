import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { ArticleProgress } from "./components/article-progress";
import { ArticleTableOfContents } from "./components/article-table-of-contents";
import { RelatedArticles } from "./components/related-articles";
import { CommentSection } from "./components/comment-section";
import { AuthorCard } from "./components/author-card";
import { useParams } from "react-router";
import { useGetOutfitsDet } from "@/services/outfits";
import dateTool from "@/utils/dateTool";

// Mock data for the article
const getArticle = (id: string) => {
  // In a real app, this would fetch from an API
  const articles = {
    "1": {
      id: "1",
      title: "The Evolution of Sustainable Fashion: From Niche to Necessity",
      subtitle: "How eco-conscious practices are reshaping the industry",
      slug: "evolution-sustainable-fashion",
      author: {
        name: "Emma Richardson",
        role: "Fashion Editor",
        avatar: "/placeholder.svg?height=80&width=80",
        bio: "Emma has been covering sustainable fashion for over a decade. She holds a degree in Environmental Science and Fashion Design from Central Saint Martins.",
      },
      publishedAt: "2023-09-15T10:30:00Z",
      updatedAt: "2023-09-18T14:20:00Z",
      readingTime: 8,
      viewCount: 4328,
      likeCount: 287,
      commentCount: 42,
      bookmarkCount: 156,
      category: "Sustainability",
      tags: [
        "sustainable fashion",
        "eco-friendly",
        "ethical clothing",
        "fashion industry",
        "green fashion",
      ],
      coverImage: "/placeholder.svg?height=600&width=1200",
      excerpt:
        "The fashion industry is undergoing a profound transformation as sustainability moves from a marketing buzzword to an essential business practice. This article explores how brands are adapting to consumer demands for ethical and eco-friendly fashion.",
      content: `
## Introduction

The fashion industry has long been associated with excess, waste, and environmental harm. From water pollution caused by textile dyeing to the mountains of discarded clothing in landfills, the environmental footprint of fashion is undeniable. However, a significant shift is occurring as consumers become more environmentally conscious and demand better practices from the brands they support.

## The Rise of Conscious Consumerism

Today's fashion consumers are more informed than ever before. With information readily available about supply chains, manufacturing processes, and environmental impacts, shoppers are making more deliberate choices. Studies show that 73% of millennials are willing to pay more for sustainable products, a trend that brands can no longer ignore.

> "Sustainability is no longer a nice-to-have but a business imperative. Brands that fail to adapt will struggle to remain relevant in the coming decade." - Stella McCartney

## Innovative Materials Leading the Way

One of the most exciting developments in sustainable fashion is the innovation in materials. From fabrics made from recycled ocean plastic to vegan leather alternatives derived from mushrooms, pineapple leaves, and apple waste, the possibilities are expanding rapidly.

### Breakthrough Sustainable Materials:

1. **Piñatex**: Made from pineapple leaf fibers, this leather alternative utilizes agricultural waste that would otherwise be discarded.
2. **Econyl**: A regenerated nylon made from fishing nets and other nylon waste recovered from oceans.
3. **Mylo**: A leather-like material made from mycelium, the root structure of mushrooms.
4. **S.Cafe**: A yarn created from recycled coffee grounds with natural odor-controlling properties.

## Circular Fashion: Rethinking the Lifecycle

The concept of circular fashion is challenging the traditional linear model of "take, make, dispose." Instead, it promotes a system where clothes, shoes, and accessories are designed, sourced, produced, and provided with the intention to be used and circulated responsibly for as long as possible.

### Key Principles of Circular Fashion:

- Design for longevity and recyclability
- Use of renewable resources and energy
- Elimination of toxic chemicals and microfiber release
- Resource efficiency and waste reduction
- Extended producer responsibility

## The Role of Technology in Sustainable Fashion

Technology is playing a crucial role in advancing sustainable practices across the fashion industry. From blockchain for supply chain transparency to AI-powered design tools that reduce waste, innovation is helping brands meet their sustainability goals.

### Technological Innovations:

- **3D sampling**: Reducing the need for physical samples, saving materials and shipping emissions
- **Blockchain tracking**: Providing verifiable information about a garment's journey from raw material to finished product
- **AI-powered inventory management**: Helping brands produce more accurately to demand, reducing overproduction
- **Digital fashion**: Virtual clothing that exists only in digital spaces, eliminating physical resources entirely

## Fast Fashion's Sustainable Makeover

Even fast fashion giants are feeling the pressure to change. Companies like H&M and Zara have launched conscious collections and recycling initiatives, though critics argue these efforts don't address the fundamental issue of overproduction.

## The Future of Sustainable Fashion

As we look ahead, several trends are likely to shape the future of sustainable fashion:

1. **Rental and resale markets** will continue to grow, extending the lifecycle of garments
2. **Localized production** will reduce shipping emissions and support local economies
3. **Biodegradable and compostable materials** will become more mainstream
4. **Transparency** will be expected, not exceptional
5. **Regenerative practices** that actually improve the environment, rather than just reducing harm

## Conclusion

The evolution of sustainable fashion from niche to necessity represents a fundamental shift in how we produce, consume, and dispose of clothing. While challenges remain, the momentum toward a more sustainable fashion industry is undeniable. As consumers continue to demand better practices and innovative solutions emerge, the future of fashion looks not only more sustainable but more creative and diverse than ever before.
      `,
      tableOfContents: [
        { id: "introduction", title: "Introduction", level: 2 },
        {
          id: "the-rise-of-conscious-consumerism",
          title: "The Rise of Conscious Consumerism",
          level: 2,
        },
        {
          id: "innovative-materials-leading-the-way",
          title: "Innovative Materials Leading the Way",
          level: 2,
        },
        {
          id: "breakthrough-sustainable-materials",
          title: "Breakthrough Sustainable Materials",
          level: 3,
        },
        {
          id: "circular-fashion-rethinking-the-lifecycle",
          title: "Circular Fashion: Rethinking the Lifecycle",
          level: 2,
        },
        {
          id: "key-principles-of-circular-fashion",
          title: "Key Principles of Circular Fashion",
          level: 3,
        },
        {
          id: "the-role-of-technology-in-sustainable-fashion",
          title: "The Role of Technology in Sustainable Fashion",
          level: 2,
        },
        {
          id: "technological-innovations",
          title: "Technological Innovations",
          level: 3,
        },
        {
          id: "fast-fashions-sustainable-makeover",
          title: "Fast Fashion's Sustainable Makeover",
          level: 2,
        },
        {
          id: "the-future-of-sustainable-fashion",
          title: "The Future of Sustainable Fashion",
          level: 2,
        },
        { id: "conclusion", title: "Conclusion", level: 2 },
      ],
      relatedArticles: [
        {
          id: "2",
          title: "10 Sustainable Fashion Brands Redefining Luxury",
          excerpt:
            "Discover the innovative brands that are proving sustainability and luxury can go hand in hand.",
          coverImage: "/placeholder.svg?height=300&width=500",
          author: "James Wilson",
          publishedAt: "2023-08-22T09:15:00Z",
          category: "Brands",
          readingTime: 6,
        },
        {
          id: "3",
          title: "How to Build a Sustainable Capsule Wardrobe",
          excerpt:
            "Practical tips for creating a versatile, eco-friendly wardrobe that stands the test of time.",
          coverImage: "/placeholder.svg?height=300&width=500",
          author: "Sophia Chen",
          publishedAt: "2023-09-05T11:45:00Z",
          category: "Style Guide",
          readingTime: 5,
        },
        {
          id: "4",
          title:
            "The True Cost of Fast Fashion: Environmental and Social Impact",
          excerpt:
            "An in-depth look at the hidden costs behind those $5 t-shirts and what it means for our planet.",
          coverImage: "/placeholder.svg?height=300&width=500",
          author: "Michael Rodriguez",
          publishedAt: "2023-07-18T14:30:00Z",
          category: "Industry Analysis",
          readingTime: 10,
        },
      ],
      comments: [
        {
          id: "c1",
          author: {
            name: "Olivia Parker",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content:
            "This article really opened my eyes to the innovations happening in sustainable materials. I had no idea mushrooms could be used to create leather alternatives!",
          publishedAt: "2023-09-16T08:45:00Z",
          likeCount: 12,
        },
        {
          id: "c2",
          author: {
            name: "Daniel Kim",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content:
            "I appreciate the balanced perspective here. It's important to acknowledge that even fast fashion brands are making some efforts, while also recognizing that much more needs to be done.",
          publishedAt: "2023-09-16T14:20:00Z",
          likeCount: 8,
        },
        {
          id: "c3",
          author: {
            name: "Aisha Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
          },
          content:
            "The section on circular fashion was particularly insightful. I've been trying to shop more consciously, and understanding these principles helps guide my decisions.",
          publishedAt: "2023-09-17T11:05:00Z",
          likeCount: 15,
        },
      ],
    },
  };

  return articles[id] || null;
};

export default function ArticlePage() {
  // const [searchParams] = useSearchParams();
  const article = getArticle("1");
  const { id } = useParams();

  const { data: info } = useGetOutfitsDet(id as string);

  return (
    <>
      <ArticleProgress />
      <div className="container max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - 8 columns on desktop */}
        <div className="lg:col-span-8">
          <article className="space-y-8">
            {/* Article Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-primary/10 hover:bg-primary/20"
                >
                  {info?.category}
                </Badge>
                {/* <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{article.readingTime} min read</span>
                </div> */}
              </div>

              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                {info?.title}
              </h1>

              <p className="text-xl text-muted-foreground">
                {info?.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={info?.user.avatarUrl}
                      alt={info?.user.nickName}
                    />
                    <AvatarFallback>
                      {info?.user.nickName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{info?.user.nickName}</p>
                    <p className="text-xs text-muted-foreground">
                      {info?.user.position}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {dateTool.formattedDate(info?.createTime as string)}
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={info?.coverImage || "/placeholder.svg"}
                alt={info?.title}
                className="h-full"
              />
            </div>

            {/* Article Stats */}
            <div className="flex items-center justify-between border-y py-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {article.viewCount}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {article.likeCount}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {article.commentCount}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Bookmark className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {article.bookmarkCount}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bookmark className="h-4 w-4" />
                  <span className="sr-only">Bookmark</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: info?.content as string,
                }}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Author Card */}
            <AuthorCard author={article.author} />

            {/* Comments Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold tracking-tight">
                Comments ({article.commentCount})
              </h2>
              <CommentSection comments={article.comments} />
            </div>
          </article>
        </div>

        {/* Sidebar - 4 columns on desktop */}
        <div className="lg:col-span-4 space-y-8">
          {/* Sticky sidebar content */}
          <div className="sticky top-20 space-y-8">
            {/* Table of Contents */}
            {/* <ArticleTableOfContents toc={article.tableOfContents} /> */}

            {/* Related Articles */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight">相关文章</h3>
              <RelatedArticles articles={article.relatedArticles} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
