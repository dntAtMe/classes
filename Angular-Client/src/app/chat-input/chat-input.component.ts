import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Message } from 'src/models/Message';
import { UserNameService } from '../user-name.service';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})

@Injectable()
export class ChatInputComponent implements OnInit {

  author: string | undefined;
  content: string = '';

  constructor(private http: HttpClient, private userNameService: UserNameService) {
    this.userNameService.subject.subscribe(name => {
      this.author = name;
    });
  }

  ngOnInit(): void { }

  onSubmit(form: NgForm) {
    if (!this.author) {
      return;
    }

    const message: Message = { 
      author: this.author,
      ...form.value 
    };

    this.http.post('/api/messages', message).subscribe(() => {
      form.reset();
    });
  }

}
