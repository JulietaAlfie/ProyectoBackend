import axios from "axios";

export class DentistService {
  baseUrl = "http://localhost:8080/dentists";
  config = {
    headers: {
      TOKEN: "123"
    }
  };
  getAll() {
    return axios.get(this.baseUrl).then((res) => res.data.data);
  }

  save(dentist) {
    return axios
      .post(this.baseUrl, dentist, this.config)
      .then((res) => res.data.data);
  }
  update(dentist) {
    return axios
      .put(this.baseUrl + "/" + dentist.id, dentist, this.config)
      .then((res) => res.data.data);
  }

  delete(id) {
    return axios
      .delete(this.baseUrl + "/" + id, this.config)
      .then((res) => res.data);
  }
  search(id) {
    return axios
      .get(this.baseUrl + "/" + id, this.config)
      .then((res) => res.data.data);
  }
}
