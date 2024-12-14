import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SinglePropertyImageCarousel = ({ images = [] }) => {
  return (
    <div className="w-full flex justify-center ml-2">
      <Carousel className="w-full">
        <CarouselContent className="w-full">
          {images.map((image, index) => (
            <CarouselItem key={index} className="flex justify-center">
              <img
                src={image}
                alt={`Property Image ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 z-10 top-1/2 transform -translate-y-1/2 text-white" />
        <CarouselNext className="absolute right-0 z-10 top-1/2 transform -translate-y-1/2 text-white" />
      </Carousel>
    </div>
  );
};

export default SinglePropertyImageCarousel;
