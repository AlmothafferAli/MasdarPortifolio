import { motion } from "framer-motion";

import ProjectCard from "./ProjectCard";

import { useGetAllProjectsQuery } from "../features/Api/projectsApi";
import PrimaryButton from "./EleComponents/PrimaryButton";
import { useSelector } from "react-redux";
import { RootState } from "../features/Store";
export default function Projects() {
  // const { getAllProjects } = useProjects();
  // const [projects, setProjects] = useState<IProject[]>([]);
  // console.log(projects);
  // const fetchProjects = async () => {
  //   const data = await getAllProjects();
  //   if (data) setProjects(data);
  // };
  const company = useSelector((state: RootState) => state.company.UCompany);
  const { data } = useGetAllProjectsQuery(
    { pageNumber: 1, pageSize: 10, companyId: company?.id || "" },
    {
      skip: !company?.id,
    }
  );

  // Use example data if no data is fetched
  const projects = data?.data;

  const cardColors = [
    "#1E40AF", // deep blue
    "#374151", // slate gray
    "#0F766E", // teal
    "#065F46", // forest green
    "#7C3AED", // deep purple
    "#9F1239", // burgundy
  ];
  // useEffect(() => {
  //   fetchProjects();
  // }, [fetchProjects]);

  return (
    <section className="py-16 md:py-24 w-full" id="projects">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
        dir="rtl"
      >
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            مشاريعنا
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            نقدم لكم مجموعة من أفضل المشاريع التي قمنا بتنفيذها باحترافية عالية
          </p>
        </div>

        <div className="relative">
          {/* Project cards container */}
          <div className="flex overflow-x-auto gap-2 md:gap-8 pb-8  snap-x snap-mandatory scrollbar-hide px-4">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="flex-none w-[300px] md:w-[400px] snap-start"
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                      mass: 1,
                    },
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <ProjectCard
                    title={project.name}
                    description={project.description}
                    image={project.image}
                    buttonName="عرض التفاصيل"
                    color={cardColors[index % cardColors.length]}
                  />
                </motion.div>
              ))
            ) : (
              <div className="w-full text-center py-10">
                <p className="text-xl text-gray-500 ">
                  لا توجد مشاريع متاحة حالياً
                </p>
              </div>
            )}
          </div>
        </div>

        {projects && projects.length > 0 ? (
          <div className="mt-16 text-center">
            <PrimaryButton
              content="عرض المزيد"
              className="bg-DarkPrimary text-white hover:opacity-90 transition-all"
            />
          </div>
        ) : (
          ""
        )}
      </motion.div>
    </section>
  );
}
