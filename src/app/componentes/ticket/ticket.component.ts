import { Component, Input, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {

  informacionqr:any;
  cedula:string;
  nombre:string;
  apellido:string;
  id_usuario:number;
  info:any[]=[];
  asientos:any[]=[];
  auxAsientos:any[]=[];
  numeroA:number=0;
  monto:number=0;
  total:number=0;
  @Input() idHorario: any;

  constructor( 
    private serStorage:StorageService,
    private reser:ReservaService ) { }

  ngOnInit() {
    this.cedula = this.serStorage.get("user").cedula; 
    this.nombre = this.serStorage.get("user").nombre; 
    this.apellido = this.serStorage.get("user").apellido; 
    this.id_usuario = this.serStorage.get("user").id_usuario; 

    this.reser.getInfoReservaInd(this.id_usuario,this.idHorario).subscribe(res=>{
      //console.log(res);  
     this.info=res.data.info;
    });

    this.reser.getInfoAsientos(this.id_usuario,this.idHorario).subscribe(
      res=>{
        this.asientos=res.data.info;
        this.monto=res.data.info[0].monto
        this.numeroA=res.cantidad;

        this.asientos.forEach(o => {
          if (o.id_Horario === this.idHorario) {
           this.auxAsientos.push(o.id_asiento);
        }
      });
      }
    );

  }

  ionViewDidEnter(){
    this.calcularTotal();
    let data={
      asientos:this.auxAsientos,
      cedula:this.cedula,
      nombre: this.nombre + " "+this.apellido,
      /* fecha:this.info[0].fecha, */
      /* hora:this.info[0].hora,
      destino:this.info[0].destino, */
      montoTotal:this.calcularTotal(),

    };
    this.informacionqr=JSON.stringify(data)
  }

  calcularTotal(){
    return  parseFloat((Number(this.numeroA) * this.monto).toFixed(2));;
  }

}
