import {  Image } from "@nextui-org/react";

const AdoptionTips = () => {
  const tips = [
    {
      title: "Consider Your Lifestyle",
      description:
        "Think about your daily routine and how a pet will fit into it. Different pets have different needs.",
      image:
        "https://res.cloudinary.com/dqbtjunza/image/upload/v1735040451/pet-lifestayl_v3bc38.jpg",
    },
    {
      title: "Research Breeds",
      description:
        "Research different breeds to find one that matches your lifestyle and personality.",
      image:
        "https://res.cloudinary.com/dqbtjunza/image/upload/v1735041015/breed_t1gyfu.jpg",
    },
    {
      title: "Prepare Your Home",
      description:
        "Make sure your home is pet-friendly and you have all the necessary supplies before bringing a pet home.",
      image:
        "https://res.cloudinary.com/dqbtjunza/image/upload/v1735041104/pet-home_hsmzut.jpg",
    },
    // Add more tips as needed
  ];

  return (
    <>
      <div className="py-10 bg-white dark:bg-gray-900">
        <div className="w-11/12 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
            Adoption Tips
          </h2>
          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-gray-100 w-11/12 mx-auto dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              >
                <Image
                  src={tip.image}
                  alt={tip.title}
                  className=" object-cover"
                />
                <div>
                  <h3 className="text-2xl font-semibold my-4 text-gray-900 dark:text-gray-100">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {tip.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdoptionTips;
