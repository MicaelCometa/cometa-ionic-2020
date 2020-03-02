import { Component } from '@angular/core';
import { SuperheroService } from '../services/api/superhero.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  superHeroName;
  avatar;
  constructor(
    public superHeroService:SuperheroService,
  ) {
    this.superHeroName = '';
    this.avatar='blanck.png';
    this.superHeroService.getHeroName().then(
      data => {
        this.superHeroName = data;
        this.avatar =  data.split(' ')[0].toLowerCase() ;
        var imgName = this.avatar.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
        this.avatar= imgName+'.png'
      }
    )
  }



  

}
