import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-object-card',
  templateUrl: './object-card.component.html',
  styleUrls: ['./object-card.component.css']
})
export class ObjectCardComponent {
  @Input() lostObject: any;
}
