import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageComponent } from './chat-message.component';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let fixture: ComponentFixture<ChatMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the received message correctly', () => {
    component.message = {
      id: 0,
      author: 'SomeUser',
      content: 'TestMessage'
    };
    component.received = true;

    // You must tell the TestBed to perform data binding by calling fixture.detectChanges().
    // Without this it won't rerender the component.
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('SomeUser : TestMessage');
    expect(compiled.querySelector('div').classList).toContain('received');
  });

  it('should display the sent message correctly', () => {
    component.message = {
      id: 0,
      author: 'SomeUser',
      content: 'TestMessage'
    };
    component.received = false;

    // You must tell the TestBed to perform data binding by calling fixture.detectChanges().
    // Without this it won't rerender the component.
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('SomeUser : TestMessage');
    expect(compiled.querySelector('div').classList).toContain('sent');
  });

  it('should display an error if no message is passed', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('Error');
  });
});
