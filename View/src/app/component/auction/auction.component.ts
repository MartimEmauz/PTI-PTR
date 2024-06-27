import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, interval } from 'rxjs';
import { MasterService } from 'src/app/service/master.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BidModalComponent } from '../bid-modal/bid-modal.component';
import { AuthSwitchService } from 'src/app/auth-switch.service';
import { MatSort } from '@angular/material/sort';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['item', 'valorAtual', 'tempoRestante', 'fazerLicitacao','info', 'seguir'];
  activeDataSource = new MatTableDataSource<any>();
  closedDataSource = new MatTableDataSource<any>();
  activeDisplayedColumns: string[] = ['item', 'valorAtual', 'tempoRestante', 'fazerLicitacao', 'info', 'seguir'];
  closedDisplayedColumns: string[] = ['item', 'valorAtual', 'tempoRestante', 'info'];
  activeTab: 'active' | 'closed' = 'active';
  subscriptions: Subscription[] = [];
  userId: number | null = null;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  bids: any[] = [];

  constructor(
    private auctionService: MasterService,
    private router: Router,
    public dialog: MatDialog,
    private authSwitchService: AuthSwitchService,
    private _auth: AuthService,
    private service: MasterService
  ) {}

  ngOnInit(): void {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user) {
        const userEmail = user.email || '';
        this.getUserByEmail(userEmail);
      }
    });
    this.loadAuctions();
    this.startCountdown();
    this.activeDataSource.sort = this.sort;
    this.closedDataSource.sort = this.sort;
  }

  loadAuctions(): void {
    this.auctionService.getLeilao().subscribe((data: any[]) => {
      const activeAuctions: any[] = [];
      const closedAuctions: any[] = [];

      data.forEach(auction => {
        auction.tempoRestante = this.calculateTimeRemaining(auction.data_fim);

        if (auction.tempoRestante === 'Leilão Encerrado') {
          closedAuctions.push(auction);
        } else {
          activeAuctions.push(auction);
        }

        this.auctionService.getFoundObjectById(auction.objeto).subscribe((foundobject: any) => {
          auction.objeto = foundobject;
          this.auctionService.getObjectById(auction.objeto.objeto_id).subscribe((object: any) => {
            auction.objeto = object;
          });
        });
      });

      this.activeDataSource.data = activeAuctions;
      this.closedDataSource.data = closedAuctions;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getUserByEmail(email: string): void {
    if (!this.isPoliceUser()) {
      this.service.getUserByEmail(email).subscribe(
        (data: any) => {
          this.userId = data.id;
        },
        (error) => {
          console.error('Erro ao carregar usuário:', error);
        }
      );
    } else {
      this.service.getPoliceUserByEmail(email).subscribe(
        (data: any) => {
          this.userId = data.id;
        },
        (error) => {
          console.error('Erro ao carregar usuário:', error);
        }
      );
    }
  }

  startCountdown(): void {
    const sub = interval(1000).subscribe(() => {
      this.activeDataSource.data.forEach(auction => {
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

  setActiveTab(tab: 'active' | 'closed'): void {
    this.activeTab = tab;
  }

  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police';
  }

  openLeilaoDetails(id: number): void {
    this.router.navigate(['/leilao-details', id]);
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

  followBid(id: number): void {
    // Implemente a lógica para seguir o leilão com o ID fornecido
    console.log('Seguindo leilão com ID:', id);
  }

  navegarParaCriarLeilao(): void {
    this.router.navigate(['/criar-leilao']);
  }

  getValorAtual(element: any): string {
    if (element.maior_licitacao !== null && element.maior_licitacao !== undefined) {
      return element.maior_licitacao.toString();
    } else {
      return element.valor_base.toString();
    }
  }
}
