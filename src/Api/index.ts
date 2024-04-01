import axios from "axios";
import { DataType } from "../store";
export async function GetIp(): Promise<string> {
    const res = await axios.get("https://api.ipify.org?format=json");
    return res.data.ip;
}

export async function GetIpData(ip: string): Promise<DataType> {
    const res = await axios.get(`http://ip-api.com/json/${ip}`, {
        params: {
            auth: "a055f91c-a053-4ffb-b635-c4b3f2f5dc7a",
            ip,
        },
        validateStatus: null,
    });
    console.log(res.data);
    return res.data;
}
