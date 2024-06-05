import EditPet from "@/component/adminComponents/EditPet";

const page = ({ params }: { params: { petId: string } }) => {
  return (
    <div>
      <EditPet params={params}></EditPet>
    </div>
  );
};

export default page;
