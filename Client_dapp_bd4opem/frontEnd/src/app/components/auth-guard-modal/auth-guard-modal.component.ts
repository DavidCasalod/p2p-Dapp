import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-guard-modal',
  templateUrl: './auth-guard-modal.component.html',
  styleUrls: ['./auth-guard-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthGuardModalComponent implements OnInit, AfterViewInit {

  modalReference: any;
  constructor(public activeModal: NgbActiveModal) { } 
  
  ngAfterViewInit(): void {
    setInterval((interval: any) => {
      //console.log(interval)
      this.activeModal.close()
    },15000)
  }

  @Input () dialog: {
    title:string,
    message:string
  }|undefined;

  timeLeft: number = 60;
  interval: any;

  ngOnInit(): void {
    document.getElementsByTagName('ngb-modal-backdrop').item(0)?.removeAttribute('style')
  }
  

  closeModal() {
    
  }

}
