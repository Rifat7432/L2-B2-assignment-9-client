"use client";

import { TPet } from "@/globalInterface/interface";
import {
  useGetAllPetsQuery,
  useGetPetQuery,
} from "@/redux/features/pet/petApi";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Link,
  Spinner,
} from "@nextui-org/react";
import ImageSlider from "./PetSlider";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setOtherQuery } from "@/redux/features/pet/petSlice";
import { useEffect } from "react";

const PetDetailCard = ({ params }: { params: { petId: string } }) => {
  const query = useAppSelector((state) => state.pet.otherQuery);
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetPetQuery(params.petId);
  const { data: pets, isLoading: allPetsLoading } = useGetAllPetsQuery(query);
  const user = useAppSelector((state) => state.auth.user);
  if (isLoading || allPetsLoading) {
    return (
      <div className="w-[90%] mt-96 mx-auto flex flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const pet: TPet = data?.data;
  const otherPets = pets?.data.filter(
    (otherPet: TPet) => otherPet.id !== pet.id
  );

  return (
    <>
      {pet ? (
        <div>
          <Card className="py-6 px-12 w-11/12 mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2">
            <CardHeader className="overflow-visible py-2 flex-col items-center justify-center">
              <ImageSlider images={pet.photos}></ImageSlider>
            </CardHeader>
            <CardBody>
              <div>
                <p className="capitalize font-semibold text-2xl sm:text-4xl">
                  Name : {pet.name}
                </p>
              </div>
              <div className="py-5 px-4 flex flex-col sm:flex-row justify-between gap-4 items-start">
                <div>
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
              <div className="flex px-4 sm:flex-row flex-col items-start justify-between">
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
                  isDisabled={user === null}
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
          {otherPets.length > 0 ? (
            otherPets.map((pet: TPet) => (
              <div
                key={pet.id}
                className="flex flex-col sm:flex-row dark:bg-slate-800 justify-start  shadow-lg rounded-lg w-11/12 mx-auto my-5 px-6 gap-x-6 h-52 max-w-[1000px] items-center capitalize"
              >
                <div className="h-44 overflow-hidden">
                  <Image
                    alt="Album cover"
                    className="object-cover h-44"
                    shadow="md"
                    src={pet.photos[0]}
                  />
                </div>
                <div>
                  <div>
                    <Link
                      href={`/pets/${pet.id}`}
                      color="foreground"
                      underline="hover"
                      className="text-2xl font-semibold
                "
                    >
                      {pet.name}
                    </Link>
                  </div>

                  <div className="flex gap-x-6 text-small ">
                    <h2>Age : {pet.age}</h2>
                    <h2>Breed : {pet.breed}</h2>
                    <h2>Species : {pet.species}</h2>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center sm:text-4xl text-xl mx-auto w-11/22 mt-28">
              No similar Pet Found
            </p>
          )}
        </div>
      ) : (
        <p className="text-center mx-auto w-11/22 mt-20">Not Found</p>
      )}
    </>
  );
};

export default PetDetailCard;
