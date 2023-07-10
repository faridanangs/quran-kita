import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSurah } from "../ApiAlquran";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import gambar from "./../../images/alquran.webp";
import { AiFillRocket } from "react-icons/ai";

const DetailSurah = () => {
  const [data, setData] = useState();
  const [roketScroll, setRoketScroll] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const surah = useSelector((state) => state.alquran.entities[id]);

  const hanldeScrolTop = () => {
    const top = {
      top: 0,
      behavior: "smooth",
    };
    window.scrollTo(top);
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

  useEffect(() => {
    dispatch(getOneSurah(id));
  }, [dispatch, id]);

  const dataSurah = [
    {
      arti: surah?.arti,
      ayat: surah?.ayat,
      jumlahAyat: surah?.jumlahAyat,
      tempatTurun: surah?.tempatTurun,
      namaLatin: surah?.namaLatin,
      nomor: surah?.nomor,
    },
  ];
  useEffect(() => {
    if (surah) {
      setData(dataSurah);
    }
  }, [surah]);
  return (
    <section>
      <section className="header-section sticky top-0">
        <div className="bg-[#e7ffff]">
          <div className="flex py-3 px-1 justify-between items-center">
            <div className="flex text-[2.5rem] gap-4">
              <Link to={"/surah"}>
                <IoChevronBack />
              </Link>
              <img className="w-10" src={gambar} alt="header" />
            <h1 className="text-[1.6rem] font-rubik">Al-Qur'an Kita</h1>
            </div>
            <div>
              <CiMenuKebab className="text-[2rem]" onClick={()=> alert('LovYu:}')}/>
            </div>
          </div>
        </div>
      </section>
      <div>
        {data
          ? data.map((value, index) => {
              return (
                <div key={index}>
                  <div className="bg-[#e7ffff] pt-4">
                    <div className=" flex font-rubik justify-center items-center gap-2 text-[1.4rem]">
                      <h1>{value.nomor}.</h1>
                      <div>{value.namaLatin}</div>
                    </div>
                    <div className="flex items-center border-b font-rubik justify-evenly p-4">
                      <div className="border py-1 px-3 rounded-lg">
                        {value.tempatTurun}
                      </div>
                      <div className="border text-center py-3 px-2 rounded-lg">
                        {value.arti}
                      </div>
                      <div className="border py-1 px-3 rounded-lg flex gap-2 items-center justify-center">
                        <h1 className="mb-0">{value.jumlahAyat}</h1>
                        <p className="mt-0">ayat</p>
                      </div>
                    </div>

                  </div>
                  <div  className="dark:bg-[#8f8f8f] dark:text-cyan-50">
                  <div>
                    {value.nomor !== 9 && value.nomor !== 1 ? (
                      <div className="py-3  border flex justify-center items-center">
                        <div className="text-[1.4rem]">
                          بِسْــــــــــــــــــمِ اللهِ الرَّحْمَنِ الرَّحِيْمِ
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {value.ayat
                    ? value.ayat.map((ayat, index) => {
                        return (
                          <div key={index} className=" px-4 py-2 border-b">
                            <div className="flex mb-4 gap-14">
                              <h1 className="text-[1.4rem] mt-2">
                                {ayat.nomorAyat}
                              </h1>

                              <div className="text-[1.8rem] pt-2 flex items-center text-right font-Lateef ml-auto">
                                {ayat.teksArab}
                              </div>
                            </div>

                            <div className="mx-10 mb-4">
                              <div className="font-semibold text-[17px] mb-2">
                                {ayat.teksLatin}
                              </div>
                              <div>{ayat.teksIndonesia}</div>
                            </div>
                          </div>
                        );
                      })
                    : ""}
                </div>

                  </div>
              );
            })
          : ""}
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

export default DetailSurah;
