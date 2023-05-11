import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { forkJoin, last, lastValueFrom, observable, Observable, of, Subscriber } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';

export interface SSITokenDecoded {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  jti: string;
  organisationId: string;
  authType: string;
  userType: string[];
  email: string;
  role: string;
  connectionID: string;
}

export interface UserAnagraphic{
  DialerCode: string;
  email: string;
  firstname: string;
  lastname: string;
  orgemail: string;
  orgid: string;
  orgimage: string;
  orgname: string;
  orgurl: string;
  phone: string;
  role: string;
  userStatus: string;
  usertype: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient,
    private _cookieService: CookieService,
    private router: Router) {}

  token: string = '';
  SSIAuthentication: any;
  isAuthenticated: boolean = false;
  username: string = '';
  userAnagraphic: any;

  public getAuthenticationData() {
      this.token = this._cookieService.get('authentication');
      if (this.token != null && this.token != undefined && this.token != '')
      {
        this.SSIAuthentication = jwtDecode<SSITokenDecoded>(this.token as string);
        this.isAuthenticated = true;
      }
      else{
        this.isAuthenticated = false;
      }
    }
 

  public getUserAnagraphic(): Promise<UserAnagraphic> {
      const anagraphicObs = this.http.post<UserAnagraphic>('https://bd4opem-mp-dev-api-membership.azurewebsites.net/Anagrafica/getUserAnag',
      JSON.stringify(this.SSIAuthentication.email));
      return lastValueFrom(anagraphicObs);
  }

  public async getUsername(): Promise<string> {
    if (this.isAuthenticated)
    {
      if (this.username === '')
      {
        this.userAnagraphic = JSON.parse(JSON.stringify(await this.getUserAnagraphic()))
        this.username = this.userAnagraphic.firstname + ' ' + this.userAnagraphic.lastname +
        ' (' + this.SSIAuthentication.organisationId + ')';
      }
    }
    return lastValueFrom(of(this.username));
  }

  

}
