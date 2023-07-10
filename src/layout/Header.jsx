import { FiSun } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Switcher from "../component/Switch";

const Header = () => {
  return (
    <section className="z-50 sticky top-0 ">
      <div className="bg-[#e7ffff] px-3 flex py-1 items-center justify-between">
        <Link to={"/"}>
          <IoChevronBack className=" text-[2.5rem]" />
        </Link>
        <div className="text-[1.8rem] font-rubik">Al-qur'an kita</div>
        <div className="flex py-3 items-center">
          <Switcher/>
        </div>
      </div>
    </section>
  );
};

export default Header;

