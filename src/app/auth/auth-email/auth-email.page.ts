import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';
import { StandardOverlaysService } from '../../shared/services/standard-overlay.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-auth-email',
  templateUrl: './auth-email.page.html',
  styleUrls: ['./auth-email.page.scss'],
})
export class AuthEmailPage implements AfterViewInit {
  @ViewChild('emailInput') emailInput: IonInput;
  @ViewChild('passwordInput') passwordInput: IonInput;
  public showPassword: boolean = false;
  public loading: boolean = false;
  public readonly emailAuthForm: FormGroup = new FormGroup<{ email: FormControl<string | null>, password: FormControl<string | null> }>({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+.+$'), // x@x.x with allowed spaces at the end
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  private readonly navCtrl: NavController = inject(NavController);
  private readonly authService: AuthService = inject(AuthService);
  private readonly standardOverlaysService: StandardOverlaysService = inject(StandardOverlaysService);

  ngAfterViewInit() {
    this.setFocus();
  }

  public async emailAuth() {
    if (this.loading) {return;}
    this.loading = true;

    if (!this.emailAuthForm.value.password || !this.emailAuthForm.dirty || this.emailAuthForm.value.password.trim().length === 0) {
      this.standardOverlaysService.showToast({ message: 'Please type in your password.' });
      this.loading = false;
      return;
    }

    if (this.emailAuthForm.value.password === 'pw') {
      await this.authService.login();
      await this.navCtrl.navigateRoot('/home');
    } else {
      this.standardOverlaysService.showToast({ message: 'Wrong password.' });
    }
    this.loading = false;
  }

  public toggleShow() {
    this.showPassword = !this.showPassword;
    this.passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  private setFocus() {
    setTimeout(() => {
      if (this.emailInput) {this.emailInput.setFocus();} else {this.setFocus();}
    }, 750);
  }
}
