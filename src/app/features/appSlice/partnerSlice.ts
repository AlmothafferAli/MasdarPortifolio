import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPartnerDto } from "../Type/Interfaces";

interface PartnerState {
    selectedPartnerId: string;
    deletedPartnersId: string[];
    selectedPartner: IPartnerDto;
    editedPartner: IPartnerDto;
}

const initialState: PartnerState = {
    selectedPartnerId: "",
    deletedPartnersId: [],
    selectedPartner: {
        introduction: "",
        name: "",
        logo: "",
        website: "",
    },
    editedPartner: {
        introduction: "",
        name: "",
        logo: "",
        website: "",
    },
};

export const partnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {
        setSelectedPartnerId: (state, action: PayloadAction<string>) => {
            state.selectedPartnerId = action.payload;
        },
        setDeletedPartnerId: (state, action: PayloadAction<string>) => {
            state.deletedPartnersId.push(action.payload);
        },
        
        setSelectedPartner: (state, action: PayloadAction<IPartnerDto>) => {
            state.selectedPartner = action.payload;
        },
        setEditedPartner: (state, action: PayloadAction<IPartnerDto>) => {
            state.editedPartner = action.payload;
        },
        
    },
});

    export const { setSelectedPartnerId, setDeletedPartnerId, setSelectedPartner } = partnerSlice.actions;
export default partnerSlice.reducer;

