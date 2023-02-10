import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeModule } from 'ng-qrcode';
import { FormsModule } from '@angular/forms';
import { TicketComponent } from './ticket.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TicketComponent],
  imports: [
    CommonModule, IonicModule,  QrCodeModule , FormsModule,
  ]
})
export class TicketModule { }
