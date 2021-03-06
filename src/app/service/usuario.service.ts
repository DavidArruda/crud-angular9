import { User } from 'src/app/model/user';
import { AppConstants } from './../app-constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl);
  }

  getStudentListPage(page): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + 'page/' + page);
  }

  getStudent(id: string): Observable<any> {
    return this.http.get<any>(AppConstants.baseUrl + id);
  }

  deletarUsuario(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + id, {responseType : 'text'});
  }

  consultarUser(nome: string): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'usuarioPorNome/' + nome);
  }

  consultarUserPorPage(nome: string, page: number): Observable<any> {
    return this.http.get(AppConstants.baseUrl + 'usuarioPorNome/' + nome + '/page/' + page);
  }

  salvarUsuario(user: User): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrl, user);
  }

  updateUsuario(user: User): Observable<any> {
    return this.http.put<any>(AppConstants.baseUrl, user);
  }

  removerTelefone(id: number): Observable<any> {
    return this.http.delete(AppConstants.baseUrl + 'removerTelefone/' + id, {responseType: 'text'});
  }

  userAtenticado() {
    if (localStorage.getItem('token') != null &&
    localStorage.getItem('token').toString().trim() != null) {
      return true;
    } else {
      return false;
    }
  }
}
