import { Attribute, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { Router } from '@angular/router';
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
  categories = [{ id: null, name: '' }];
  searchText: string = '';
  lostObjects: any[] = [];
  objects: any[] = [];
  filteredObjects: any[] = [];
  filteredAttributes: any[] = [];
  userId: string | null = null;
  delivered: boolean = false;
  ownerFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  categoryAttributes: any[] = [];

  constructor(private service: MasterService, private fb: FormBuilder, private router: Router, private _auth: AuthService) {
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
        const userEmail = user.email || '';
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

  loadFoundObjects() {
    this.service.getFoundObjects().subscribe(
      (foundObjects: any[]) => {
        this.lostObjects = foundObjects;
        this.service.getObjects().subscribe(
          (objects: any[]) => {
            this.objects = objects;

            const objectIds = this.lostObjects.map(lostObject => lostObject.objeto_id);
            const userCategoryObjects = this.objects.filter(object => objectIds.includes(object.id));

            if (userCategoryObjects.length > 0) {
              const firstCategoryId = userCategoryObjects[0].category_id;
              this.loadObjectsByCategory(2);
            }
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

  loadObjectsByCategory(categoryId: number) {
    this.service.compareObjectsByCategory(categoryId).subscribe(
      (foundObjects: any[]) => {
        this.filteredObjects = foundObjects;
        this.dataSource.data = this.filteredObjects;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Erro ao carregar objetos por categoria:', error);
      }
    );
  }

  getDeliveredStatus(objectId: number): boolean | undefined {
    const foundObject = this.lostObjects.find(obj => obj.objeto_id === objectId);
    return foundObject?.delivered;
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
    if(this.searchText == ''){
      this.loadFoundObjects();
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

  viewDetails(lostObject: any) {
    this.router.navigate(['/object-details', lostObject.id]);
  }

  removeFoundObject(id: number) {
    if (confirm('Tem certeza que deseja remover este objeto?')) {
      this.service.deleteObject(id).subscribe(
        () => {
          this.loadFoundObjects();
        },
        error => {
          console.error('Erro ao remover objeto encontrado:', error);
        }
      );
    }
  }

  getUserByEmail(email: string): void {
    this.service.getPoliceByEmail(email).subscribe(
      (data: any) => {
        console.log(data);
        this.userId = data.id;
        this.lostObjectForm.patchValue({
          generaluser: parseInt(this.userId || '0')
        });
      },
      (error) => {
        console.error('Erro ao carregar objetos perdidos:', error);
      }
    );
  }
}
