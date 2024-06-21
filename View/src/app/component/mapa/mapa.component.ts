///<reference path="../../../../node_modules/@types/googlemaps/index.d.ts"/>
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

declare var google: any; // Declarando o objeto google globalmente

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {

  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;

  mapa!: google.maps.Map;
  markers: google.maps.Marker[];
  distancia!: string;
  formMapas!: FormGroup;

  constructor(private renderer: Renderer2) {
    this.markers = [];
    this.formMapas = new FormGroup({
      busqueda: new FormControl(''),
      direccion: new FormControl(''),
      referencia: new FormControl(''),
      ciudad: new FormControl(''),
      provincia: new FormControl(''),
      region: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.loadGoogleMapsScript().then(() => {
      console.log('Google Maps API carregada com sucesso.');
      // Após o carregamento da API, inicializa o mapa
      this.initMap();
    }).catch((error) => {
      console.error('Erro ao carregar Google Maps API:', error);
    });
  }

  ngAfterViewInit(): void {
    // Outras inicializações que dependem do DOM
    this.cargarAutocomplete();
  }

  private loadGoogleMapsScript(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwZypniHn2fnh4XGmjuBQpVHDlT6XOt1w';
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  }

  private initMap(): void {
    const opciones = {
      center: { lat: -33.45, lng: -70.66 }, // Coordenadas iniciais
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.mapa = new google.maps.Map(this.divMap.nativeElement, opciones);

    // Exemplo de adição de marcador
    const markerPosition = new google.maps.Marker({
      position: { lat: -33.45, lng: -70.66 }, // Coordenadas do marcador
      title: 'Marcador'
    });
    markerPosition.setMap(this.mapa);
    this.markers.push(markerPosition);

    // Exemplo de evento de clique no mapa
    google.maps.event.addListener(this.mapa, 'click', (evento: google.maps.MapMouseEvent) => {
      const marker = new google.maps.Marker({
        position: evento.latLng,
        animation: google.maps.Animation.DROP
      });
      marker.setMap(this.mapa);

      google.maps.event.addListener(marker, 'click', () => {
        marker.setMap(null);
      });
    });
  }

  onSubmit() {
    console.log('Dados do formulário: ', this.formMapas.value);
  }

  mapRuta() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(this.mapa);

    const request = {
      origin: 'Quilpué, Chile',
      destination: 'Viña del Mar, Chile',
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        this.distancia = result.routes[0].legs[0].distance.text;
      } else {
        console.error('Erro ao calcular rota: ', status);
      }
    });
  }

  private cargarAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.inputPlaces.nativeElement, {
      componentRestrictions: {
        country: ['CL']
      },
      fields: ['address_components', 'geometry', 'place_id'],
      types: ['address']
    });

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      console.log('Place completo: ', place);

      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location
      });
      marker.setMap(this.mapa);

      this.llenarFormulario(place);
    });
  }

  private llenarFormulario(place: any) {
    const addressNameFormat: any = {
      'street_number': 'short_name',
      'route': 'long_name',
      'administrative_area_level_1': 'short_name',
      'administrative_area_level_2': 'short_name',
      'administrative_area_level_3': 'short_name',
      'country': 'long_name'
    };

    const getAddressComp = (type: any) => {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]] || '';
        }
      }
      return '';
    };

    const componentForm = {
      direccion: 'route',
      ciudad: 'administrative_area_level_3',
      provincia: 'administrative_area_level_2',
      region: 'administrative_area_level_1'
    };

    Object.entries(componentForm).forEach(([key, value]) => {
      this.formMapas.controls[key].setValue(getAddressComp(value));
    });

    this.formMapas.controls['direccion'].setValue(getAddressComp('route') + ' ' + getAddressComp('street_number'));
  }
}
