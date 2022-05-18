import { HttpClient } from '@angular/common/http';
import { Component, Injectable, NgZone, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Message } from '../../models/Message';
import { UserNameService } from '../user-name.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})

export class ChatboxComponent implements OnInit {

  messages: Message[] = [];
  subscription: Subscription | undefined;

  constructor(private zone: NgZone, private http: HttpClient, public userNameService: UserNameService) { }

  ngOnInit(): void {
    // Create EventSource
    this.http.get('/api/messages').subscribe(messages => {
      this.messages = messages as Message[];
      this.handleEvents();
    });
  }

  handleEvents() {
    const observable = new Observable<Message>(observer => {
      const eventSource = new EventSource("/api/messages/events");
      eventSource.onmessage = e => this.zone.run(() => observer.next(JSON.parse(e.data)) );
      eventSource.onerror = e => observer.error(e);

      return () => {
        eventSource.close();
      }
    });

    this.subscription = observable.subscribe({
      next: message => {
        this.messages.push(message);
      }
    });
  }
}
