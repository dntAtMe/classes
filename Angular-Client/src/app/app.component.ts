import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Client';

  ngOnInit() {
    // Create EventSource
    const eventSource = new EventSource("/api/messages/events");
    eventSource.onmessage = (event) => {
      console.log(event.data);
    };
  }
}
