// home.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  leiloes: any[] = []; // Defina a propriedade leiloes como um array vazio
  leiloesParticipando: any[] = []; // Defina a propriedade leiloesParticipando como um array vazio

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.carregarLeiloes();
    this.carregarLeiloesParticipando();
  }

  carregarLeiloes(): void {
    this.http.get<any[]>('URL_DO_SEU_ENDPOINT_DE_LEILÕES_EM_ANDAMENTO')
      .subscribe(leiloes => this.leiloes = leiloes);
  }

  carregarLeiloesParticipando(): void {
    this.http.get<any[]>('URL_DO_SEU_ENDPOINT_DE_LEILÕES_DO_USUÁRIO')
      .subscribe(leiloes => this.leiloesParticipando = leiloes);
  }
}
