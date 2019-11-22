import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<User|null> = new BehaviorSubject(null);
  public readonly user$: Observable<User|null> = this.user.asObservable();

  constructor() { }

  login(email: string, password: string): Observable<User|null> {
    // 1. A faire : Faire un appel au backend.
    // 2. A faire : Mettre à jour l’état en fonction de la réponse du backend.
    // 3. A faire : Retournez la réponse du backend sous la forme d’un Observable,
    //    pour le composant qui déclenche cette action.

    return of(new User());
    // Simple code pour calmer votre IDE.
    // Retourne un Observable contenant un utilisateur,
    // grâce à l’opérateur of de RxJS.
   }

   register(nema: string, email: string, password: string): Observable<User|null> {
     return of(new User());
   }

   public logout(): Observable<null> {
     return of(null);
   }
}
