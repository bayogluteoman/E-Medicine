import axios from "axios";

export default class pharmacyMedicinesService{
    getPharmacyMedicinesService(pharmacyId){
        return axios.get(`https://sethy.herokuapp.com/medicines/pharmacy/${pharmacyId}`)
    }
}