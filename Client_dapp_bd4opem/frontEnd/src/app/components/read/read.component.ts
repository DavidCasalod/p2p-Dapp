import { Component, NgModule, OnInit } from '@angular/core';
import { ReadCecService } from  '../../services/read-cec.service';
import { UntypedFormControl, UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CalculateArguments } from 'src/app/models/calculate-arguments';
import { JsonConvertService } from  '../../services/json-convert.service';
import { ReturnContract } from 'src/app/models/returnContract';
import { TransactionArguments } from 'src/app/models/transaction-arguments';
import jwtDecode from 'jwt-decode';
import { SSITokenDecoded } from '../list-of-contracts/list-of-contracts.component';
import { ContractService } from 'src/app/services/contract.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})

export class ReadComponent implements OnInit {
  results!: CalculateArguments[];
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
  check: boolean = false;
  date: string = '';
  year: string = '';
  month: string = '';
    //Added for tests hardcoded coockie.
  // authToken = environment.authToken;

  constructor(private readcecservice: ReadCecService, 
              private cookieService: CookieService,
              private router: Router,private formBuilder: UntypedFormBuilder,
              private jsonConvertservice : JsonConvertService,
              private contractservice: ContractService,
             ) {}
  
  addForm = new UntypedFormGroup({
    contractId: new UntypedFormControl('', Validators.required),
    date: new UntypedFormControl('', Validators.required)
  });
  years: number[] = [];
  months: { value: string; name: string }[] = [
    { value: '01', name: '1' },
    { value: '02', name: '2' },
    { value: '03', name: '3' },
    { value: '04', name: '4' },
    { value: '05', name: '5' },
    { value: '06', name: '6' },
    { value: '07', name: '7' },
    { value: '08', name: '8' },
    { value: '09', name: '9' },
    { value: '10', name: '10' },
    { value: '11', name: '11' },
    { value: '12', name: '12' },
  ];
  updateDate(newYear: string, newMonth: string): void {
    if (newYear) {
      this.year = newYear;
    }
    if (newMonth) {
      this.month = newMonth;
    }

    this.date = this.year + '-' + this.month;
    console.log(this.date)
    this.addForm.patchValue({
      date: this.date
    });
  }
  
 
  async ngOnInit():  Promise<string> {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 10; i <= currentYear; i++) {
      this.years.push(i);
    }
    this.years.reverse();
    this.addForm=this.formBuilder.group({
      contractId: ['', Validators.required],
      date: ['', Validators.required]
    });
 
    this.token = this.cookieService.get('authentication');
    // this.token = this.authToken!;
    this.SSIAuthentication = jwtDecode<SSITokenDecoded>(this.token as string);
    this.contractservice.listContractsForServiceType(this.token, this.SSIAuthentication.accountID,
      "ServiceUser", this.SSIAuthentication.organisationId).subscribe(
            response => {
            this.Contracts = response;
            this.c = JSON.stringify(this.Contracts)
            console.log(JSON.stringify(this.Contracts));
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
   


  onSubmit(addForm: { value: any; }) {
   
    this.readcecservice.getResults(addForm.value).subscribe((res)=>{
      this.router.navigateByUrl('read');
      console.log("RESULTADO =")
      console.log(res)
      console.log(typeof res)
      this.results = res;
    } 
    )
  }
  

  download(addForm: { value: any; }){
 
    console.log(addForm.value)
    this.readcecservice.getResults(addForm.value).subscribe((res)=>{
      this.router.navigateByUrl('read');
      console.log("RESULTADO =")
      console.log(res)
      console.log(typeof res)
      this.results = res;
      console.log(this.results)
      this.jsonConvertservice.downloadFile(this.results, 'Results');
    } 
    )
    
  }

}


