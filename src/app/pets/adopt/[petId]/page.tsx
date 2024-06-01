import AdoptRequest from "@/component/petComponent/AdoptRequest";

const page = ({ params }: { params: { petId: string } }) => {
  return (
    <div>
      <AdoptRequest params={params}></AdoptRequest>
    </div>
  );
};

export default page;
