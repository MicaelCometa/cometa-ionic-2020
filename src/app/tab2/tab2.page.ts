import { Component } from '@angular/core';
import { PostService } from '../services/api/post.service';
import { Post } from '../models/post';
import { ThrowStmt } from '@angular/compiler';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  posts

  constructor(
    public postService: PostService,
    public storage:Storage,
    public alertController:AlertController
  ) {
    this.posts = Array();
  }

  ionViewDidEnter() {
    this.getPosts();
    this.checkHeroNameStorage();
  }


  checkHeroNameStorage(){
    return this.storage.get('heroName').then((storageName) => {
        if(!storageName){
          this.generateSuperUltraName();
        }else{
          var heroName = this.storage.get('heroName');
        }
    });
  }
  

  generateSuperUltraName(){
    var _verduras = Array('Aguacate','Fresa','Zanahoria','Kiwi','Limón','Mazorca','Naranja','Papa','Pepino','Pimiento','Plátano','Melón','Alcachofa','Calabaza');
    var _atributos = Array('impresionante','de combate','del imperio','salvavidas','del destino','espacial','nuclear','ninja','samurai','mutante','predator','pirata','astronauta','especial');
    var verduras = _verduras;
    var atributos = _atributos;

    this.postService.getAllNicks().subscribe(
      data => {
        var nicks;
        nicks = data.body
        nicks.forEach(nick => {
          var nickArray = nick.name.split(' ');
          var name = nickArray.splice(0,1)[0];
          // POSICION DEL NOMBRE
          var coincidence = verduras.indexOf(name);
          if(coincidence!=-1){
            verduras.splice( coincidence,1 );
          }
          // POSICION DEL SUPERULTRAPODER
          var surname = nickArray.join(' ');
          var coincidence = atributos.indexOf(surname);
          if(coincidence!=-1){
            atributos.splice( coincidence ,1);
          }
        });
        if(verduras.length>=0){
          verduras = _verduras;
          atributos = _atributos;
        }
        var indexVerduras = Math.floor( Math.random() * (verduras.length - 0) + 0 );
        var indexAtributos = Math.floor( Math.random() * (verduras.length - 0) + 0 );
        var name = verduras.splice( indexVerduras)[0];
        var surname = atributos.splice(indexAtributos)[0];
        var heroName = name+' '+surname;
        
        this.postService.checkNick(heroName).subscribe(
          data => {
            if(data.body==true){
              this.storage.set('heroName',heroName);
              this.superAlert(heroName);
            }
          },
          error => {
            console.log('error',error);
            this.generateSuperUltraName();
          }
        )
      }
    );
  }

  async superAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Hola',
      subHeader: '',
      message: msg,
      buttons: ['OK'] 
    });
    await alert.present();
  }

  getPosts(){
    this.posts = Array();
    this.postService.getPosts().subscribe(
      data => {
        var posts;
        posts = data.body;
        posts.forEach(post => {

          var imgName =  post.author.split(' ')[0].toLowerCase() ;
          imgName = imgName.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
          imgName = imgName+'.png'

          var thePost = new Post(
            post.id,
            post.title,
            post.comment,
            post.author,
            post.date
          );
          thePost.setImage(imgName);
          this.posts.push(
            thePost
          )
        });
      },
      error =>{
        console.log('error',error)
      }
    )
  }
  



}