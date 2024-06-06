import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  movieId?: string;
}

const initialState: ModalState = {
  isOpen: false,
  movieId: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.movieId = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.movieId = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
