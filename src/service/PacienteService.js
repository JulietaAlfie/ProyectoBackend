import axios from 'axios';

export class PacienteService{
    baseUrl = "http://localhost:8081/pacientes"
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data)
    }

    save(paciente){
        return axios.post(this.baseUrl, paciente).then(res => res.data);
    }
    update(paciente){
        return axios.put(this.baseUrl, paciente).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl+ "/" + id).then(res=> res.data);
    }
    search(id){
        return axios.get(this.baseUrl +  "/" + id).then(res => res.data)
    }
}