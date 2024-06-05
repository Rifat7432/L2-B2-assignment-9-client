const AdoptionTips = () => {
  const tips = [
    {
      title: "Consider Your Lifestyle",
      description:
        "Think about your daily routine and how a pet will fit into it. Different pets have different needs.",
    },
    {
      title: "Research Breeds",
      description:
        "Research different breeds to find one that matches your lifestyle and personality.",
    },
    {
      title: "Prepare Your Home",
      description:
        "Make sure your home is pet-friendly and you have all the necessary supplies before bringing a pet home.",
    },
    // Add more tips as needed
  ];

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Adoption Tips
        </h2>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-gray-100 w-11/12 mx-auto dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {tip.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdoptionTips;
