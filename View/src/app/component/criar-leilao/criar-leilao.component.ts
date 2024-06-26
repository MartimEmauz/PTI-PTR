import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-criar-leilao',
  templateUrl: './criar-leilao.component.html',
  styleUrls: ['./criar-leilao.component.css']
})
export class CriarLeilaoComponent implements OnInit {
  
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  criarLeilaoForm: FormGroup;
  filteredObjects: any[] = [];
  foundObjects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private auctionService: MasterService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<any>();
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
    this.loadFoundObjects();
  }
  
  loadFoundObjects() {
    // Obtenha todos os objetos encontrados
    this.auctionService.getFoundObjects().subscribe(
      (foundObjects: any[]) => {
        this.foundObjects = foundObjects;
  
        // Obtenha todos os objetos
        this.auctionService.getObjects().subscribe(
          (objects: any[]) => {
  
            // Obtenha todos os leilões
            this.auctionService.getLeilao().subscribe(
              (leiloes: any[]) => {
                const objetosEmLeilao = leiloes.map(leilao => leilao.objeto);
  
                // Filtre objetos que estão na lista de objetos encontrados e não estão em nenhum leilão
                const associatedObjects = 
                  objects.filter(object => foundObjects.some(foundObject => foundObject.objeto_id === object.id) && 
                  !objetosEmLeilao.includes(foundObjects.find(foundObject => foundObject.objeto_id === object.id).id));
  
                // Atribua os objetos filtrados à dataSource e ao filteredObjects
                this.filteredObjects = associatedObjects;
                this.dataSource.data = this.filteredObjects;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              },
              (error) => {
                console.error('Erro ao carregar leilões:', error);
              }
            );
          },
          (error) => {
            console.error('Erro ao carregar objetos:', error);
          }
        );
      },
      (error) => {
        console.error('Erro ao carregar objetos encontrados:', error);
      }
    );
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

      const selectedFoundObject = this.foundObjects.find(foundObject => foundObject.objeto_id === formValue.objeto);
      if (selectedFoundObject) {
        formValue.objeto = selectedFoundObject.id;
      }
      // Adicione o leilão
      this.auctionService.addLeilao(formValue).subscribe(() => {
        this.router.navigate(['/auction']);
      }, (error) => {
        console.error('Erro ao adicionar leilão:', error);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/auction']);
  }
}
