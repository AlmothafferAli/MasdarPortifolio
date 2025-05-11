import React from "react";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";

interface HeaderProps {
  text: string;
  buttonText: string;
  onButtonClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ text, buttonText, onButtonClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">{text}</h2>
        <PrimaryButton
          content={buttonText}
          className="bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-6 py-3 rounded-xl transition-all duration-300"
          onClick={onButtonClick}
        />
      </div>
    </div>
  );
};

export default Header; 