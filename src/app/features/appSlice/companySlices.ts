import { createSlice } from "@reduxjs/toolkit";
import { ICompanyRequest, ICompanyResponse } from "../Type/Interfaces";
import CompanyApi from "../Api/CompanyApi";

export interface ICompanyState {
  company: ICompanyRequest;
  UCompany: ICompanyResponse;
}

const initialState: ICompanyState = {
  company: {
    id: "0",
    name: "مصدر لتكنولوجيا المعلومات",
    description: "مصدر لتكنولوجيا المعلومات",
    words: [],
    about: "",
    aboutImage: "",
  } as ICompanyRequest,
  UCompany: {
    id: "0",
    name: "مصدر لتكنولوجيا المعلومات",
    description: "مصدر لتكنولوجيا المعلومات",
    words: [],
    about: "",
    aboutImage: "",
  } as ICompanyResponse,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    setUCompany: (state, action) => {
      state.UCompany = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      CompanyApi.endpoints.getCompany.matchFulfilled,
      (state, { payload }) => {
        state.UCompany = payload;
      }
    );
  },
});

export const { setCompany, setUCompany } = companySlice.actions;
export default companySlice.reducer;
