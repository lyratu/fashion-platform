import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";

export const Sidebar = () => {
  return (
    <div className="w-full md:w-80 space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">流行趋势</h2>
        </CardHeader>
        <CardContent className="pb-3">
          <ul className="space-y-2">
            <li>
              <Link to="#" className="text-primary hover:underline">
                #可持续时尚
              </Link>
              <p className="text-xs text-muted-foreground">1.2k 篇</p>
            </li>
            <li>
              <Link to="#" className="text-primary hover:underline">
                #春季穿搭
              </Link>
              <p className="text-xs text-muted-foreground">856 篇</p>
            </li>
            <li>
              <Link to="#" className="text-primary hover:underline">
                #简洁风
              </Link>
              <p className="text-xs text-muted-foreground">723 篇</p>
            </li>
            <li>
              <Link to="#" className="text-primary hover:underline">
                #田园风
              </Link>
              <p className="text-xs text-muted-foreground">689 篇</p>
            </li>
            <li>
              <Link to="#" className="text-primary hover:underline">
                #搭配指南
              </Link>
              <p className="text-xs text-muted-foreground">542 篇</p>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">活跃用户</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Jessica T."
                />
                <AvatarFallback>JT</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">皇上</p>
                <p className="text-xs text-muted-foreground">@jesstylist</p>
              </div>
              {/* <Button variant="outline" size="sm" className="ml-auto">
                    关注
                  </Button> */}
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Marcus W."
                />
                <AvatarFallback>MW</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">壬氏</p>
                <p className="text-xs text-muted-foreground">@marcstyle</p>
              </div>
              {/* <Button variant="outline" size="sm" className="ml-auto">
                    Follow
                  </Button> */}
            </div>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Sophia L."
                />
                <AvatarFallback>SL</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">猫猫</p>
                <p className="text-xs text-muted-foreground">@sophialooks</p>
              </div>
              {/* <Button variant="outline" size="sm" className="ml-auto">
                    Follow
                  </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">社区指南</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>尊重和支持他人</li>
            <li>没有垃圾邮件或自我宣传</li>
            <li>信用原始内容创作者</li>
            <li>继续讨论与时尚相关的</li>
            <li>报告不适当的内容</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
