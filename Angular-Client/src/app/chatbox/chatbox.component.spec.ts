import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserNameService } from '../user-name.service';

import { ChatboxComponent } from './chatbox.component';

describe('ChatboxComponent', () => {
  let component: ChatboxComponent;
  let fixture: ComponentFixture<ChatboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatboxComponent ],
      imports: [ HttpClientModule ],
      providers: [ UserNameService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
