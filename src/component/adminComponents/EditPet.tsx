"use client";
import { TPet, TResponse } from "@/globalInterface/interface";
import { useUpdatePetMutation } from "@/redux/features/pet/petApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const EditPet = ({ params }: { params: { petId: string } }) => {
  const navigate = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  if (!user) {
    toast.warning("Login First");
    navigate.push("/login");
  } else {
    if (user.role !== "ADMIN") {
      navigate.push("/");
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [update, { isLoading }] = useUpdatePetMutation();

  const onSubmit = async (userData: FieldValues) => {
    const updateData: Partial<TPet> = {};
    if (userData.name) {
      updateData.name = userData.name;
    }
    if (userData.gender) {
      updateData.gender = userData.gender;
    }
    if (userData.species) {
      updateData.species = userData.species;
    }
    if (userData.breed) {
      updateData.breed = userData.breed;
    }
    if (userData.size) {
      updateData.size = userData.size;
    }
    if (userData.location) {
      updateData.location = userData.location;
    }
    if (userData.temperament) {
      updateData.temperament = userData.temperament;
    }
    if (userData.description) {
      updateData.description = userData.description;
    }
    if (userData.medicalHistory) {
      updateData.medicalHistory = userData.medicalHistory;
    }
    if (userData.adoptionTerms) {
      updateData.adoptionTerms = userData.adoptionTerms;
    }
    if (userData.age) {
      updateData.age = Number(userData.age);
    }
    if (!Object.keys(updateData).length) {
      return toast.error("Enter any thing to update");
    }
    try {
      const res = (await update({
        updateData,
        id: params.petId,
      })) as TResponse<TPet>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        reset({
          gender: "",
          species: "",
          name: "",
          breed: "",
          size: "",
          age: "",
          location: "",
          description: "",
          temperament: "",
          medicalHistory: "",
          adoptionTerms: "",
        });
        toast.success(res.data.message);
        navigate.push("/allPets");
      }
    } catch (err) {
      toast.error("Register Failed");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-11/12 mx-auto my-20"
      >
        <div className="text-center">
          <p className="text-2xl">Update Pet</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 mx-auto">
          <div>
            <Input
              label="Update Pet Name"
              {...register("name")}
              fullWidth
              placeholder="Enter Pet Name optional"
              className="mb-6"
            />
            {errors.name && (
              <p className="text-red-600 text-xs">
                {errors?.name?.message as string}
              </p>
            )}
          </div>
          <div>
            {" "}
            <Input
              label="Update Pet Species"
              {...register("species")}
              fullWidth
              placeholder="Enter Pet Species optional"
              className="mb-6"
            />
            {errors.species && (
              <p className="text-red-600 text-xs">
                {errors?.species?.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 mx-auto">
          <div>
            <Input
              label="Update Pet Breed"
              {...register("breed")}
              fullWidth
              placeholder="Enter Pet Breed optional"
              className="mb-6"
            />
            {errors.breed && (
              <p className="text-red-600 text-xs">
                {errors?.breed?.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Update Pet Age"
              {...register("age")}
              type="number"
              fullWidth
              placeholder="Enter Pet Age optional"
              className="mb-6"
            />
            {errors.age && (
              <p className="text-red-600 text-xs">
                {errors?.age?.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 mx-auto">
          <div>
            <Input
              label="Update Pet Size"
              {...register("size")}
              fullWidth
              placeholder="Enter Pet Size optional"
              className="mb-6"
            />
            {errors.size && (
              <p className="text-red-600 text-xs">
                {errors?.size?.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Update Pet Current Location"
              {...register("location")}
              fullWidth
              placeholder="Enter Current Location optional"
              className="mb-6"
            />
            {errors.location && (
              <p className="text-red-600 text-xs">
                {errors?.location?.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 mx-auto">
          <div>
            <Input
              label="Update Pet Temperament"
              {...register("temperament")}
              fullWidth
              placeholder="Enter Pet Temperament optional"
              className="mb-6"
            />
            {errors.temperament && (
              <p className="text-red-600 text-xs">
                {errors?.temperament?.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Update Pet Health Status"
              {...register("medicalHistory")}
              fullWidth
              placeholder="Enter Pet Health Status optional"
              className="mb-6"
            />
            {errors.medicalHistory && (
              <p className="text-red-600 text-xs">
                {errors?.medicalHistory?.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-11/12 mx-auto">
          <div>
            <Select
              {...register("gender")}
              fullWidth
              label="Select To Update Pets Gender"
              placeholder="Select Pets Gender optional"
              className="max-w-xs"
            >
              {[
                { key: "MALE", label: "Male" },
                { key: "FEMALE", label: "Female" },
              ].map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
              ))}
            </Select>
            {errors.gender && (
              <p className="text-red-600 text-xs">
                {errors?.gender?.message as string}
              </p>
            )}
          </div>
          <div>
            {" "}
            <Input
              label="Update Pet Adoption Terms"
              {...register("adoptionTerms")}
              fullWidth
              placeholder="Enter Pet Adoption Terms optional"
              className="mb-6"
            />
            {errors.adoptionTerms && (
              <p className="text-red-600 text-xs">
                {errors?.adoptionTerms?.message as string}
              </p>
            )}
          </div>
        </div>
        <div className=" w-11/12 mx-auto">
          <Textarea
            variant="bordered"
            label="Update Pet Detailed Description"
            {...register("description")}
            fullWidth
            placeholder="Enter Detailed Description optional"
            className="mb-6"
            disableAnimation
            disableAutosize
            classNames={{
              input: "resize-y min-h-[40px]",
            }}
          />
          {errors.description && (
            <p className="text-red-600 text-xs">
              {errors?.description?.message as string}
            </p>
          )}
        </div>
        <Button type="submit" color="primary" isLoading={isLoading}>
          Update
        </Button>
      </form>
    </>
  );
};
export default EditPet;
