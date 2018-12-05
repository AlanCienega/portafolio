import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando=true;
  productos:Producto[]=[];
  productosFiltrado:Producto[]=[];
  constructor(private http:HttpClient ) { 
    this.cargarPRoductos();
  }

  private cargarPRoductos(){

    return new Promise( (resolve,reject)=>{

      this.http.get('https://angular-html-6ebf2.firebaseio.com/productos_idx.json')
        .subscribe( (resp:Producto[])=>{
          
          // console.log(resp); // log para mostrarcel resultado del get de firebase
          this.productos=resp;
          this.cargando=false;
          resolve();
  
        } );
    });

  }

  getProducto(id:string){
    return this.http.get(`https://angular-html-6ebf2.firebaseio.com/productos/${id}.json`);
    this.cargando=false;
  }
  buscarProducto(termino:string){

    if(this.productos.length===0){
      //esperar a los productos
      this.cargarPRoductos().then( () =>{
        //despues de tener los productos
        //aplicar filtro
      this.filtrarProductos( termino );
      } )
    }else{
      //aplicar filtro
      this.filtrarProductos( termino );
    }
  }
  private filtrarProductos( termino :string ){
    // console.log( this.productos);
    this.productosFiltrado=[];
    termino=termino.toLocaleLowerCase();
    this.productos.forEach( prod =>{

      const tituloLower=prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino)>=0 ||tituloLower.indexOf(termino)>=0 ){
        this.productosFiltrado.push(prod);
      }
    });
  }
}
