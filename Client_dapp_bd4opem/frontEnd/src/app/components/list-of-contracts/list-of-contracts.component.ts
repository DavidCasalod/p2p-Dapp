import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';
import { TransactionArguments } from  'src/app/models/transaction-arguments';
import { ContractService } from '../../services/contract.service';
import { ReturnContract } from 'src/app/models/returnContract';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { StartCecService } from 'src/app/services/start-cec.service';
import * as process from 'process';
import { environment } from 'src/environments/environment';
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
	selector: 'ngbd-modal-content',
	template: `
		<div class="modal-header">
			<h4 class="modal-title">Contract info</h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
    
          <table class="table table-bordered">
            <tbody>
              <tr>
                <td>Algorithm: <button> Cooperative</button></td>
                <td style="color:green">State:  Active </td>
              </tr> 
            </tbody>
          </table>
          <table class="table table-bordered">
          <thead>
            <tr>
              <th>Service User Contract: {{ contract_s }}</th>
            </tr> 
          </thead>
          <tbody>
            {{ c }}
          </tbody>
        </table>
        
        <table class="table table-bordered">
        <thead>
          <tr>
            <th>Data User Contract: {{ contract_id_dataUser  }}</th>
          </tr>
        </thead>
        <tbody>
          {{ result }}
        </tbody>
      </table>

		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="activeModal.close()">Close</button>
		</div>
	`,
  styles:  [
        `
        .light-blue-backdrop {
          background-color: #5cb3fd;
        }
      `,
    ],
  encapsulation: ViewEncapsulation.None
})
export class NgbdModalContent  implements OnInit{
  constructor(public activeModal: NgbActiveModal,
    private startcecservice: StartCecService,) {}

	@Input() c : string | undefined;
  @Input() contract_s : string | undefined;
  @Input() contract_id_dataUser : string | undefined;
  @Input() result : string | undefined;
  @Input() selectedContract : ReturnContract | undefined;
  @Input() args! : TransactionArguments ;

  ngOnInit(): void {
    document.getElementsByTagName('ngb-modal-backdrop').item(0)?.removeAttribute('style')
    console.log(this.c)
    console.log("resultado:"+ this.result)
  }
  

  initialise() {


    this.startcecservice.initialize(this.args).subscribe((res)=>{
      console.log(this.args)
      console.log(JSON.stringify(this.args))
      console.log(res);
    }
    )
   
  }
  
  closeModal() {
}
}

@Component({
  selector: 'app-list-of-contracts',
  templateUrl: './list-of-contracts.component.html',
  styleUrls: ['./list-of-contracts.component.css']
})
export class ListOfContractsComponent implements OnInit {
  Contracts!: ReturnContract[] ;
  res: any;
  SSIAuthentication!: any;
  token: string = '';
  result!: string ;
  message!: string;
  errors: any;
  mess!: string;
  contract!: ReturnContract
  selectedContract!: ReturnContract;
  c!: string;
  contract_ID: string | undefined;
  contract_ID_du: any;
  static contract: any;
  selectedAlg!: any;
  toggle!: boolean;
  status = "Manage";
  arguments! : TransactionArguments ;
  args! : TransactionArguments 
  formBuilder: any;
  check: boolean = false;

  //Added for tests hardcoded coockie.
  authToken = environment.authToken;
   status_contract: any = {};
  //status_contract: string[] = [];
  
  constructor(private cookieService: CookieService,
    private contractservice: ContractService,
    private modalService: NgbModal,
    private startcecservice: StartCecService
   ) { 	}

    async ngOnInit():  Promise<string> {
 
    // this.token = this.cookieService.get('authentication');
 
    this.token = this.authToken!;
    this.SSIAuthentication = jwtDecode<SSITokenDecoded>(this.token as string);
    this.contractservice.listContractsForServiceType(this.token, this.SSIAuthentication.accountID,
          this.SSIAuthentication.userType[0], this.SSIAuthentication.organisationId).subscribe(
            response => {
            this.Contracts = response;
            for (let contract of this.Contracts) {
              this.check_exist(contract);
            }
            this.c = JSON.stringify(this.Contracts)
            
          },
          
          (error) => {
            console.log(error)
            console.log(error.status + " " +error.statusText)
            switch (error.status) {
              case 400 : 
                this.message = "Bad request"
                break;
              case 401: 
                this.message = "Request not authorised, only service users can read contracts"
                break;
              case 403:
                this.message = "Forbidden" 
                break;
              case 404: 
                this.message = "Error 404, Not found" 
                break;
            }
          },
          
          );
          
    return this.Contracts, this.message
 }
 onSelect(contract: ReturnContract) {
  
    console.log(contract);
    this.contract = contract;
    this.contract_ID = contract.contractID;
    this.contract_ID_du = contract?.data_parameters?.[0].contractID!;
    // this.token = this.cookieService.get('authentication');
    this.token = this.authToken!
    console.log(this.token);
    this.contractservice.fetchContract(this.token, contract?.data_parameters?.[0].contractID!).subscribe(
      response => {
      console.log(response);
      this.selectedContract = response
      this.result = JSON.stringify(this.selectedContract)
      console.log(this.result)
    },
    
    (error) => {
      console.log(error)
      console.log(error.status + " " +error.statusText)
      switch (error.status) {
        case 400 : 
          this.mess = "Bad request"
          break;
        case 401: 
          this.mess = "Request not authorised, only service users can read contracts"
          break;
        case 403:
          this.mess = "Forbidden" 
          break;
        case 404: 
          this.mess = "Error 404, Not found" 
          break;
      }
    },
    );
    return this.res, this.mess

  }
 
	open(contract:ReturnContract) {
    console.log(contract);
    this.contract = contract;
    this.contract_ID = contract.contractID;
    this.contract_ID_du = contract?.data_parameters?.[0].contractID!;
    // this.token = this.cookieService.get('authentication');
    this.token = this.authToken!
    console.log(this.token);
    console.log(contract.status!);
    this.contractservice.fetchContract(this.token, contract.contractID!).subscribe(
      res => {
        this.c =JSON.stringify(res)
        modalRef.componentInstance.c = this.c
      },
    )

    this.contractservice.fetchContract(this.token, contract?.data_parameters?.[0].contractID!).subscribe(
      response => {
      console.log(response);
      this.selectedContract = response
      this.result = JSON.stringify(this.selectedContract)
      modalRef.componentInstance.result = this.result;
      console.log(this.result)
      console.log(this.arguments)
    },
    
    (error) => {
      console.log(error)
      console.log(error.status + " " +error.statusText)
      switch (error.status) {
        case 400 : 
          this.mess = "Bad request"
          break;
        case 401: 
          this.mess = "Request not authorised, only service users can read contracts"
          break;
        case 403:
          this.mess = "Forbidden" 
          break;
        case 404: 
          this.mess = "Error 404, Not found" 
          break;
      }
    },
    
  
    )
    
		const modalRef = this.modalService.open(NgbdModalContent,  { scrollable: true,
        backdropClass: 'light-blue-backdrop',
        size: 'xl',
        centered: true  });
    modalRef.componentInstance.args = this.arguments;
    modalRef.componentInstance.contract_s = this.contract_ID;
    modalRef.componentInstance.contract_id_dataUser = this.contract_ID_du;
    modalRef.componentInstance.selectedContract = this.selectedContract;
	}

  initialise( ) {

    this.check = true;
    this.selectedContract.contractID = this.contract.contractID
      this.startcecservice.initialize_oracle(this.selectedContract).subscribe((res)=>{
        console.log(res);
      }
      )
      setTimeout(() => {
        window.location.reload();
    }, 2000);
    }
  
  selectChangeHandler (event: any) {
    this.selectedAlg = event.target.value;
    console.log(this.selectedAlg);
    
  }

  async check_exist(contract: ReturnContract):Promise<any> {
    this.startcecservice.exist(contract.contractID!).subscribe((response)=>{
        console.log(response.status);
        //this.status_contract = response.status;
        this.status_contract[contract.contractID!] = response.status;
    });
}

}





    



