import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bid-modal',
  templateUrl: './bid-modal.component.html',
  styleUrls: ['./bid-modal.component.css']
})
export class BidModalComponent implements OnInit {
  bidForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BidModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.bidForm = this.fb.group({
      valorLance: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bidForm.valid) {
      this.dialogRef.close(this.bidForm.value.valorLance);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
