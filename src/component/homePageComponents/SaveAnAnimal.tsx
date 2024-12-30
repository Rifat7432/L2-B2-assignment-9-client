const SaveAnAnimal = () => {
  return (
    <div className="py-10">
      <div className="text-foreground w-11/12 mx-auto">
        <h3 className="text-3xl font-bold text-center mb-8">Save an Animal</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-2">Adopting a Pet</h4>
            <p className="text-muted-foreground">
              When you adopt from RAR, you save the life of a pet who may have
              arrived at the Refuge because their time was up at a municipal
              shelter. We receive pets from all types of situations due to no
              fault of their own. Adopting from an animal rescue also helps stop
              the cycle of puppy mills.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Save a Life</h4>
            <p className="text-muted-foreground">
              In 2024, we launched our pet store, Royal Canine & Co. The shop
              offers unique pet apparel, leashes, grooming items, pet treats,
              bowls, vitamins, and much more. Proceeds from purchases go to
              support the work that we do to save animals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveAnAnimal;
