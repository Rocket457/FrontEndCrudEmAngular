import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './models/produto.model'; // ajuste o caminho conforme necessário


@Injectable({
  providedIn: 'root'
})
export class FetchHttp {
  
  constructor(private http: HttpClient) {}
  ApiURl = "https://localhost:61545/api/"
  
  getAll(): Observable<any> {
    return this.http.get(this.ApiURl + 'itens');
    }

  getItens(params?: any): Observable<any[]> {
    return this.http.get<any[]>(this.ApiURl + 'itens/' + params); // Define o tipo como array
  }

  createItem(produto: Produto): Observable<any> {
    return this.http.post(this.ApiURl + 'itens/criar', produto); 
  }
}