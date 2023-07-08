import { inject, Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

export type ToastPosition = 'top' | 'bottom' | 'middle';

@Injectable({
  providedIn: 'root',
})
export class StandardOverlaysService {
  private readonly toastCtrl: ToastController = inject(ToastController);
  private readonly alertCtrl: AlertController = inject(AlertController);


  public async showToast({
    message, color = 'primary', duration = 3000, position = 'top',
  }: { message: string; color?: string; duration?: number; position?: ToastPosition }): Promise<void> {
    const toast = await this.toastCtrl.create({
      message, duration, position, color, cssClass: position === 'top' ? 'toast-top' : '',
    });
    await toast.present();
  }

  public async showErrorAlert(message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Fehler', subHeader: 'An error occurred', message, buttons: ['OK'],
    });

    await alert.present();
  }

  public async showConfirmAlert({
    message, confirmText = 'OK', cancelText = 'Cancel',
  }: { message: string; confirmText?: string; cancelText?: string }): Promise<boolean> {
    let confirmed = false;
    const alert = await this.alertCtrl.create({
      header: 'Confirm', message, buttons: [
        { text: cancelText, role: 'cancel', cssClass: 'secondary' },
        { text: confirmText, handler: () => confirmed = true },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();
    return confirmed;
  }
}
