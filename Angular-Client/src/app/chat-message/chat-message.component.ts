import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/models/Message';
import { UserNameService } from '../user-name.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message | undefined;
  @Input() received: boolean | undefined;

  constructor() { }

  ngOnInit(): void { 
  
  }

}
