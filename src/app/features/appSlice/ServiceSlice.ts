import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {

  IServiceUpdateRequest,
} from "../Type/Interfaces";

interface ServiceState {
  selectedServiceId: string;
  deletedServiceId: string[];
  selectedService: IServiceUpdateRequest;
}

const initialState: ServiceState = {
  selectedServiceId: "",
  deletedServiceId: [],
  selectedService: {} as IServiceUpdateRequest,
};

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setSelectedserviceId: (state, action: PayloadAction<string>) => {
      state.selectedServiceId = action.payload;
    },
    setDeletedServiceId: (state, action: PayloadAction<string>) => {
      state.deletedServiceId.push(action.payload);
    },

    setSelectedService: (
      state,
      action: PayloadAction<IServiceUpdateRequest>
    ) => {
      state.selectedService = action.payload;
      
    },
  },
});

export const { setSelectedserviceId, setDeletedServiceId, setSelectedService } =
  serviceSlice.actions;
export default serviceSlice.reducer;
