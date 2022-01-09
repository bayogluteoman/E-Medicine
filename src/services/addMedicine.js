import axios from "axios";

export default class addMedicine {
  postMedicine(values, pharmacyId) {
    return axios.post(
      `https://sethy.herokuapp.com/medicines/${pharmacyId}`,
      values
    );
  }
}
