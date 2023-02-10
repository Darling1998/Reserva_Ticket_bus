import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(private http:HttpClient,private serUtil:UtilsService){ }



  consultaPasaje(data: any){
    const URL = this.serUtil.URL_API + 'consultaDisponibilidad';
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  getCiudades(){
    const URL = this.serUtil.URL_API + 'ciudades';
    return this.http.get<any>(URL);
  }

  getAsientos(id_bus:any){
    const URL =  this.serUtil.URL_API  + "asientos/" + id_bus;
    return this.http.get<any>(URL);
  }


  getReservas(id_usuario:any){
    const URL =  this.serUtil.URL_API  + "reservas/" + id_usuario;
    return this.http.get<any>(URL);
  }

  getInfoReservaInd(id_usuario:any,id_viaje:number){
    const URL =  this.serUtil.URL_API  + "reservasInd/" + id_usuario +"/"+id_viaje;
    return this.http.get<any>(URL);
  }

  getInfoAsientos(id_usuario:any,id_horario:any){
    console.log(id_horario,id_usuario);
    
    const URL =  this.serUtil.URL_API  + "reservasAsientos/" + id_usuario+"/"+id_horario;
    return this.http.get<any>(URL);
  }
  postReservar(data: any){
    console.log(data); 
    const URL = this.serUtil.URL_API + 'reservar';
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

}
