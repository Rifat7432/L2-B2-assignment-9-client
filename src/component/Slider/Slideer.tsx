
import { TPet } from "@/globalInterface/interface";
import { Example } from "./custom-slider";
import "./custom-slider.css"
const Slider = ({ pets }: { pets: TPet[] }) => {
  const images:string[] = [];
  if (pets.length > 0) {
    pets.forEach((pet) => {
      pet.photos.forEach((img) => images.push(img));
    });
  }
  return (
    <div className="example-container">
    <Example images={images} />
  </div>
  );
};

export default Slider;
