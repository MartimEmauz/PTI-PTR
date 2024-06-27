import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthSwitchService } from 'src/app/auth-switch.service';
import { MasterService } from 'src/app/service/master.service';
import { BidModalComponent } from '../bid-modal/bid-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-leilao-details',
  templateUrl: './leilao-details.component.html',
  styleUrls: ['./leilao-details.component.css']
})
export class LeilaoDetailsComponent implements OnInit {
  leilaoId!: number;
  leilao: any;
  bids: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private auctionService: MasterService,
    private authSwitchService: AuthSwitchService

  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.leilaoId = +id;
      this.loadLeilaoDetails();
    } else {
      console.error('No leilaoId found in the route');
    }
  }

  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police'; // Método fictício para verificar se o usuário é do tipo "police"
  }

  loadLeilaoDetails(): void {
    this.auctionService.getLeilaoById(this.leilaoId).subscribe({
      next: (leilao: any) => {
        this.leilao = leilao;
        if (leilao?.objeto) {
          this.auctionService.getFoundObjectById(leilao.objeto).subscribe({
            next: (objeto: any) => {
              this.auctionService.getObjectById(objeto.objeto_id).subscribe((object: any) => {
                this.leilao.objeto = object;
                this.loadBids();
            });
          }
          });
        } else {
          this.loadBids();
        }
      },
      error: err => console.error('Error fetching leilao details:', err)
    });
  }

  loadBids(): void {
    this.auctionService.getBidsByLeilaoId(this.leilaoId).subscribe({
      next: (bids: any[]) => {
        this.bids = bids;

        this.bids.forEach(bid => {
          this.auctionService.getGeneralUserById(bid.id_user).subscribe({
            next: (user: any) => {
              // Associar o usuário geral à bid específica
              bid.id_user = user;
            },
            error: (err: any) => console.error('Error fetching user details:', err)
          });
        });

        console.log('Bids:', this.bids);
      },
      error: err => console.error('Error fetching bids:', err)
    });
  }

  eliminarLeilao(): void {
    if (confirm('Tem certeza que deseja eliminar este leilão?')) {
      this.auctionService.getEliminarLeilao(this.leilao.id).subscribe({
        next: () => {
          console.log('Leilão eliminado com sucesso');
        },
        error: (error: any) => {
          console.error('Erro ao eliminar leilão:', error);
          // Tratamento de erro ao eliminar o leilão
        }
      });
    }
  }

}