import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../src/environments/environment';
var server_url = environment.server_url;


@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getUsers = () => {
        let httpOptions = {};
        const uri = server_url + '/users';
        return this.http.get(uri, httpOptions).pipe(map((res: any) => { return res; }));

    }

    getMessages = () => {
        let httpOptions = {};
        const uri = server_url + '/messages';
        return this.http.get(uri, httpOptions).pipe(map((res: any) => { return res; }));

    }


}