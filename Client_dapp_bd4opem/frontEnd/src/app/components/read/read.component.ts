import { Component, OnInit } from '@angular/core';
import { ReadCecService } from  '../../services/read-cec.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private readcecservice: ReadCecService, private router: Router,private formBuilder: FormBuilder) { }

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
    this.readcecservice.initialize(addForm.value).subscribe((res)=>{
      console.log("ha funcionado!");
      this.router.navigateByUrl('calculate');
    }
    )
  }


}
