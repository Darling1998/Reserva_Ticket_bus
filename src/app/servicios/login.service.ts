import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();

  constructor(private serUtil: UtilsService, private http: HttpClient) {}

  login(data: any) {
    const URL = this.serUtil.URL_API + 'login';
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  registro(data: any) {
    const URL = this.serUtil.URL_API + 'crearUsuario';
    return this.http.post<any>(URL, this.serUtil.objectToFormData(data));
  }

  enviarObject(data:any){
    this.objectSource.next(data);
  }
}
