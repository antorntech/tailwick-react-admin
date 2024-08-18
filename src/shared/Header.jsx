import { Button, Input } from "@material-tailwind/react";
import React from "react";

const Header = () => {
  const [searchText, setSearchText] = React.useState("");
  const onChange = ({ target }) => setSearchText(target.value);
  return (
    <div className="px-5 min-h-[70px] flex items-center">
      <div className="w-full flex items-center justify-between">
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
          <button className="px-4 py-2 bg-[#050828] text-white rounded-md hover:bg-[#F71869] transition-all duration-500">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
