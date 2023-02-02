import { Component, OnInit } from '@angular/core';
import { ReadCecService } from  '../../services/read-cec.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CalculateArguments } from 'src/app/models/calculate-arguments';
import { JsonConvertService } from  '../../services/json-convert.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  results!: CalculateArguments[];
  
  constructor(private readcecservice: ReadCecService, 
              private router: Router,private formBuilder: FormBuilder,
              private jsonConvertservice : JsonConvertService) { }
  
  addForm = new FormGroup({
    contractId: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
    this.addForm=this.formBuilder.group({
      contractId: ['', Validators.required],
      date: ['', Validators.required]
    });

}
   


  
  onSubmit(addForm: { value: any; }) {
    this.readcecservice.getResults(addForm.value).subscribe((res)=>{
      this.router.navigateByUrl('read');
      console.log("RESULTADO =")
      console.log(res)
      this.results = JSON.parse(res.toString());
      console.log(this.results)
    } 
    )
  }
  download(){
    console.log(this.results)

    this.jsonConvertservice.downloadFile(this.results, 'Results');
    
  }


}
