import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export interface DataType {
    query: string;
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
}

const AddressSlice = createSlice({
    name: "address",
    initialState: {
        data: null as DataType | null,
        isLoading: true,
        address: null as string | null,
        error: null as null | any,
    },
    reducers: {
        setData(state, action: { payload: DataType }) {
            state.data = action.payload;
        },
        setIp(state, action: { payload: string }) {
            state.address = action.payload;
        },
        setLoadingState(state, action: { payload: boolean }) {
            state.isLoading = action.payload;
        },
        setError(state, action: { payload: any }) {
            state.error = action.payload;
        },
    },
});

export const AddressActions = AddressSlice.actions;
const store = configureStore({
    reducer: {
        address: AddressSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
