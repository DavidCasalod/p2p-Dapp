import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from  'rxjs/operators';
import { Observable } from  'rxjs';

import { TransactionArguments } from  '../models/transaction-arguments';
import { ReturnContract } from '../models/returnContract';
import { ContractService } from './contract.service';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';
import { SSITokenDecoded } from './authenticate.service';


@Injectable({
  providedIn: 'root'
})

export class StartCecService {

  URL_SERVER = "http://localhost:3000"
  TransactionArguments!: ReturnContract;
  arguments!: TransactionArguments;
  SSIAuthentication: any;
  

  constructor(private httpClient: HttpClient) { }
    

  initialize(TransactionArguments: TransactionArguments): Observable<Object>{

    return this.httpClient.post(this.URL_SERVER + '/serviceSettings', TransactionArguments).pipe(
      tap((res: any) => {
        console.log(res)
      }
      )
    );
  }

  initialize_oracle(contract: ReturnContract): Observable<Object>{
    console.log(contract)
    return this.httpClient.post(this.URL_SERVER + '/serviceSettings_2', contract).pipe(
        tap((res: any) => {
         
          console.log(res)
        }
        )
      );
    }
    
  }
