import { createSlice } from "@reduxjs/toolkit";


const initialstate = {
    trendingmovie :[],
    popularmovie :[],
    topratedmovie :[],
};

export const trendingSlice = createSlice({
    name: "trending",
    initialState: initialstate,
    reducers: {
        settrending: (state, action)=>{
            state.trendingmovie = action.payload
        },
        setpopular : (state,action)=>{
            state.popularmovie = action.payload
        },
        settoprated : (state, action)=>{
            state.topratedmovie = action.payload
        }
    }
})
export const {settrending, setpopular, settoprated} = trendingSlice.actions;
export default trendingSlice.reducer