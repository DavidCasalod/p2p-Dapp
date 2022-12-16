import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from  'rxjs/operators';
import { Observable } from  'rxjs';

import { TransactionArguments } from  '../models/transaction-arguments';


@Injectable({
  providedIn: 'root'
})

export class StartCecService {

  URL_SERVER = "http://localhost:3000"
  constructor(private httpClient: HttpClient) { }

  initialize(TransactionArguments: TransactionArguments): Observable<Object>{

    return this.httpClient.post(this.URL_SERVER + '/serviceSettings', TransactionArguments).pipe(
      tap((res: any) => {
        console.log(res)
      }
      )
    );
  }
}
