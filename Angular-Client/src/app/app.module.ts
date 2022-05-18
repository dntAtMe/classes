import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
;

import { AppComponent } from './app.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { UserNameService } from './user-name.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatboxComponent,
    ChatMessageComponent,
    ChatInputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserNameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
