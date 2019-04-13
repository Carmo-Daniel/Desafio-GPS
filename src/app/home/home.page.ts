import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  map: any;

  constructor(private geolocation: Geolocation) { }
    //criando o objeto geolocalizacao
    //passando a coordenada
  ngOnInit() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        //passando as opcoes do mapa
        const Opcoes = {
          zoom: 18, //zoom inicial
          center: position, 
          mapTypeId: 'hybrid' //tipo do mapa
        }
        // criando o objeto mapa
        this.map = new google.maps.Map(document.getElementById('map'), Opcoes);

        //criando o objeto marcador na posicao atual
        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });

      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

}
