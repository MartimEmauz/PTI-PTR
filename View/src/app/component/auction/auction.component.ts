import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'estado', 'valorAtual', 'seguir'];
  dataSource = new MatTableDataSource<any>();
  addBidForm: FormGroup;
  showAddBidForm = false;

  constructor(private auctionService: MasterService, private fb: FormBuilder) {
    this.addBidForm = this.fb.group({
      nome: ['', Validators.required],
      estado: ['', Validators.required],
      valorAtual: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctionService.getAuctions().subscribe((data: any[]) => {
      this.dataSource.data = data;
    });
  }

  toggleAddBidForm(): void {
    this.showAddBidForm = !this.showAddBidForm;
  }

  addBid(): void {
    if (this.addBidForm.valid) {
      this.auctionService.addAuction(this.addBidForm.value).subscribe(() => {
        this.loadAuctions(); // Recarregar a lista após adicionar
        this.toggleAddBidForm(); // Fechar o formulário
      });
    }
  }

  followBid(id: string): void {
    // Lógica para seguir leilão
    console.log(`Seguindo leilão com ID: ${id}`);
  }

  filterChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
