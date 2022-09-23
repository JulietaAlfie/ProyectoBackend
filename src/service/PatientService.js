import axios from "axios";

export class PatientService {
  baseUrl = "http://localhost:8080/patients";
  config = {
    headers: {
      TOKEN: "123"
    }
  };
  getAll() {
    return axios.get(this.baseUrl).then((res) => res.data.data);
  }

  save(patient) {
    return axios
      .post(this.baseUrl, patient, this.config)
      .then((res) => res.data);
  }
  update(patient) {
    return axios
      .put(this.baseUrl + "/" + patient.id, patient, this.config)
      .then((res) => res.data);
  }

  delete(id) {
    return axios
      .delete(this.baseUrl + "/" + id, this.config)
      .then((res) => res.data);
  }
  search(id) {
    return axios
      .get(this.baseUrl + "/" + id, this.config)
      .then((res) => res.data);
  }
}
