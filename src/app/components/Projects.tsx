import { motion } from "framer-motion";

import ProjectCard from "./EleComponents/ProjectCard";
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

  const color = [
    "bg-gradient-to-br from-blue-500 to-blue-700 ",
    "bg-gradient-to-br from-red-500 to-red-700 ",
    "bg-gradient-to-br from-green-500 to-green-700",
    "bg-gradient-to-br from-yellow-500 to-yellow-700",
    "bg-gradient-to-br from-purple-500 to-purple-700",
    "bg-gradient-to-br from-pink-500 to-pink-700",
  ];
  // useEffect(() => {
  //   fetchProjects();
  // }, [fetchProjects]);

  return (
    <section
      className="py-24 lg:py-32 w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-darkSecondary overflow-visible"
      id="projects"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-200px 0px -200px 0px" }}
        className="container mx-auto px-4"
        dir="rtl"
      >
        <div className="text-right mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{
              once: true,
              margin: "-100px 0px -100px 0px",
              amount: 0.2,
            }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-DarkPrimary dark:text-white inline-block relative"
          >
            مشاريعنا
            <span className="absolute -bottom-3 right-0 w-1/2 h-1 bg-DarkPrimary"></span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.name}
                description={project.description}
                image={project.image}
                className={color[index % 6]}
                buttonName="اقرئ المزيد"
              >
                <FaStoreAlt className="w-6 h-6" />
              </ProjectCard>
            ))
          ) : (
            <div className="col-span-2 text-center py-10">
              <p className="text-xl text-gray-500">
                لا توجد مشاريع متاحة حالياً
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
