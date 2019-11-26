import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  save(user: User, jwt: string): Observable<User|null> {
    const url =
     `${environment.firebase.firestore.baseURL}/users?key=
      ${environment.firebase.apiKey}`;

    const data = this.getDataForFirestore(user);
    const httpOptions = {
     headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${jwt}`
     })
    };

    return this.http.post(url, data, httpOptions).pipe(
     // tslint:disable-next-line: no-shadowed-variable
     switchMap((data: any) => {
      return of(this.getUserFromFirestore(data.fields));
     })
    );
   }

   private getUserFromFirestore(fields): User {
     return new User ({
       id: fields.id.stringValue,
       email: fields.email.stringValue,
       pomodoroDuration: fields.pomodoroDuration.integerValue,
       name: fields.name.stringValue,
       avatar: fields.avatar.stringValue
     });
   }

   // tslint:disable-next-line: ban-types
   private getDataForFirestore(user: User): Object {
     return {
       fields: {
         id: { stringValue: user.id },
         email: {stringValue: user.email },
         name: { stringValue: user.name },
         avatar: { stringValue: user.avatar },
         pomodoroDuration: { integerValue: user.pomodoroDuration }
       }
     };
   }

   get(userId: string, jwt: string): Observable<User|null> {
    const url =
     `${environment.firebase.firestore.baseURL}:runQuery?key=
      ${environment.firebase.apiKey}`;

    const data = this.getStructuredQuery(userId);

    const httpOptions = {
     headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: `Bearer ${jwt}`
     })
   };
    return this.http.post(url, data, httpOptions).pipe(
     // tslint:disable-next-line: no-shadowed-variable
     switchMap((data: any) => {
       return of(this.getUserFromFirestore(data[0].document.fields));
     })
   );
   }

  // tslint:disable-next-line: ban-types
  private getStructuredQuery(userId: string): Object {
    return {
      structuredQuery : {
        from: [{
           collectionId: 'users'
        }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'id' },
            op: 'EQUAL',
            value: { stringValue: userId }
          }
        },
        limit: 1
      }
    };
  }
}
