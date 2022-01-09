import axios from "axios";

export default class pharmacyService{
    getPharmacy(){
        return axios.get("https://sethy.herokuapp.com/pharmacies/")
    }
}