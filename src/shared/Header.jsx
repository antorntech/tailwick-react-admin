import {
  Avatar,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchText, setSearchText] = React.useState("");
  const onChange = ({ target }) => setSearchText(target.value);

  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div className="px-5 min-h-[70px] bg-white header-shadow flex items-center fixed top-0 w-[calc(100%-250px)] z-40">
      <div className="w-full hidden md:flex items-center justify-between bg-whtie">
        <div>
          <div className="hidden relative md:flex w-full max-w-[24rem]">
            <Input
              type="text"
              label="Search"
              value={searchText}
              onChange={onChange}
              className="pr-20"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              disabled={!searchText}
              className={`!absolute right-1 top-1 rounded transition-all duration-300 ${
                searchText ? "bg-[#050828]" : "bg-[#c9c8c8]"
              }`}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-calendar-days text-[30px]"></i>
            <div>
              <p className="text-[14px] font-semibold text-black">
                {moment().format("dddd")}
              </p>
              <p className="text-[12px] text-gray-500">
                {moment().format("Do MMMM, YYYY")}
              </p>
            </div>
          </div>
          <div className="flex items-center ">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              size="sm"
            />
            <div>
              <Popover placement="bottom-start" className="px-12">
                <PopoverHandler>
                  <Button className="!p-0 bg-transparent shadow-none hover:shadow-none">
                    <p className="text-[14px] font-semibold text-black px-2">
                      Mr. Admin
                    </p>
                    <p className="text-[12px] text-gray-500">
                      Admin{" "}
                      <span>
                        <i className="fa-solid fa-caret-down text-gray-500"></i>
                      </span>
                    </p>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="mt-2 w-[150px]">
                  <Link to={"/notification"}>
                    <div className="w-full flex items-center gap-2 hover:text-blue-700 hover:font-bold transition-all duration-300">
                      <i class="fa-regular fa-bell"></i>
                      <p>Notification</p>
                    </div>
                  </Link>
                  <div className="h-[1px] w-full bg-gray-200 my-2"></div>
                  <Link to={"/profile"}>
                    <div className="w-full flex items-center gap-2 hover:text-blue-700 hover:font-bold transition-all duration-300">
                      <i className="fa-regular fa-user"></i>
                      <p>Profile</p>
                    </div>
                  </Link>
                  <div className="h-[1px] w-full bg-gray-200 my-2"></div>
                  <div
                    className="w-full flex items-center gap-2 hover:text-blue-700 hover:font-bold cursor-pointer transition-all duration-300"
                    onClick={handleLogOut}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <p>Log Out</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[70px] md:hidden fixed top-0 left-0 z-40 bg-white flex justify-end">
        <button className="me-4" onClick={handleLogOut}>
          <span className="px-4 py-2 bg-[#050828] text-white rounded-md">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
