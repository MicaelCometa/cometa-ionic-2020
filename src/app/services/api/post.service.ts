import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import {HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiUrl;
  constructor(
    public http:HttpClient
  ) { 
    this.apiUrl = GlobalService.apiUrl;
  }

  addPost(post) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    return this.http.post(this.apiUrl+'posts/insert',post,{observe: 'response'});
  }

  getPosts(){
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      return this.http.get(this.apiUrl+'posts/getPosts',{observe: 'response'});
  }

  getAllNicks(){
    var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      return this.http.get(this.apiUrl+'avatar/getNames',{observe: 'response'});
  }

  checkNick(nick){
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );

    let data =  {
      'name': nick 
    };
    return this.http.post(this.apiUrl+'avatar/check',data,{observe: 'response'});
}
  

}
