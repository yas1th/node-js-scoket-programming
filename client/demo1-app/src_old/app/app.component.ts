import { Component, OnInit } from '@angular/core';
import {  Http } from '@angular/http';
import { PostService } from './services/post.service';
import { AppError } from './common/app-error';
import { NotFoundError } from './common/not-found-error';
import { BadInput } from './common/bad-input';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  movies:any;
  userId:any;
  id:any;
  title:any;
  body:any;
constructor(private service:PostService){
}

ngOnInit(){
  this.service.getPosts()
  .subscribe(
    Response =>{
        console.log(Response);
    this.movies=Response;
      
  }),
   error => {

    alert("an unexpected error occured")
    console.log(error)
  }
}

createPost(userId:HTMLInputElement,id:HTMLInputElement,title:HTMLInputElement,body:HTMLInputElement){

  let post:any={userId:userId.value,id:id.value,title:title.value,body:body.value}
  this.service.createPost(post)
  .subscribe(
    Response => {
    console.log(Response.json())
    //post.id=Response.json().id;
    this.movies.splice(0,0,post)
    
  }),
   (error:AppError) => {
    if(error instanceof BadInput)
    alert("The User Name is already Exists")
    else{
    alert("an unexpected error occured")
    console.log(error)
    }
  }


}

updatePost(x){
  //let post:any=x;//{userId:userId.value,id:id.value,title:title.value,body:body.value}
  this.service.updatePost(x)
  .subscribe(
    Responce =>{
    console.log(Responce)
  }),
   error => {

    alert("an unexpected error occured")
    console.log(error)
  }

}

deletePost(x){

  this.service.deletePost(345)
  .subscribe(
    Response => {
    let index = this.movies.indexOf(x);

    this.movies.splice(index,1);
  }),
   (error: AppError) => {

    if(error instanceof NotFoundError)
    {
    alert("This post has deleted already ")
    }
    else{
    alert("an unexpected error occured")
    console.log(error)
    }
  }


}

}
