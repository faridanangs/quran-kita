import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataKisahNabiAll, kisahEntity } from "../layout/ApiAlquran";
import gambar from "./../images/alquran.webp";
import { Link } from "react-router-dom";
import { AiFillRocket } from "react-icons/ai";
import { useState } from "react";

const KisahNabi = () => {
  const dispatch = useDispatch();
  const [roketScroll, setRoketScroll] = useState(false);
  const kisah = useSelector(kisahEntity.selectAll);

  useEffect(() => {
    dispatch(getDataKisahNabiAll());
  }, [dispatch]);

  const hanldeScrolTop = ()=> {
    const scrollTop = {
      top: 0,
      behavior: 'smooth'
    }
    window.scrollTo(scrollTop)
  }

  useEffect(()=> {
    const handleScrol = ()=> {
      const offset = window.scrollY;
      if(offset > 100){
        setRoketScroll(!roketScroll)
      }else if (offset < 100){
        setRoketScroll(false)
      }
    }
    window.addEventListener('scroll', handleScrol);
    return ()=> window.removeEventListener('scroll', handleScrol)
  }, [])
  return (
    <section className="relative">
      <div className="bg-[#e7ffff] text-center text-[1.4rem] font-rubik pb-2">
        Kisah 25 Nabi
      </div>
      <div>
        {kisah && (
          <div>
            {Object.entries(kisah).map(([key, val]) => {
              return (
                <div key={key}>
                  <Link to={`/detailk/${key}`}>
                    <div className="dark:bg-[#8f8f8f] dark:text-cyan-50" >
                      <div className="flex items-center gap-2 border-b py-2 px-1 ">
                        <img
                          src={gambar}
                          alt={val.name}
                          className=" w-[4rem] mr-1"
                        />
                        <div>
                          <h1 className="font-rubik text-[1.1rem]">
                            {val.name}
                          </h1>
                          <div>
                            Lahir : {val.thn_kelahiran}sm. | {val.tmp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        {
          roketScroll ? (
        <AiFillRocket onClick={hanldeScrolTop} className=" bg-black text-white dark:bg-white dark:text-black cursor-pointer fixed z-20 bottom-5 text-[1.5rem] right-5 " />
          ) : ''
        }
      </div>
    </section>
  );
};

export default KisahNabi;
