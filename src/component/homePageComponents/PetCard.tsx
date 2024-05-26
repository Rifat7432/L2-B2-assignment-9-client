"use client";
import { TPet } from "@/globalInterface/interface";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
} from "@nextui-org/react";

const PetCard = ({ pet }: { pet: TPet }) => {
  return (
    <Card className="py-4 px-2 xl:w-full w-80 mx-auto">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Name : {pet.name}</p>
        <small className="text-default-500">Age : {pet.age}</small>
        <h4 className="font-bold text-large">Breed : {pet.breed}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex-col items-center justify-center">
        <Image
          alt="Card background"
          className="object-cover w-full rounded-xl"
          src={pet.photos[0]}
        />
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-5">
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Location : {pet.location}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {pet.description.slice(0, 50)}...
            </h5>
            <Link href={`/pets/${pet.id}`}>See more...</Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
