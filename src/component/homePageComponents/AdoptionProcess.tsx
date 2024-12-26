import Image from "next/image";


const AdoptionProcessOverview = () => {
  return (
    <section className="py-10">
      <div className="w-11/12 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Adoption Process Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className=" mb-4">
              Adopting a pet is a rewarding experience! Start by browsing available pets, using filters for breed, age, and location. Once you find a pet that feels right, the next step is a meet-and-greet, either in person or virtually.
            </p>
            <p className=" mb-4">
              After meeting the pet, you can fill out a simple adoption application online or at the shelter. Once the paperwork is done, prepare your home for the new arrival with these helpful tips to ensure a smooth transition.
            </p>
            <p className="mb-4">
              Ready to adopt? Your new best friend is waiting to meet you!
            </p>
          </div>
          <div className="justify-center flex h-56">
            <Image
              src="https://res.cloudinary.com/dqbtjunza/image/upload/v1729261700/pet-img-1_sx4ksh.jpg" 
              alt="Adoption Process"
              className="rounded-lg shadow-md h-56"
              width={500}
              height={224}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdoptionProcessOverview;
