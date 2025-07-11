import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCarousel } from "@/services/home";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

interface props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export default function HomeCarousel({ className }: props) {
  const { data, isLoading } = useGetCarousel();
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full aspect-[4/3] hidden md:block" />
      ) : (
        <Carousel
          className={`${className} hidden md:block`}
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {data?.map((_, index) => (
              <CarouselItem key={index} className="h-full">
                <Card>
                  <CardContent className="p-3 relative text-white">
                    <img loading="lazy" 
                      src={_.CarouselImg}
                      className="rounded-lg object-cover aspect-[4/3]"
                      alt="网络错误，未获取到图片"
                    />
                    <div
                      onClick={() =>
                        _.outfitsId ? navigate(`/outfits/${_.outfitsId}`) : null
                      }
                      className=" cursor-pointer absolute left-4 bottom-4 right-4 p-4 bg-black/50 rounded-b-lg"
                    >
                      <h1 className="text-2xl font-bold mb-2">{_.title}</h1>
                      <p className="text-sm">{_.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-6 " />
          <CarouselNext className="right-6 " />
        </Carousel>
      )}
    </>
  );
}
