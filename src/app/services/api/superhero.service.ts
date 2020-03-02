import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  apiUrl;
  constructor(
    public storage:Storage
  ) { 
  
  }

  getHeroName(){
    return this.storage.get('heroName').then((value) => {
        return value;
    });
  }
}



