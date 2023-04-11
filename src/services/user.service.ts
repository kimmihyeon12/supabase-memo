import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { IUser } from 'src/interface/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly supabase: SupabaseService, private readonly authService: AuthService) { }

  async signIn(userForm: IUser) {
    const userId = await this.authService.signIn(userForm);

    return await this.supabase.getSupabase().from('users')
      .insert({ user_id: userId, name: userForm.name });
  }

  async signUp(userForm: IUser) {
    return await this.authService.signUp(userForm)
  }

  async signOut() {
    return await this.authService.signOut();
  }

  async getProfile() {
    const userId = await this.authService.getProfile()

    return this.supabase.getSupabase().from('users')
      .select('username')
      .eq('id', userId)
      .single();
  }

  async updateProfile(userUpdate: IUser) {
    const userId = await this.authService.getProfile()

    const updateUser = {
      username: userUpdate.name,
      user_id: userId,
    };

    return this.supabase.getSupabase().from('users').upsert(updateUser);
  }

  async withdrawal() {
    const userId = await this.authService.getProfile()

    return this.supabase.getSupabase().from('users')
      .delete()
      .eq('id', userId)
  }
} 