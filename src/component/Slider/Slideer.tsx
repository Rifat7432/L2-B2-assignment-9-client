import { Example } from "./custom-slider";
import "./custom-slider.css";

const Slider = () => {
  const images: string[] = [
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735553531/cat-4778387_1920_w6gass.jpg",
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735553548/siamese-1611434_1920_feeh5e.jpg",
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735553544/bird-4161802_1920_oeiz4j.jpg",
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735553541/dog-5753302_1920_ia3dcr.jpg",
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735552882/login-page-image_iprwgc.png",
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735552878/login-page-img-cat_wizt2h.png",
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735552856/adoption-prosses_k4zzlq.jpg",
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735553527/evening-8429871_1920_qrbvup.jpg",
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735556484/cats-8105667_1920_sviz8h.jpg",
    "https://res.cloudinary.com/dqbtjunza/image/upload/v1735556487/european-shorthair-8330819_1920_n0fjfn.jpg",
  ];

  return (
    <div className="example-container">
      <Example images={images} />
    </div>
  );
};

export default Slider;
