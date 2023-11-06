import API from "../../utils/axios"
import { IPatient } from "../patients/patientModel";

export const  getVotPatient  = async () => {
    const username = sessionStorage.getItem("userid");
    return await API.post("/votpatients/get", { username });
}

export const addPatient = async (patient: IPatient) => {
    return await API.post("/votpatients/add",  patient);
}