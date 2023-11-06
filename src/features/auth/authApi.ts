// import axios from "axios";
import API from "../../utils/axios"

export const loginApi = async ({username, password} : { username: string, password: string })  => {
    return await API.post('http://20.255.52.88/api/auth/signin', {username, password});
}