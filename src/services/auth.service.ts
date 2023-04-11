
import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { IUser } from 'src/interface/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly supabase: SupabaseService) { }

  // 사용자 등록 (sign up) 메서드
  async signIn(userForm: IUser) {
    const { email, password } = userForm;
    const { data, error } = await this.supabase.getSupabase().auth.signUp({ email, password });

    if (error) {
      throw error;
    }

    return data.user?.id
  }

  // 사용자 로그인 (sign in) 메서드
  async signUp(userForm: IUser) {
    return await this.supabase.getSupabase().auth.signInWithPassword({
      email: userForm.email,
      password: userForm.password,
    });
  }

  // 사용자 로그아웃 (sign out) 메서드
  async signOut() {
    return this.supabase.getSupabase().auth.signOut();
  }

  // 현재 로그인된 사용자의 프로필 정보를 가져오는 메서드
  async getProfile() {
    const { data, error } = await this.supabase.getSupabase().auth.getUser();

    return data.user?.id
  }

  // 현재 세션에 로그인된 사용자 ID를 반환하는 메서드
  async getSession() {
    const session = await this.supabase.getSupabase().auth.getSession();

    console.log(session)

    if (session) {
      return session.data.session?.user.id;
    } else {
      return null
    }
  }
}
