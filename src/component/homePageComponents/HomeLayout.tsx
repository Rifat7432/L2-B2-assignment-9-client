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
import WhyAdopt from "./WhyAdopt";
import AdoptionProcessOverview from "./AdoptionProcess";
import SaveAnAnimal from "./SaveAnAnimal";
import ServicesSection from "./services-section";

const HomeLayout = () => {
  const query = useAppSelector((state) => state.pet.querys);
  const { data: pets, isLoading,error } = useGetAllPetsQuery(query);
  const { data: petsQuery, isLoading: isQueryLoading } = useGetAllPetsQuery({});
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const onSubmit = (data: FieldValues) => {
    const { searchTerm, ...rest } = query;
    dispatch(setQuery({ ...data, ...rest }));
  };
  if (isLoading || isQueryLoading) {
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
  console.log(pets,error);
  return (
    <div className="w-full mx-auto">
      <div className="w-full mx-auto relative mb-5">
        <div className="">
          <Slider></Slider>
        </div>
        <div className=" gap-4 w-3/5 mx-auto sm:w-[85%] absolute rounded-xl z-30 left-[5%]  right-[5%] top-[10%] p-4  text-center">
          <div className="w-full mb-10">
            <h2 className="font-bold text-white text-2xl md:text-5xl">
              Find Your Perfect Companion
            </h2>
            <p className="font-medium w-full my-4 text-white text-md md:text-xl">
              Find and Welcome Home a New Friend.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center bg-[#ecf0f0] rounded-lg p-5">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <Input
                {...register("searchTerm")}
                className="max-w-4xl w-full mx-auto"
                
                radius="sm"
                label="Search"
                placeholder="Type to search pets by age, breed and location"
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
            <div className="flex flex-wrap sm:flex-nowrap gap-4 w-full md:w-3/4 mt-2">
              <Select
                size={"sm"}
                label="Pet Species"
                placeholder="Select a species"
                //   className="md:max-w-xs w-full"
                onChange={(e) =>
                  handleProvinceChange({ species: e.target.value })
                }
              >
                {species.map((species: { key: string; label: string }) => (
                  <SelectItem key={species.key}>{species.label}</SelectItem>
                ))}
              </Select>
              <Select
                size={"sm"}
                label="Pet Gender"
                placeholder="Select a gender"
                //   className="md:max-w-xs w-full"
                onChange={(e) =>
                  handleProvinceChange({ gender: e.target.value })
                }
              >
                <SelectItem key={"MALE"}>{"Male"}</SelectItem>
                <SelectItem key={"FEMALE"}>{"Female"}</SelectItem>
              </Select>
              <Select
                size={"sm"}
                label="Pet Size"
                //   className="md:max-w-xs w-full"
                placeholder="Select a size"
                onChange={(e) => handleProvinceChange({ size: e.target.value })}
              >
                {sizes.map((size: { key: string; label: string }) => (
                  <SelectItem key={size.key}>{size.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-6 w-11/12 mx-auto my-10">
        {pets?.data.map((pet: TPet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
      <WhyAdopt />
      <SuccessStories />
      <SaveAnAnimal/>
      <ServicesSection/>
      <AdoptionProcessOverview />
      <AdoptionTips />
    </div>
  );
};

export default HomeLayout;
