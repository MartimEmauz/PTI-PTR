import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';

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
    private auctionService: MasterService
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

  loadLeilaoDetails(): void {
    this.auctionService.getLeilaoById(this.leilaoId).subscribe({
      next: (leilao: any) => {
        this.leilao = leilao;
        if (leilao?.objeto) {
          this.auctionService.getObjectById(leilao.objeto).subscribe({
            next: (objeto: any) => {
              this.leilao.objeto = objeto;
              this.loadBids();
            },
            error: err => console.error('Error fetching objeto details:', err)
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

}