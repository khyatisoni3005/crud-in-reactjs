import { createSlice } from "@reduxjs/toolkit";


const movieSlice = createSlice({
    name: "movie",
    initialState: [],
    reducers: {
        addMovieData(state, action) {
            state.push(action.payload)
        },
        updateMovieData(state, action) {
            state.push(action.payload)
        },
        deleteMovieData(state, action) {
            state.push(action.payload)
        }
    }
})

export const { addMovieData, deleteMovieData, updateMovieData } = movieSlice.actions
export default movieSlice.reducer