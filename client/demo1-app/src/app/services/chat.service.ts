import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class ChatService{

private socket = io('http://localhost:3001');

joinRoom(data){
this.socket.emit('join',data)
}

newUserJoined(){
    var observable = new Observable(observer=>{

        this.socket.on('new_joinee',function(data){
            observer.next(data)
        })

    })
    return observable;
}

newMessage(data){
this.socket.emit('new_message',data)
}

exit(res){
this.socket.emit('exit_room',res)
}

userExit(){
    var observable = new Observable(observer=>{
        this.socket.on('user_exit',function(data){
observer.next(data)
        })
    })
    return observable;
}

chatMessage(){
    var observable = new Observable(observer=>{
        this.socket.on('chat_msg',function(res){
            observer.next(res)
        })
    })
    return observable;
}


}