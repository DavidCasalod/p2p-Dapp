import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable } from  'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CalculateCecService {

   // URL_SERVER = "http://localhost:3000"
   URL_SERVER = environment.serverUrl;
   headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
  options = {
    headers: this.headers,
  
  };

  constructor(private httpClient: HttpClient) { }
  initialize(args: any): Observable<Object>{

    return this.httpClient.post(this.URL_SERVER + '/serviceResults', args, this.options).pipe(
      tap((res: any) => {
        console.log(res)
      }
      )
    );
  }
}
