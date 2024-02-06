// components/Navbar.js
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = ({ buttonHandler, isSaving }) => {
  const router = useRouter();

  // Check if the current route is "/"
  const isHomePage = router.pathname === "/";

  const handleImageClick = () => {
    router.push("/");
  };

  return (
    <header className="self-stretch flex flex-col items-center justify-start gap-[41px] max-w-full text-center text-13xl text-gray font-inter mq950:gap-[20px]">
      <div className="w-[1321px] flex flex-row items-start justify-start py-0 pr-8 pl-5 box-border max-w-full">
        <div className="flex-1 flex flex-row items-start justify-between gap-[20px] max-w-full">
          <div
            className="overflow-hidden flex flex-col items-start justify-start py-[3px] px-0 cursor-pointer"
            onClick={handleImageClick}
          >
            <Image
              className="w-10 h-[33.3px] relative"
              width={33}
              height={33}
              loading="eager"
              alt=""
              src="/pen-swirl.svg"
            />
          </div>
          {isHomePage ? (
            <button
              type="button"
              className="hover:rotate-6 transition text-gray-900 border hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
              onClick={buttonHandler}
            >
              <svg
                className="w-4 h-4 me-2 -ms-1 text-[#626890]"
                xmlns="http://www.w3.org/2000/svg"
                id="Layer_1"
                data-name="Layer 1"
                viewBox="0 0 24 24"
                width="512"
                height="512"
              >
                <path d="m24,2.626c0-.701-.273-1.361-.77-1.857-1.024-1.025-2.691-1.023-3.714,0l-11.29,11.291s-.004,0-.006.001l-3.941,1.239c-1.266.398-2.241,1.449-2.544,2.742L.014,23.386c-.04.168.011.346.133.468.095.095.43.142.468.133l7.344-1.722c1.292-.303,2.343-1.278,2.741-2.545l1.239-3.941s0-.003.001-.004l11.291-11.291c.496-.496.77-1.156.77-1.857Zm-14.254,16.794c-.294.932-1.066,1.649-2.017,1.872l-5.635,1.321,3.759-3.759c.195-.195.195-.512,0-.707s-.512-.195-.707,0l-3.759,3.759,1.321-5.635c.224-.951.94-1.724,1.872-2.016l3.676-1.155,2.646,2.646-1.156,3.675ZM22.523,3.776l-11.088,11.088-2.3-2.3L20.224,1.476c.635-.635,1.665-.633,2.3,0,.308.308.477.716.477,1.15s-.169.843-.477,1.15Z" />
              </svg>
              Write
            </button>
          ) : (
            <div className="flex items-center gap-[25px]">
              {isSaving && <p className="mt-[-10px]">Saving...</p>}
              <button
                type="button"
                className="hover:rotate-6 transition text-gray-900 border hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2"
                onClick={buttonHandler}
              >
                <svg
                  className="w-4 h-4 me-2 -ms-1 text-[#626890]"
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.5,3h-7.028c-.231,0-.464-.055-.671-.158l-3.156-1.578c-.345-.173-.732-.264-1.118-.264h-3.028C2.019,1,0,3.019,0,5.5v13c0,2.481,2.019,4.5,4.5,4.5h3c.276,0,.5-.224,.5-.5s-.224-.5-.5-.5h-3c-1.93,0-3.5-1.57-3.5-3.5V8H23v10.5c0,1.93-1.57,3.5-3.5,3.5h-3c-.276,0-.5,.224-.5,.5s.224,.5,.5,.5h3c2.481,0,4.5-2.019,4.5-4.5V7.5c0-2.481-2.019-4.5-4.5-4.5ZM1,5.5c0-1.93,1.57-3.5,3.5-3.5h3.028c.231,0,.464,.055,.671,.158l3.156,1.578c.345,.173,.732,.264,1.118,.264h7.028c1.76,0,3.221,1.306,3.464,3H1v-1.5Zm14.912,14.35l-2.515,2.57c-.386,.386-.891,.579-1.396,.58h-.003c-.504,0-1.008-.192-1.392-.576l-2.519-2.574c-.193-.197-.189-.514,.008-.707,.198-.191,.515-.189,.707,.008l2.515,2.57c.056,.056,.117,.103,.183,.142V12.5c0-.276,.224-.5,.5-.5s.5,.224,.5,.5v9.362c.066-.04,.129-.088,.187-.145l2.511-2.566c.193-.197,.51-.199,.707-.008,.197,.193,.201,.51,.008,.707Z" />
                </svg>
                Save Blog
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="self-stretch h-0.5 relative bg-shade-300" />
    </header>
  );
};

export default Navbar;
