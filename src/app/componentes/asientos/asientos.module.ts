import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AsientosComponent } from './asientos.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AsientosComponent],
  imports: [
    CommonModule, IonicModule,    FormsModule,
  ]
})
export class AsientosModule { }
