import { Image } from "@nextui-org/react";


const WhyAdopt = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Adopt?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className=" mb-4">
              Adopting a pet saves lives. Millions of animals need loving homes,
              and by adopting, you’re giving a pet a second chance. Not only
              that, but you also help reduce overpopulation in shelters.
            </p>
            <p className=" mb-4">
              Adoption helps prevent unethical breeding practices and supports
              responsible pet ownership. Adopting a pet, especially one that may
              have faced challenges, creates a lifelong bond filled with love
              and loyalty.
            </p>
          </div>
          <div className="w-96 mx-auto">
            <Image
              src="https://res.cloudinary.com/dqbtjunza/image/upload/v1729260969/pet-img_hcmfih.jpg" // Free image from Pexels
            
              alt="Why Adopt"
              className="rounded-lg shadow-md "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
