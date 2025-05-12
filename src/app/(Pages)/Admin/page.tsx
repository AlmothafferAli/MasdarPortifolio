"use client";

import { PageResponse, IPartnerRequest } from "@/app/features/Type/Interfaces";
import { skipToken } from "@reduxjs/toolkit/query/react";

import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import UpdateCompany from "./forms/updateCompany";
import CreateProjects from "./forms/createProjects";
import CreateServices from "./forms/createServices";

import ProjectAdminCard from "./ui/ProjectAdmin";
import { useGetAllProjectsQuery } from "@/app/features/Api/projectsApi";

import { useGetAllServicesQuery } from "@/app/features/Api/ServicesApi";

import ServiceAdmin from "./ui/ServicesCard";
import FetchCompany from "./ui/fetchCompany";
import { RootState } from "@/app/features/Store";
import CreatePartners from "./forms/createPartners";
import PartnerAdmin from "./ui/fetchPartners";

import { useGetAllPartnersQuery } from "@/app/features/Api/partnersApi";

import { setDeletedProjectId } from "@/app/features/appSlice/projectSlice";
import Image from "next/image";
import CreateEmployee from "./forms/createEmployee";
import UpdateAbout from "./ui/updateAbout";
import EmployeeCards from "./ui/EmployeeCards";
import { useGetEmployeesQuery } from "@/app/features/Api/EmployeeApi";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";
import CreateFAQ from "./forms/CreateCommunication";
import FAQCards from "./ui/fetchFAQ";
import { useGetAllFAQsQuery } from "@/app/features/Api/FAQApi";
import AboutSection from "./ui/AboutSection";
import LoadingSpinner from "./ui/LoadingSpinner";

export default function AdminPage() {
  const [activeItem, setActiveItem] = useState<string>("setup");
  const [isEditAbout, setIsEditAbout] = useState(false);
  const [text, setText] = useState("اعداد الرئيسية");
  const [buttonText, setButtonText] = useState("تعديل الرئيسية");
  const [isAddProject, setIsAddProject] = useState(false);
  const [isAddService, setIsAddService] = useState(false);
  const [isAddPartner, setIsAddPartner] = useState(false);
  const [isEditMain, setIsEditMain] = useState(false);
  const [isAddEmployee, setIsAddEmployee] = useState(false);
  const [isAddCommunication, setIsAddCommunication] = useState(false);  
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { data: employeesData, isLoading: isLoadingEmployees } = useGetEmployeesQuery(
    activeItem === "employees" ? {
      pageNumber: page,
      pageSize: 10,
    } : skipToken
  );
  const { data: projectsData, isLoading: isLoadingProjects } = useGetAllProjectsQuery(
    activeItem === "projects" ? {
      pageNumber: page,
      pageSize: 10,
    } : skipToken
  );
  const { data: servicesData, isLoading: isLoadingServices } = useGetAllServicesQuery(
    activeItem === "services" ? {
      pageNumber: page,
      pageSize: 10,
    } : skipToken
  );
  const { data: partnersData, isLoading: isLoadingPartners } = useGetAllPartnersQuery(
    activeItem === "partners" ? {
      pageNumber: page,
      pageSize: 10,
    } : skipToken
  );
  
  const { data: faqsData, isLoading: isLoadingFAQs } = useGetAllFAQsQuery(
    activeItem === "communication" ? {
      pageSize: 10,
      pageNumber: page
    } : skipToken
  );
  
  const employees = useMemo(() => employeesData?.data ?? [], [employeesData]);
  const projects = useMemo(() => projectsData?.data ?? [], [projectsData]);
  const services = useMemo(() => servicesData?.data ?? [], [servicesData]);
  const partners = useMemo(
    () => (partnersData as PageResponse<IPartnerRequest>)?.data ?? [],
    [partnersData]
  );
  const faqs = useMemo(() => faqsData?.data ?? [], [faqsData]);
  const company = useSelector((state: RootState) => state.company.company);
  
  const handleButtonClick = () => {
    switch (activeItem) {
      case "setup":
        setIsEditMain(!isEditMain);
        break;
      case "about":
        setIsEditAbout(!isEditAbout);
        break;
      case "projects":
        setIsAddProject(!isAddProject);
        break;
      case "employees":
        setIsAddEmployee(!isAddEmployee);
        break;
      case "services":
        setIsAddService(!isAddService);
        break;
      case "partners":
        setIsAddPartner(!isAddPartner);
        break;
      case "communication":
        setIsAddCommunication(!isAddCommunication);
        break;
    }
  };

  useEffect(() => {
    switch (activeItem) {
      case "setup":
        setText("اعداد الرئيسية");
        setButtonText("تعديل الرئيسية");
        setPage(1);
        break;
      case "about":
        setText("لمحة عن الشركة");
        setButtonText("تعديل عن الشركة");
        setPage(1);
        break;
      case "projects":
        setText("المشاريع");
        setButtonText("إضافة مشروع جديد");
        setPage(1);
        break;
      case "employees":
        setText("الموظفين");
        setButtonText("إضافة موظف جديد");
        setPage(1);
        break;
      case "services":
        setText("الخدمات");
        setButtonText("إضافة خدمة جديدة");
        setPage(1);
        break;
      case "partners":
        setText("الشركاء");
        setButtonText("إضافة شريك جديد");
        setPage(1);
        break;
      case "communication":
        setText("اعداد التواصل");
        setButtonText("تعديل التواصل");
        setPage(1);
        break;
      default:
        setText("اعداد الرئيسية");
        setButtonText("تعديل الرئيسية");
        setPage(1);
    }
  }, [activeItem]);

  return ( 
    <div className="flex flex-col md:flex-col lg:flex-row-reverse h-screen bg-gray-100">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      {/* Main Content */}
      <div className={`flex-1 bg-gray-50 lg:absolute lg:inset-0 lg:top-0 lg:right-0 z-20 lg:h-full lg:rounded-r-3xl shadow-2xl p-4 lg:p-8 pt-4 lg:pt-8 max-w-full lg:max-w-[calc(100%-200px)] 2xl:max-w-[calc(100%-230px)] flex flex-col gap-4 md:gap-6`}>
        <Header 
          text={text} 
          buttonText={buttonText} 
          onButtonClick={handleButtonClick} 
        />

        {/* Content */}
        {activeItem !== "setup" && (
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 h-full overflow-hidden">
            {/* Content will be rendered here based on activeItem */}
            {activeItem === "projects" && (
              <div className="flex flex-col justify-between h-full">
                {isLoadingProjects ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 overflow-y-auto pb-8 mt-4 md:mt-6">
                      {projects.map((project) => (
                        <ProjectAdminCard
                          key={project.id}
                          id={project.id}
                          title={project.name}
                          description={project.description}
                          image={project.image}
                          buttonName="عرض التفاصيل"
                          onDelete={() => {
                            dispatch(setDeletedProjectId(project.id));
                          }}
                        >
                          <Image
                            className="w-6 h-6 rounded-full"
                            src={"http://192.168.77.191:8081/" + project.logo}
                            alt="logo"
                            width={24}
                            height={24}
                          />
                        </ProjectAdminCard>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() => page > 1 && setPage(page - 1)}
                        className="w-full sm:w-auto bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        السابق
                      </button>
                      <button
                        onClick={() => !projectsData?.isLast && setPage(page + 1)}
                        className="w-full sm:w-auto bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        التالي
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {activeItem === "about" && (
              <AboutSection about={company.about} aboutImage={company.aboutImage} />
            )}
            {activeItem === "partners" && (
              <div className="flex flex-col justify-between h-full">
                {isLoadingPartners ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 overflow-y-auto max-h-[62vh] pb-8 mt-4 md:mt-6">
                      {partners.map((partner: IPartnerRequest) => (
                        <PartnerAdmin
                          key={partner.id}
                          id={partner.id}
                          name={partner.name}
                          logo={partner.logo}
                          website={partner.website}
                          introduction={partner.introduction}
                          buttonName="عرض التفاصيل"
                        />
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() => page > 1 && setPage(page - 1)}
                        className="w-full sm:w-auto bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        السابق
                      </button>
                      <button className="w-full sm:w-auto bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
                        onClick={() => !partnersData?.isLast && setPage(page + 1)}
                      >
                        التالي
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
            {activeItem === "communication" && (
              <div className="flex flex-col justify-between h-full">
                {isLoadingFAQs ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 overflow-y-auto max-h-[62vh] pb-8 mt-4 md:mt-6">
                      {faqs.map((faq) => (
                        <FAQCards key={faq.id} faq={faq} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            {activeItem === "employees" && (
              <div className="flex flex-col justify-between h-full">
                {isLoadingEmployees ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 overflow-y-auto max-h-[62vh] pb-8 mt-4 md:mt-6">
                      {employees.map((employee) => (
                        <EmployeeCards
                          key={employee.id}
                          employee={employee}
                          buttonName="عرض التفاصيل"
                        />
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() => page > 1 && setPage(page - 1)}
                        className="w-full sm:w-auto bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        السابق
                      </button>
                      <button
                        onClick={() => !employeesData?.isLast && setPage(page + 1)}
                        className="w-full sm:w-auto bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        التالي
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeItem === "services" && (
              <div className="flex flex-col justify-between h-full" dir="rtl">
                {isLoadingServices ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 mt-4 md:mt-6 px-2 md:px-8 overflow-y-auto max-h-[62vh] pb-8">
                      {services.map((service) => (
                        <ServiceAdmin
                          key={service.id}
                          id={service.id}
                          title={service.name}
                          description={service.description}
                          image={service.image}
                          buttonName="عرض التفاصيل"
                          link={service.link}
                          benefits={service.benefits}
                          features={service.features}
                          price={service.price}
                          summary={service.summary}
                        />
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                      <button
                        onClick={() => page > 1 && setPage(page - 1)}
                        className="w-full sm:w-auto bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        السابق
                      </button>
                      <button
                        onClick={() => !servicesData?.isLast && setPage(page + 1)}
                        className="w-full sm:w-auto bg-[#31a4dc] hover:bg-[#1e88e5] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 text-sm sm:text-base"
                      >
                        التالي
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}
        {activeItem === "setup" && <FetchCompany />}
        {isEditMain && (
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
            <UpdateCompany setIsEditMain={setIsEditMain} />
          </div>
        )}
        {isEditAbout && (
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
            <UpdateAbout
              setIsEditAbout={setIsEditAbout}
              company={{
                ...company,
                id: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
              }}
            />
          </div>
        )}
        {isAddProject && (
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
            <CreateProjects setIsAddProject={setIsAddProject} />
          </div>
        )}
        {isAddService && (
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
            <CreateServices setIsAddService={setIsAddService} />
          </div>
        )}
        {isAddPartner && (
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
            <CreatePartners setIsAddPartner={setIsAddPartner} />
          </div>
        )}
        {isAddEmployee && (
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
            <CreateEmployee setIsAddEmployee={setIsAddEmployee} />
          </div>
        )}
        {isAddCommunication && (
          <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
            <CreateFAQ setIsAddFAQ={setIsAddCommunication} />
          </div>
        )}
      </div>

    </div>
  );
}
