"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Input, Button, Link } from "@nextui-org/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import React, { useRef } from "react";
import { useSignUpMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TResponse, TUserLoginData } from "@/globalInterface/interface";
import Image from "next/image";
import loginImage from "@/assets/login-page-image.png"
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useRouter();
  const [registerUser, { isLoading }] = useSignUpMutation();
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const onSubmit = async (userData: FieldValues) => {
    if (img) {
      const formData = new FormData();
      formData.append("image", img);
      await fetch(`${process.env.NEXT_PUBLIC_IMGBB_URL}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data.url) {
            userData.photo = data.data.url;
          }
        });
      try {
        const res = (await registerUser(userData)) as TResponse<TUserLoginData>;
        if (res?.error && !res?.error?.data?.success) {
          return toast.error(res.error.data.message);
        }
        if (res.data.success) {
          reset({ password: "", email: "", name: "" });
          toast.success(res.data.message);
          navigate.push("/login");
        }
      } catch (err) {
        toast.error("Register Failed");
      }
    } else {
      return setImgError("Image is require");
    }
  };
  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="flex">
      <div className="shrink">
        <Image width={3000} height={2000} className="h-full w-full hidden sm:flex" src={loginImage} alt="login" />
      </div>
      <div className="px-8 py-12 w-full text-center outline-slate-50  sm:min-w-[416px]">
        <h2 className="text-xl w-11/12 my-8">Register A New Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-start">
            <Input
              label="User Name"
              {...register("name", {
                required: "Name is required",
              })}
              fullWidth
              variant="underlined"
              className="mb-6"
            />
            {errors.name && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.name?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Input
              label="Email"
              {...register("email", {
                required: "Email is required",
              })}
              fullWidth
              variant="underlined"
              className="mb-6"
            />
            {errors.email && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.email?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start" onClick={handleFileClick}>
            <Input
              readOnly
              label="Upload Photo"
              placeholder="Choose a image..."
              variant="underlined"
              value={img ? img.name : ""}
              className="cursor-pointer"
            />
            {imgError && (
              <p className="text-red-600 text-xs font-semibold">
                {imgError as string}
              </p>
            )}
          </div>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImg(file);
              }
            }}
          />
          <div className="flex flex-col items-start">
            <Input
              label="Password"
              {...register("password", {
                required: "Password is required",
              })}
              fullWidth
              variant="underlined"
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
            {errors.password && (
              <p className="text-red-600 text-xs font-semibold">
                {errors?.password?.message as string}
              </p>
            )}
          </div>
          <Button
            type="submit"
            color="primary"
            className="w-11/12 mx-auto"
            onClick={() => {
              if (!img) {
                return setImgError("Image is equire");
              }
              setImgError("");
            }}
            isLoading={isLoading}
          >
            Register
          </Button>
        </form>
        <div className="w-full my-5">
          <p>
            Already have account{" "}
            <Link href="/login" underline="hover">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
