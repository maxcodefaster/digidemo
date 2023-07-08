import { inject, Injectable } from '@angular/core';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { StandardOverlaysService } from './standard-overlay.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly standardOverlayService: StandardOverlaysService = inject(StandardOverlaysService);
  private readonly navCtrl: NavController = inject(NavController);
  private readonly isLoggedInSubject: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  get isLoggedIn$() { return this.isLoggedInSubject.asObservable(); }

  get isLoggedIn() { return firstValueFrom(this.isLoggedInSubject.pipe(first())); }

  public login() {
    localStorage.setItem('user', 'loggedIn');
    this.isLoggedInSubject.next(true);
  }

  public async logout() {
    if (!(await this.standardOverlayService.showConfirmAlert({ message: 'Are you sure you want to log out?' }))) { return; }
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.standardOverlayService.showToast({ message: 'You have been logged out.' });
    await this.navCtrl.navigateRoot('/enter-digi-demo');
  }

  public init() {
    const localUser: string | null = localStorage.getItem('user');
    if (localUser) {
      this.isLoggedInSubject.next(true);
    } else {
      this.isLoggedInSubject.next(false);
    }
  }
}
