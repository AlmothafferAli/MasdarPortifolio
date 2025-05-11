import React from "react";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";

interface HeaderProps {
  text: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ text, buttonText, onButtonClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-right">{text}</h2>
        <PrimaryButton
          content={buttonText}
          className="w-full sm:w-auto bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-4 md:px-6 py-2 md:py-3 rounded-xl transition-all duration-300 text-sm md:text-base"
          onClick={onButtonClick}
        />
      </div>
    </div>
  );
};

export default Header; 