import React from "react";
import { Link } from "react-router-dom";
import gambar from "./../images/alquran.webp";

const Home = () => {
  return (
    <section>
      <div className="bg-[#525151] text-[#e9e9e9] bg-no-repeat bg-cover bg-center h-screen w-screen">
        <div className=" flex flex-col items-center pt-[5rem]">
          <h1 className=" font-rubik text-[2rem]">
            Ayok Baca Al-quran
          </h1>
          <img src={gambar} alt="al-quran" className="w-[10rem]" />
          <div className=" flex flex-col items-center">
            <div className="font-rubik text-[#e9e9e9]">
              <Link
                to={"juz"}
                className="border-[3px] flex justify-center items-center px-[7rem] py-2 rounded-lg my-2 text-white border-[#e9e9e9]"
              >
                Juz
              </Link>
              <Link
                to={"surah"}
                className="border-[3px] flex justify-center items-center px-[7rem] py-2 rounded-lg my-2 text-white border-[#e9e9e9]"
              >
                Surah
              </Link>
              <Link
                to={"kisah"}
                className="border-[3px] flex justify-center items-center px-[7rem] py-2 rounded-lg my-2 text-white border-[#e9e9e9]"
              >
                Kisah Nabi
              </Link>
            </div>
          </div>
        </div>
        <div className="font-rubik text-center pt-10 absolute bottom-0">
            <p className="opacity-60 text-[.9rem]">Anangs</p>
          </div>
      </div>
    </section>
  );
};

export default Home;
