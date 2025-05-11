"use client";

import Image from "next/image";

import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import { ChangeEvent, FormEvent, useState } from "react";
import PrimaryButton from "@/app/components/EleComponents/PrimaryButton";
import SecondaryButton from "@/app/components/EleComponents/SecondaryButton";
import PrimaryAuth2 from "@/app/components/EleComponents/PrimaryAuth2";

import {
  FaApple,
  FaEye,
  FaEyeSlash,
  FaFacebook,
  FaGoogle,
} from "react-icons/fa";
import useAuth from "@/app/hooks/Auth";
import { useRouter } from "next/navigation";
import PrimaryLable from "@/app/components/EleComponents/PrimaryLable";
import { tokenUtils } from "@/app/Utils/TokenUtils";
export default function Signin() {
  const userRole = tokenUtils.getUserRole();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(user);

    if (userRole === "Admin") {
      router.push("/Admin");
    } else {
      router.push("/");
    }
  };
  return (
    <>
      <div
        className={`flex flex-col items-center justify-start h-screen sm:h-11/12 md:h-10/12 sm:shadow-lg md:shadow-xl rounded-2xl w-full md:max-w-4/12 px-4 py-12 
      bg-white dark:bg-darkMain dark:text-white dark:border-white `}
      >
        <div className="flex flex-col items-center justify-start w-full">
          <div className="mb-8">
            <Image
              width={250}
              height={250}
              alt="Logo"
              src={"/images/masdar blueE.png"}
            />
          </div>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-1">تسجيل دخول</h1>
            <h3 className="text-sm text-lightTextSecondary mb-8">
              اكتب معلومات حسابك
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-full"
          >
            <div className="flex flex-col items-center space-y-4 w-full px-4 md:px-0 md:w-2/3 text-lightTextPrimary">
              <div className="flex flex-col items-end w-full">
                <PrimaryLable>ادخل الايميل</PrimaryLable>
                <PrimaryInput
                  placeholder="ادخل الايميل"
                  className="w-full"
                  onChange={handleChange}
                  name="username"
                  value={user.username}
                />
              </div>
              <div className="flex flex-col items-end w-full">
                <PrimaryLable>الرمز السري</PrimaryLable>
                <PrimaryInput
                  onChange={handleChange}
                  placeholder="ادخل الرمز"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  name="password"
                  value={user.password}
                >
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </PrimaryInput>
              </div>

              <div className="w-full flex items-center justify-between">
                <PrimaryButton
                  content="تسجيل دخول"
                  type="submit"
                  className="bg-DarkPrimary text-amber-50"
                />
                <SecondaryButton
                  content="انشاء حساب"
                  onClick={() => router.push("/signup")}
                />
              </div>
              <span className="h-0.25 w-full bg-lightBorder"></span>
              <PrimaryLable className="w-full text-center">
                او استخدم طرق اخرى
                <div className="flex justify-center w-full mt-4 space-x-2">
                  <PrimaryAuth2>
                    <FaGoogle size={25} />
                  </PrimaryAuth2>
                  <PrimaryAuth2>
                    <FaFacebook size={25} />
                  </PrimaryAuth2>
                  <PrimaryAuth2>
                    <FaApple size={25} />
                  </PrimaryAuth2>
                </div>
              </PrimaryLable>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
