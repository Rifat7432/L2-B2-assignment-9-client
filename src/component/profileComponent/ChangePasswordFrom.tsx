"use client";

import { TResponse } from "@/globalInterface/interface";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const ChangePasswordFrom = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConform, setIsVisibleConform] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const navigate = useRouter();
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = (await changePassword(data)) as TResponse<null>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        reset({
          email: "",
          oldPassword: "",
          newPassword: "",
        });
        toast.success(res.data.message);
        navigate.push("/profile");
      }
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibilityConform = () => setIsVisibleConform(!isVisibleConform);
  return (
    <div>
      <Card className="mx-auto lg:w-2/4 md:w-3/4 w-11/12 mt-20">
        <CardHeader>
          <h2 className="text-xl w-11/12 my-5 text-center">Change Password</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              {...register("email", {
                required: "Email is required",
              })}
              fullWidth
              placeholder="Enter your email"
              className="mb-6"
            />
            {errors.email && (
              <p className="text-red-600 text-xs">
                {errors?.email?.message as string}
              </p>
            )}
            <Input
              label="Old Password"
              {...register("oldPassword", {
                required: "Old Password is required",
              })}
              fullWidth
              placeholder="Enter your previous password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? <EyeOff /> : <Eye />}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="mb-6"
            />
            {errors.oldPassword && (
              <p className="text-red-600 text-xs">
                {errors?.oldPassword?.message as string}
              </p>
            )}
            <Input
              label="New Password"
              {...register("newPassword", {
                required: "New Password is required",
              })}
              fullWidth
              placeholder="Enter your new password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibilityConform}
                >
                  {isVisibleConform ? <EyeOff /> : <Eye />}
                </button>
              }
              type={isVisibleConform ? "text" : "password"}
              className="mb-6"
            />
            {errors.newPassword && (
              <p className="text-red-600 text-xs">
                {errors?.newPassword?.message as string}
              </p>
            )}
            <Button color="primary" type="submit" isLoading={isLoading}>
              Change Password
            </Button>
          </form>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default ChangePasswordFrom;
