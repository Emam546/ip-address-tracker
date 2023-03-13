import axios from "axios";
import { DataType } from "../store";
export async function GetIp(): Promise<string> {
    const res = await axios.get("https://api.ipify.org?format=json");
    return res.data.ip;
}
const domain="http://localhost:3000/api/"
export async function GetIpData(ip:string): Promise<DataType> {
    const res = await axios.get(`${domain}?ipAddress=${ip}`);
    return res.data;
}
