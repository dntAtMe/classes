import { Component } from '@angular/core';
import { UserNameService } from './user-name.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Client';

  constructor(private userNameService: UserNameService) { }

  ngOnInit() {
    this.userNameService.setUserName('User ' + Math.floor(Math.random() * 100));
  }
}
