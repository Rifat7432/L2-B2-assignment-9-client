import { TPet } from "@/globalInterface/interface";
import { removeDuplicates } from "./removeDublicat";
import { Button } from "@nextui-org/react";

export const HandleSize = ({
  pets,
  handleProvinceChange,
}: {
  pets: TPet[];
  handleProvinceChange: any;
}) => {
  const filteredArray: string[] = removeDuplicates(
    pets.map((element: TPet) => element.size)
  );
  return (
    <div>
      {filteredArray.map((element: string) => (
        <Button
          key={element}
          className="w-full my-2"
          onClick={() => handleProvinceChange({ size: element })}
          variant="ghost"
        >
          {element}
        </Button>
      ))}
    </div>
  );
};
export const HandleSpecies = ({
  pets,
  handleProvinceChange,
}: {
  pets: TPet[];
  handleProvinceChange: any;
}) => {
  const filteredArray: string[] = removeDuplicates(
    pets.map((element: TPet) => element.species)
  );
  return (
    <div>
      {filteredArray.map((element: string) => (
        <Button
          key={element}
          className="w-full my-2"
          onClick={() => handleProvinceChange({ species: element })}
          variant="ghost"
        >
          {element}
        </Button>
      ))}
    </div>
  );
};
