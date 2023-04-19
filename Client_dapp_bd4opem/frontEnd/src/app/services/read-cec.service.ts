import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReadCecService {
  
  // URL_SERVER = "http://localhost:3000"
  URL_SERVER = environment.serverUrl;
 
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
  options = {
    headers: this.headers
  };

  constructor(private httpClient: HttpClient) { }
  

  getResults(id: string): Observable<any>{
    return this.httpClient.post<string>(this.URL_SERVER + '/read', id, this.options);
  }

 
 }
