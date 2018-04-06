import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/observable'
import 'rxjs/add/operator/catch';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import 'rxjs/add/observable/throw';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts()
  {
    return this.http.get('http://jsonplaceholder.typicode.com/posts')
  }

  createPost(post){
    return this.http.post('http://jsonplaceholder.typicode.com/posts',JSON.stringify(post))
    .catch((error:Response) => {
      if(error.status===404)
      return Observable.throw(new BadInput(error.json()));
      
  
      return Observable.throw(new AppError(error.json()))
    })
  }

  updatePost(post){
   return this.http.put('http://jsonplaceholder.typicode.com/posts/'+post.id,JSON.stringify(post))
  }

  deletePost(x)
  {
    return this.http.delete('http://jsonplaceholder.typicode.com/posts/'+x.id,)
    .catch( (error:Response) =>{
      if(error.status===404)
      return Observable.throw( new NotFoundError())
      
      return Observable.throw( new AppError() )

    })
  }

}
