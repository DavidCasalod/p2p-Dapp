import { ElementRef, Injectable, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthGuardModalComponent } from '../components/auth-guard-modal/auth-guard-modal.component';

import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthenticateService,
    private _router: Router,
    private modalService: NgbModal) {}

    @ViewChild('mymodal') dialog_required: ElementRef| undefined;  
     
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      this.authService.getAuthenticationData();
      if (this.authService.isAuthenticated)
      {
        if (this.authService.SSIAuthentication.exp > Date.now() / 1000)
        {
          return true;
        }
        else
        {
          const modalRef = this.modalService.open(AuthGuardModalComponent, {centered: true, size: 'md', backdropClass: 'modal-backdrop2', modalDialogClass: 'modal-dialog2'});
          modalRef.componentInstance.dialog = {title: 'Authentication Expired', message: 'You will be redirected to the Marketplace site to refresh the expired authentication token.'};
          modalRef.result.then((result) => {
            window.location.href = environment.marketplaceUrl + '/login?returnUrl=' + environment.loginReturnUrl + "&secure=" + environment.production;
          }).catch((error) => {
            window.location.href = environment.marketplaceUrl + '/login?returnUrl=' + environment.loginReturnUrl + "&secure=" + environment.production;
          });    
          return false;
        }
      }
      else
      {
        const modalRef = this.modalService.open(AuthGuardModalComponent, {centered: true, size: 'md', backdropClass: 'modal-backdrop2', modalDialogClass: 'modal-dialog2'});
        modalRef.componentInstance.dialog = {title: 'Authentication Required', message: 'You will be redirected to the Marketplace site to login.'};
        modalRef.result.then((result) => {
          window.location.href = environment.marketplaceUrl + '/login?returnUrl=' + environment.loginReturnUrl + "&secure=" + environment.production;
        }).catch((error) => {
          window.location.href = environment.marketplaceUrl + '/login?returnUrl=' + environment.loginReturnUrl + "&secure=" + environment.production;
        });    
        
        return false;
      }
    }
  
}
