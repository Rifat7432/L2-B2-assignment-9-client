import PetDetailCard from "@/component/petComponent/PetDetailCard";

const page = ({ params }: { params: { petId: string } }) => {
  return (
    <div>
      <PetDetailCard params={params}></PetDetailCard>
    </div>
  );
};

export default page;
