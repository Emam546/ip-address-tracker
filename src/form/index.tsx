import { AddressActions, useAppSelector } from "../store";
import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import LoadingCircle from "../loading";
function ValidateIPaddress(ip: string) {
    if (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
            ip
        )
    ) {
        return true;
    }
    return false;
}
export default function Header() {
    const data = useAppSelector((state) => state.address.data);
    const container = useRef<HTMLDivElement>(null);
    const dataContainer = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const resize = () => {
            if (container.current && dataContainer.current) {
                container.current.style.height =
                    dataContainer.current.offsetHeight / 2 + "px";
            }
        };
        window.addEventListener("resize", resize);
        resize();
    }, [container, dataContainer, data]);
    return (
        <>
            <nav className="relative z-10 bg-[url('./images/pattern-bg-mobile.png')] md:bg-[url('./images/pattern-bg-desktop.png')] bg-cover bg-no-repeat px-7">
                <h1 className="text-center text-white py-8 text-3xl font-semibold">
                    IP Address Tracker
                </h1>
                {error && (
                    <h4 className="text-center py-4 text-xl font-semibold">
                        A Wrong Ip Address Formate
                    </h4>
                )}

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        const data = new FormData(event.currentTarget);
                        const ip = data.get("ip");
                        if (typeof ip == "string" && ValidateIPaddress(ip)) {
                            dispatch(AddressActions.setIp(ip));
                            setError(false);
                        } else {
                            setError(true);
                        }
                    }}
                    action="#"
                    autoComplete="off"
                    className="min-h-[4rem] rounded-xl max-w-lg mx-auto bg-white overflow-hidden flex text-lg  mb-10"
                >
                    <input
                        type="text"
                        name="ip"
                        className="flex-1 px-6 font-medium border-none focus:outline-none min-w-0"
                        defaultValue={data?.ip}
                    />
                    <button
                        type="submit"
                        className="flex flex-shrink-0 justify-center items-center bg-very-dark-gray hover:bg-very-dark-gray/60 border-none px-7"
                    >
                        <img
                            src="./images/icon-arrow.svg"
                            className="w-4 "
                            alt="Arrow"
                        />
                    </button>
                </form>

                {data && (
                    <div
                        ref={container}
                        className="relative"
                    >
                        <div className="absolute w-full top-[100%] left-0 translate-y-[-50%]">
                            <div
                                ref={dataContainer}
                                className="px-6 z-[100] py-10  bg-white rounded-xl text-center mx-auto md:text-left md:w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6"
                            >
                                <div className="px-3">
                                    <>
                                        <h4 className="text-dark-gray tracking-[2.0px] font-medium text-xs">
                                            IP ADDRESS
                                        </h4>
                                        <h1 className="text-very-dark-gray text-2xl font-bold mt-2 tracking-wide break-words">
                                            {data.ip}
                                        </h1>
                                    </>
                                </div>
                                <div className="px-3">
                                    <>
                                        <h4 className="text-dark-gray tracking-[2.0px] font-medium text-xs">
                                            LOCATION
                                        </h4>
                                        <h1 className="text-very-dark-gray text-2xl font-bold mt-2 tracking-wide break-words">
                                            {data.location.region}
                                        </h1>
                                    </>
                                </div>
                                <div className="px-3">
                                    <>
                                        <h4 className="text-dark-gray tracking-[2.0px] font-medium text-xs">
                                            TIMEZONE
                                        </h4>
                                        <h1 className="text-very-dark-gray text-2xl font-bold mt-2 tracking-wide break-words">
                                            UTC {data.location.timezone}
                                        </h1>
                                    </>
                                </div>
                                <div className="px-3">
                                    <>
                                        <h4 className="text-dark-gray tracking-[2.0px] font-medium text-xs">
                                            ISP
                                        </h4>
                                        <h1 className="text-very-dark-gray text-2xl font-bold mt-2 tracking-wide break-words">
                                            {data.isp}
                                        </h1>
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
