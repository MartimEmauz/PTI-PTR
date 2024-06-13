import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterService } from 'src/app/service/master.service';
import { LostObject } from 'src/app/Model/lost-object.model';

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
  newLostObject: LostObject = {
    title:"",
    date: '',
    description: '',
    category: null,
  };
  showAddObjectForm: boolean = false;

  
  searchText: string = '';
  lostObjects: any[] = [];
  filteredObjects: any[] = [];


  constructor(private service: MasterService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.loadCustomer();
    this.service.getLostObjects().subscribe((data: any[]) => {
      this.lostObjects = data;
      this.filteredObjects = data;
    });

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
    this.dataSource.filter = value;
  }

  editCustomer(code: any) {
    // Lógica para editar cliente
  }

  detailCustomer(code: any) {
    // Lógica para detalhar cliente
  }

  addLostObject() {                                      
    console.log(this.newLostObject)
    this.service.addLostObject(this.newLostObject).subscribe(() => {
      this.loadCustomer();
      this.cancelAddObject();
      window.location.reload();
    });
  }

  cancelAddObject() {
    this.newLostObject = {
      title:"",
      date: '',
      description: '',
      category: null,
    };
    this.showAddObjectForm = false;
  }



  onSearch() {
    if (this.searchText.trim() === '') {
      this.filteredObjects = [...this.lostObjects];
    } else {
      this.filteredObjects = this.lostObjects.filter(obj =>
        obj.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
      // Adicione os objetos que não correspondem à pesquisa
      const remainingObjects = this.lostObjects.filter(obj =>
        !obj.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
      this.filteredObjects.push(...remainingObjects);
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
        return ""; // ou o caminho para uma imagem padrão caso a categoria não seja reconhecida
    }
  }


}
