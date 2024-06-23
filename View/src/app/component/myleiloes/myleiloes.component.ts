import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { Router } from '@angular/router'; // Import Router
import { FoundObject } from 'src/app/Model/found-object.model';
import { User } from '@auth0/auth0-spa-js';
import { AuthService } from '@auth0/auth0-angular';

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
  userId: string | null = null; // Change the type to string | null
  delivered: boolean = false;
  constructor(private service: MasterService, private fb: FormBuilder, private router: Router, private _auth: AuthService) { // Inject Router
    this.dataSource = new MatTableDataSource<any>();
    this.lostObjectForm = this.fb.group({
      title: ['', Validators.required],
      specific_date: [{ value: '', disabled: !this.useSpecificDate }],
      start_date: [{ value: '', disabled: this.useSpecificDate }],
      end_date: [{ value: '', disabled: this.useSpecificDate }],
      description: ['', Validators.required],
      category: ['', Validators.required],
      address: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      genero: ['', Validators.required],
      birthday: ['', Validators.required],
      idcivil: ['', Validators.required],
      idfiscal: ['', Validators.required],
      phonenumber: ['', Validators.required],
      police: ['', Validators.required],
      delivered: [false],
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        const userEmail = user.email || ''; // Handle undefined case
        this.getUserByEmail(userEmail);
      }
    });
    this.loadFoundObjects();
  }

  loadFoundObjects() {
    this.service.getFoundObjects().subscribe(
      (foundObjects: any[]) => {
        this.lostObjects = foundObjects;
        this.service.getObjects().subscribe(
          (objects: any[]) => {
            const associatedObjects = objects.filter(object => 
              this.lostObjects.some(foundObject => foundObject.objeto_id === object.id)
            );

            this.filteredObjects = associatedObjects;
            this.dataSource.data = this.filteredObjects;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

  getDeliveredStatus(objectId: number): boolean | undefined {
    const foundObject = this.lostObjects.find(obj => obj.objeto_id === objectId);
    return foundObject.delivered;
  }
  

  addFoundObject() {
    if (this.lostObjectForm.valid) {
      // Adiciona o objeto principal
      this.service.addObject(this.lostObjectForm.value).subscribe((newObject: any) => {
        const objeto_id = newObject.id; // Captura o id do objeto criado
        
        // Cria o objeto foundObject associado
        const foundObjectData: FoundObject = {
          title : this.lostObjectForm.value.title,
          specific_date: this.lostObjectForm.value.specific_date,
          start_date: this.lostObjectForm.value.start_date,
          end_date: this.lostObjectForm.value.end_date,
          description: this.lostObjectForm.value.description,
          category: this.lostObjectForm.value.category,
          address: this.lostObjectForm.value.address,
          generaluser: parseInt(this.userId || '0'),
          firstname: this.lostObjectForm.value.firstname,
          lastname: this.lostObjectForm.value.lastname,
          genero: this.lostObjectForm.value.genero,
          birthday: this.lostObjectForm.value.birthday,
          idcivil: this.lostObjectForm.value.idcivil,
          idfiscal: this.lostObjectForm.value.idfiscal,
          phonenumber: this.lostObjectForm.value.phonenumber,
          police: this.lostObjectForm.value.police,
          objeto_id: objeto_id,
          delivered: false,
        };
  
        // Adiciona o foundObject associado
        this.service.addFoundObject(foundObjectData).subscribe(() => {
          this.loadFoundObjects();
          this.cancelAddObject();
        });
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
    this.dataSource.data = this.filteredObjects;
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

  removeFoundObject(id: number) {
    if (confirm('Tem certeza que deseja remover este objeto?')) {
      this.service.deleteObject(id).subscribe(
        () => {
          this.loadFoundObjects(); // Recarrega a lista de objetos encontrados após a remoção
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
}
