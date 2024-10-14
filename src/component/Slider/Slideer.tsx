import Image from "next/image";
import CustomCarousel from "./custom-slider";
import { TPet } from "@/globalInterface/interface";

const Slider = ({ pets }: { pets: TPet[] }) => {
  const images: {
    imgURL: string;
    imgAlt: string;
  }[] = [];
  if (pets.length > 0) {
    pets.forEach((pet) => {
      pet.photos.forEach((img) => images.push({ imgAlt: img, imgURL: img }));
    });
  }
  return (
    <div className="max-w-[1200px] mx-auto">
      <CustomCarousel>
        {images.map((image, index) => {
          return (
            <Image
              key={index}
              src={image.imgURL}
              className="object-fill rounded-xl"
              width={500}
              height={500}
              priority
              alt={image.imgAlt}
            />
          );
        })}
      </CustomCarousel>
    </div>
  );
};

export default Slider;
