"use client";

import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { KeySquare, Pencil } from "lucide-react";
import ProfileModal from "./ProfileModal";
import { useState } from "react";
import UnapprovedRequestList from "./UnapprovedRequestList";

const Profile = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [title, setTitle] = useState("");
  const { data, isLoading, isError } = useGetProfileQuery({});
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }
  const user = data.data;
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-12 gap-4">
        <Card className="py-4">
          <CardHeader className="pb-0 flex-col items-center">
            <div className="relative">
              <Image
                alt="Card background"
                className="object-cover w-full h-96 rounded-xl z-20 hover:z-0"
                src={user.photo}
              />
              <Button
                onPress={onOpen}
                className="rounded-full absolute top-1 right-1 z-10 hover:z-30 text-white"
                variant="light"
                color="primary"
                size="sm"
                onClick={() => setTitle("photo")}
              >
                <Pencil />
              </Button>
            </div>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex-col gap-4">
            <div className="px-5">
              <div className="  w-full flex justify-between items-center">
                <h4 className="font-semibold  w-2/4 leading-none text-default-600">
                  Name : {user.name}
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
