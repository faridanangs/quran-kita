import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDataKisahNabiAll, kisahEntity } from "../ApiAlquran";
import { useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { MdDarkMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiFillRocket } from "react-icons/ai";

const DetailKisah = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [mode, setMode] = useState(true);
  const [roketScroll, setRoketScroll] = useState(false);
  const detail = useSelector(kisahEntity.selectAll);
  useEffect(() => {
    dispatch(getDataKisahNabiAll());
  }, [dispatch]);
  const kisah = detail[id];
  const handleMode = () => {
    setMode(!mode);
  };
  const hanldeScrolTop = () => {
    const scrTop = {
      top: 0,
      behavior: "smooth",
    };
    window.scrollTo(scrTop);
  };
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setRoketScroll(!roketScroll);
      } else if (offset < 100) {
        setRoketScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <section>
      <div>
        {kisah && (
          <div>
            <section className="header-section sticky top-0">
              <div className="bg-[#e7ffff]">
                <div className="flex py-3 items-center border">
                  <div className="flex text-[2.5rem]">
                    <Link to={"/kisah"}>
                      <IoChevronBack />
                    </Link>
                  </div>
                  <h1 className={`text-[1.1rem] font-rubik`}>
                    Kisah {kisah.name}
                  </h1>
                  <div></div>
                </div>
              </div>
            </section>
            <div className=" bg-[#e7ffff] border flex flex-col justify-center items-center">
              <div className="flex py-4 items-center justify-center gap-3">
                <h1 className="border py-2 px-2 rounded-lg font-rubik shadow-md">
                  {kisah.name}
                </h1>
              </div>
              <div className="flex gap-5 mb-2">
                <h1 className="border px-2 py-1 rounded-lg flex gap-1">
                  <p>Lahir : </p>
                  {kisah.thn_kelahiran}sm
                </h1>
                <h1 className="border py-1 px-2 rounded-lg flex gap-1">
                  <p>Usia : </p> {kisah.usia}th
                </h1>
              </div>
              <div className="flex gap-2 border px-4 py-2 mb-2 rounded-lg">
                <p>Tempat lahir :</p>
                <h1>{kisah.tmp}</h1>
              </div>
            </div>
            <div className="bg-[#f9ffff] dark:bg-[#8f8f8f] dark:text-cyan-50 px-2 font-sans pt-3 pb-[5rem]">
              <p className="text-center py-2 mb-2 font-rubik">بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ</p>
              <h1>{kisah.description}</h1>
            </div>
          </div>
        )}
        <div>
          {roketScroll ? (
            <AiFillRocket
              onClick={hanldeScrolTop}
              className=" bg-black text-white dark:bg-white dark:text-black cursor-pointer fixed z-20 bottom-5 text-[1.7rem] right-5 "
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailKisah;
