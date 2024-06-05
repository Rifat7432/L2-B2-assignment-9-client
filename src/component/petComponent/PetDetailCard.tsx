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
  if (!user) {
    navigate.push("/login");
    toast.warning("Login First");
  }
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
        <Card className="py-6 px-12 md:w-2/4 xl:h-1/3 mx-auto my-20">
          <CardHeader className="pb-0 pt-2 px-4 flex-col sm:flex-row justify-around gap-4 items-start py-3">
            <div>
              <p className="capitalize font-semibold">Name : {pet.name}</p>
              <p className="capitalize font-semibold">Age : {pet.age}</p>
              <h4 className="capitalize font-semibold">Breed : {pet.breed}</h4>
            </div>
            <div>
              <p className="capitalize font-semibold">
                species : {pet.species}
              </p>
              <p className="capitalize font-semibold">size : {pet.size}</p>
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex-col items-center justify-center">
            <ImageSlider images={pet.photos}></ImageSlider>
          </CardBody>
          <CardFooter className="gap-3">
            <div className="flex gap-5">
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Location : {pet.location}
                </h4>
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Temperament : {pet.temperament}
                </h4>
                <h4>Medical History : {pet.medicalHistory}</h4>
                <h5 className="text-small tracking-tight text-default-400">
                  {pet.description}
                </h5>
              </div>
            </div>
          </CardFooter>
          {pet.status === "AVAILABLE" ? (
            <Button
              as={Link}
              color="primary"
              variant="flat"
              href={`/pets/adopt/${params.petId}`}
            >
              Adopt
            </Button>
          ) : (
            ""
          )}
        </Card>
      ) : (
        <p className="text-center mx-auto w-11/22 mt-20">Not Found</p>
      )}
    </>
  );
};

export default PetDetailCard;
