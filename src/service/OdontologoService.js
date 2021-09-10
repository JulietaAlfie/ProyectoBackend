import axios from 'axios';

export class OdontologoService{
    baseUrl = "http://localhost:8080/odontologos"
    getAll(){
        return  axios.get(this.baseUrl).then(res => res.data);
    }

    save(odontologo){
        return axios.post(this.baseUrl, odontologo).then(res => res.data);
    }
    update(odontologo){
        return axios.put(this.baseUrl, odontologo).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl+ "/" + id).then(res=> res.data);
    }
    search(id){
        return axios.get(this.baseUrl +  "/" + id).then(res => res.data)
    }
}