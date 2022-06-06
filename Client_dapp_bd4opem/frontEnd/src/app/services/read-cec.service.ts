import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from  'rxjs/operators';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadCecService {

  URL_SERVER = "http://localhost:3000"
  constructor(private httpClient: HttpClient) { }
  
  initialize(args: any): Observable<Object>{

    return this.httpClient.get(this.URL_SERVER + '/read', args).pipe(
      tap((res: any) => {
        console.log(res)
      }
      )
    );
  }
}
