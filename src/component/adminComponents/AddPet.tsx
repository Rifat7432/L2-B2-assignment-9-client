"use client";
import { TPet, TResponse } from "@/globalInterface/interface";
import { useCreatePetMutation } from "@/redux/features/pet/petApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import {
  Button,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddPet = () => {
  const navigate = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [img, setImg] = useState<File[] | []>([]);
  const [imgError, setImgError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [add, { isLoading }] = useCreatePetMutation();
  if (!user) {
    toast.warning("Login First");
    navigate.push("/login");
  } else {
    if (user.role !== "ADMIN") {
      navigate.push("/");
    }
  }
  let imgInputValue = "";
  img.forEach((image) => {
    imgInputValue += `${image.name}` + " , ";
  });
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const onSubmit = async (userData: FieldValues) => {
    if (img.length) {
      const allPhotos: string[] = [];
      const formData1 = new FormData();
      const formData2 = new FormData();
      const formData3 = new FormData();
      formData1.append("image", img[0]);
      formData2.append("image", img[1]);
      formData3.append("image", img[2]);
      await fetch(`${process.env.NEXT_PUBLIC_IMGBB_URL}`, {
        method: "POST",
        body: formData1,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.url) {
            allPhotos.push(data.data.url);
          }
        });
      await fetch(`${process.env.NEXT_PUBLIC_IMGBB_URL}`, {
        method: "POST",
        body: formData2,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.url) {
            allPhotos.push(data.data.url);
          }
        });
      await fetch(`${process.env.NEXT_PUBLIC_IMGBB_URL}`, {
        method: "POST",
        body: formData3,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data?.url) {
            allPhotos.push(data.data.url);
          }
        });
      userData.photos = allPhotos;
    } else {
      return setImgError("Maximum Three Images Require");
    }
    userData.age = Number(userData.age);
    userData.specialNeeds = false;
    try {
      const res = (await add(userData)) as TResponse<TPet>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
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
        navigate.push("/allPets");
        setImg([]);
      }
    } catch (err) {
      toast.error("Register Failed");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-11/12 mx-auto my-12 "
      >
        <div className="text-center py-5">
          <h1 className="sm:text-lg md:text-2xl lg:text-4xl font-semibold">
            Fill The Form With Pet`s Information To Crate A Pet
          </h1>
        </div>
        <div className="space-y-1">
          <h4 className="text-medium font-medium">Pet Name</h4>
        </div>
        <Divider className="my-4" />
        <div>
          <Input
            label="Pet Name"
            {...register("name", {
              required: "Pet Name is required",
            })}
            variant="bordered"
            className="mb-6 sm:max-w-3xl w-full"
          />
          {errors.name && (
            <p className="text-red-600 text-xs">
              {errors?.name?.message as string}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <h4 className="text-medium font-medium">Pet Characteristics</h4>
        </div>
        <Divider className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Pet Species"
              {...register("species", {
                required: "Pet Species is required",
              })}
              fullWidth
              variant="bordered"
              className="mb-6"
            />
            {errors.species && (
              <p className="text-red-600 text-xs">
                {errors?.species?.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Pet Breed"
              {...register("breed", {
                required: "Pet Breed is required",
              })}
              fullWidth
              variant="bordered"
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
              label="Pet Size"
              {...register("size", {
                required: "Pet Size is required",
              })}
              fullWidth
              variant="bordered"
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
              label="Pet Age"
              {...register("age", { required: "Pet Age is required" })}
              type="number"
              fullWidth
              variant="bordered"
              className="mb-6"
            />
            {errors.age && (
              <p className="text-red-600 text-xs">
                {errors?.age?.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-medium font-medium">Pet Image</h4>
          <p className="text-small text-default-400">
            Upload at least three images
          </p>
        </div>
        <Divider className="my-4" />
        <div>
          <div
            onClick={handleFileClick}
            className="cursor-pointer sm:max-w-3xl"
          >
            <Input
              readOnly
              label="Upload Pet Photos"
              placeholder="Choose a image..."
              value={img ? imgInputValue : ""}
              className="cursor-pointer sm:max-w-3xl"
            />
            {imgError && (
              <p className="text-red-600 text-xs">{imgError as string}</p>
            )}
          </div>
          <input
            multiple
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const allImg = [...img, file];
                setImg(allImg);
              }
            }}
          />
        </div>
        <div className="space-y-1">
          <h4 className="text-medium font-medium">Pet Attributes</h4>
        </div>
        <Divider className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="Pet Temperament"
              {...register("temperament", {
                required: "Pet Temperament is required",
              })}
              fullWidth
              variant="bordered"
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
              label="Pet Health Status"
              {...register("medicalHistory", {
                required: "Pet Health Status is required",
              })}
              fullWidth
              variant="bordered"
              className="mb-6"
            />
            {errors.medicalHistory && (
              <p className="text-red-600 text-xs">
                {errors?.medicalHistory?.message as string}
              </p>
            )}
          </div>
          <div>
            <Select
              {...register("gender", {
                required: "Pet Gender is required",
              })}
              label="Select Pets Gender"
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
        </div>
        <div className="space-y-1">
          <h4 className="text-medium font-medium">Adoption Details</h4>
        </div>
        <Divider className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              label="Pet Current Location"
              {...register("location", {
                required: "Current Location is required",
              })}
              fullWidth
              variant="bordered"
              className="mb-6"
            />
            {errors.location && (
              <p className="text-red-600 text-xs">
                {errors?.location?.message as string}
              </p>
            )}
          </div>
          <div>
            <Input
              label="Pet Adoption Terms"
              {...register("adoptionTerms", {
                required: "Pet Adoption Terms is required",
              })}
              fullWidth
              variant="bordered"
              className="mb-6"
            />
            {errors.adoptionTerms && (
              <p className="text-red-600 text-xs">
                {errors?.adoptionTerms?.message as string}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <h4 className="text-medium font-medium">Pet Details</h4>
        </div>
        <Divider className="my-4" />
        <div>
          <Textarea
            variant="bordered"
            label="Detailed Description"
            {...register("description", {
              required: "Detailed Description is required",
            })}
            fullWidth
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
        <div className="flex items-center justify-center space-y-1">
          <Button
            type="submit"
            color="primary"
            className="min-w-80 py-1 text-base"
            onClick={() => {
              if (!img.length) {
                return setImgError("Maximum Three Images Require");
              }
              setImgError("");
            }}
            isLoading={isLoading}
          >
            Create A Pet
          </Button>
        </div>
      </form>
    </>
  );
};
export default AddPet;
