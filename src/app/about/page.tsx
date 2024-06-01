// pages/about.js

import { Image } from "@nextui-org/react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl text-gray-800 dark:text-gray-200">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mt-4">
            At Pet Adoption, our mission is to connect loving families with pets
            in need of a home. We believe every animal deserves a chance to live
            in a caring and nurturing environment. Our platform is designed to
            facilitate the adoption process, making it easier for people to find
            the perfect pet for their home.
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl text-gray-800 dark:text-gray-200">
            Meet the Team
          </h2>
          <div className="flex flex-wrap justify-center md:justify-between mt-4">
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg">
                <Image
                  src="https://i.ibb.co/MC7qcW1/1000011913-01.jpg"
                  alt="John Doe"
                  className="max-w-64 max-h-96 object-cover"
                />
                <h3 className="mt-4 text-xl text-gray-800 dark:text-gray-200">
                  John Doe
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Founder & CEO
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg">
                <Image
                  src="https://i.ibb.co/MC7qcW1/1000011913-01.jpg"
                  alt="Jane Smith"
                  className="max-w-64 max-h-96 object-cover"
                />
                <h3 className="mt-4 text-xl text-gray-800 dark:text-gray-200">
                  Jane Smith
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Lead Developer
                </p>
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 p-4">
              <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 shadow-md rounded-lg">
                <Image
                  src="https://i.ibb.co/MC7qcW1/1000011913-01.jpg"
                  alt="Sam Wilson"
                  className="max-w-64 max-h-96 object-cover"
                />
                <h3 className="mt-4 text-xl text-gray-800 dark:text-gray-200">
                  Sam Wilson
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Community Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
