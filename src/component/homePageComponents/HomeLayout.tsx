"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import PetCard from "./PetCard";
import { useGetAllPetsQuery } from "@/redux/features/pet/petApi";
import { TPet } from "@/globalInterface/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setQuery } from "@/redux/features/pet/petSlice";
import SuccessStories from "./SuccessStories";
import AdoptionTips from "./AdoptionTips";

const HomeLayout = () => {
  const query = useAppSelector((state) => state.pet.querys);
  const { data: pets, isLoading } = useGetAllPetsQuery(query);
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const onSubmit = (data: FieldValues) => {
    const { searchTerm, ...rest } = query;
    dispatch(setQuery({ ...data, ...rest }));
  };
  if (isLoading) {
    return (
      <div className="w-[90%] mt-96 mx-auto flex flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  return (
    <div className="w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("searchTerm")}
          className=" mx-auto max-w-2xl my-10 w-11/12"
          color="primary"
          radius="lg"
          label="Search"
          variant="bordered"
          placeholder="Type to search..."
          endContent={
            <Button
              className="focus:outline-none"
              color="primary"
              variant="light"
              type="submit"
            >
              <SearchIcon className="text-2xl text-default-400 pointer-events-none" />
            </Button>
          }
        />
      </form>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 gap-6 w-11/12 mx-auto">
        {pets?.data.map((pet: TPet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
      <SuccessStories />
      <AdoptionTips />
    </div>
  );
};

export default HomeLayout;
