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

export default function HomeCarousel() {
  const { data, isLoading } = useGetCarousel();
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full aspect-[5/2] mb-6 hidden md:block" />
      ) : (
        <Carousel
          className="w-full aspect-[5/2] mb-6 hidden md:block"
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
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent
                      className="flex flex-col p-4 relative text-white cursor-pointer"
                      onClick={() =>
                        _.outfitsId ? navigate(`/outfits/${_.outfitsId}`) : null
                      }
                    >
                      <img
                        src={_.CarouselImg}
                        className="w-auto aspect-[5/2] object-cover object-top rounded-lg"
                        alt="网络错误，未获取到图片"
                      />
                      <div className="absolute left-4 bottom-4 right-4 p-4 bg-black/50 rounded-b-lg">
                        <h1 className="text-2xl font-bold mb-2">{_.title}</h1>
                        <p className="text-sm">{_.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
}
