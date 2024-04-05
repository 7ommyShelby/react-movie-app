import { configureStore } from "@reduxjs/toolkit";
import trendreducer from '../redux/slice/trendingslice'


export const store = configureStore({
    reducer: trendreducer
});