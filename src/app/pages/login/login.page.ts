import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.page.html',
  styles: [
  ]
})
export class LoginPage {
  signinForm?: FormGroup;

  constructor(private fb: FormBuilder, private readonly userService: UserService, private readonly router: Router) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    const { error } = await this.userService.signUp(this.signinForm!.value)

    console.log(error)
    if (error) { return }

    this.router.navigate(['/memo'])
  }
}
