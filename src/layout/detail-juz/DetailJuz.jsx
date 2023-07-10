import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataJuzNumber, kirimDataJuz } from "../ApiAlquran";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiFillRocket } from "react-icons/ai";


const DetailJuz = () => {
  const [data, setData] = useState();
  const [roketScroll, setRoketScroll] = useState(false)
  const dispatch = useDispatch();

  const { id } = useParams();
  const juz = useSelector((state) => kirimDataJuz.selectById(state, id));
  useEffect(() => {
    dispatch(getDataJuzNumber(id));
  }, [dispatch, id]);

  const dataJuz = [
    {
      surah: juz?.ayahs,
    },
  ];
  useEffect(() => {
    if (juz) {
      setData(dataJuz);
    }
  }, [juz]);

  useEffect(()=> {
    const handleScroll = ()=> {
      const offset = window.scrollY;
      if(offset > 100){
        setRoketScroll(!roketScroll)
      }else if(offset < 100){
        setRoketScroll(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return ()=> window.removeEventListener('scroll', handleScroll)
  }, [])

  const hanldeScrolTop = ()=> {
    const top = {
      behavior: 'smooth',
      top: 0
    }
    window.scrollTo(top)
  }

  return (
    <section>
      <div>
        <div className="flex gap-2 px-4 items-center pb-2 sticky top-0 bg-[#fff8f8]">
          <Link to={"/juz"}>
            <IoChevronBack className="text-[1.5rem]" />
          </Link>
          <p className="py-2 text-center">
            maaf ya ini akses ke data alqurannya pake bahasa inggris
          </p>
        </div>

        {juz &&
          juz.ayahs.map((val, i) => {
            const numberOfAyahs = val.surah.numberOfAyahs;
            const englishName = val.surah.englishName;
            const revelationType = val.surah.revelationType;
            const datalol = () => {
              if (
                i === 0 ||
                numberOfAyahs !== juz.ayahs[i - 1].surah.numberOfAyahs
              ) {
                return (
                  <div key={i}>
                    <div>
                      <div className="border p-2 bg-[#fff8f8]">
                        <div className="flex border  shadow-md rounded-md py-1 px-10 items-center justify-evenly">
                          <div className=" px-2 py-1 flex flex-col items-center justify-center">
                            {numberOfAyahs} <p>ayat</p>
                          </div>
                          <div className=" py-2 px-4 border-4 rounded-xl shadow-md border-[#ddd4c7d2]">
                            {englishName}
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <p>turun di</p>
                            {revelationType}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            };

            return (
              <div key={i}>
                {datalol()}
                <div>
                  <div className="dark:bg-[#7e7a7a] dark:text-cyan-50 flex border-b flex-row-reverse justify-between px-6 py-4 gap-6">
                    <h1 className="text-right font-Lateef text-[1.5rem]">{val.text}</h1>
                    <p>{val.numberInSurah}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div>
          {roketScroll ? (
            <AiFillRocket
              onClick={hanldeScrolTop}
              className="bg-black text-white dark:bg-white dark:text-black cursor-pointer fixed z-20 bottom-5 text-[1.7rem] right-5 "
            />
          ) : (
            ""
          )}
        </div>
    </section>
  );
};

export default DetailJuz;
