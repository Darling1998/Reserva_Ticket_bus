import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { StorageService } from 'src/app/servicios/storage.service';
import * as moment from 'moment';
import { UtilsService } from 'src/app/servicios/utils.service';
import {  ModalController } from '@ionic/angular';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.scss'],
})
export class AsientosComponent implements OnInit {

  id_horario:number;      
  @Input() id_viaje: any;
  @Input() id_bus: any;
  @Input() tarifa: any;
  array:any[];
  arrayUltimosAsientos:any[];
  arrayAsientosInfo:any[]=[];
  aux:number;

  constructor(
    private servR:ReservaService,
    private serStorage:StorageService,
    private serU:UtilsService,
    private modalCtrl:ModalController,
  ) { }

  ngOnInit() {
    //this.id_bus
    this.cargarAsientos();
  }

  cargarAsientos(){
    this.servR.getAsientos(this.id_bus).subscribe(
      res=>{
        console.log(res); //imprime todo
        this.arrayAsientosInfo=res.data.info;
        console.log(res.cantidad,this.arrayAsientosInfo);
      }
    );
  }

  reservar(fReserva: NgForm){
    let numeroAsientos = []; //numero Asientos seleccionados
    for (var key in fReserva.form.value) {
      if(fReserva.form.value[key]===false){
        let string=key;             //Obtengo el numero de Asiento
        numeroAsientos.push({'idAsiento':string.replace(/[^0-9]+/g, "")});
      }
    }    
    console.log(numeroAsientos);

    let fecha= new Date();
    let infoReserva={
      idAsientos:numeroAsientos,
      idHorario:this.id_viaje,
      idUsuario:this.serStorage.get("user").id_usuario,
      tarifa:this.tarifa,
      monto: this.tarifa*(numeroAsientos.length),
      fecha:moment(fecha).format('YYYY-MM-DD'),
      idBus:this.id_bus,
    }
   
    if(numeroAsientos.length ===0){
      this.serU.mostrarMessage("Seleccione asientos","warning");
    }else{
      this.servR.postReservar(infoReserva).subscribe(
        res=>{
          this.serU.mostrarMessage("Asientos Reservados Correctamente")
          this.modalCtrl.dismiss({
            message:"Revisa tus reservas"
          });
        }
      );
    }
    
    }


    cancelar(){
      this.modalCtrl.dismiss();
    }

}
