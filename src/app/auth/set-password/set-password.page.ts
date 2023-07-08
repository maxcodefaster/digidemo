import {
  AfterViewInit, Component, inject, OnInit, ViewChild,
} from '@angular/core';
import { Navigation, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';
import { StandardOverlaysService } from '../../shared/services/standard-overlay.service';
@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.page.html',
  styleUrls: ['./set-password.page.scss'],

})
export class SetPasswordPage implements OnInit, AfterViewInit {
  @ViewChild('passwordInput') passwordInput: IonInput;
  public showPassword: boolean = false;
  public signUpSuccess: boolean = false;
  public loading: boolean = false;
  public email: string;

  public readonly setPasswordForm: FormGroup = new FormGroup<{ password: FormControl<string | null> }>({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$'),
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  private readonly navCtrl: NavController = inject(NavController);
  private readonly standardOverlaysService: StandardOverlaysService = inject(StandardOverlaysService);
  private readonly router: Router = inject(Router);

  get password() { return this.setPasswordForm.get('password'); }

  ngOnInit() {
    const nav: Navigation | null = this.router.getCurrentNavigation();
    if (nav && nav?.extras?.state?.email) {
      this.email = nav.extras.state.email;
    } else {
      this.navCtrl.navigateRoot('/enter-digi-demo');
    }
  }

  ngAfterViewInit() {
    this.setFocus();
  }

  public async setPassword() {
    if (this.loading) {return;}
    this.loading = true;
    if (!this.setPasswordForm.valid) {
      this.standardOverlaysService.showToast({ message: 'Invalid password', color: 'warning' });
      this.loading = false;
      return;
    }
    this.signUpSuccess = true;
    this.loading = false;
  }

  public toggleShow() {
    this.showPassword = !this.showPassword;
    this.passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  private setFocus() {
    setTimeout(() => {
      if (this.passwordInput) {this.passwordInput.setFocus();} else {this.setFocus();}
    }, 750);
  }
}
