import { createSlice } from "@reduxjs/toolkit";


const initialstate = {
    trendingmovie: [],
    popularmovie: [],
    topratedmovie: [],
    movieinfo: [],
    credits: {},
    similar: [],
    recommendations: [],
};

export const trendingSlice = createSlice({
    name: "trending",
    initialState: initialstate,
    reducers: {
        settrending: (state, action) => {
            state.trendingmovie = action.payload
        },
        setpopular: (state, action) => {
            state.popularmovie = action.payload
        },
        settoprated: (state, action) => {
            state.topratedmovie = action.payload
        },
        setinfo: (state, action) => {
            state.movieinfo = action.payload
        },
        setcredits: (state, action) => {
            state.credits = action.payload
        },
        setsimilar: (state, action) => {
            state.similar = action.payload
        },
        setrecommendations: (state, action) => {
            state.recommendations = action.payload
        },
    }
})
export const { settrending, setpopular, settoprated, setinfo, setcredits, setsimilar, setrecommendations } = trendingSlice.actions;
export default trendingSlice.reducer