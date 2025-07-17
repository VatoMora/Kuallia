import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  getUserByEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/email/${email}`);
  }

  createUser(user: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, user);
  }

  updateUser(id: number, user: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateUserBalance(id: number, newBalance: number): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/balance`, { saldo: newBalance });
  }

  updateUserLevel(id: number, newLevel: number): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/level`, { nivel: newLevel });
  }
}
