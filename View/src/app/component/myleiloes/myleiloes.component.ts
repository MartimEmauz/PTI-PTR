import { Attribute, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { Router } from '@angular/router'; // Import Router
import { FoundObject } from 'src/app/Model/found-object.model';
import { User } from '@auth0/auth0-spa-js';
import { AuthService } from '@auth0/auth0-angular';
import { Address } from 'src/app/Model/address.model';
import { AuthSwitchService } from 'src/app/auth-switch.service';

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
    { id: null, name: '' },
  ];


  searchText: string = '';
  lostObjects: any[] = [];
  filteredObjects: any[] = [];
  filteredAttributes: any[] = [];
  userId: string | null = null; // Change the type to string | null
  delivered: boolean = false;
  ownerFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  categoryAttributes: any[] = [];
  constructor(private service: MasterService, private fb: FormBuilder, private router: Router, private _auth: AuthService) { // Inject Router
    this.dataSource = new MatTableDataSource<any>();
    this.lostObjectForm = this.fb.group({
      title: ['', Validators.required],
      specific_date: [''],
      description: ['', Validators.required],
      category: ['', Validators.required],
      filteredAttributes: [''],
    });

    this.addressFormGroup = this.fb.group({
      street: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    });

    this.ownerFormGroup = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      genero: ['', Validators.required],
      birthday: ['', Validators.required],
      idcivil: ['', Validators.required],
      idfiscal: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  ngOnInit(): void {
    this._auth.user$.subscribe((user: User | null | undefined) => {
      if (user !== null && user !== undefined) {
        const userEmail = user.email || ''; // Handle undefined case
        this.getUserByEmail(userEmail);
      }
    });
    this.loadFoundObjects();
    this.getCategoriesFromDb();
  }


  onCategoryChange(event: any): void {
    const categoryId = event.value;
    this.loadCategoryAttributes(categoryId);
  }

  loadCategoryAttributes(categoryId: number): void {
    this.service.getAttributes().subscribe(
      (attributes: any[]) => {
        // Filtrar atributos com base no category_id
        this.filteredAttributes = attributes.filter(attribute => attribute.category_id === categoryId);
        this.updateFormWithAttributes(this.filteredAttributes);
      },
      (error) => {
        console.error('Erro ao carregar atributos da categoria:', error);
      }
    );
  }

  updateFormWithAttributes(attributes: any[]): void {
    // Limpar controles antigos
    Object.keys(this.lostObjectForm.controls).forEach(key => {
      if (key !== 'title' && key !== 'specific_date' && key !== 'description' && key !== 'category') {
        this.lostObjectForm.removeControl(key);
      }
    });
  
    // Adicionar novos controles baseados nos atributos filtrados
    attributes.forEach(attribute => {
      const control = this.fb.control('', Validators.required);
      this.lostObjectForm.addControl(attribute.id.toString(), control); // Certifique-se de usar toString() se attribute.id for um número
    });
  }
  

  getCategoriesFromDb() {
    this.service.getCategories().subscribe(
      (categories: any[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  
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
      const lostObjectData = this.lostObjectForm.value;
      const addressData = this.addressFormGroup.value;
      const ownerData = this.ownerFormGroup.value;

      // Verifica e ajusta os campos start_date e end_date
      lostObjectData.start_date = lostObjectData.start_date ? lostObjectData.start_date : null;
      lostObjectData.end_date = lostObjectData.end_date ? lostObjectData.end_date : null;

      // Extraia os dados do endereço do formulário
      const address: Address = {
        street: addressData.street,
        country: addressData.country,
        city: addressData.city,
        zip: addressData.zip,
      };

      // Cria o endereço associado
      this.service.createAddress(address).subscribe(
        (addressResponse) => { 
          if (addressResponse && addressResponse.id) {
            // Atualiza o formulário com o ID do endereço criado
            this.lostObjectForm.patchValue({ address: addressResponse.id });

            // Adiciona o objeto principal
            this.service.addObject(this.lostObjectForm.value).subscribe((newObject: any) => {
              const objeto_id = newObject.id; // Captura o id do objeto criado
              console.log('Address Response:', addressResponse.id);

              // Formata a data de aniversário
              const formattedDate = ownerData.birthday.split('T')[0];

              // Cria o objeto foundObject associado
              const foundObjectData: FoundObject = {
                title: lostObjectData.title,
                specific_date: lostObjectData.specific_date,
                description: lostObjectData.description,
                category: lostObjectData.category,
                address: addressResponse.id,
                generaluser: parseInt(this.userId || '0', 10),
                firstname: ownerData.firstname,
                lastname: ownerData.lastname,
                genero: ownerData.genero,
                birthday: formattedDate,
                idcivil: ownerData.idcivil,
                idfiscal: ownerData.idfiscal,
                phonenumber: ownerData.phonenumber,
                police: parseInt(this.userId || '0', 10), // Valor temporário que será substituído pelo backend
                objeto_id: objeto_id,
                delivered: false
              };

              console.log('Found Object Data:', foundObjectData); // Verifique o conteúdo do foundObjectData

              // Adiciona o foundObject associado
              this.service.addFoundObject(foundObjectData).subscribe(() => {
                this.loadFoundObjects();
                this.cancelAddObject();
              }, (error) => {
                console.error('Error adding found object:', error);
              });
            }, (error) => {
              console.error('Error adding object:', error);
            });
          } else {
            console.error('Address ID is null or undefined:', addressResponse);
          }
        },
        (error) => {
          console.error('Error creating address:', error);
        }
      );
    } else {
      console.error('Lost object form is invalid');
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
    this.service.getPoliceByEmail(email).subscribe(
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
