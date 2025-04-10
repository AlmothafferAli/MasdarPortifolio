import { toggle } from "@/app/features/appSlice/headerSlice";
import Image from "next/image";
import { useDispatch } from "react-redux";

export default function HeaderPull() {
  const dispatch = useDispatch();
  return (
    <button
      className="w-16 sm:w-20 h-16 sm:h-20 rounded-b-xl bg-white flex justify-center items-start  shadow-[0_7px_10px_-1px_rgba(0,0,0,0.25)] relative top-0"
      onClick={() => {
        dispatch(toggle());
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
