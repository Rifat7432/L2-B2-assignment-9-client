"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Sidebar } from "./sidebar.styles";
import { Filter } from "lucide-react";
import { usePathname } from "next/navigation";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { TQuery, setQuery } from "@/redux/features/pet/petSlice";
import { HandleSize, HandleSpecies } from "@/utils/handleFilter";
import { useGetAllPetsQuery } from "@/redux/features/pet/petApi";

export const HomeSidebar = () => {
  const pathname = usePathname();
  const { data: pets } = useGetAllPetsQuery({});
  const collapsed = useAppSelector((state) => state.auth.collapsed);
  const query = useAppSelector((state) => state.pet.querys);
  const dispatch = useAppDispatch();
  const handleProvinceChange = (element: TQuery) => {
    const { searchTerm } = query;
    dispatch(
      setQuery({
        searchTerm,
        ...element,
      })
    );
  };
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <Filter />
          <p className="font-bold text-inherit px-4">Filter</p>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {pets?.data.length > 0 && (
              <Accordion variant="light">
                <AccordionItem key="1" aria-label="Gender" title="Gender">
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => handleProvinceChange({ gender: "MALE" })}
                      className="w-full my-2"
                    >
                      Male
                    </Button>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => handleProvinceChange({ gender: "FEMALE" })}
                      className="w-full my-2"
                    >
                      Female
                    </Button>
                  </div>
                </AccordionItem>
                <AccordionItem key="2" aria-label="Size" title="Size">
                  <HandleSize
                    pets={pets?.data}
                    handleProvinceChange={handleProvinceChange}
                  ></HandleSize>
                </AccordionItem>
                <AccordionItem key="3" aria-label="species" title="species">
                  <HandleSpecies
                    pets={pets?.data}
                    handleProvinceChange={handleProvinceChange}
                  ></HandleSpecies>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
