"use client";
import { Button, Input } from "@nextui-org/react";
import { Grid, SearchIcon } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import PetCard from "./PetCard";
import { useGetAllPetsQuery } from "@/redux/features/pet/petApi";
import { TPet } from "@/globalInterface/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setQuery } from "@/redux/features/pet/petSlice";

const HomeLayout = () => {
  const query = useAppSelector((state) => state.pet.querys);
  const { data: pets, error } = useGetAllPetsQuery(query);
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  console.log(error);
  const onSubmit = (data: FieldValues) => {
    const { searchTerm, ...rest } = query;

    dispatch(setQuery({ ...data, ...rest }));
  };

  return (
    <div className="w-11/12 mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("searchTerm")}
          className=" mx-auto max-w-2xl my-10"
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
    </div>
  );
};

export default HomeLayout;
