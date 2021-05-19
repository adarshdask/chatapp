import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../src/environments/environment';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs'
var socket_url = environment.socket_url;



@Injectable()
export class WebsocketService {
    result: any;
    private socket = io(socket_url, { transports: ['websocket'] });
    constructor(private http: HttpClient) { }

    public sendMessage(data: any) {
        this.socket.emit('message', data);
    }

    getMessages() {
        const observable = new Observable<{ message: string, user: string }>(observer => {
            this.socket.on('new-message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }

    getUsers() {
        const observable = new Observable<{ user: string }>(observer => {
            this.socket.on('new-user', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }



    joinRoom(data: any) {
        this.socket.emit('join', data);
    }

}