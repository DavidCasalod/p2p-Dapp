import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { tap } from  'rxjs/operators';
import { Observable } from  'rxjs';

import { TransactionArguments } from  '../models/transaction-arguments';
import { ReturnContract } from '../models/returnContract';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class StartCecService {

  // URL_SERVER = "http://localhost:3000"
  URL_SERVER = environment.serverUrl;
  TransactionArguments!: ReturnContract;
  arguments!: TransactionArguments;
  SSIAuthentication: any;
  
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  options = {
    headers: this.headers,
  
  };


  constructor(private httpClient: HttpClient) { }
    

  initialize(TransactionArguments: TransactionArguments): Observable<Object>{

    return this.httpClient.post(this.URL_SERVER + '/serviceSettings', TransactionArguments, this.options).pipe(
      tap((res: any) => {
        console.log(res)
      }
      )
    );
  }

  initialize_oracle(contract: ReturnContract): Observable<Object>{
    console.log(contract)
    return this.httpClient.post(this.URL_SERVER + '/serviceSettings_2', contract, this.options).pipe(
        tap((res: any) => {
         
          console.log(res)
        }
        )
      );
    }
    
    
  exist(id: string): Observable<any>{

    return this.httpClient.post(this.URL_SERVER + '/exist', id, this.options).pipe(
      tap((res: any) => {
        console.log(res)
      }
      )
    );
  }
  }
