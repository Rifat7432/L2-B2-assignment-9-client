"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Navbar,
  Button,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { isCollapsed, logOut } from "@/redux/features/auth/authSlice";
import { ChevronLeft, Menu } from "lucide-react";

const CustomNavbar = () => {
  const { user, collapsed } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <Navbar className="bg-opacity-25 shadow-md fixed top-0">
      <NavbarContent className="md:hidden">
        {collapsed ? (
          <ChevronLeft
            onClick={() => dispatch(isCollapsed(false))}
          ></ChevronLeft>
        ) : (
          <Menu onClick={() => dispatch(isCollapsed(true))}></Menu>
        )}
      </NavbarContent>
      <NavbarBrand>
        <p className="font-bold text-inherit">Bark Buddies</p>
      </NavbarBrand>

      <NavbarContent className=" sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Button as={Link} href="/" color="primary" variant="light">
            Home
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="/about" color="primary" variant="light">
            About Us
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent as="div" justify="end">
        {!user && (
          <>
            <NavbarItem>
              <Button as={Link} color="primary" href="/login" variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Register
              </Button>
            </NavbarItem>
            <ThemeSwitcher />
          </>
        )}
        {user && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="Jason Hughes"
                size="sm"
                src={user?.photo}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              closeOnSelect={false}
              variant="flat"
            >
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem as={Link} key="settings" href="/profile">
                My Profile
              </DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem>
                <div className="flex justify-around items-center gap-4">
                  <b>Dark Mode</b>
                  <div className="ml-5">
                    <ThemeSwitcher />
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  dispatch(logOut());
                }}
                key="logout"
                color="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
