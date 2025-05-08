import { createSlice, PayloadAction, Draft } from "@reduxjs/toolkit";

interface UpdateState<T> {
  editedUpdate: T | null;
  editedUpdateId: string;
}

const createUpdateSlice = <T>() => {
  const initialState: UpdateState<T> = {
    editedUpdate: null,
    editedUpdateId: "",
  };

  return createSlice({
    name: "update",
    initialState,
    reducers: {
      setEditedUpdate: (
        state: Draft<UpdateState<T>>,
        action: PayloadAction<T>
      ) => {
        state.editedUpdate = action.payload as Draft<T>;
      },
      setEditedIDUpdate: (
        state: Draft<UpdateState<T>>,
        action: PayloadAction<string>
      ) => {
        state.editedUpdateId = action.payload;
      },
      clearUpdate: (state: Draft<UpdateState<T>>) => {
        state.editedUpdate = null;
        state.editedUpdateId = "";
      },
    },
  });
};

export const updateSlice = createUpdateSlice();
export const { setEditedUpdate, setEditedIDUpdate, clearUpdate } =
  updateSlice.actions;
export default updateSlice.reducer;
