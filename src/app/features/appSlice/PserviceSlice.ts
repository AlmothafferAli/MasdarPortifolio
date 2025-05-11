import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IPartnerDto,
  IPServiceDto,
  IPserviceResponse,
} from "../Type/Interfaces";

interface PserviceState {
  selectedPserviceId: string;
  deletedPservicesId: string[];
  selectedPservice: IPserviceResponse;
  editedPservice: IPserviceResponse;
  isEditingPservice: boolean;
}

const initialState: PserviceState = {
  selectedPserviceId: "",
  deletedPservicesId: [],
  isEditingPservice: false,
  selectedPservice: {
    name: "",
    description: "",
    image: "",
  },
  editedPservice: {
    name: "",
    description: "",
    image: "",
  },
};

export const pserviceSlice = createSlice({
  name: "pservice",
  initialState,
  reducers: {
    setSelectedPserviceId: (state, action: PayloadAction<string>) => {
      state.selectedPserviceId = action.payload;
    },
    setIsEditingPservice: (state, action: PayloadAction<boolean>) => {
      state.isEditingPservice = action.payload;
    },
    setDeletedPserviceId: (state, action: PayloadAction<string>) => {
      state.deletedPservicesId.push(action.payload);
    },

    setSelectedPservice: (state, action: PayloadAction<IPserviceResponse>) => {
      state.selectedPservice = action.payload;
    },
    setEditedPservice: (state, action: PayloadAction<IPserviceResponse>) => {
      state.editedPservice = action.payload;
    },
  },
});

export const {
  setSelectedPserviceId,
  setDeletedPserviceId,
  setSelectedPservice,
  setEditedPservice,
  setIsEditingPservice,
} = pserviceSlice.actions;
export default pserviceSlice.reducer;
