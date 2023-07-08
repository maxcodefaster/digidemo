import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { StandardOverlaysService } from '../../shared/services/standard-overlay.service';
import { LocalizationService } from '../../shared/services/localization.service';
import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-auth-phone',
  templateUrl: './auth-phone.page.html',
  styleUrls: ['./auth-phone.page.scss'],
})
export class AuthPhonePage implements OnInit, AfterViewInit {
  @ViewChild('phoneInput') phoneInput: ElementRef;
  public loading = false;
  public signUp = false;
  public validators: ValidatorFn[] = [
    Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(5), Validators.maxLength(20),
  ];

  public readonly phoneAuthForm: FormGroup = new FormGroup<{ phone: FormControl<null | undefined> }>({
    phone: new FormControl(undefined, [...this.validators]),
  });

  private countryISO: string = 'us';
  private iti: intlTelInput.Plugin;
  private errorMap: string[] = ['Invalid number', 'Invalid country code', 'Too short', 'Too long', 'Invalid number'];

  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly navCtrl: NavController = inject(NavController);
  private readonly alertCtrl: AlertController = inject(AlertController);
  private readonly standardOverlaysService: StandardOverlaysService = inject(StandardOverlaysService);
  private readonly localization: LocalizationService  = inject(LocalizationService);

  get phone() { return this.phoneAuthForm.get('phone'); }

  ngOnInit() {
    const auth: string | null = this.route.snapshot.queryParamMap.get('auth');
    if (auth === 'signup') {this.signUp = true;}
    this.getCountryCode();
  }

  ngAfterViewInit() {
    this.initForm();
  }

  public async phoneAuth() {
    if (this.loading) {return;}
    this.loading = true;
    if (!this.phoneAuthForm.valid) {
      this.standardOverlaysService.showToast({ message: this.errorMap[this.iti.getValidationError()], color: 'warning' });
      this.loading = false;
      return;
    }

    const phoneNumber: string = this.iti.getNumber().trim();
    if (!await this.confirmPhoneNumber(phoneNumber)) {
      this.loading = false;
      return;
    }

    const auth: string = this.signUp ? 'signup' : 'signin';
    this.navCtrl.navigateForward(['/phone-otp'], { queryParams: { auth }, state: { phoneNumber } });
    this.loading = false;
  }

  private async initForm() {
    await this.localization.init;
    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: this.countryISO,
      separateDialCode: true,
      utilsScript: 'intl-tel-input/utils.js',
    });
    this.phoneAuthForm.controls['phone'].setValidators([...this.validators, this.validNumber()]);
    this.phoneAuthForm.controls['phone'].updateValueAndValidity();
    this.setFocus();
  }

  private validNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        const valid = this.iti.isValidNumber();
        if (!valid) {
          const errorCode = Object.keys(intlTelInputUtils.validationError)[this.iti.getValidationError()];
          if (errorCode) { return { [errorCode]: true }; }
        }
      }
      return null;
    };
  }

  private setFocus() {
    setTimeout(() => {
      if (this.phoneInput) {this.phoneInput.nativeElement.focus();} else {this.setFocus();}
    }, 750);
  }

  private async confirmPhoneNumber(phoneNumber: string) {
    let confirm: boolean = false;
    const alert: HTMLIonAlertElement = await this.alertCtrl.create({
      header: 'Confirm phone number',
      subHeader: phoneNumber,
      buttons: [
        { text: 'Cancel', cssClass: 'alert-cancel-button', role: 'cancel' },
        {
          text: 'Okay',
          handler: () => { confirm = true; },
        }],
    });

    await alert.present();
    await alert.onDidDismiss();
    return confirm;
  }

  private async getCountryCode() {
    await this.localization.init;
    this.countryISO = this.localization.countryCode;
  }
}
