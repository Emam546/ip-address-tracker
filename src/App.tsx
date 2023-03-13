import { useQuery } from "react-query";
import "./App.scss";
import Header from "./form/index";
import Mapper from "./mapper";
import {  useAppSelector, AddressActions } from "./store";
import { GetIp, GetIpData } from "./Api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function App() {
    const dispatch = useDispatch();
    const address = useAppSelector((state) => state.address.address);
    const getCurIp = useQuery({
        queryKey: ["curIp"],
        queryFn: () => GetIp(),
        enabled: address == null,
        onSuccess(ip) {
            dispatch(AddressActions.setIp(ip));
        },
    });
    const query = useQuery({
        queryKey: [address],
        queryFn: () => GetIpData(address || ""),
        enabled: address != null,
        onSuccess(data) {
            dispatch(AddressActions.setData(data));
        },
    });
    useEffect(() => {
        dispatch(AddressActions.setLoadingState(query.isLoading && getCurIp.isLoading));
    }, [query.isLoading]);
    return (
        <>
            <Header />
            <Mapper />
        </>
    );
}

export default App;
