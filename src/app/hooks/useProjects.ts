import {
  useAddProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
} from "../features/Api/projectsApi";
import {
  IProject,
  IProjectRequest,
  IProjectResponse,
  PageResponse,
} from "../features/Type/Interfaces";
import { toast } from "react-toastify";
import { setDeletedProjectId } from "../features/appSlice/projectSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../features/Store";
export const useProjects = () => {
  const company = useSelector((state: RootState) => state.company.UCompany);
  const [addProject, { isLoading: isAddingProject, error: addProjectError }] =
    useAddProjectMutation();
  const {
    data: projects,
    isLoading: isFetchingProjects,
    error: fetchProjectsError,
  } = useGetAllProjectsQuery(
    { pageNumber: 1, pageSize: 10, companyId: company.id },
    {
      skip: !company?.id,
    }
  );
  const [deleteProjectMutation] = useDeleteProjectMutation();
  const dispatch = useDispatch();

  const createProject = async (project: IProjectRequest) => {
    try {
      const response: IProjectResponse = await addProject(project).unwrap();
      return response;
    } catch (error) {
      console.table(error);
    }
  };

  const getAllProjects = async (): Promise<
    PageResponse<IProject> | undefined
  > => {
    try {
      if (!projects) return undefined;
      return projects;
    } catch (error) {
      console.table(error);
      return undefined;
    }
  };
  const deleteProject = async (id: string): Promise<void> => {
    try {
      await deleteProjectMutation(id);
      toast.success("Project deleted successfully");
      dispatch(setDeletedProjectId(id));
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  };
  return {
    createProject,
    projects,
    isFetchingProjects,
    fetchProjectsError,
    isAddingProject,
    addProjectError,
    getAllProjects,
    deleteProject,
  };
};
