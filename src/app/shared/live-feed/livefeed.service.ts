import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IPlainUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Injectable({
  providedIn: 'root',
})
export class LivefeedService {
  constructor(private service: HttpClient) {}

  getUserList(): Observable<IPlainUser[]> {
    return this.service
      .get('https://jsonplaceholder.typicode.com/users')
      .pipe(delay(1000))
      .pipe(
        map((users: IUser[]) => {
          const toReturn = users.map((u) => {
            return {
              id: u.id,
              name: u.name,
              username: u.username,
              email: u.email,
              phone: u.phone,
              website: u.website,
            };
          });

          toReturn.sort((a, b) => {
            return b.id - a.id;
          });

          return toReturn;
        })
      );
  }
}
