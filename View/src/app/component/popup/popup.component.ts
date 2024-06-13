import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import {LostObject} from 'src/app/Model/lost-object.model';



@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>, private formBuilder: FormBuilder,
    private service: MasterService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.code > 0){
      this.setpopupdata(this.inputdata.code)
    }
  }

  setpopupdata(code: any) {
    this.service.GetCustomerbycode(code).subscribe(item => {
      this.editdata = item;
      this.myForm.setValue({
        title: "",
        date: '', 
        description: '', 
        category: null,
      });
    });
  }
  

  closepopup() {
    this.ref.close('Closed using function');
  }

  myForm = this.formBuilder.group({
    title: [""],
    date: [''],
    description: [''],
    category: [''],
  });


  Saveuser() {
    this.service.Savecustomer(this.myForm.value).subscribe(res => {
      this.closepopup();
    });
  }

  addLostObject() {
    const formValue = this.myForm.value;
  
    // Ensure that form values are of the correct types
    const newLostObject: LostObject = {
      title: formValue.title as string | null,
      date: formValue.date as string | null, // Cast to string | null
      description: formValue.description as string | null, // Cast to string | null
      category: typeof formValue.category === 'string' && formValue.category !== '' ? parseInt(formValue.category, 10) : null, // Parse as number or null
    };
  
    this.service.addLostObject(newLostObject)
    this.closepopup()
  }
  

  
}   
