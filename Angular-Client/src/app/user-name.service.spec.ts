import { TestBed } from '@angular/core/testing';

import { UserNameService } from './user-name.service';

describe('UserNameServiceService', () => {
  let service: UserNameService;

  beforeEach(() => {
    service = new UserNameService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the user name', () => {
    service.setUserName('TestUser');
    expect(service.getUserName()).toEqual('TestUser');
  });

  it('should notify subscribers when user name changes', (done: DoneFn) => {
    service.subject.subscribe((userName: string) => {
      expect(userName).toEqual('TestUser');
      done();
    });
    service.setUserName('TestUser');
  });

});
