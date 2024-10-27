"use client";

import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { KeySquare, Pencil } from "lucide-react";
import ProfileModal from "./ProfileModal";
import { useState } from "react";
import UnapprovedRequestList from "./UnapprovedRequestList";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks/hooks";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useRouter();
  const userData = useAppSelector((state) => state.auth.user);
  if (!userData) {
    navigate.push("/login");
    toast.warning("Login First");
  }
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const [disable, setDisable] = useState(false);
  const { data, isLoading } = useGetProfileQuery({});
  if (isLoading) {
    return (
      <div className="w-[90%] mt-96 mx-auto flex flex-col items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }
  const user = data.data;
  return (
    <div>
      <div className="grid grid-cols-1 p-12 gap-4">
        <Card className="py-4  relative">
          <CardHeader className="pb-0 flex-col items-center w-full mx-auto md:w-[900px] h-[300px]">
            <div className="w-full ">
              <Image
                className="md:w-[900px] h-[300px] w-full object-cover"
                src="https://res.cloudinary.com/dqbtjunza/image/upload/v1730038419/images_ye6pm4.jpg"
                alt="banner"
              />
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2 sm:px-10 flex-col gap-4">
            <div className="flex lg:gap-10 gap-5 items-center lg:flex-row flex-col px-10">
              <div className="w-40 h-40">
                <button
                  className="rounded-full absolute lg:bottom-14 bottom-36 z-20 bg-white"
                  onClick={() => {
                    setTitle("photo");
                    onOpen();
                  }}
                >
                  <Avatar
                    isDisabled={disable}
                    onMouseEnter={() => setDisable(true)}
                    onMouseLeave={() => setDisable(false)}
                    isBordered
                    color="primary"
                    className="w-40 h-40 text-large"
                    src={user.photo}
                  />
                </button>
              </div>

              <div className="px-5">
                <div className="  w-full gap-5 flex justify-between items-center">
                  <h4 className="font-semibold  w-2/4 leading-none text-default-600">
                    {user.name}
                  </h4>

                  <Button
                    size="sm"
                    onPress={onOpen}
                    className="rounded-full"
                    variant="light"
                    color="primary"
                    onClick={() => setTitle("name")}
                  >
                    <Pencil />
                  </Button>
                </div>
                <div className="w-full flex justify-between items-center">
                  <h5>Email : {user.email}</h5>
                  <Button
                    size="sm"
                    onPress={onOpen}
                    className="rounded-full"
                    variant="light"
                    color="primary"
                    onClick={() => setTitle("email")}
                  >
                    <Pencil />
                  </Button>
                </div>
              </div>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              variant="flat"
              as={Link}
              href="/changePassword"
              color="primary"
              className="w-full"
            >
              <KeySquare /> Change Password
            </Button>
          </CardFooter>
        </Card>
        <UnapprovedRequestList></UnapprovedRequestList>
      </div>
      <ProfileModal title={title} isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default Profile;
