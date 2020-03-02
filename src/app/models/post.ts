export class Post{
  image  
  constructor(
      public id:number,
      public title: string,
      public comment:string,
      public author:string,
      public date:Date
    ){}
    setImage(newImg){
        this.image = newImg;
    }
  }