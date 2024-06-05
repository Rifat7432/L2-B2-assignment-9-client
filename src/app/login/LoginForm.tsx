"use client";
import { FieldValues, useForm } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { storToken, storUserData } from "@/redux/features/auth/authSlice";
import { TResponse, TUserLoginData } from "@/globalInterface/interface";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = (await loginUser(data)) as TResponse<TUserLoginData>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        reset({ password: "", email: "" });
        toast.success(res.data.message);
        navigate.push("/");
        if (res?.data?.data) {
          localStorage.setItem("accessToken", res?.data?.data.accessToken);
          const decoded = jwtDecode(res?.data?.data.accessToken);
          const { exp, iat, ...rest } = decoded;
          dispatch(storToken(res?.data?.data.accessToken));
          return dispatch(storUserData(rest));
        }
      }
    } catch (err) {
      toast.error("Login Failed");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="max-w-['1000px'] flex items-center lg:w-2/4 md:w-3/4 w-11/12 rounded-lg mx-auto my-20 justify-center bg-cover bg-center bg-[url('https://i.ibb.co/fDwj3bd/images.jpg')]">
      <div className="bg-slate-300 bg-opacity-40 p-8 rounded-lg max-w-md w-full text-center shadow-lg outline-slate-50 md:m-32 sm:m-20">
        <h2 className="text-xl w-11/12 my-5">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col items-start">
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
              <p className="text-red-600 text-xs font-semibold">
                {errors?.email?.message as string}
              </p>
            )}
          </div>
          <div className="flex flex-col items-start">
            {" "}
            <Input
              label="Password"
              {...register("password", {
                required: "Password is required",
              })}
              fullWidth
              placeholder="Enter your password"
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

          <Button color="primary" type="submit" isLoading={isLoading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
