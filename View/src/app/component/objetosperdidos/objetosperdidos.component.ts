import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { LostObject } from 'src/app/Model/lost-object.model';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './objetosperdidos.component.html',
  styleUrls: ['./objetosperdidos.component.css']
})
export class ObjetosperdidosComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["code", "name", "email", "phone", "status", "action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  lostObjectForm: FormGroup;
  showAddObjectForm: boolean = false;

  searchText: string = '';
  lostObjects: any[] = [];
  filteredObjects: any[] = [];
  userName: string = ''; // Add this property
  userId: string | null = null; // Change the type to string | null
  constructor(private service: MasterService, private fb: FormBuilder, private router: Router, private _auth: AuthService) {
    this.dataSource = new MatTableDataSource<any>();
    this.lostObjectForm = this.fb.group({
      title: ['', Validators.required],
      specific_date: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      generaluser: [null], // Initialize with null
    });
  }

  ngOnInit(): void {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        const userEmail = user.email || ''; // Handle undefined case
        this.getUserByEmail(userEmail);
        this.userName = user.name || '';
      }
    });
    this.loadLostObjects();
  }

  loadLostObjects() {
    this.service.getLostObjects().subscribe(
      (data: LostObject[]) => {
        this.lostObjects = data;
        this.filteredObjects = data; // Inicialmente, exibe todos os objetos perdidos
      },
      (error) => {
        console.error('Erro ao carregar objetos perdidos:', error);
        // Trate o erro conforme necessário, como exibir uma mensagem de erro na interface
      }
    );
  }

  loadCustomer() {
    this.service.GetCustomer().subscribe(res => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  addLostObject() {
    if (this.lostObjectForm.valid) {
      this.service.addLostObject(this.lostObjectForm.value).subscribe(() => {
        this.loadLostObjects(); // Recarrega a lista de objetos perdidos após adicionar
        this.cancelAddObject(); // Limpa o formulário de adição
      });
    }
  }

  cancelAddObject() {
    this.lostObjectForm.reset();
    this.showAddObjectForm = false;
  }

  onSearch() {
    this.filteredObjects = this.searchText.trim() === '' ? [...this.lostObjects] : this.lostObjects.filter(obj =>
      obj.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  viewDetails(FoundObject: any) {
    this.router.navigate(['/object-details', FoundObject.id]); // Navigate to the details page
  }

  removeLostObject(id: number) {
    if (confirm('Tem certeza que deseja remover este objeto?')) {
      this.service.deleteLostObject(id).subscribe(
        () => {
          this.loadLostObjects(); // Recarrega a lista de objetos encontrados após a remoção
        },
        error => {
          console.error('Erro ao remover objeto encontrado:', error);
          // Tratar erro aqui, como exibir uma mensagem na interface
        }
      );
    }
  }

  getUserByEmail(email: string): void {
    this.service.getUserByEmail(email).subscribe(
      (data: any) => {
        console.log(data);
        this.userId = data.id;
        // Atualiza o valor de generaluser no formulário
        this.lostObjectForm.patchValue({
          generaluser: parseInt(this.userId || '0') // Converte para número inteiro
        });
      },
      (error) => {
        console.error('Erro ao carregar objetos perdidos:', error);
        // Trate o erro conforme necessário, como exibir uma mensagem de erro na interface
      }
    );
  }

  getCardImagePath(categoryId: number): string {
    switch (categoryId) {
      case 1:
        return "assets/technology.jpg";
      case 2:
        return "assets/clothes.jpg";
      case 3:
        return "assets/acessories.jpeg";
      case 4:
        return "assets/sport.jpg";
      default:
        return "assets/default.jpg"; // Provide a default image path
    }
  }
}
