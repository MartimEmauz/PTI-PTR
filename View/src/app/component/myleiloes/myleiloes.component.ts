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
    date: '',
    description: '',
    category: null,
    address: null
  };
  showAddObjectForm: boolean = false;

  constructor(private service: MasterService) {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.loadCustomer();
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
    this.service.addLostObject(this.newLostObject).subscribe(() => {
      this.loadCustomer();
      this.cancelAddObject();
    });
  }

  cancelAddObject() {
    this.newLostObject = {
      date: '',
      description: '',
      category: null,
      address: null
    };
    this.showAddObjectForm = false;
  }

}
