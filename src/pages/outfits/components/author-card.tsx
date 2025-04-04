import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Author {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          <Avatar className="h-20 w-20">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="text-2xl">
              {author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold">{author.name}</h3>
            <p className="text-sm text-muted-foreground select-none mb-2">{author.role}</p>
            <p className="text-sm mb-4">{author.bio}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <Button variant="outline" size="sm">
                Follow
              </Button>
              <Button variant="outline" size="sm">
                View All Articles
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
