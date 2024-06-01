"use client";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Sidebar } from "./sidebar.styles";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebarItem";
import { Cat, CircleUser } from "lucide-react";

export const ProfileSidebar = () => {
  const pathname = usePathname();
  const collapsed = useAppSelector((state) => state.auth.collapsed);
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <p className="font-bold text-inherit px-4">Dashboard</p>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {" "}
            <SidebarItem
              icon={<Cat />}
              title={"My Adopted Pets"}
              isActive={pathname === "/myAdoptedPets"}
              href={"/myAdoptedPets"}
            />
            <SidebarItem
              icon={<CircleUser />}
              title={"My Profile"}
              isActive={pathname === "/profile"}
              href={"/profile"}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
