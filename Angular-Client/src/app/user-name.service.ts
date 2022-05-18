import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class UserNameService {

  // Subject and Observable are quite different, but they are very similar.
  // In this case it doesn't matter which one we use.
  subject: Subject<any> = new Subject<any>();
  userName: string | undefined;

  constructor() {}

  setUserName(newUserName: string) {
    this.userName = newUserName;
    this.subject.next(newUserName);
  }

  getUserName() {
    return this.userName;
  }
}