import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { Router } from '@angular/router'; // Import Router

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
  categories: string[] = ['Eletrónicos', 'Documentos', 'Chaves', 'Acessórios', 'Roupas', 'Outros'];

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
      (data: any) => {
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
      // Obtenha os valores do formulário
      const formData = {
        title: this.lostObjectForm.get('title')?.value,
        specific_date: this.lostObjectForm.get('specific_date')?.value,
        start_date: this.formatDate(this.lostObjectForm.get('start_date')?.value),
        end_date: this.formatDate(this.lostObjectForm.get('end_date')?.value),
        description: this.lostObjectForm.get('description')?.value,
        category: this.lostObjectForm.get('category')?.value,
        address: this.lostObjectForm.get('address')?.value,
        firstName: this.lostObjectForm.get('firstName')?.value,
        lastName: this.lostObjectForm.get('lastName')?.value,
        genero: this.lostObjectForm.get('genero')?.value,
        birthday: this.lostObjectForm.get('birthday')?.value,
        idCivil: this.lostObjectForm.get('idCivil')?.value,
        idFiscal: this.lostObjectForm.get('idFiscal')?.value,
        phoneNumber: this.lostObjectForm.get('phoneNumber')?.value,
        police: this.lostObjectForm.get('police')?.value,
        delivered: this.lostObjectForm.get('delivered')?.value
      };
  
      // Chame o serviço para adicionar o objeto encontrado
      this.service.addFoundObject(formData).subscribe(() => {
        this.loadFoundObjects();
        this.cancelAddObject();
        window.location.reload(); // Recarregar a página após adicionar o objeto
      }, error => {
        console.error('Erro ao adicionar objeto encontrado:', error);
        // Tratar erro aqui, como exibir uma mensagem na interface
      });
    }
  }
  
  // Função para formatar a data para YYYY-MM-DD
  private formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
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
