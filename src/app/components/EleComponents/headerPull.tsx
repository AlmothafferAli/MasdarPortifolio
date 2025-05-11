import { toggle } from "@/app/features/appSlice/headerSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ImageWithLoader from "../ImageWithLoader";

export default function HeaderPull() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      className={`w-24 sm:w-32 h-16 sm:h-20 rounded-b-xl bg-white flex justify-center items-center  shadow-[0_7px_10px_-1px_rgba(0,0,0,0.25)] relative top-0 ${
        isOpen ? "h-16 sm:h-20" : "h-16 sm:h-20"
      }`}
      onClick={() => {
        dispatch(toggle());
        setIsOpen(!isOpen);
      }}
    >
      <ImageWithLoader
        src={"/images/masdar blueE.png"}
        alt="logo"
        width={100}
        height={100}
        className="w-auto h-auto max-w-[70px]  sm:max-w-[100px]"
      />
    </button>
  );
}
