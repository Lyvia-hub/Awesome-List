import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, delay, finalize, switchMap, tap } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services/users.service';
import { ErrorService } from 'src/app/core/services/error.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<User|null> = new BehaviorSubject(null);
  public readonly user$: Observable<User|null> = this.user.asObservable();

  constructor(private http: HttpClient,
              private usersService: UsersService,
              private errorService: ErrorService,
              private loaderService: LoaderService,
              private router: Router) { }

  public register(name: string, email: string, password: string): Observable<User|null> {
    const url = `${environment.firebase.auth.baseURL}/signupNewUser?key=
    ${environment.firebase.apiKey}`;

    /* data object */
    const data = {
      email,
      password,
      returnSecureToken: true
    };

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    this.loaderService.setLoading(true);

    return this.http.post(url, data, httpOptions).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      switchMap((data: any) => {
       const jwt: string = data.idToken;
       const user = new User({
        email: data.email,
        id: data.localId,
        // tslint:disable-next-line: object-literal-shorthand
        name: name
       });
       // save user data connexion
       this.saveAuthData(user.id, jwt);
       return this.usersService.save(user, jwt);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
     );
    }

  login(email: string, password: string): Observable<User|null> {

    // 1. A faire : Faire un appel au backend.
    // 2. A faire : Mettre à jour l’état en fonction de la réponse du backend.
    // 3. A faire : Retournez la réponse du backend sous la forme d’un Observable,
    //    pour le composant qui déclenche cette action.

    const url = `${environment.firebase.auth.baseURL}/verifyPassword?key=
    ${environment.firebase.apiKey}`;
    const data = {
      email,
      password,
      returnSecureToken: true
    };
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    this.loaderService.setLoading(true);

    return this.http.post<User>(url, data, httpOptions).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      switchMap((data: any) => {
        const userId: string = data.localId;
        const jwt: string = data.idToken;
        this.saveAuthData(userId, jwt);
        return this.usersService.get(userId, jwt);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }

  private logoutTimer(expirationTime: number): void {
    of(true).pipe(
      delay(expirationTime * 1000)
    ).subscribe(_ => this.logout());
  }

   public logout(): void {
     localStorage.removeItem('expirationDate');
     localStorage.removeItem('token');
     localStorage.removeItem('userId');
     this.user.next(null);
     this.router.navigate(['/login']);
   }

   private saveAuthData(userId: string, token: string) {
    const now = new Date();
    const expirationDate = (now.getTime() + 3600 * 1000).toString();
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
   }

   public autoLogin(user: User) {
     this.user.next(user);
     this.router.navigate(['app/dashboard']);
   }
}
