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
import { Icon } from "leaflet";
import { useAppSelector } from "../store";
import { useEffect } from "react";
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
        if(position){
            console.log("SET");
            map.setView(position,13);
            // map.setZoom(13);
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
    return (
        <>
            <MapContainer
                className="flex-1 relative"
                zoom={13}
            >
                <MapperWrapper />
            </MapContainer>
        </>
    );
}

export default Mapper;
