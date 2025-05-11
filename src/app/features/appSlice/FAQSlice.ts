import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmployeeDto, IFAQ } from "../Type/Interfaces";

interface FAQState {
  selectedFAQId: string;
  deletedFAQsId: string[];
  selectedFAQ: IFAQ;
  editedFAQ: IFAQ;
}

const initialState: FAQState = {
  selectedFAQId: "",
  deletedFAQsId: [],
  selectedFAQ: {
    question: "",
    answer: "",
    companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
  },
  editedFAQ: {
    question: "",
    answer: "",
    companyId: "08dd88e3-7289-4462-88d6-16d91e81fa0d",
  },
};

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setSelectedFAQId: (state, action: PayloadAction<string>) => {
      state.selectedFAQId = action.payload;
    },
    setDeletedFAQId: (state, action: PayloadAction<string>) => {
      state.deletedFAQsId.push(action.payload);
    },

    setSelectedFAQ: (state, action: PayloadAction<IFAQ>) => {
      state.selectedFAQ = action.payload;
    },
    setEditedFAQ: (state, action: PayloadAction<IFAQ>) => {
      state.editedFAQ = action.payload;
    },
  },
});

export const {
  setSelectedFAQId,
  setDeletedFAQId,
  setSelectedFAQ,
  setEditedFAQ,
} = faqSlice.actions;
export default faqSlice.reducer;
