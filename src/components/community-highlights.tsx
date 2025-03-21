import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Heart } from "lucide-react"

export default function CommunityHighlights() {
  const posts = [
    {
      id: 1,
      user: {
        name: "Jessica T.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Just found the perfect jeans after months of searching! Check out this brand if you're petite like me.",
      likes: 42,
      comments: 8,
      time: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Marcus W.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "What's everyone's thoughts on oversized blazers this season? Too much or just right?",
      likes: 37,
      comments: 15,
      time: "5 hours ago",
    },
    {
      id: 3,
      user: {
        name: "Sophia L.",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Just posted my spring capsule wardrobe in the wardrobe section. Would love your feedback!",
      likes: 64,
      comments: 11,
      time: "8 hours ago",
    },
  ]

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={post.user.avatar} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{post.user.name}</h4>
                  <span className="text-xs text-muted-foreground">{post.time}</span>
                </div>
                <p className="mt-1 mb-3">{post.content}</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1 text-sm">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

