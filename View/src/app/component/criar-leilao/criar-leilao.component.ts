import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-criar-leilao',
  templateUrl: './criar-leilao.component.html',
  styleUrls: ['./criar-leilao.component.css']
})
export class CriarLeilaoComponent implements OnInit {
  criarLeilaoForm: FormGroup;
  objetos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private auctionService: MasterService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
    this.criarLeilaoForm = this.fb.group({
      valor_base: ['', [Validators.required, Validators.min(0)]],
      data_inicio: [today, Validators.required],
      data_fim: ['', Validators.required],
      data_fim_hora: ['', Validators.required],
      objeto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadObjetos();
  }

  loadObjetos(): void {
    this.auctionService.getObjects().subscribe((data: any[]) => {
      this.objetos = data;
    }, error => {
      console.error('Erro ao carregar objetos:', error);
    });
  }

  onSubmit(): void {
    if (this.criarLeilaoForm.valid) {
      const formValue = this.criarLeilaoForm.value;
      const dataFim = new Date(formValue.data_fim);
      const timeParts = formValue.data_fim_hora.split(':');
      dataFim.setHours(timeParts[0], timeParts[1]);

      formValue.data_inicio = new Date();
      formValue.data_fim = dataFim;

      delete formValue.data_fim_hora;

      this.auctionService.addLeilao(formValue).subscribe(() => {
        this.router.navigate(['/auctions']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/auctions']);
  }
}
