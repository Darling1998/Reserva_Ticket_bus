import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { StorageService } from 'src/app/servicios/storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.scss'],
})
export class AsientosComponent implements OnInit {
  numeroAsientos:number; //numero de asientos totales
  filas:number;           //numero de filas del bus con respecto al numero de asientos
  ultimosAsientos:number; //ultimos asientos
  id_bus:number;   
  id_horario:number;       //id_bus
  @Input() asientos: any;
  tarifa:number;

  array:any[];
  arrayUltimosAsientos:any[];
  arrayAsientosInfo:any[]=[];


  constructor(private servR:ReservaService,private serStorage:StorageService) { }


  ngOnInit() {
    this.id_bus=this.asientos[0].id_bus;
    this.id_horario=this.asientos[0].id_viaje;
    this.tarifa=this.asientos[0].tarifa;
    console.log(this.asientos[0]);
/*     console.log(this.asientos[0].id_bus);
    this.numeroAsientos=this.asientos[0].capacidad;
    this.filas= this.numeroAsientos/4; //se divide para 4 por son 2 asientos por 2 columnas en un bus
    this.ultimosAsientos= this.numeroAsientos%4;
    this.array = Array(Math.trunc(this.filas)  ).fill(Array(4).fill(0));  
    this.arrayUltimosAsientos = Array(this.ultimosAsientos ).fill(Array(4).fill(0)); */
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
    let numeroAsientos = [];
    //console.log(fReserva.form.value); //numeros Asientos del Formulario
    for (var key in fReserva.form.value) {
      //console.log(key);                     //obtengo la propiedad
      //console.log(fReserva.form.value[key]); //obtengo el valor
      if(fReserva.form.value[key]===false){
        let string=key;                       //Obtengo el numero de Asiento
        numeroAsientos.push({'idAsiento':string.replace(/[^0-9]+/g, "")});
      }
    }    
    console.log(numeroAsientos);
    //Guardar Reserva

    let fecha= new Date();

    
    let infoReserva={
      idAsientos:numeroAsientos,
      idHorario:this.id_horario,
      idUsuario:this.serStorage.get("user").id_usuario,
      tarifa:this.tarifa,
      monto: this.tarifa*(numeroAsientos.length),
      fecha:moment(fecha).format('YYYY-MM-DD'),
      idBus:this.id_bus,
    }
   
    console.log(infoReserva);
    
     this.servR.postReservar(infoReserva).subscribe(
      res=>{
        console.log(res);
      }
    ) 
  }



}
