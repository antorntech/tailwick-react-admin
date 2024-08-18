import {
  Avatar,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import React from "react";

const Header = () => {
  const [searchText, setSearchText] = React.useState("");
  const onChange = ({ target }) => setSearchText(target.value);
  return (
    <div className="px-5 min-h-[70px] flex items-center">
      <div className="w-full hidden md:flex items-center justify-between">
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
              className={`!absolute right-1 top-1 rounded transition-all duration-500 ${
                searchText ? "bg-[#050828]" : "bg-[#c9c8c8]"
              }`}
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </Button>
          </div>
        </div>
        <div>
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
                        <i class="fa-solid fa-caret-down text-gray-500"></i>
                      </span>
                    </p>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="mt-2">
                  <div className="flex items-center gap-2 pr-12">
                    <i class="fa-regular fa-user"></i>
                    <p>Profile</p>
                  </div>
                  <div className="h-[1px] w-full bg-gray-200 my-2"></div>
                  <div className="flex items-center gap-2">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <p>Log Out</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[70px] flex justify-end md:hidden fixed right-5 z-40 bg-white">
        <button>
          <span className="px-4 py-2 bg-[#050828] text-white rounded-md">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
