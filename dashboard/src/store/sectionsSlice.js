import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sections: [],
  stats: {},
  subSections:[]
};

export const SectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    getSections: (state, action) => {
      const { category, stats } = action.payload;
      state.sections = category;
      state.stats = stats;
    },
    deletSection: (state, action) => {
      state.sections = state.sections.filter(
        (section) => section._id !== action.payload
      );
    },
    addSection: (state, action) => {
      state.sections.push(action.payload);
    },
    addSubSection: (state, action) => {
        state.subSections.push(action.payload);
      },
      getSubSections: (state, action) => {
        state.subSections = action.payload;

      },
      deletSubSection: (state, action) => {
        state.subSections = state.subSections.filter(
          (sub) => sub._id !== action.payload
        );
      },
  
  },
});

export const { getSections, deletSection, addSection, addSubSection, getSubSections, deletSubSection } =
  SectionsSlice.actions;
export default SectionsSlice.reducer;
