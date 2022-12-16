import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from  'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReadCecService {

  URL_SERVER = "http://localhost:3000"
 
  constructor(private httpClient: HttpClient) { }
  

  getResults(id: string): Observable<any>{
    return this.httpClient.post<string>(this.URL_SERVER + '/read', id);
  }

 
 }
