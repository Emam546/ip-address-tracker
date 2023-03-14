import {
    Marker,
    TileLayer,
    MapContainer,
    LayerGroup,
    useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "./style.scss";
import "leaflet/dist/leaflet.css";
import { Icon,latLng } from "leaflet";
import { useAppSelector } from "../store";
import { useEffect } from "react";
import LoadingCircle from "../loading";
const icon = new Icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [46, 56],
});
function MapperWrapper() {
    const position: LatLngExpression | undefined = useAppSelector((state) => {
        if (state.address.data)
            return [
                state.address.data.location.lat,
                state.address.data.location.lng,
            ];
    });
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(latLng(position), 13);
        }
    }, [position]);
    if (!position) return null;
    return (
        <>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                position={position}
                icon={icon}
            />
        </>
    );
}
function Mapper() {
    const loadingState = useAppSelector((state) => state.address.isLoading);
    const error = useAppSelector((state) => state.address.error);
    if (loadingState) {
        <div className="h-screen flex justify-center items-center flex-col px-4 max-w-full bg-[#ddd]">
            <LoadingCircle />
            <h2 className="text-center max-w-full break-words text-warning font-bold mt-5">
                {error && JSON.stringify(error)}
            </h2>
        </div>;
    }
    return (
        <MapContainer
            center={[50,50]}
            zoom={13}
        >
            <MapperWrapper />
        </MapContainer>
    );
}

export default Mapper;
