import axios from "axios";

export default class productService{
    getProducts(){
        return axios.get("https://sethy.herokuapp.com/medicines/")
    }
}