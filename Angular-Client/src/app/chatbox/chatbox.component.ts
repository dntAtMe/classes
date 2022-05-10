import { HttpClient } from '@angular/common/http';
import { Component, Injectable, NgZone, OnInit } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Message } from 'src/models/Message';

/**
 * Okno chatu, przechwytuje i wyświetla wiadomości
 */
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  // Lista wiadomości (otrzymanych i wysłanych)
  messages: Message[] = [];
  // Subskrypcja RxJS / inaczej obserwator. Nasłuchuje na zmiany i reaguje po powiadomieniu o nowej zmianie.
  subscription: Subscription | undefined;

  // NgZone: https://angular.io/api/core/NgZone
  // HttpClient pozwala wysyłać zapytania HTTP
  constructor(private zone: NgZone, private http: HttpClient) { }

  ngOnInit(): void {
    // Pobieramy wszystkie wiadomości jakie dotąd pojawiły się na serwerze
    // Następnie nasłuchujemy na nowe wiadomości
    this.http.get('/api/messages').subscribe(messages => {
      this.messages = messages as Message[];
      this.handleEvents();
    });
  }

  /**
   * Tworzymy obiekt Observable i tworzymy w nim nowy EventSource. Kiedy przyjdzie nowa wiadomość, powiadamiamy wszystkich
   * obserwatorów nasłuchujących na zmiany w Observable (poprzez observer.next())
   */
  handleEvents() {
    const observable = new Observable<Message>(observer => {
      const eventSource = new EventSource("/api/messages/events");
      // zone.run() wraca do wątku UI Angulara, dzięki czemu zmiany dokonane przez obserwatora zostaną wykryte podczas renderu
      eventSource.onmessage = e => this.zone.run(() => observer.next(JSON.parse(e.data)) );
      eventSource.onerror = e => observer.error(e);

      return () => {
        eventSource.close();
      }
    });

    // Tworzymy nową subskrypcję - jeśli observable powiadomi nas o nowej zmianie, subskrybent reaguje dodając nową wiadomość
    this.subscription = observable.subscribe({
      next: message => {
        this.messages.push(message);
      }
    });
  }
}
