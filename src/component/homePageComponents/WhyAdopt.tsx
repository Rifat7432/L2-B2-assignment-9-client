import Image from "next/image";

const WhyAdopt = () => {
  return (
    <section className="py-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Why Adopt?</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
          <div className=" h-48 justify-center flex">
            <Image
              src="https://res.cloudinary.com/dqbtjunza/image/upload/v1735553531/cat-4778387_1920_w6gass.jpg"
              alt="Why Adopt"
              className="rounded-lg shadow-md h-48"
              width={500}
              height={192}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
