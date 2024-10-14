"use client";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import PetCard from "./PetCard";
import { useGetAllPetsQuery } from "@/redux/features/pet/petApi";
import { TPet } from "@/globalInterface/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setQuery, TQuery } from "@/redux/features/pet/petSlice";
import SuccessStories from "./SuccessStories";
import AdoptionTips from "./AdoptionTips";
import Slider from "../Slider/Slideer";
import { removeDuplicates } from "@/utils/removeDublicat";

const HomeLayout = () => {
  const query = useAppSelector((state) => state.pet.querys);
  const { data: pets, isLoading } = useGetAllPetsQuery(query);
  const { data: petsQuery } = useGetAllPetsQuery({});
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
  const filteredArraySize: string[] = removeDuplicates(
    petsQuery?.data.map((element: TPet) => element.size)
  );
  const filteredArraySpecies: string[] = removeDuplicates(
    petsQuery?.data.map((element: TPet) => element.species)
  );
  //   console.log(filteredArray);
  const species = filteredArraySpecies.map((species: string) => {
    return { key: species, label: species.toUpperCase() };
  });
  const sizes = filteredArraySize.map((size: string) => {
    return { key: size, label: size.toUpperCase() };
  });
  const handleProvinceChange = (element: TQuery) => {
      const { searchTerm, gender, species, size } = query;
    if (element?.gender) {
      dispatch(
        setQuery({
          searchTerm,
          gender: element?.gender,
          species,
          size,
        })
      );
    }
    if (element?.gender === "") {
      dispatch(
        setQuery({
          searchTerm,
          species,
          size,
        })
      );
    }
    if (element?.species) {
      dispatch(
        setQuery({
          searchTerm,
          species: element?.species,
          size,
          gender,
        })
      );
    }
    if (element?.species === "") {
      dispatch(
        setQuery({
          searchTerm,
          size,
          gender,
        })
      );
    }
    if (element?.size) {
      dispatch(
        setQuery({
          searchTerm,
          size: element?.size,
          species,
          gender,
        })
      );
    }
    if (element?.size === "") {
      dispatch(
        setQuery({
          searchTerm,
          species,
          gender,
        })
      );
    }
  };
  return (
    <div className="w-full mx-auto">
      <div className="w-11/12 mx-auto my-10 rounded-xl">
        <Slider pets={pets?.data}></Slider>
      </div>

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
      <div className="w-11/12 mx-auto my-5 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        <Select
          size={"lg"}
          label="Pet Species"
          placeholder="Select a species"
          className="max-w-xs"
          onChange={(e) => handleProvinceChange({ species: e.target.value })}
        >
          {species.map((species: { key: string; label: string }) => (
            <SelectItem key={species.key}>{species.label}</SelectItem>
          ))}
        </Select>
        <Select
          size={"lg"}
          label="Pet Gender"
          placeholder="Select a gender"
          className="max-w-xs"
          onChange={(e) => handleProvinceChange({ gender: e.target.value })}
        >
          <SelectItem key={"MALE"}>{"Male"}</SelectItem>
          <SelectItem key={"FEMALE"}>{"Female"}</SelectItem>
        </Select>
        <Select
          size={"lg"}
          label="Pet Size"
          placeholder="Select a size"
          className="max-w-xs"
          onChange={(e) => handleProvinceChange({ size: e.target.value })}
        >
          {sizes.map((size: { key: string; label: string }) => (
            <SelectItem key={size.key}>{size.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 sm:grid-cols-1 gap-6 w-11/12 mx-auto my-10">
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
