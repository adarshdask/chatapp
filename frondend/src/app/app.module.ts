import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { WebsocketService } from './services/websocket.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [WebsocketService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
