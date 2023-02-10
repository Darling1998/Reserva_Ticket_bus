import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { LoginService } from 'src/app/servicios/login.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import {StorageService} from 'src/app/servicios/storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('slidePrincipal') slides: IonSlides;

  loginUser = {
    cedula: '',
    password: '',
  };

  registerUser: Usuario = {
    password: '',
    nombre: '',
    apellido: '',
    cedula: '',
  };

  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  constructor(
    private navCtrl: NavController,
    private serLogin: LoginService,
    private serUtils: UtilsService,
    private serStorage: StorageService,
  ) {}

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  //FORMULARIO LOGIN
  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      this.serUtils.mostrarMessage('Formulario invalido', 'warning');
      return;
    }
    this.serLogin.login(this.loginUser).subscribe((resp) => {
      console.log(resp);

      if (resp.id == 0) {
        this.serUtils.mostrarMessage(resp.mensaje, 'danger');
      } else {
        let objUser = resp.info.items;
        delete objUser.clave
        this.serStorage.set('user', objUser);
        console.log(objUser);
        this.navCtrl.navigateRoot('/tabs/tab1', { animated: true });
        //FALTA DIRECCIONAR Y GUARDAR SESION EN STORAGE
        this.limpiarFormLogin();
      }
    });
  }
  limpiarFormLogin() {
    this.loginUser = {
      cedula: '',
      password: '',
    };
  }

  //FORMULARIO REGISTRO
  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      this.serUtils.mostrarMessage('Formulario invalido', 'warning');
      return;
    } else {
      this.serLogin.registro(this.registerUser).subscribe((resp) => {
        if (resp.id == 0) {
          this.serUtils.mostrarMessage(resp.mensaje, 'danger');
        } else {
          this.serUtils.mostrarMessage(resp.mensaje);
          this.limpiarFormRegistro();
          this.mostrarLogin();
        }
      });
    }
  }

  limpiarFormRegistro() {
    this.registerUser = {
      password: '',
      nombre: '',
      apellido: '',
      cedula: '',
    };
  }

  //Cambiar de Login a Registro
  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }

  //Cambiar de Registro a Login
  mostrarLogin(): void {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
  }


  togglePassword() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye-off-outline') {
      this.passwordToggleIcon = 'eye-outline';
    } else {
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }


}
