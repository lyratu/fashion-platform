import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router";
import { useGetActiveUser } from "@/services/community";
import { Ribbon } from "lucide-react";

export const Sidebar = () => {
  const { data } = useGetActiveUser();
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
            {data?.map((info, index) => (
              <div className="flex items-center gap-3" key={index}>
                <Avatar>
                  <AvatarImage src={info.user.avatarUrl} alt="Jessica T." />
                  <AvatarFallback>
                    {info.user.nickName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{info.user.nickName}</p>
                  {info.user.position && (
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Ribbon className="w-3 mr-1" />
                      <span>{info.user.position}</span>
                    </p>
                  )}
                </div>
                {/* <Button variant="outline" size="sm" className="ml-auto">
                    关注
                  </Button> */}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className=" select-none">
        <CardHeader>
          <h2 className="text-lg font-medium">社区指南</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>尊重互动</strong> - 保持友善，支持不同观点
            </li>
            <li>
              <strong>内容纯净</strong> - 禁止广告/自我推广
            </li>
            <li>
              <strong>版权保护</strong> - 转载必须标明原作者
            </li>
            <li>
              <strong>专注领域</strong> - 讨论需围绕时尚主题
            </li>
            <li>
              <strong>共建安全环境</strong> - 发现违规内容立即举报
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
