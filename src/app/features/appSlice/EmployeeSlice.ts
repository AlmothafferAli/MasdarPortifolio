import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployeeDto } from "../Type/Interfaces";

interface EmployeeState {
  selectedEmployeeId: string;
  deletedEmployeesId: string[];
  selectedEmployee: IEmployeeDto;
  editedEmployee: IEmployeeDto;
}

const initialState: EmployeeState = {
  selectedEmployeeId: "",
  deletedEmployeesId: [],
  selectedEmployee: {
    name: "",
    employeeImage: "",
    description: "",
    employeeRole: "",
    companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
  },
  editedEmployee: {
    name: "",
    employeeImage: "",
    description: "",
    employeeRole: "",
    companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
  },
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setSelectedEmployeeId: (state, action: PayloadAction<string>) => {
      state.selectedEmployeeId = action.payload;
    },
    setDeletedEmployeeId: (state, action: PayloadAction<string>) => {
      state.deletedEmployeesId.push(action.payload);
    },

    setSelectedEmployee: (state, action: PayloadAction<IEmployeeDto>) => {
      state.selectedEmployee = action.payload;
    },
    setEditedEmployee: (state, action: PayloadAction<IEmployeeDto>) => {
      state.editedEmployee = action.payload;
    },
  },
});

export const {
  setSelectedEmployeeId,
  setDeletedEmployeeId,
  setSelectedEmployee,
  setEditedEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;
