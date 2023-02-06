import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  public URL_API= "http://localhost/API-PROYECTO/";

  constructor(private toast :ToastController,private loadingCtrl:LoadingController) { }

  objectToFormData(obj: any, form?: any, namespace?: any) {
    let fd: any = form || new FormData();
    let formKey: any;
    for (let property in obj) {
      if (obj.hasOwnProperty(property) && obj[property]) {
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
        if (obj[property] instanceof Date) {
          fd.append(formKey, obj[property].toISOString());
        }
        if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          fd.append(formKey, obj[property]);
        }
      }
    }
    return fd;
  };


  async mostrarMessage(message: string, color: string = "success") {
    let t = await this.toast.create({
      message,
      color,
      duration: 3000
    });
    t.present();
  }

  async mostrarLoading(){
    const loading = await this.loadingCtrl.create({
      message:'Buscando Pasajes...',
      duration: 1000
    });

    await loading.present();
  }
}
