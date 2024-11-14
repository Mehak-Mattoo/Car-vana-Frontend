import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Chip,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  PowerIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Example(props) {
  let host = process.env.PRODUCTION_URL;
  const { mode, setMode } = props;

  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const location = useLocation();
  const [btn, setBtn] = useState("Sign up");
  useEffect(() => {
    if (location.pathname === "/signup") {
      setBtn("Login");
    } else {
      setBtn("Sign up");
    }
  });

  const toggleMode = () => {
    console.log(mode);
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
  };

  const showProfile = async () => {
    try {
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom-end"
        className="dark:bg-[#1d3455c1]"
      >
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="Profile"
              className="p-0.5 w-11 h-11"
              src={`https://api.multiavatar.com/${localStorage.getItem(
                "email"
              )}.png`}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="dark:bg-[#1d3455c1] border-none">
          <MenuItem
            onClick={showProfile}
            className="flex items-center gap-2 hover:dark:bg-[#274a7bc1] dark:text-white"
          >
            <UserCircleIcon strokeWidth={2} className="h-4 w-4" />
            <Typography variant="small" className="font-normal">
              My Profile
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={toggleMode}
            className="flex items-center gap-2 hover:dark:bg-[#274a7bc1] dark:text-white"
          >
            {props.mode === "dark" ? (
              <>
                <SunIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  Light Mode
                </Typography>
              </>
            ) : (
              <>
                <MoonIcon strokeWidth={2} className="h-4 w-4" />
                <Typography variant="small" className="font-normal">
                  Dark Mode
                </Typography>
              </>
            )}
          </MenuItem>

          <hr className="my-2 border-blue-gray-50" />
          <MenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 hover:dark:bg-[#274a7bc1]"
          >
            <PowerIcon color="red" strokeWidth={2} className="h-4 w-4" />
            <Typography color="red" variant="small" className="font-normal">
              Sign Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <>
      <Navbar
        className={`fixed top-0 z-10 h-max max-w-full rounded-none py-4 px-4 md:px-16 lg:px-20 lg:py-4 navStyle dark:bg-[#1d3455c1] dark:border-none`}
      >
        <div className="flex items-center justify-between w-full">
          <Typography as="a" className="mr-4 cursor-pointer py-1.5 font-medium">
            <h2 className="font-bold text-black dark:text-white  text-lg md:text-xl">
              Car-vana
            </h2>
          </Typography>

          <div className="flex items-center gap-4">
            <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
              <Link to="/" className="font-bold text-black dark:text-white">
                Home
              </Link>
            </Typography>

            {localStorage.getItem("token") ? (
              <div className="flex items-center gap-4">
                <ProfileMenu />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to={btn === "Login" ? "/login" : "/signup"}>
                  <Button>{btn}</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Navbar>
    </>
  );
}
