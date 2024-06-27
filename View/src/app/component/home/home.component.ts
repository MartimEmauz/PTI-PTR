import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  leiloes: any[] = [];
  leiloesParticipando: any[] = [];

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.inicializarCarrossel();
  }

  inicializarCarrossel(): void {
    $('.carousel').slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      adaptiveHeight: true
    });
  }

  carregarLeiloes(): void {
    this.http.get<any[]>('URL_DO_SEU_ENDPOINT_DE_LEILÕES_EM_ANDAMENTO')
      .pipe(
        catchError(error => {
          console.error('Erro ao carregar leilões em andamento:', error);
          return throwError(error);
        })
      )
      .subscribe(leiloes => this.leiloes = leiloes);
  }

  carregarLeiloesParticipando(): void {
    this.http.get<any[]>('URL_DO_SEU_ENDPOINT_DE_LEILÕES_DO_USUÁRIO')
      .pipe(
        catchError(error => {
          console.error('Erro ao carregar leilões em que o usuário está participando:', error);
          return throwError(error);
        })
      )
      .subscribe(leiloes => this.leiloesParticipando = leiloes);
  }
}
