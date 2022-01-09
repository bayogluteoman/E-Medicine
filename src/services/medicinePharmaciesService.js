import axios from "axios";

export default class medicinePharmaciesService{
    getMedicinePharmaciesService(medicineId){
        return axios.get(`https://sethy.herokuapp.com/pharmacies/medicine/${medicineId}`)
    }
}