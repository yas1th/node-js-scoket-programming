import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import {FormGroup,FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers : [ChatService]
})
export class ChatComponent implements OnInit {
private chatFrm : FormGroup;
  constructor(private x : ChatService) { }

  ngOnInit() {
    this.chatFrm = new FormGroup({
      name : new FormControl('',[Validators.required])

    })
  }

}
