"use client";

import { TAdopt, TResponse } from "@/globalInterface/interface";
import { useCreateAdoptRequestMutation } from "@/redux/features/adopt/adoptApi";
import { useGetPetQuery } from "@/redux/features/pet/petApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Link,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const AdoptRequest = ({ params }: { params: { petId: string } }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const email = useAppSelector((state) => state.auth.user?.email);
  const [createRequest, { isLoading }] = useCreateAdoptRequestMutation();
  const { data, isLoading: dataLoading } = useGetPetQuery(params.petId);
  const navigate = useRouter();
  const onSubmit = async (userData: FieldValues) => {
    const requestData = {
      ...userData,
      ...params,
    };
    if (dataLoading) {
      return (
        <div className="w-[90%] mt-96 mx-auto flex flex-col items-center justify-center">
          <Spinner size="lg" />
        </div>
      );
    }
    try {
      const res = (await createRequest(requestData)) as TResponse<TAdopt>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        reset({
          contactInformation: "",
          isAgreed: false,
          petOwnershipExperience: "",
        });
        toast.success(res.data.message);
        navigate.push("/");
        setOpen(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <Card className="mx-auto lg:w-2/4 md:w-3/4 w-11/12 mt-20">
        <CardHeader>
          <h2 className="text-xl w-11/12 my-5 text-center">
            Request for Adopt
          </h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Contact Information or Email"
              {...register("contactInformation")}
              defaultValue={email}
              fullWidth
              placeholder="Enter your Contact Information"
              className="mb-6"
            />
            <Textarea
              variant="bordered"
              label="Experience"
              {...register("petOwnershipExperience")}
              fullWidth
              placeholder="Enter your Experience"
              className="mb-6"
              disableAnimation
              disableAutosize
              classNames={{
                input: "resize-y min-h-[40px]",
              }}
            />
            <div>
              <Checkbox {...register("isAgreed")}>Agreed </Checkbox>
              <span> All </span>
              <Link
                onClick={() => setOpen(true)}
                className="underline cursor-pointer"
              >
                Terms And Conditions
              </Link>
            </div>
            {open && (
              <div>{data?.data && <p>{data?.data.adoptionTerms}</p>}</div>
            )}
            <Button type="submit" color="primary" isLoading={isLoading}>
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdoptRequest;
