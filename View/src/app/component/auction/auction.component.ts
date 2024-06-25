import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { Subscription, interval } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-modal/bid-modal.component';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nome', 'estado', 'valorAtual', 'tempoRestante', 'seguir'];
  dataSource = new MatTableDataSource<any>();
  showAddBidForm = false;
  subscriptions: Subscription[] = [];

  constructor(private auctionService: MasterService, private fb: FormBuilder, private router: Router, public dialog: MatDialog) {
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

  openBidDialog(): void {
    const dialogRef = this.dialog.open(BidDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log('Bid value:', result);
    });
  }

  filterChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navegarParaCriarLeilao(): void {
    this.router.navigate(['/criar-leilao']);
  }
}
