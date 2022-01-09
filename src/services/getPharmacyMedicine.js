import axios from "axios";

export default class getPharmacyMedicine{
    getPharmacyMedicine(pharmacyId){
        return axios.get(`https://sethy.herokuapp.com/medicines/pharmacy/${pharmacyId}`)
    }
}