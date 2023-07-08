import {
  AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { CodeInputComponent } from 'angular-code-input';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { StandardOverlaysService } from '../../shared/services/standard-overlay.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-phone-otp',
  templateUrl: './phone-otp.page.html',
  styleUrls: ['./phone-otp.page.scss'],
})
export class PhoneOtpPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('codeInput') codeInput !: CodeInputComponent;
  public signUp: boolean = false;
  public timeoutProgress: number = 1;
  public disabled: boolean = false;
  public phoneNumber: number;
  private timeout: any;

  private readonly standardOverlaysService: StandardOverlaysService = inject(StandardOverlaysService);
  private readonly authService: AuthService = inject(AuthService);
  private readonly navCtrl: NavController = inject(NavController);
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);

  ngOnInit() {
    const auth: string | null = this.route.snapshot.queryParamMap.get('auth');
    if (auth === 'signup') {this.signUp = true;}

    const nav: Navigation | null = this.router.getCurrentNavigation();
    if (nav && nav?.extras?.state?.phoneNumber) {
      this.phoneNumber = nav?.extras?.state?.phoneNumber;
      this.timeoutHandler();
    } else {
      this.navCtrl.navigateRoot('/enter-digi-demo');
    }
  }

  ngAfterViewInit() {
    this.focusOnField0();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  public async onCodeCompleted(token: string) {
    if (this.disabled) {return;}
    this.disabled = true;

    if (token !== '123456') {
      this.standardOverlaysService.showToast({ message: 'Invalid code', color: 'danger' });
      this.resetInput();
    } else {
      clearTimeout(this.timeout);
      await this.authService.login();
      await this.navCtrl.navigateRoot('/home');
    }
  }

  private resetInput() {
    this.timeoutProgress = 1;
    this.codeInput.reset();
    this.disabled = false;
    this.focusOnField0();
  }

  private timeoutHandler() {
    this.timeout = setTimeout(() => {
      this.timeoutProgress -= 1 / (60 * 4);
      if (this.timeoutProgress > 0) {this.timeoutHandler();} else {
        this.disabled = true;
        this.standardOverlaysService.showToast({ message: 'Code has expired, please request again', color: 'danger' });
        this.navCtrl.pop();
      }
    }, 250);
  }

  private focusOnField0() {
    setTimeout(() => {
      if (this.codeInput) {this.codeInput.focusOnField(0);} else {this.focusOnField0();}
    }, 750);
  }
}
