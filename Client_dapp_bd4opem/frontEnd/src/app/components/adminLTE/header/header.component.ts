import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { DarkModeService } from 'src/app/services/dark-mode.service';

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
  accountID : string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  contractingData: any;
  SSIAuthentication!: any;
  token: string = '';
  organisation: string | undefined;

  constructor(  private cookieService: CookieService,) { }

  ngOnInit(): void {

    this.token = this.cookieService.get('authentication');
    this.SSIAuthentication = jwtDecode<SSITokenDecoded>(this.token as string);
    this.organisation = this.SSIAuthentication.organisationId
    console.log(this.organisation)
  }

}
