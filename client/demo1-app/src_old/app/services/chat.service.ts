import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
@Injectable()
export class ChatService{

private socket = io('http://localhost:3001');

}