"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../features/Store";
import { setToggle } from "../features/appSlice/headerSlice";

export default function HeaderOverlay() {
  const isToggled = useSelector((state: RootState) => state.header.isToggled);
  const dispatch = useDispatch();
  if (!isToggled) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
      style={{ pointerEvents: isToggled ? "auto" : "none" }}
      onClick={() => dispatch(setToggle(false))}
    />
  );
}
