import { Component } from '@angular/core';
import firebaseConfig from '../../firebaseConfig.js';
import * as firebase from 'firebase';
import { DataStorageService } from './services/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'home';

  constructor(private dataStorageService: DataStorageService) { }
  
  ngOnInit(){
    firebase.initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      databaseURL: firebaseConfig.databaseURL,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId
    });
    this.onFetchData();
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  onFetchData() {
    this.dataStorageService.getData(); //Attn. data-storage.service.ts
  }
}
