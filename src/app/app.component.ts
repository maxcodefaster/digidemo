import { Component, inject, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly platform: Platform = inject(Platform);

  ngOnInit() {
    this.initializeApp();
  }

  private initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        SplashScreen.hide();
        this.styleStatusBar();
      }
    });
  }

  private styleStatusBar() {
    StatusBar.setStyle({ style: Style.Dark });
  }
}
