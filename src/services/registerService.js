import axios from "axios";

export default class registerService {

    register(registerRequest){
        return axios.post("https://sethy.herokuapp.com/register", registerRequest)
    }
    
}