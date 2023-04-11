import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  async canActivate() {
    const session = await this.authService.getSession();
    if (session) {
      this.router.navigate(['/memo']);
      return false;
    }
    return true;
  }
}