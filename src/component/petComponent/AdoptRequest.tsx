"use client";

import { TAdopt, TResponse } from "@/globalInterface/interface";
import { useCreateAdoptRequestMutation } from "@/redux/features/adopt/adoptApi";
import { useAppSelector } from "@/redux/hooks/hooks";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Link,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const AdoptRequest = ({ params }: { params: { petId: string } }) => {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const email = useAppSelector((state) => state.auth.user?.email);
  const [createRequest, { isLoading }] = useCreateAdoptRequestMutation();
  const navigate = useRouter();

  const onSubmit = async (userData: FieldValues) => {
    console.log(userData, { ...params });
    const requestData = {
      ...userData,
      ...params,
    };
    try {
      const res = (await createRequest(requestData)) as TResponse<TAdopt>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
        navigate.push("/");
        setOpen(false);
      }
    } catch (err) {
      toast.error("Login Failed");
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
              <div>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
                  voluptate enim doloribus consequatur error minus? Nulla
                  exercitationem quibusdam hic numquam ullam laboriosam velit
                  iure, corporis porro voluptas, sit laudantium qui.
                </p>
              </div>
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
