import axios from "axios"


export default class loginService {

    login(loginRequest){
        return axios.post("https://sethy.herokuapp.com/login",loginRequest);
    };

    logout(){
        localStorage.removeItem("token")
        localStorage.removeItem("userMail")
        localStorage.removeItem("role")
    };
    
    getCurrentUser(){
        return JSON.parse(localStorage.getItem("token"));
    };
    
    tokenIsValid(token){
        return axios.get("https://sethy.herokuapp.com/isTokenValid?token="+token);
    }
}
