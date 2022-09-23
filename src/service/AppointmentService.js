import axios from 'axios';

export class AppointmentService{
    baseUrl = "http://localhost:8080/appointments"
    getAll(){
        return axios.get(this.baseUrl).then(res => res.data)
    }

    save(appointment){
        return axios.post(this.baseUrl, appointment).then(res => res.data);
    }
    update(appointment){
        return axios.put(this.baseUrl, appointment).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl+ "/" + id).then(res=> res.data);
    }
}