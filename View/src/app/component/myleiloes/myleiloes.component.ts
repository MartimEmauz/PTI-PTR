import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { Router } from '@angular/router'; // Import Router
import { FoundObject } from 'src/app/Model/found-object.model';

@Component({
  selector: 'app-table',
  templateUrl: './myleiloes.component.html',
  styleUrls: ['./myleiloes.component.css']
})
export class MyLeiloesComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["code", "name", "email", "phone", "status", "action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  lostObjectForm: FormGroup;
  showAddObjectForm: boolean = false;
  useSpecificDate: boolean = true;
  categories = [
    { id: 1, name: 'Eletrónicos' },
    { id: 2, name: 'Documentos' },
    { id: 3, name: 'Chaves' },
    { id: 4, name: 'Acessórios' },
    { id: 5, name: 'Roupas' },
    { id: 6, name: 'Outros' }
  ];
  

  searchText: string = '';
  lostObjects: any[] = [];
  filteredObjects: any[] = [];

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router) { // Inject Router
    this.dataSource = new MatTableDataSource<any>();
    this.lostObjectForm = this.fb.group({
      title: ['', Validators.required],
      specific_date: [{ value: '', disabled: !this.useSpecificDate }],
      start_date: [{ value: '', disabled: this.useSpecificDate }],
      end_date: [{ value: '', disabled: this.useSpecificDate }],
      description: ['', Validators.required],
      category: ['', Validators.required],
      address: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      genero: ['', Validators.required],
      birthday: ['', Validators.required],
      idCivil: ['', Validators.required],
      idFiscal: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      police: ['', Validators.required],
      delivered: [false]
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
    this.loadFoundObjects();
  }

  loadFoundObjects() {
    this.service.getFoundObjects().subscribe(
      (data: FoundObject[]) => {
        this.lostObjects = data;
        this.filteredObjects = data; // Inicialmente, exibe todos os objetos perdidos
      },
      (error) => {
        console.error('Erro ao carregar objetos perdidos:', error);
        // Trate o erro conforme necessário, como exibir uma mensagem de erro na interface
      }
    );
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  addFoundObject() {
    if (this.lostObjectForm.valid) {
      // Chame o serviço para adicionar o objeto encontrado
      this.service.addFoundObject(this.lostObjectForm.value).subscribe(() => {
        this.loadFoundObjects();
        this.cancelAddObject();
      }, error => {
        console.error('Erro ao adicionar objeto encontrado:', error);
        // Tratar erro aqui, como exibir uma mensagem na interface
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

  toggleDateInput() {
    this.useSpecificDate = !this.useSpecificDate;
    if (this.useSpecificDate) {
      this.lostObjectForm.controls['specific_date'].enable();
      this.lostObjectForm.controls['start_date'].disable();
      this.lostObjectForm.controls['end_date'].disable();
    } else {
      this.lostObjectForm.controls['specific_date'].disable();
      this.lostObjectForm.controls['start_date'].enable();
      this.lostObjectForm.controls['end_date'].enable();
    }
    this.lostObjectForm.updateValueAndValidity(); // Update form validity after toggling
  }

  dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const specificDate = group.get('specific_date')?.value;
    const startDate = group.get('start_date')?.value;
    const endDate = group.get('end_date')?.value;

    if ((specificDate && (startDate || endDate)) || (!specificDate && (!startDate || !endDate))) {
      return { dateRangeInvalid: true };
    }
    return null;
  }

  viewDetails(lostObject: any) {
    this.router.navigate(['/object-details', lostObject.id]); // Navigate to the details page
  }
}
