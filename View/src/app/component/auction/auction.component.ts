import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nome', 'estado', 'valorAtual', 'tempoRestante', 'seguir'];
  dataSource = new MatTableDataSource<any>();
  addBidForm: FormGroup;
  showAddBidForm = false;
  subscriptions: Subscription[] = [];

  constructor(private auctionService: MasterService, private fb: FormBuilder, private router: Router) {
    this.addBidForm = this.fb.group({
      nome: ['', Validators.required],
      estado: ['', Validators.required],
      valorAtual: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadAuctions();
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadAuctions(): void {
    this.auctionService.getLeilao().subscribe((data: any[]) => {
      this.dataSource.data = data;
    });
  }

  startCountdown(): void {
    const sub = interval(1000).subscribe(() => {
      this.dataSource.data.forEach(auction => {
        auction.tempoRestante = this.calculateTimeRemaining(auction.data_fim);
      });
    });
    this.subscriptions.push(sub);
  }

  calculateTimeRemaining(endTime: string): string {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const timeDiff = end - now;

    if (timeDiff <= 0) {
      return 'Leilão Encerrado';
    }

    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  toggleAddBidForm(): void {
    this.showAddBidForm = !this.showAddBidForm;
  }

  addBid(): void {
    if (this.addBidForm.valid) {
      this.auctionService.addLeilao(this.addBidForm.value).subscribe(() => {
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

  navegarParaCriarLeilao(): void {
    this.router.navigate(['/criar-leilao']);
  }
}
