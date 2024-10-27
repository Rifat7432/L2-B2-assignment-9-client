import { Image } from "@nextui-org/react";

const SuccessStories = () => {
  const testimonials = [
    {
      name: "John Doe",
      story:
        "Adopting Max was the best decision I ever made. He's a wonderful companion and brings so much joy to my life.",
      image: "https://i.ibb.co/JswfHyT/download-3.jpg",
    },
    {
      name: "Jane Smith",
      story:
        "Luna has been a great addition to our family. She's playful, loving, and fits right in with our lifestyle.",
      image: "https://i.ibb.co/fDwj3bd/images.jpg",
    },
    {
      name: "Alice Johnson",
      story:
        "Bringing Bella into our home was a life-changing experience. She's not just a pet; she's a part of our family.",
      image: "https://i.ibb.co/JswfHyT/download-3.jpg",
    },
  ];

  return (
    <div className="py-10 w-full bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Success Stories
        </h2>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white w-11/12 mx-auto dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
                />
              </div>

              <h3 className="text-xl font-semibold text-center mb-2 text-gray-900 dark:text-gray-100">
                {testimonial.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                {testimonial.story}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
