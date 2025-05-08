"use client";

import Image from "next/image";


import PrimaryInput from "@/app/components/EleComponents/PrimaryInput";
import { useState } from "react";
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
import PrimaryLable from "@/app/components/EleComponents/PrimaryLable";
export default function SignUp() {

  const [form, setForm] = useState({
    name: "",
    username: "",

    password: "",
  });
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(form);
  };
  return (
    <>
      <div className=" flex flex-col items-center justify-items-center md:shadow-xl rounded-2xl px-8 sm:px-16 md:px-24 min-w-full md:min-w-2xl py-12 h-screen md:h-11/12 min-h-max ">
        <div className="flex flex-col items-center justify-items-center    ">
          <div className="mb-8">
            <Image
              width={250}
              height={200}
              alt="Logo"
              src={"/images/masdar blueE.png"}
            />
          </div>
          <div className="w-full flex flex-col items-center ">
            <h1 className="dark:text-darkTextPrimary text-2xl font-bold mb-1">
              أنشاء حساب
            </h1>
            <h3 className="dark:text-darkTextPrimary text-sm text-lightTextSecondary mb-8">
              أبدأ كأداري الان لتحصل على ميزات التعديل والاضافة
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center "
          >
            <div className="flex flex-col  items-center  space-y-4 text-lightTextPrimary">
              <div className="flex space-x-4  justify-center w-full ">
                <div className="flex flex-col items-end w-full">
                  <PrimaryLable>اسم الاول</PrimaryLable>
                  <PrimaryInput
                    placeholder="مثال"
                    className="w-full"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    value={form.name}
                  />
                </div>

                <div className="flex flex-col items-end w-full">
                  <PrimaryLable>اسم الاول</PrimaryLable>
                  <PrimaryInput
                    placeholder="مثال"
                    className="w-full"
                    type="password"
                  />
                </div>
              </div>
              <div className=" flex flex-col items-end w-full">
                <PrimaryLable>ادخل الايميل</PrimaryLable>
                <PrimaryInput
                  placeholder="ادخل الايميل"
                  className="w-full"
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  value={form.username}
                />
              </div>
              <div className=" flex flex-col items-end w-full">
                <PrimaryLable>الرمز السري</PrimaryLable>
                <PrimaryInput
                  placeholder="ادخل الرمز"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  value={form.password}
                >
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className=""
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </PrimaryInput>
              </div>
              <div className=" flex flex-col items-end w-full">
                <PrimaryLable>تأكيد الرمز السري</PrimaryLable>
                <PrimaryInput
                  placeholder="أكد الرمز السري"
                  className="w-full"
                  type={showConfPassword ? "text" : "password"}
                >
                  <span
                    onClick={() => setShowConfPassword(!showConfPassword)}
                    className=""
                  >
                    {showConfPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </PrimaryInput>
              </div>
              <div className="flex space-x-8 justify-center w-full mb-6">
                <PrimaryLable className="flex space-x-10 justify-center items-center">
                  <input className=" w-4 h-4" type="checkbox" name="checkbox" />
                  <div>
                    <span className="dark:text-darkTextPrimary text-sm text-lightTextPrimary">
                      اوافق على
                      <span className="text-DarkPrimary">
                        {" "}
                        الشروط والاحكام
                      </span>{" "}
                      و<span className="text-DarkPrimary"> سياسةالخصوصية</span>
                    </span>
                  </div>
                </PrimaryLable>
              </div>
              <div className=" w-full flex items-center justify-between ">
                <PrimaryButton
                  content="انشاء حساب"
                  type="submit"
                  className="bg-DarkPrimary text-amber-50"
                />
                <SecondaryButton content="تسجيل دخول" type="button" />
              </div>
              <span className="h-0.25 w-full dark:text-darkTextPrimary bg-lightBorder"></span>
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
