import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';
import { StandardOverlaysService } from '../../shared/services/standard-overlay.service';
@Component({
  selector: 'app-set-email',
  templateUrl: './set-email.page.html',
  styleUrls: ['./set-email.page.scss'],
})
export class SetEmailPage implements AfterViewInit {
  @ViewChild('emailInput') emailInput: IonInput;

  public loading: boolean = false;
  public readonly setEmailForm: FormGroup = new FormGroup<{ email: FormControl<string | null> }>({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+.+$'), // x@x.x with allowed spaces at the end
    ]),
  });

  private readonly navCtrl: NavController = inject(NavController);
  private readonly standardOverlaysService: StandardOverlaysService = inject(StandardOverlaysService);

  ngAfterViewInit() {
    this.setFocus();
  }

  public async setEmail() {
    if (this.loading) {return;}
    this.loading = true;
    if (!this.setEmailForm.valid) {
      this.standardOverlaysService.showToast({ message: 'Invalid email', color: 'warning' });
      this.loading = false;
      return;
    }

    await this.navCtrl.navigateForward(['/set-password'], { state: { email: this.setEmailForm.value.email } });
    this.loading = false;
  }

  private setFocus() {
    setTimeout(() => {
      if (this.emailInput) {this.emailInput.setFocus();} else {this.setFocus();}
    }, 750);
  }
}
