import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './../../services/websocket.service';
import { UserService } from './../../services/user.service';

var COMMONROOM = 'common';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  message: any;
  messages: any = [];
  socket: any;
  username: any;
  tempName: any;
  users: any = [];
  selectedUser: any;
  constructor(private webSocketService: WebsocketService, private userService: UserService) {
    this.webSocketService.getMessages().subscribe(data => {
      // this.messages.push({ message: data.message, user: data.user });
      this.getMessages();
    });
    this.webSocketService.getUsers().subscribe(data => {
      this.fetchUsers();
    });
  }

  getMessages = () => {
    this.userService.getMessages().subscribe(data => {
      this.messages = data.messages;
    });
  }

  fetchUsers = () => {
    this.userService.getUsers().subscribe(data => {
      this.users = data.users;
    });
  }


  submitName = () => {
    this.username = this.tempName;
    this.webSocketService.joinRoom({ room: COMMONROOM, user: this.username });
  }

  sendMessage() {
    this.webSocketService.sendMessage({ room: COMMONROOM, user: this.username, message: this.message });
    this.message = '';
  }



}
