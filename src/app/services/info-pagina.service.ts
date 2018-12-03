import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPAgina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info:InfoPAgina={};
  cargada=false;

  constructor(private http:HttpClient ) { 
    //console.log("servicio de pagina listo !");
    
    //leer archivo JSON
    this.http.get('assets/data/data-pagina.json')
    
      .subscribe((resp:InfoPAgina)=>{
        this.cargada=true;
        this.info=resp;
        console.log(resp);        
      });
  }
}
