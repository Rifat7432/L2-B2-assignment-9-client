"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import adoptionImage from "@/assets/adoption-prosses.png";
import Image from "next/image";
const AdoptionTips = () => {
  const tips = [
    {
      title: "Consider Your Lifestyle",
      description:
        "Think about your daily routine and how a pet will fit into it. Different pets have different needs.",
    },
    {
      title: "Choose the Right Pet",
      description:
        "Research various pet breeds and species to find one that matches your personality, space, and energy level.",
    },
    {
      title: "Provide Proper Nutrition",
      description:
        "Ensure your pet has a balanced diet appropriate for their species, age, and health requirements.",
    },
    {
      title: "Schedule Regular Vet Visits",
      description:
        "Regular check-ups help maintain your pet's health and catch any potential issues early.",
    },
    {
      title: "Create a Safe Environment",
      description:
        "Pet-proof your home to prevent accidents, and provide a designated area for your pet to rest and play.",
    },
    {
      title: "Invest in Training and Socialization",
      description:
        "Teach your pet basic commands and expose them to different environments and people to improve their behavior.",
    },
    {
      title: "Provide Mental and Physical Stimulation",
      description:
        "Engage your pet with toys, games, and exercise to keep them happy and healthy.",
    },
    {
      title: "Show Love and Patience",
      description:
        "Build a bond with your pet through affection and understanding. Patience is key, especially during training.",
    },
    {
      title: "Understand Lifelong Commitment",
      description:
        "Be prepared for the long-term responsibilities of owning a pet, including time, effort, and financial costs.",
    },
  ];

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Tips For Rising A Pet
      </h2>
      <div className=" grid sm:grid-cols-2 w-11/12 mx-auto gap-4">
        <div className="relative h-[640px]">
          <Image
            src={adoptionImage}
            alt="adoption image"
            width={640}
            height={640}
            className="h-full w-full rounded-xl"
          />
        </div>
        <div className="flex items-center">
          <Accordion defaultExpandedKeys={["0"]}>
            {tips.map((tip, index) => (
              <AccordionItem
                key={index}
                aria-label={tip.title}
                title={tip.title}
              >
                {tip.description}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AdoptionTips;
