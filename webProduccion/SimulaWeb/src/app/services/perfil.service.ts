import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PerfilUsuario } from '../models/perfil-usuario.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = 'http://ec2-3-15-207-129.us-east-2.compute.amazonaws.com:8080/api/usuarios';
  //private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  obtenerPerfilUsuario(id: number): Observable<PerfilUsuario> {
    return this.http.get<PerfilUsuario>(`${this.apiUrl}/${id}/perfil`);
  }
}
