import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../types";

const initialState: InitialState = {
  peoples: [],
  peopleView: { id: 0, email: "", gender: "", name: "", status: "" },
  error: { error: false, message: "" },
  loading: false,
};
export const ReducerPeople = createSlice({
  name: "People",
  initialState,
  reducers: {
    setPeoples(state, { payload }) {
      state.loading = false;
      state.peoples = [...payload];
    },
    setPeopleView(state, { payload }) {
      state.loading = false;
      state.peopleView = payload;
    },
    setError(state, { payload }) {
      state.error = { ...payload };
    },
    setLoading(state) {
      state.loading = true;
    },
    editPeopleView(state, { payload }) {
      state.peopleView = payload;
    },
  },
});
export const {
  setError,
  setLoading,
  setPeoples,
  setPeopleView,
  editPeopleView,
} = ReducerPeople.actions;
