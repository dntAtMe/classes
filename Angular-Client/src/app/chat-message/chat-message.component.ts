import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/models/Message';

/**
 * Komponent wiadomości, formatuje jedynie jak wiadomość ma być wyświetlana.
 */
@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  // Wiadomość otrzymana przez parametr
  @Input() message: Message | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
