import { Component, OnInit } from '@angular/core';
import { QueryService } from  '../../services/query.service';
import { JsonConvertService } from  '../../services/json-convert.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionArguments } from 'src/app/models/transaction-arguments';


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  results!: TransactionArguments;
  jsonData: any
  constructor(private querycontractservice: QueryService, private router: Router,private formBuilder: FormBuilder, private jsonConvertservice : JsonConvertService) { }

  
  addForm = new FormGroup({
    contractId: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
    this.addForm=this.formBuilder.group({
      contractId: ['', Validators.required]
    });
  }

   
  onSubmit(addForm: { value: any; }) {
    this.querycontractservice.getContract(addForm.value).subscribe((res)=>{
      this.router.navigateByUrl('query');
    
     this.results = JSON.parse(res);
     this.jsonData = this.results 
    }
    )
  }
  download(){
    this.jsonConvertservice.downloadFile(this.jsonData, 'jsonResults_to_csv');
  }

}
