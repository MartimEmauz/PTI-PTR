import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BidModalComponent } from '../bid-modal/bid-modal.component';
import { AuthSwitchService } from 'src/app/auth-switch.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nome', 'valorAtual', 'tempoRestante', 'fazerLicitacao','info', 'seguir'];
  dataSource = new MatTableDataSource<any>();
  showAddBidForm = false;
  subscriptions: Subscription[] = [];

  constructor(
    private auctionService: MasterService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private authSwitchService: AuthSwitchService
  ) {}

  ngOnInit(): void {
    this.loadAuctions();
    this.startCountdown();
  }

  

  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police';
  }

  openLeilaoDetails(id: number): void {
    this.router.navigate(['/leilao-details', id]);
  }

  loadAuctions(): void {
    this.auctionService.getLeilao().subscribe((data: any[]) => {
      data.forEach(auction => {
        this.auctionService.getFoundObjectById(auction.objeto).subscribe((objeto: any) => {
          auction.objeto = objeto;
          this.auctionService.getObjectById(objeto.objeto_id).subscribe((object: any) => {
            auction.objeto = object;
            this.dataSource.data = data;
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

  openBidModal(id: number): void {
    const dialogRef = this.dialog.open(BidModalComponent, {
      data: { leilaoId: id }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('The dialog was closed');
        console.log('Bid value:', result);
        // Aqui você pode adicionar lógica para processar a licitação, se necessário
      }
    });
  }

  filterChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navegarParaCriarLeilao(): void {
    this.router.navigate(['/criar-leilao']);
  }

  followBid(id: number): void {
    // Implemente a lógica para seguir o leilão com o ID fornecido
    console.log('Seguindo leilão com ID:', id);
  }
}
