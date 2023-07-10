import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataEntityAlquran, getDataAlquranSurah } from "../layout/ApiAlquran";
import { Link } from "react-router-dom";
import gambar from "./../images/alquran.webp";
import { AiOutlineSearch } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { AiFillRocket } from "react-icons/ai";

const Surah = () => {
  const dispatch = useDispatch();
  const alqurans = useSelector(dataEntityAlquran.selectAll);
  const [hidden, setHiden] = useState(false);
  const [data, setData] = useState("");
  const [roketScroll, setRoketScroll] = useState(false);

  useEffect(() => {
    dispatch(getDataAlquranSurah(data));
  }, [dispatch, data]);

  const handleSearch = () => {
    setHiden(!hidden);
    setData("");
  };
  const handleChangeInput = (e) => {
    setData(() => e.target.value);
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
        <div>
          <div
            className={`flex justify-center ${
              hidden ? "bg-[#e7ffffcb]" : " bg-[#e7ffffcb]"
            }`}
          >
            <input
              type="text"
              className={`bg-[#e9e9e9fd] font-rubik ${
                hidden ? "" : "hidden"
              } rounded-tl-md rounded-bl-md  px-1 outline-none`}
              onChange={handleChangeInput}
              value={data}
            />
            {hidden ? (
              <FaTimes
                className="cursor-pointer border text-[1.9rem] ml-1"
                onClick={handleSearch}
              />
            ) : (
              <AiOutlineSearch
                className="text-[1.9rem] cursor-pointer ml-1"
                onClick={handleSearch}
              />
            )}
          </div>
          <div className="flex border-b-2 bg-[#e7ffffcb] justify-center">
            <h1 className="text-[1.4rem] font-rubik">144 Surah</h1>
          </div>
        </div>
        {alqurans &&
          Object.entries(alqurans).map(([key, value]) => {
            return (
              <div key={key}>
                <Link to={`/details/${value.nomor}`}>
                  <div className="p-4 flex items-center dark:bg-[#8f8f8f] dark:text-cyan-50 border-b-2 justify-between">
                    <div className="px-2 rounded-lg items-center gap-6 flex text-[1.8rem]">
                      <h1 className="border rounded-lg px-4 p-2 text-[1.8rem]">
                        {value.nomor}
                      </h1>
                      <div>
                        <h1 className="text-[1.3rem] font-rubik">
                          {value.namaLatin}
                        </h1>
                        <div className="flex gap-2 text-[1.1rem]">
                          <h2>{value.tempatTurun}</h2>|
                          <h3>{value.jumlahAyat}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="text-[1.7rem] items-center gap-3 flex font-Lateef">
                      {value.nama}
                      <img src={gambar} alt="gambar" className="w-[3.4rem]" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        <div>
          {roketScroll ? (
            <AiFillRocket
              onClick={hanldeScrolTop}
              className="cursor-pointer bg-black text-white dark:bg-white dark:text-black fixed z-20 bottom-5 text-[1.7rem] right-5 "
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};

export default Surah;
