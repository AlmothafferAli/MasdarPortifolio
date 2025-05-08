import { toggle } from "@/app/features/appSlice/headerSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function HeaderPull() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      className={`w-16  sm:w-20 h-16 sm:h-20 rounded-b-xl bg-white flex justify-center items-start  shadow-[0_7px_10px_-1px_rgba(0,0,0,0.25)] relative top-0 ${
        isOpen ? "h-16 sm:h-20" : "h-16 sm:h-20"
      }`}
      onClick={() => {
        dispatch(toggle());
        setIsOpen(!isOpen);
      }}
    >
      <Image
        src={"/images/icon Blue (3).png"}
        alt="logo"
        width={55}
        height={45}
        className="w-auto h-auto max-w-[55px] sm:max-w-[55px]"
      />
    </button>
  );
}
