import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Message } from 'src/models/Message';

/**
 * Komponent pozwalający na utworzenie wiadomości przez formularz.
 */
@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})

@Injectable()
export class ChatInputComponent implements OnInit {

  author: string = '';
  content: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  // Metoda odpalona przez button określony w .html komponentu
  onSubmit(form: NgForm) {
    const message: Message = form.value;

    // Zapytanie HTTP POST z obiektem formularza - przyjmuje format JSON na zasadzie zestawu klucz: wartość
    this.http.post('/api/messages', message).subscribe(() => {
      form.reset();
    })
  }

}
