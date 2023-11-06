// import axios from "axios";
import API from "../../utils/axios"

export const loginApi = async ({username, password} : { username: string, password: string })  => {
    return await API.post('https://theunion.eastasia.cloudapp.azure.com/api/auth/signin', {username, password});
}