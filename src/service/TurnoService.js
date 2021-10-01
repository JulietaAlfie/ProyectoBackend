import axios from 'axios';

export class TurnoService{
    baseUrl = "http://localhost:8081/turnos"
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data)
    }

    save(turno){
        return axios.post(this.baseUrl, turno).then(res => res.data);
    }
    update(turno){
        return axios.put(this.baseUrl, turno).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl+ "/" + id).then(res=> res.data);
    }
}