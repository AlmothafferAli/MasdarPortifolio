import { motion } from "framer-motion";

import ProjectCard from "./ProjectCard";
import { FaStoreAlt } from "react-icons/fa";

import { useGetAllProjectsQuery } from "../features/Api/projectsApi";

export default function Projects() {
  // const { getAllProjects } = useProjects();
  // const [projects, setProjects] = useState<IProject[]>([]);
  // console.log(projects);
  // const fetchProjects = async () => {
  //   const data = await getAllProjects();
  //   if (data) setProjects(data);
  // };

  const { data } = useGetAllProjectsQuery({ PageNumber: 1, PageSize: 10 });

  const projects = data?.data ?? [];

  const cardColors = [
    "bg-gradient-to-br from-blue-500 to-blue-600",
    "bg-gradient-to-br from-purple-500 to-purple-600",
    "bg-gradient-to-br from-pink-500 to-pink-600",
    "bg-gradient-to-br from-green-500 to-green-600",
    "bg-gradient-to-br from-orange-500 to-orange-600",
    "bg-gradient-to-br from-teal-500 to-teal-600",
  ];
  // useEffect(() => {
  //   fetchProjects();
  // }, [fetchProjects]);

  return (
    <section
      className="py-24 w-full bg-white dark:bg-gray-900"
      id="projects"
    >
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
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-128 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory scrollbar-hide px-4">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index} className="flex-none w-[400px] snap-center">
                  <ProjectCard
                    title={project.name}
                    description={project.description}
                    image={project.image}
                    buttonName="عرض التفاصيل"
                  />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  لا توجد مشاريع متاحة حالياً
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
          >
            عرض جميع المشاريع
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}
