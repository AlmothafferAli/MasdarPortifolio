import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IProjectUpdateRequest,
} from "../Type/Interfaces";

interface ProjectState {
  selectedProjectId: string;
  deletedProjectsId: string[];
  selectedProject: IProjectUpdateRequest;
  editedProject: IProjectUpdateRequest;
  editedProjectId: string;
}

const initialState: ProjectState = {
  selectedProjectId: "",
  deletedProjectsId: [],
  selectedProject: {
    name: "",
    description: "",
    image: "",
    logo: "",
    images: [],
  },
  editedProject: {
    name: "",
    description: "",
    image: "",
    logo: "",
    images: [],
  },
  editedProjectId: "",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSelectedProjectId: (state, action: PayloadAction<string>) => {
      state.selectedProjectId = action.payload;
    },
    setDeletedProjectId: (state, action: PayloadAction<string>) => {
      state.deletedProjectsId.push(action.payload);
    },
    setSelectedProject: (
      state,
      action: PayloadAction<IProjectUpdateRequest>
    ) => {
      state.selectedProject = action.payload;
    },
    setEditedProject: (state, action: PayloadAction<IProjectUpdateRequest>) => {
      state.editedProject = action.payload;
    },
    setEditedIDProject: (state, action: PayloadAction<string>) => {
      state.editedProjectId = action.payload;
    },
  },
});

export const { setSelectedProjectId, setDeletedProjectId, setSelectedProject, setEditedProject, setEditedIDProject } =
  projectSlice.actions;
export default projectSlice.reducer;
