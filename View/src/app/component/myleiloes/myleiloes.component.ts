import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { Router } from '@angular/router';
import { User } from '@auth0/auth0-spa-js';
import { AuthService } from '@auth0/auth0-angular';
import { ConstantPool } from '@angular/compiler';
import { AuthSwitchService } from 'src/app/auth-switch.service';
import { forkJoin } from 'rxjs';

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
  categories = [{ id: null, name: '' }];
  searchText: string = '';
  objects: any[] = [];
  filteredObjects: any[] = [];
  filteredAttributes: any[] = [];
  userId: string | null = null;
  delivered: boolean = false;
  ownerFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  categoryAttributes: any[] = [];
  lostObjects: any[] = [];
  userName: string = '';
  foundObjects: any[] = [];
  categoriesfiltered: any[] = [];

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router, private _auth: AuthService, private authSwitchService: AuthSwitchService) {
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
      if (user) {
        const userEmail = user.email || '';
        this.getUserByEmail(userEmail);
        this.userName = user.name || '';
      }
    });
    this.loadLostObjects();
    this.getCategoriesFromDb();
  }

  onCategoryChange(event: any): void {
    const categoryId = event.value;
    this.loadCategoryAttributes(categoryId);
  }

  loadCategoryAttributes(categoryId: number): void {
    this.service.getAttributes().subscribe(
      (attributes: any[]) => {
        this.filteredAttributes = attributes.filter(attribute => attribute.category_id === categoryId);
        this.updateFormWithAttributes(this.filteredAttributes);
      },
      (error) => {
        console.error('Erro ao carregar atributos da categoria:', error);
      }
    );
  }

  updateFormWithAttributes(attributes: any[]): void {
    Object.keys(this.lostObjectForm.controls).forEach(key => {
      if (key !== 'title' && key !== 'specific_date' && key !== 'description' && key !== 'category') {
        this.lostObjectForm.removeControl(key);
      }
    });

    attributes.forEach(attribute => {
      const control = this.fb.control('', Validators.required);
      this.lostObjectForm.addControl(attribute.id.toString(), control);
    });
  }

  getAttributesData(): any[] {
    const attributesData: any[] = [];
    this.filteredAttributes.forEach(attribute => {
      const value = this.lostObjectForm.get(attribute.id.toString())?.value;
      const attributeData = {
        id: attribute.id,
        value: value,
        object_id: 1,
        category_attribute_id: attribute.id
      };
      attributesData.push(attributeData);
    });
    return attributesData;
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

  loadLostObjects() {
    this.service.getLostObjects().subscribe(
      (lostObjects: any[]) => {
        this.lostObjects = lostObjects;
        this.service.getObjects().subscribe(
          (objects: any[]) => {
            const associatedObjects = objects.filter(object => 
              this.lostObjects.some(lostObject => lostObject.objeto_id === object.id && lostObject.generaluser === parseInt(this.userId || '0', 10))
            );
            this.filteredObjects = associatedObjects;
            this.dataSource.data = this.filteredObjects;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.getCategories(this.filteredObjects);
          },
          (error) => {
            console.error('Erro ao carregar objetos:', error);
          }
        );
      },
      (error) => {
        console.error('Erro ao carregar objetos perdidos:', error);
      }
    );
  }
  
  getCategories(filteredObjects: any[]) {
    this.categoriesfiltered = filteredObjects.map(obj => obj.category);
    console.log(this.categoriesfiltered);
    this.compareObjectsByCategory(this.categoriesfiltered);
  }

  compareObjectsByCategory(categoryIds: number[]) {
    const observables = categoryIds.map(categoryId => 
      this.service.compareObjectsByCategory(categoryId)
    );
  
    forkJoin(observables).subscribe(
      (results: any[][]) => {
        // Combina os resultados de todas as chamadas de API em uma única lista
        const combinedResults = results.flat();
        // Aqui você pode fazer o que precisar com combinedResults, por exemplo:
        
        this.filteredObjects = combinedResults;
        this.dataSource.data = this.filteredObjects;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.foundObjects = combinedResults;
        this.FoundObjectsToObjects(this.filteredObjects);
      },
      (error) => {
        console.error('Erro ao comparar objetos por categoria:', error);
      }
    );
  }
  
  FoundObjectsToObjects(foundObjects: any[]) {
    // Buscar todos os objetos
    this.service.getObjects().subscribe(
      (objects: any[]) => {
        // Filtrar os objetos que correspondem aos foundObjects
        const filteredObjects = objects.filter(object => 
          foundObjects.some(foundObject => foundObject.objeto_id === object.id)
        );
  
        // Atualizar a lista de objetos filtrados
        this.filteredObjects = filteredObjects;
        
        // Log dos objetos filtrados
        console.log('filteredObjects:', filteredObjects);
        
        // Atualizar o dataSource se necessário
        this.dataSource.data = this.filteredObjects;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Erro ao carregar objetos:', error);
      }
    );
  }
  

  loadObjectsByCategory(categoryId: number) {
    this.service.compareObjectsByCategory(categoryId).subscribe(
      (objects: any[]) => {
        this.filteredObjects = objects.map(object => {
          const foundObject = this.objects.find(found => found.object_id === object.id);
          return {
            ...foundObject,
            ...object
          };
        });
        this.dataSource.data = this.filteredObjects;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.filteredObjects);
      },
      (error) => {
        console.error('Erro ao carregar objetos por categoria:', error);
      }
    );
  }

  getDeliveredStatus(objectId: number): boolean | undefined {
    const foundObject = this.foundObjects.find(obj => obj.objeto_id === objectId);
    return foundObject.delivered;
  }

  cancelAddObject() {
    this.lostObjectForm.reset();
    this.showAddObjectForm = false;
  }

  onSearch() {
    this.filteredObjects = this.searchText.trim() === '' ? [...this.filteredObjects] : this.filteredObjects.filter(obj =>
      obj.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.dataSource.data = this.filteredObjects;
    if (this.searchText == '') {
      this.loadLostObjects();
    }
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
        return "assets/default.jpg";
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
    this.lostObjectForm.updateValueAndValidity();
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

  viewDetails(foundObject: any) {
    console.log('Clicked foundObject:', foundObject);

    if (foundObject && foundObject.id !== undefined) {
      console.log('Navigating to object details with ID:', foundObject.id);
      this.router.navigate(['/object-details', foundObject.id]);
    } else {
      console.error('objeto_id (or id) is undefined or null for foundObject:', foundObject);
      // Handle error or debug further as needed
    }
  }

  removeFoundObject(id: number) {
    if (confirm('Tem certeza que deseja remover este objeto?')) {
      this.service.deleteObject(id).subscribe(
        () => {
          this.loadLostObjects();
        },
        error => {
          console.error('Erro ao remover objeto encontrado:', error);
        }
      );
    }
  }
  
  isPoliceUser(): boolean {
    return this.authSwitchService.getRole() === 'police';
  }

  getUserByEmail(email: string): void {
    if (!this.isPoliceUser()) {
    this.service.getUserByEmail(email).subscribe(
      (data: any) => {
        this.userId = data.id;
        this.lostObjectForm.patchValue({
          generaluser: parseInt(this.userId || '0', 10)
        });
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
      }
    );
  }else{
    this.service.getPoliceUserByEmail(email).subscribe(
      (data: any) => {
        this.userId = data.id;
        this.lostObjectForm.patchValue({
          police: parseInt(this.userId || '0', 10)
        });
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
      }
    );
  }
}
}