import { Component } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/api/post.service';
import { SuperheroService } from '../services/api/superhero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  post:Post;

  constructor(
    public postService : PostService,
    public router: Router,
    public superHeroService:SuperheroService
  ) {
    this.post = new Post(0,'','','',new Date);
    this.superHeroService.getHeroName().then(
      data => {
        console.log('data de hero',data);
       this.post.author = data;
      }
    )



    
  }

  sendPost(){
    this.postService.addPost(this.post).subscribe(
      data => {
        console.log('data',data);
        this.router.navigateByUrl('tabs/tab2');
      }
    ) 
  }

}
