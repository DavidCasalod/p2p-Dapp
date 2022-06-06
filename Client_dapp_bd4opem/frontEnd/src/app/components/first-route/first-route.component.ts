import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { TransactionArguments } from  '../../models/transaction-arguments';
import { StartCecService } from  '../../services/start-cec.service'

@Component({
  selector: 'app-first-route',
  templateUrl: './first-route.component.html',
  styleUrls: ['./first-route.component.css']
})
export class FirstRouteComponent implements OnInit {
  [x: string]: any;
  http: any;

  constructor( private startcecservice: StartCecService, private router: Router, private formBuilder: FormBuilder) { }
  // private formBuilder: FormBuilder, public httpClient: HttpClient
  addForm = new FormGroup({
    contractId: new FormControl('', Validators.required),
    organizationId: new FormControl('',  Validators.required),
    start: new FormControl('',  Validators.required),
    end: new FormControl('', Validators.required),
    state: new FormControl('',  Validators.required),
    algorithm: new FormControl('',  Validators.required),
    version: new FormControl('',  Validators.required),
    context: new FormControl('',  Validators.required)
  });

   form!: {value: TransactionArguments;}

    ngOnInit(){
    this.addForm=this.formBuilder.group({
      contractId: ['', Validators.required],
      organizationId:['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      state: ['', Validators.required],
      algorithm: ['', Validators.required],
      version: ['', Validators.required],
      context: ['', Validators.required]
    });
  }
  
  onSubmit(addForm: { value: TransactionArguments; }) {
    console.log(addForm.value);
    this.startcecservice.initialize(addForm.value).subscribe((res)=>{
      console.log("ha funcionado!");
      this.router.navigateByUrl('service');
    }
    )
  }


}

// {
//   if(this.addForm.valid){
//     console.log(this.addForm.value);
//     const data = this.addForm.value;
//     const headers=new HttpHeaders({'Content-Type':'application/json'});
//     this.httpClient.post("http://localhost:3000/ping",data,{ headers });
//   }
// }