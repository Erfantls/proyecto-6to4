import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, pipe, throwError } from 'rxjs';
import { Producto } from '../modelos/producto.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //URl base del modulo de productos en la API
  private apiUrl = 'http://localhost/api_proyecto/public/products'


  constructor(private http:HttpClient){}

  //Construye las cabeceras HTTP necesarias para las solicitudes protegidas
  //si existe un token en localStorage, lo incluye como cabecera Authorization 

  private getHeaders(): HttpHeaders{
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders({
      'Authorization':token ? `Bearer ${token}`:''
    })
    return headers
  }

  //Obtiene la lista completa de productos desde la API
  //Es una ruta publica y no requiere token 
  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
    .pipe(catchError(this.handleError));
  }

  //Obtiene un producto especifico segun su identificador
  getProductById(id:number): Observable<Producto>{
    return this.http.get <Producto>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }

  //Envia un nuevo producto al servidor usando FormData
  //Esto permite incluir archivos de imagen en la solicitud 
  addProduct(formdata:FormData): Observable<any>{
    return this.http.post(this.apiUrl, formdata,{
      headers:this.getHeaders()
    }).pipe(catchError(this.handleError));
  }

  //Actualiza un producto segun su id
  //Esta operacion esta protegida y requiere un token valido 
  updateProduct(id:number, formdata: FormData): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,formdata,{
      headers: this.getHeaders()
    }).pipe(catchError(this.handleError))
  }
  
  //Elimina un producto segun su id
  //esta operacion esta protegida y requiere token valido

  deleteProduct(id:number):Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`,{
      headers: this.getHeaders()
    }).pipe(catchError(this.handleError));
  }

  //Manejo centralizado de errores para todas las solicitudes
  //Devuelve un mensaje legible en caso de fallo

  private handleError(error:any){
    console.error('Error en ProductService:',error);

    let msg ='Ocurrio un error al procesar la solicitud.';
    if(error.error?.message){
      msg = error.error.message;
    }
    return throwError(() => new Error(msg))
  }
}
