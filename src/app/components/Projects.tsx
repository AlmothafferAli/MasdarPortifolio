import { motion, useScroll, useTransform } from "framer-motion";

import ProjectCard from "./ProjectCard";
import { FaStoreAlt } from "react-icons/fa";

import { useGetAllProjectsQuery } from "../features/Api/projectsApi";

// Example project data
const exampleProjects = [
  {
    id: 1,
    name: "مشروع تطوير الموقع الإلكتروني",
    description: "تطوير موقع إلكتروني متكامل مع واجهة مستخدم حديثة وتجربة مستخدم سلسة",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
  },
  {
    id: 2,
    name: "تطبيق الجوال للخدمات",
    description: "تطبيق جوال متكامل يقدم خدمات متنوعة مع واجهة مستخدم سهلة الاستخدام",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 3,
    name: "منصة التعليم الإلكتروني",
    description: "منصة تعليمية متكاملة تقدم محتوى تعليمي عالي الجودة مع أدوات تفاعلية",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 4,
    name: "منصة التعليم الإلكتروني",
    description: "منصة تعليمية متكاملة تقدم محتوى تعليمي عالي الجودة مع أدوات تفاعلية",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 5,
    name: "منصة التعليم الإلكتروني",
    description: "منصة تعليمية متكاملة تقدم محتوى تعليمي عالي الجودة مع أدوات تفاعلية",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 6,
    name: "منصة التعليم الإلكتروني",
    description: "منصة تعليمية متكاملة تقدم محتوى تعليمي عالي الجودة مع أدوات تفاعلية",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 7,
    name: "منصة التعليم الإلكتروني",
    description: "منصة تعليمية متكاملة تقدم محتوى تعليمي عالي الجودة مع أدوات تفاعلية",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  },
  {
    id: 8,
    name: "منصة التعليم الإلكتروني",
    description: "منصة تعليمية متكاملة تقدم محتوى تعليمي عالي الجودة مع أدوات تفاعلية",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
  }

  
];

export default function Projects() {
  // const { getAllProjects } = useProjects();
  // const [projects, setProjects] = useState<IProject[]>([]);
  // console.log(projects);
  // const fetchProjects = async () => {
  //   const data = await getAllProjects();
  //   if (data) setProjects(data);
  // };

  const { data } = useGetAllProjectsQuery({ PageNumber: 1, PageSize: 10 });

  // Use example data if no data is fetched
  const projects = data?.data && data.data.length > 0 ? data.data : exampleProjects;

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
    <section
      className="py-16 md:py-24 w-full"
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
                      mass: 1
                    }
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
