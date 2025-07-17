import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/negocio.model';

export interface ProductoRequest {
  nombre: string;
  marca: string;
  modelo: string;
  costo: number;
  precio: number;
  unidades: number;
  negocioId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private readonly baseUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  // Crear producto
  crearProducto(producto: ProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(this.baseUrl, producto);
  }

  // Listar productos por negocio
  listarPorNegocio(negocioId: number): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.baseUrl}/negocio/${negocioId}`);
  }

  // Buscar producto por ID
  buscarPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  // Actualizar producto
  actualizar(id: number, producto: ProductoRequest): Observable<Producto> {
    return this.http.put<Producto>(`${this.baseUrl}/${id}`, producto);
  }

  // Eliminar producto
  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
