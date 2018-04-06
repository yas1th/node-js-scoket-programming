import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  private chatFrm: FormGroup;
  private msgFrm : FormGroup;
  private messages: any[] = [];
  private room : string;
  private user : string;
  constructor(private x: ChatService) {

    this.x.newUserJoined().subscribe(
      (res) => {
        console.log('The response is ', res)
        this.messages.push(res)
      },
      (err) => {
        console.log('The error is ', err)
      }
    )

    this.x.chatMessage().subscribe(
(res)=>{
this.messages.push(res)
},
(err)=>{
console.log('The error is ',err)
}
    )

    this.x.userExit().subscribe(
      (res)=>{
      this.messages.push(res)
      },
      (err)=>{
      console.log('The error is ',err)
      }
          )


  }

  ngOnInit() {

    this.msgFrm = new FormGroup({
      msg : new FormControl('',[Validators.required]),
      user : new FormControl('',[Validators.required]),
      room : new FormControl('',[Validators.required])
    })

    this.chatFrm = new FormGroup({
      name: new FormControl('', [Validators.required])

    });


  }

  exitRoom(){
this.x.exit({user : this.user,room : this.room})
  }

  sendMessage(){
    this.x.newMessage(this.msgFrm.value);
    this.msgFrm.patchValue({msg : ''})
  }

  joinRoom(room) {
    this.msgFrm.patchValue({user : this.chatFrm.value.name,room : room})
    this.room = room;
    this.user = this.chatFrm.value.name;

    let data = this.chatFrm.value;
    data.room = room;
    this.x.joinRoom(data);
  }

}
