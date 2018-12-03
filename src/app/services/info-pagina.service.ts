import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPAgina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info:InfoPAgina={};
  cargada=false;

  equipo:any[]=[];

  constructor(private http:HttpClient ) { 
    //console.log("servicio de pagina listo !");
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    //leer archivo JSON
    this.http.get('assets/data/data-pagina.json')
    
      .subscribe((resp:InfoPAgina)=>{
        this.cargada=true;
        this.info=resp;       
      });
  }

  private cargarEquipo(){
    //leer archivo JSON de firebase
    this.http.get('https://angular-html-6ebf2.firebaseio.com/equipo.json')
    
      .subscribe((resp:any[])=>{
        this.equipo=resp;
        // console.log(resp);        
      });
  }
}
