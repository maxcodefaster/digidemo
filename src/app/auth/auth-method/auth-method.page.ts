import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-method',
  templateUrl: './auth-method.page.html',
  styleUrls: ['./auth-method.page.scss'],
})
export class AuthMethodPage implements OnInit {
  public signUp: boolean = false;
  private readonly route: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    const auth: string | null = this.route.snapshot.queryParamMap.get('auth');
    if (auth === 'signup') {this.signUp = true;}
  }
}
