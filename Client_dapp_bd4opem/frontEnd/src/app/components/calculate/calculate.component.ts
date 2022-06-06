import { Component, OnInit } from '@angular/core';
import { CalculateCecService } from  '../../services/calculate-cec.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.css']
})
export class CalculateComponent implements OnInit {
  [x: string]: any;

  constructor(private calculatececservice: CalculateCecService, private router: Router,private formBuilder: FormBuilder) { }

  addForm = new FormGroup({
    contractId: new FormControl('', Validators.required),
    context: new FormControl('',  Validators.required)
  });
  ngOnInit(): void {
    this.addForm=this.formBuilder.group({
      contractId: ['', Validators.required],
      context: ['', Validators.required]
    });
  }

  onSubmit(addForm: { value: any; }) {
    console.log(addForm.value);
    this.calculatececservice.initialize(addForm.value).subscribe((res)=>{
      console.log("ha funcionado!");
      this.router.navigateByUrl('calculate');
    }
    )
  }


}
