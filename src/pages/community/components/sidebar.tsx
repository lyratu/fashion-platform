import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router";
import { useGetActiveUser, useGetTrend } from "@/services/community";
import { Ribbon } from "lucide-react";

interface props extends React.HTMLAttributes<HTMLDivElement> {
  setTopic: React.Dispatch<React.SetStateAction<string>>;
}
export const Sidebar: React.FC<props> = ({ setTopic }) => {
  const { data } = useGetActiveUser();
  const { data: trend } = useGetTrend();
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-80  ">
      <div className="space-y-4 sticky top-20 ">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-medium">流行趋势</h2>
          </CardHeader>
          <CardContent className="pb-3">
            <ul className="space-y-2">
              {trend?.length &&
                trend?.map((item) => (
                  <li key={item.id}>
                    <Link
                      to="#"
                      onClick={() => setTopic(item.name)}
                      className="text-[#1d9bf0] hover:underline "
                    >
                      #{item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {item.postCount} 篇
                    </p>
                  </li>
                ))}
            </ul>
            {trend?.length ? "" : <div>暂无流行话题</div>}
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
                  <Avatar
                    className=" cursor-pointer"
                    onClick={() =>
                      navigate(`/profile/${info.user.nickName}`, {
                        state: {
                          userId: info.userId,
                        },
                      })
                    }
                  >
                    <AvatarImage
                      src={info.user.avatarUrl}
                      alt="Jessica T."
                      className=" object-contain"
                    />
                    <AvatarFallback>
                      {info.user.nickName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p
                      className="font-medium hover:underline cursor-pointer"
                      onClick={() =>
                        navigate(`/profile/${info.user.nickName}`, {
                          state: {
                            userId: info.userId,
                          },
                        })
                      }
                    >
                      {info.user.nickName}
                    </p>
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
              {data?.length ? "" : <div>暂无活跃用户</div>}
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
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
