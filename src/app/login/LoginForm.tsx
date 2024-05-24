"use client";
import { useForm } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle login logic here
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="max-w-['1000px'] flex items-center lg:w-2/4 md:w-3/4 w-11/12 rounded-lg mx-auto my-20 justify-center bg-cover bg-center bg-[url('https://i.ibb.co/fDwj3bd/images.jpg')]">
      <div className="bg-slate-300 bg-opacity-40 p-8 rounded-lg max-w-md w-full text-center shadow-lg outline-slate-50 md:m-32 sm:m-20">
        <h2 className="text-xl w-11/12 my-5">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            {...register("email")}
            fullWidth
            placeholder="Enter your email"
            className="mb-6"
          />
          <Input
            label="Password"
            {...register("password")}
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
          <Button type="submit" color="primary">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
