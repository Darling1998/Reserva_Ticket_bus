import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TicketComponent } from 'src/app/componentes/ticket/ticket.component';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  id_usuario:number;
 //id_viaje:number;
  reservas:any[]=[];

  constructor(
    private modalCtrl:ModalController,
    private ser:ReservaService,
    private sers:StorageService
  ) {}

  ngOnInit() {
    this.id_usuario = this.sers.get("user").id_usuario; 
    
    this.ser.getReservas(this.id_usuario).subscribe(res=>{ 
      this.reservas=res.data.info;
     // event.target.complete();
    });
  }

  handleRefresh(event:any){
    setTimeout(()=>{
      this.ser.getReservas(this.id_usuario).subscribe(res=>{ 
        this.reservas=res.data.info;
        event.target.complete();
      });
    },1000)
    
  }

  

  async abrirTicket(id_viaje:number){
    const modal = await this.modalCtrl.create({
      component: TicketComponent,
      componentProps: {
        idHorario:id_viaje
      },
      cssClass: 'modalAsientos',
    });
    modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'confirm') {
      console.log(data);
    }
  }

}
