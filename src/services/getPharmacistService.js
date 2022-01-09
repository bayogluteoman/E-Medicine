import axios from "axios";

export default class getPharmacistService{
    getPharmacist(userMail){
        return axios.get(`https://sethy.herokuapp.com/pharmacist/${userMail}`)
    }
}