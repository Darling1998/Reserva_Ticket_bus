import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { LoginService } from 'src/app/servicios/login.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  id_usuario:number;
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';
  usuarioProfile:any[]=[];

  constructor( private sers:StorageService,
    private logS:LoginService,
    private serUtils:UtilsService,
    private alertCtrl:AlertController,
    private router: Router) {}

  ngOnInit(){
    this.id_usuario = this.sers.get("user").id_usuario; 
    this.logS.cargarDataProfile(this.id_usuario).subscribe(
      resp=>{
        console.log(resp); 
        this.usuarioProfile= resp.data.info;
      }
    )

  }


  async actualizar( fActualizar: NgForm ) {
    console.log(fActualizar.value);
    

    if ( fActualizar.invalid ) { return; }

    this.logS.updateProfile(fActualizar.value).subscribe((resp) => {
      console.log(resp);

      if (resp.id == 0) {
        this.serUtils.mostrarMessage("Ha ocurrido un error al actualizar", 'danger');
      } else {
       // let objUser = resp.info.items;
       // this.sers.set('user', objUser);
        this.serUtils.mostrarMessage(resp.mensaje, 'success');
      }
    });




  }

  
  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }



  

  logout() {
    this.alertCtrl.create({
      header: "Cerrar Sesión",
      message: "¿Esta Seguro de Cerrar Sesión?",
      buttons: [
        {
          text: "Sí",
          handler: () => {
            localStorage.clear();            
            location.href = '/login';
            this.router.dispose();
          }
        },
        { text: "No" }
      ]
    }).then(alertEl => alertEl.present());
  }

}
