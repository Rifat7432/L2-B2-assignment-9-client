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
  Image,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { isCollapsed, logOut } from "@/redux/features/auth/authSlice";
import { ChevronLeft, Menu, PawPrint } from "lucide-react";
import { usePathname } from "next/navigation";

const CustomNavbar = () => {
  const { user, collapsed } = useAppSelector((state) => state.auth);
  const sidebarNotShowPaths = ["/", "/about", "/login", "/register", "/pets"];
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  console.log();
  return (
    <Navbar className="bg-opacity-25 shadow-md fixed top-0">
      {pathname.includes("/pets") ? (
        ""
      ) : sidebarNotShowPaths.includes(pathname) ? (
        ""
      ) : (
        <NavbarContent
        className="md:hidden"
        >
          {collapsed ? (
            <ChevronLeft
              onClick={() => dispatch(isCollapsed(false))}
            ></ChevronLeft>
          ) : (
            <Menu onClick={() => dispatch(isCollapsed(true))}></Menu>
          )}
        </NavbarContent>
      )}

      <NavbarBrand>
        <div className="flex items-center">
          <Image
            alt="bark buddies logo"
            src="https://res.cloudinary.com/dqbtjunza/image/upload/v1735236796/bark-buddies-logo-removebg-preview_wmcjdb.png"
            className="w-[112px] h-[56px]"
          />
          <p className="font-bold text-inherit">
            <span className="text-[#89BECF]">Bark</span> Buddies
          </p>
        </div>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarItem className="hidden sm:block">
          <Button as={Link} href="/" color="primary" variant="light">
            Home
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden sm:block">
          <Button as={Link} href="/about" color="primary" variant="light">
            About Us
          </Button>
        </NavbarItem>
        {!user && (
          <>
            <NavbarItem className="hidden sm:block">
              <Button as={Link} color="primary" href="/login" variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:block">
              <Button as={Link} color="primary" href="/register" variant="flat">
                Register
              </Button>
            </NavbarItem>
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
          </>
        )}
        {user ? (
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
              <DropdownItem key="info" className="h-14 gap-2">
                <p className="font-semibold">Signed in as </p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem
                className="block sm:hidden"
                as={Link}
                key="home"
                href="/"
              >
                Home
              </DropdownItem>
              <DropdownItem
                className="block sm:hidden"
                as={Link}
                key="about"
                href="/about"
              >
                About Us
              </DropdownItem>
              {user.role === "ADMIN" ? (
                <DropdownItem as={Link} href="/adminOverview" key="Dashboard">
                  Dashboard
                </DropdownItem>
              ) : (
                <DropdownItem as={Link} key="profile" href="/userOverview">
                  Overview
                </DropdownItem>
              )}

              <DropdownItem>
                <div className="flex justify-around items-center gap-4">
                  <b>Dark Mode</b>
                  <div className="ml-5">
                    <ThemeSwitcher />
                  </div>
                </div>
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
        ) : (
          <div className="block sm:hidden">
            <Dropdown>
              <DropdownTrigger>
                <Menu></Menu>
              </DropdownTrigger>
              <DropdownMenu
                closeOnSelect={false}
                aria-label="Example with disabled actions"
              >
                <DropdownItem></DropdownItem>
                <DropdownItem
                  className="block sm:hidden"
                  as={Link}
                  key="home"
                  href="/"
                >
                  Home
                </DropdownItem>
                <DropdownItem
                  className="block sm:hidden"
                  as={Link}
                  key="about"
                  href="/about"
                >
                  About Us
                </DropdownItem>
                <DropdownItem>
                  <div className="flex justify-around items-center gap-4">
                    <b>Dark Mode</b>
                    <div className="ml-5">
                      <ThemeSwitcher />
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem
                  className="block sm:hidden"
                  as={Link}
                  href="/login"
                  key="login"
                >
                  Login
                </DropdownItem>
                <DropdownItem
                  className="block sm:hidden"
                  as={Link}
                  href="/register"
                  key="register"
                >
                  Register
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default CustomNavbar;
