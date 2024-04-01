import { useQuery } from "react-query";
import "./App.scss";
import Header from "./form/index";
import Mapper from "./mapper";
import { useAppSelector, AddressActions } from "./store";
import { GetIp, GetIpData } from "./Api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import LoadingCircle from "./loading";
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
        queryFn: () => GetIpData(address!),
        enabled: address != null,
        retry: 0,
        onSuccess(data) {
            dispatch(AddressActions.setData(data));
        },
    });

    useEffect(() => {
        dispatch(
            AddressActions.setLoadingState(
                query.isLoading && getCurIp.isLoading
            )
        );
    }, [query.isLoading]);
    useEffect(() => {
        if (query.isError) dispatch(AddressActions.setError(query.error));
        else dispatch(AddressActions.setError(null));
    }, [query.isError]);
    if (getCurIp.isLoading)
        return (
            <div className="h-screen flex justify-center items-center flex-col px-4 max-w-full">
                <LoadingCircle />
                {query.isError && (
                    <h2 className="text-center max-w-full break-words text-warning font-bold mt-5">
                        {JSON.stringify(getCurIp.error)}
                    </h2>
                )}
            </div>
        );
    return (
        <>
            <Header />
            <Mapper />
        </>
    );
}

export default App;
