import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from 'src/app/service/master.service';

@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.css']
})
export class ObjectDetailsComponent implements OnInit {
  objectDetails: any;

  constructor(private route: ActivatedRoute, private service: MasterService) { }

  ngOnInit(): void {
    const objectId = this.route.snapshot.paramMap.get('id');
    if (objectId) {
      this.service.getObjectDetails(objectId).subscribe(
        (data: any) => {
          this.objectDetails = data;
        },
        (error) => {
          console.error('Erro ao carregar detalhes do objeto:', error);
        }
      );
    }
  }

  // Define the getCardImagePath method
  getCardImagePath(category: string): string {
    switch (category) {
      case 'electronics':
        return 'assets/images/electronics.jpg';
      case 'clothing':
        return 'assets/images/clothing.jpg';
      case 'furniture':
        return 'assets/images/furniture.jpg';
      default:
        return 'assets/images/default.jpg';
    }
  }
}
