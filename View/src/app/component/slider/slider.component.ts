import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  center: google.maps.LatLngLiteral = { lat: -34.397, lng: 150.644 };
  zoom = 8;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    maxZoom: 18,
    minZoom: 8,
  };
}
