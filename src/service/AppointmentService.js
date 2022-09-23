import axios from 'axios';

export class AppointmentService{
    baseUrl = "http://localhost:8080/appointments"
    config = {
        headers: {
          TOKEN: "123"
        }
      };
    async getAll(){
        const res = await axios.get(this.baseUrl);
        console.log(res);
        return res.data.data;
    }

    save(appointment){
        return axios.post(this.baseUrl, appointment, this.config).then(res => res.data.data);
    }
    update(appointment){
        return axios.put(this.baseUrl+ "/" + appointment.id, appointment, this.config).then(res => res.data.data);
    }

    delete(id){
        return axios.delete(this.baseUrl+ "/" + id, this.config).then(res=> res.data);
    }
}