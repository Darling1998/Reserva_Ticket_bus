import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { AsientosComponent } from 'src/app/componentes/asientos/asientos.component';
import { Ciudad } from 'src/app/interfaces/interfaces';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  nombre:any;
  buscando = true;
  objReserva:any={
    origen:'',
    destino:'',
    fecha:'',
    hora:'',
    horaA:'',
  }

  ciudades:Ciudad[]=[];
  viajes:any[]=[];
  idOrigen:number;
  idDestino:number;


  constructor(
    private serv:ReservaService,
    private serUtil:UtilsService,
    private router: Router,
    private modalCtrl:ModalController,
    private serStorage:StorageService
    ) {}

  ngOnInit() {
    this.nombre = this.serStorage.get("user").nombre; 
    this.serv.getCiudades().subscribe(
      res=>{ this.ciudades=res.data.info;}
    )
  }

  //metodo de las flechitas
  cambiarData(){ 
  }

  cambioFecha(event?:any){
    let fecha= event.detail.value;
    this.objReserva.fecha =moment(fecha).format('YYYY-MM-DD');
    this.objReserva.hora=moment(fecha).format("HH:mm");
    this.objReserva.horaA = moment(fecha).add(10, 'minutes').format("HH:mm");
  }

  buscarPasajes(){
    if(this.objReserva.origen != this.objReserva.destino){
      console.log(this.objReserva);
      
      this.serUtil.mostrarLoading();
      this.serv.consultaPasaje(this.objReserva).subscribe(
        resp => {
           if(resp.id == 0){
            this.serUtil.mostrarMessage(resp.mensaje, "danger");
          } else {
            console.log(this.viajes);
            this.viajes=resp.data.info;
          } 
        },  
      )   
    }else{
      this.serUtil.mostrarMessage("Origen y dsetinos no pueden ser iguales", "danger");
    }
   
    
  }

 async abrirModal(){
    const modal = await this.modalCtrl.create({
      component: AsientosComponent,
      componentProps:{
        asientos:this.viajes
      },cssClass:'modalAsientos'
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log(data);
      
    }
  }

  

}
