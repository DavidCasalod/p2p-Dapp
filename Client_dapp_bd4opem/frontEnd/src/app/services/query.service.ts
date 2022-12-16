import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  URL_SERVER = "http://localhost:3000"
  constructor(private httpClient: HttpClient) { }

  getContract(id: string): Observable<any>{
    return this.httpClient.post<string>(this.URL_SERVER + '/query', id);
    
  }
  
}
