import { useDispatch, useSelector } from "react-redux";
import { getDataAlquranJuz, kirimDataJuz } from "../layout/ApiAlquran";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiFillRocket } from "react-icons/ai";

const Juz = () => {
  const dispatch = useDispatch();
  const dataJuz = useSelector(kirimDataJuz.selectAll);
  const [roketScroll, setRoketScroll] = useState(false);
  useEffect(() => {
    dispatch(getDataAlquranJuz());
  }, [dispatch]);
  const hanldeScrolTop = () => {
    const top = {
      top: 0,
      behavior: "smooth",
    };
    window.scrollTo(top);
  };
  useEffect(()=> {
    const handleScrol = ()=> {
      const offset = window.scrollY;
      if(offset > 100){
        setRoketScroll(!roketScroll)
      }else if(offset < 100){
        setRoketScroll(false)
      }
    }
    window.addEventListener('scroll', handleScrol)
    return ()=> window.removeEventListener('scroll', handleScrol)
  }, [])
  return (
    <section>
      <div>
        <div className="flex border-b-2 bg-[#e7ffffcb] justify-center">
          <h1 className="text-[1.5rem] font-rubik">Juz</h1>
        </div>
        <div>
          {dataJuz &&
            Object.entries(dataJuz).map(([key, value]) => {
              return (
                <div key={key}>
                  <Link to={`/detailj/${value.number}`}>
                    <div className="border-b flex px-2 dark:bg-[#8f8f8f] dark:text-cyan-50 py-2 items-center gap-10">
                      <div className="border-2 rounded-lg px-3 p-1 text-[1.4rem]">
                        {value.number}
                      </div>
                      <div>
                        <h1 className="text-[1.2rem] font-rubik">
                          Juz {value.number}
                        </h1>
                        <div className=" text-inherit">
                          Mulai dari:{" "}
                          {Object.values(value.surahs)[0].englishName} Ayat{" "}
                          {Object.values(value.ayahs)[0].numberInSurah}
                        </div>
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
      </div>
    </section>
  );
};

export default Juz;
