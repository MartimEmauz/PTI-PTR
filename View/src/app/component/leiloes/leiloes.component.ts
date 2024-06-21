import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BidService } from 'src/app/service/bid.service'; // Commented out until implemented

@Component({
  selector: 'app-leiloes',
  templateUrl: './leiloes.component.html',
  styleUrls: ['./leiloes.component.css']
})
export class LeiloesComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["nome", "estado", "valorAtual", "seguir"];
  addBidForm: FormGroup;
  showAddBidForm = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    // private bidService: BidService, // Commented out until implemented
    private fb: FormBuilder
  ) {
    this.dataSource = new MatTableDataSource<any>();
    this.addBidForm = this.fb.group({
      nome: ['', Validators.required],
      estado: ['', Validators.required],
      valorAtual: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadBids();
  }

  loadBids() {
    // Placeholder data to display the structure
    const bids = [
      { nome: 'Bola', estado: 'A decorrer', valorAtual: 5, id: 1 },
      // Add more sample data as needed
    ];
    this.dataSource.data = bids;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  toggleAddBidForm() {
    this.showAddBidForm = !this.showAddBidForm;
  }

  addBid() {
    if (this.addBidForm.valid) {
      // this.bidService.addBid(this.addBidForm.value).subscribe(() => {
      //   this.loadBids();
      //   this.addBidForm.reset();
      //   this.showAddBidForm = false;
      // });
      console.log("Bid added:", this.addBidForm.value);
      this.loadBids(); // Reload data
      this.addBidForm.reset();
      this.showAddBidForm = false;
    }
  }

  followBid(bidId: number) {
    // Implement follow bid logic here
    console.log(`Following bid with ID: ${bidId}`);
  }
}
