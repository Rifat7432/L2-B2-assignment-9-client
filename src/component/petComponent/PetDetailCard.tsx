"use client";

import { TPet } from "@/globalInterface/interface";
import { useGetPetQuery } from "@/redux/features/pet/petApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
  Spinner,
} from "@nextui-org/react";
import ImageSlider from "./PetSlider";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/hooks";
import { toast } from "sonner";

const PetDetailCard = ({ params }: { params: { petId: string } }) => {
  const navigate = useRouter();
  const { data, isLoading } = useGetPetQuery(params.petId);
  const user = useAppSelector((state) => state.auth.user);
  if (isLoading) {
    return (
      <div className="w-[90%] mt-96 mx-auto flex flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const pet: TPet = data?.data;
  return (
    <>
      {pet ? (
        <Card className="py-6 px-12 w-11/12 mx-auto my-20 grid grid-cols-1 lg:grid-cols-2">
          <CardHeader className="overflow-visible py-2 flex-col items-center justify-center">
            <ImageSlider images={pet.photos}></ImageSlider>
          </CardHeader>
          <CardBody>
            <div className="py-5 px-4 flex flex-col sm:flex-row justify-between gap-4 items-start">
              <div>
                <p className="capitalize font-semibold">Name : {pet.name}</p>
                <p className="capitalize font-semibold">Age : {pet.age}</p>
                <h4 className="capitalize font-semibold">
                  Breed : {pet.breed}
                </h4>
              </div>
              <div>
                <p className="capitalize font-semibold">
                  species : {pet.species}
                </p>
                <p className="capitalize font-semibold">size : {pet.size}</p>
              </div>
            </div>

            <div className="flex px-4 items-center justify-between">
              <div>
                <h4 className="text-small font-semibold leading-none text-default-600 py-1">
                  Location : {pet.location}
                </h4>
                <h4 className="text-small font-semibold leading-none text-default-600 py-1">
                  Temperament : {pet.temperament}
                </h4>
              </div>
              <h4 className="py-1">Medical History : {pet.medicalHistory}</h4>
            </div>
            {pet.status === "AVAILABLE" ? (
              <Button
                as={Link}
                color="primary"
                variant="flat"
                href={`/pets/adopt/${params.petId}`}
                disabled={user ? false : true}
                className="mt-5 w-11/12"
              >
                Adopt
              </Button>
            ) : (
              ""
            )} 
           
            <h5 className="text-small tracking-tight text-default-400 py-2 px-4">
              {pet.description}
            </h5>
           
            
          </CardBody>
        </Card>
      ) : (
        <p className="text-center mx-auto w-11/22 mt-20">Not Found</p>
      )}
    </>
  );
};

export default PetDetailCard;
