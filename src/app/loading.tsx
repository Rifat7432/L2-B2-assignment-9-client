import { Spinner } from "@nextui-org/react";

const LoadingPage = () => {
  return (
    <div className="w-[90%] mt-96 mx-auto flex flex-col items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export default LoadingPage;
