"use client";

import {
  TAdopt,
  TPet,
  TResponse,
  TUserReturn,
} from "@/globalInterface/interface";
import { useUpdateRequestStatusMutation } from "@/redux/features/adopt/adoptApi";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  User,
} from "@nextui-org/react";
import { toast } from "sonner";

const AdoptionRequestModal = ({
  isOpen,
  onOpenChange,
  modalData,
}: {
  isOpen: boolean;
  onOpenChange: any;
  modalData: {
    id: string;
    name: string;
    petOwnershipExperience: string;
    contactInformation: string;
    avatar: string;
    status: string;
    pet: TPet;
    user: TUserReturn;
  };
}) => {
  const { user, pet } = modalData;
  const [changeStatus, { error }] = useUpdateRequestStatusMutation();
  const approved = async () => {
    const updatedData = {
      id: modalData.id,
      status: {
        status: "APPROVED",
      },
    };
    try {
      const res = (await changeStatus(updatedData)) as TResponse<TAdopt>;
      console.log(res);
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Register Failed");
    }
  };
  const rejected = async () => {
    const updatedData = {
      id: modalData.id,
      status: {
        status: "REJECTED",
      },
    };
    try {
      const res = (await changeStatus(updatedData)) as TResponse<TAdopt>;
      if (res?.error && !res?.error?.data?.success) {
        return toast.error(res.error.data.message);
      }
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      toast.error("Register Failed");
    }
  };
  return (
    <div>
      <Modal size={"lg"} isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`Request For Pet ${pet.name} From 
                ${user.name}`}
              </ModalHeader>
              <ModalBody>
                <Card className="py-4">
                  <CardHeader className="pb-0 flex-col items-start">
                    <User
                      name={`${user.name}`}
                      description={`${user.email}`}
                      avatarProps={{
                        src: `${user.photo}`,
                      }}
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2 flex-col gap-4">
                    <div>
                      <p className="capitalize text-small font-semibold leading-none text-default-600">
                        Age : {pet.age}
                      </p>
                      <h4 className="capitalize text-small font-semibold leading-none text-default-600">
                        Breed : {pet.breed}
                      </h4>

                      <p className="capitalize text-small font-semibold leading-none text-default-600">
                        species : {pet.species}
                      </p>
                      <p className="capitalize text-small font-semibold leading-none text-default-600">
                        size : {pet.size}
                      </p>
                      <p className="capitalize text-small font-semibold leading-none text-default-600">
                        {`  Pet Ownership Experience : 
                        ${modalData.petOwnershipExperience}`}
                      </p>
                    </div>
                  </CardBody>
                  <CardFooter className="gap-3">
                    <div className="flex gap-5">
                      <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          Contact Information : {modalData.contactInformation}
                        </h4>
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          Location : {pet.location}
                        </h4>
                        <h4 className="text-small font-semibold leading-none text-default-600">
                          Temperament : {pet.temperament}
                        </h4>
                        <h4>Medical History : {pet.medicalHistory}</h4>
                        <h5 className="text-small tracking-tight text-default-400">
                          {pet.description}
                        </h5>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  onClick={rejected}
                  variant="light"
                  onPress={onClose}
                >
                  Rejected
                </Button>
                <Button
                  color="primary"
                  onClick={approved}
                  variant="flat"
                  onPress={onClose}
                >
                  Approved
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdoptionRequestModal;
