import { Component, ElementRef, NgZone, AfterViewInit, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
<<<<<<< HEAD
export class SliderComponent implements AfterViewInit {
  @ViewChild('mapContainer', {static: false}) gmap = ElementRef<any>;
  map = google.maps.Map;
  lat = -23.5505; // Exemplo de latitude (por exemplo, São Paulo)
  lng = -46.6333; // Exemplo de longitude
  zoom = 12; // Zoom inicial

  constructor(private zone: NgZone) {}

  ngAfterViewInit() {
    if (this.gmap) {
      this.loadGoogleMapsScript(() => {
        this.initMap();
      });
    } else {
      console.error('Elemento mapContainer não encontrado.');
    }
  }

  loadGoogleMapsScript(callback: () => void): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
    script.onload = () => {
      this.zone.run(callback);
    };
    document.body.appendChild(script);
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.zoom
    };
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    new google.maps.Marker({
      position: { lat: this.lat, lng: this.lng },
      map: this.map,
      title: 'Marker'
    });
  }
=======
export class SliderComponent {
  selectedvalue=25;
  startvalue=30;
  endvalue=70;
<<<<<<< HEAD
>>>>>>> parent of 6b1419d (fixing)
=======
>>>>>>> parent of 6b1419d (fixing)
}
