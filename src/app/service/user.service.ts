import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {User} from '../model/user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:3702/api';
  getUsers() {
  /* const fakeUsers = [{id: 1, firstName: 'Dhiraj', lastName: 'Ray', email: 'dhiraj@gmail.com'},
     {id: 2, firstName: 'Tom', lastName: 'Jac', email: 'Tom@gmail.com'},
     {id: 3, firstName: 'Hary', lastName: 'Pan', email: 'hary@gmail.com'},
     {id: 4, firstName: 'praks', lastName: 'pb', email: 'praks@gmail.com'},
   ];
   return of(fakeUsers);*/
   return this.http.get<User[]>(this.baseUrl + '/clientes');
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl + '/' , user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/' + user._id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
