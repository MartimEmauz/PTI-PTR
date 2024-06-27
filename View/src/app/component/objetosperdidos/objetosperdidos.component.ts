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
import { AuthSwitchService } from '../../auth-switch.service';
import { get } from 'jquery';

@Component({
  selector: 'app-table',
  templateUrl: './objetosperdidos.component.html',
  styleUrls: ['./objetosperdidos.component.css']
})
export class ObjetosperdidosComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ["code", "title", "category", "specific_date", "description", "action"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  lostObjectForm: FormGroup;
  showAddObjectForm: boolean = false;

  searchText: string = '';
  lostObjects: any[] = [];
  filteredObjects: any[] = [];
  userName: string = '';
  userId: string | null = null;
  filteredAttributes: any[] = [];
  categories = [
    { id: null, name: '' },
  ];
  constructor(private service: MasterService, private fb: FormBuilder, private router: Router, private _auth: AuthService,private authSwitchService: AuthSwitchService) {
    this.dataSource = new MatTableDataSource<any>();
    this.lostObjectForm = this.fb.group({
      title: ['', Validators.required],
      specific_date: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      generaluser: [null],
      objeto_id: [null],
      filteredAttributes: ['']
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

  addLostObject() {
    if (this.lostObjectForm.valid) {
      this.service.addObject(this.lostObjectForm.value).subscribe((newObject: any) => {
        const objeto_id = newObject.id;
        const lostObjectData = {
          id: 0,  // Usando 0 como um valor temporário que será substituído pelo backend
          objeto_id: objeto_id,
          generaluser: parseInt(this.userId || '0', 10)
        };

        this.service.addLostObject(lostObjectData).subscribe(() => {
          this.loadLostObjects();
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
    this.filteredObjects = this.searchText.trim() === '' ? [...this.filteredObjects] : this.filteredObjects.filter(obj =>
      obj.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.dataSource.data = this.filteredObjects;
    if(this.searchText == ''){
      this.loadLostObjects();
    }
  }

  viewDetails(FoundObject: any) {
    this.router.navigate(['/object-details', FoundObject.id]);
  }

  removeLostObject(id: number) {
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

getAttributesData(): any[] {
  const attributesData: any[] = [];

  // Iterate over filteredAttributes and get values from form
  this.filteredAttributes.forEach(attribute => {
    const value = this.lostObjectForm.get(attribute.id.toString())?.value;
    const attributeData = {
      id: attribute.id,
      value: value,
      object_id: 1, // Replace with the actual object_id if needed
      category_attribute_id: attribute.id
    };
    attributesData.push(attributeData);
  });

  return attributesData;
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
}
