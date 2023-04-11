import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.page.html',
  styles: [
  ]
})
export class SignInPage {
  signupForm?: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private readonly router: Router) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
    });
  }

  async register() {
    const { error } = await this.userService.signIn(this.signupForm!.value)

    if (error) {
      return
    }

    this.router.navigate(['/login'])
  }
}
