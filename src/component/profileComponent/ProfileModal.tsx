"use client";
import { TResponse, TUpdateData } from "@/globalInterface/interface";
import { useUpdateProfileMutation } from "@/redux/features/auth/authApi";
import { storToken, storUserData } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks/hooks";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfileModal({
  isOpen,
  onOpenChange,
  title,
}: {
  isOpen: boolean;
  onOpenChange: any;
  title: string;
}) {
  const { register, handleSubmit } = useForm();
  const [img, setImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [update, { isLoading }] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const onSubmit = async (userData: FieldValues) => {
    console.log(userData, img);
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
    }
    const userUpdateData = { [title]: userData[title] };
    try {
      const res = (await update(userUpdateData)) as TResponse<TUpdateData>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
        if (res?.data?.data) {
          localStorage.setItem("accessToken", res?.data?.data.accessToken);
          const decoded = jwtDecode(res?.data?.data.accessToken);
          const { exp, iat, ...rest } = decoded;
          dispatch(storToken(res?.data?.data.accessToken));
          return dispatch(storUserData(rest));
        }
      }
    } catch (err) {
      toast.error("Register Failed");
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {title === "name" && (
                    <Input
                      label="User Name"
                      {...register("name")}
                      fullWidth
                      placeholder="Enter your name"
                      className="mb-6"
                    />
                  )}
                  {title === "email" && (
                    <Input
                      label="Email"
                      {...register("email")}
                      fullWidth
                      placeholder="Enter your email"
                      className="mb-6"
                    />
                  )}
                  {title === "photo" && (
                    <>
                      <div onClick={handleFileClick}>
                        <Input
                          readOnly
                          label="Upload Photo"
                          placeholder="Choose a image..."
                          value={img ? img.name : ""}
                          className="cursor-pointer"
                        />
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
                    </>
                  )}

                  <Button type="submit" color="primary" isLoading={isLoading}>
                    Update
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
