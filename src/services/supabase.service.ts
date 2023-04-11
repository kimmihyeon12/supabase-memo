import { Injectable } from '@angular/core';
import { Session, createClient } from '@supabase/supabase-js';
import { IUser } from 'src/interface/user';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = "https://foihvprasthohjlmfcie.supabase.co";
  private supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvaWh2cHJhc3Rob2hqbG1mY2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEwOTA4MjQsImV4cCI6MTk5NjY2NjgyNH0.4p2-IlwNvu3KKB5Q-GfVzJ5D1mjc_EY_ENwB26fVMyc"
  private supabase = createClient(this.supabaseUrl, this.supabaseKey);

  public getSupabase() {
    return this.supabase;
  }

  async signIn(userForm: IUser) {
    const { email, password, name } = userForm;
    const { data, error } = await this.supabase.auth.signUp({ email, password });

    if (error) {
      throw error;
    }

    return data.user?.id
  }


  async signUp(userForm: IUser) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: userForm.email,
      password: userForm.password,
    });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  //현재 로그인 된 회원정보 얻어오기
  async getProfile() {
    const { data, error } = await this.supabase.auth.getUser();

    return data.user?.id
  }

  async getSession() {
    const session = await this.supabase.auth.getSession();

    if (session) {
      return session.data.session?.user.id;
    } else {

      return null
    }
  }
}
