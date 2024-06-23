import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../../service/master.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posto-policia',
  templateUrl: './postopolicia.component.html',
  styleUrls: ['./postopolicia.component.css']
})
export class PostoPoliciaComponent implements OnInit {
  policePostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private router: Router
  ) {
    this.policePostForm = this.fb.group({
      id: ['', Validators.required],
      stationNumber: ['', Validators.required],
      postAddress: ['', Validators.required]
    });
  }

  ngOnInit() {}

  /*onAddPolicePost() {
    if (this.policePostForm.valid) {
      // Assuming you have a method in masterService to add police posts
      this.masterService.addPolicePost(this.policePostForm.value).subscribe(
        (response) => {
          console.log('Police post added successfully:', response);
          // Optionally navigate to another page after adding
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error adding police post:', error);
        }
      );
    } else {
      console.error('Police post form is invalid');
    }
  }*/
}
