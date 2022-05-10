import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Message } from 'src/models/Message';

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

  onSubmit(form: NgForm) {
    const message: Message = form.value;

    this.http.post('/api/messages', message).subscribe(() => {
      form.reset();
    })
  }

}
