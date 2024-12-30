"use client";
import { FieldValues, useForm } from "react-hook-form";
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { storToken, storUserData } from "@/redux/features/auth/authSlice";
import { TResponse, TUserLoginData } from "@/globalInterface/interface";
import Image from "next/image";
import loginImage from "@/assets/login-page-img-cat.png";
const LoginForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const demoLogin = async (data: { email: string; password: string }) => {
    try {
      const res = (await loginUser(data)) as TResponse<TUserLoginData>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
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
    <div className="flex">
      <div className="shrink">
        <Image
          width={1920}
          height={1920}
          className="h-full w-full hidden sm:flex object-cover"
          src={loginImage}
          alt="login"
        />
      </div>
      <div className="px-8 py-12 mt-20 w-full text-center outline-slate-50  sm:max-w-[416px]">
        <h2 className="text-xl w-11/12 my-5">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <div className="flex flex-col items-start">
            {" "}
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
            color="primary"
            type="submit"
            className="w-11/12 my-2"
            isLoading={isLoading}
          >
            Login
          </Button>
        </form>
        <div className="w-full my-5">
          <p>
            New to Bark Buddies{" "}
            <Link href="/register" underline="hover">
              Create an account
            </Link>
          </p>
        </div>
        <Button
          className="w-11/12 my-2"
          color="primary"
          variant="flat"
          onPress={() => onOpen()}
        >
          Use Demo Account
        </Button>
        <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <h3 className="font-bold text-xl">
                    Login with Demo Accounts!
                  </h3>
                  <div className="flex justify-between items-center p-5">
                    <div>
                      <h4 className="text-lg font-medium">Admin Account</h4>
                      <p className="text-md font-thin">
                        Email : admin@gmail.com
                      </p>
                      <p>Password : 123456</p>
                    </div>
                    <div>
                      <Button
                        color="secondary"
                        variant="ghost"
                        onPress={onClose}
                        onClick={() =>
                          demoLogin({
                            email: "admin@gmail.com",
                            password: "123456",
                          })
                        }
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-5">
                    <div>
                      <h4 className="text-lg font-medium">User Account</h4>
                      <p className="text-md font-thin">
                        Email : user@gmail.com
                      </p>
                      <p>Password : 123456</p>
                    </div>
                    <div>
                      <Button
                        color="secondary"
                        variant="ghost"
                        onPress={onClose}
                        onClick={() =>
                          demoLogin({
                            email: "user@gmail.com",
                            password: "123456",
                          })
                        }
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};
export default LoginForm;
