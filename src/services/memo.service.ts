import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

import { SupabaseService } from './supabase.service';
import { IMemo } from 'src/interface/memo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MemoService {
  // private memosSubject = new BehaviorSubject<IMemo[]>([]);
  // readonly memos$ = this.memosSubject.asObservable();

  constructor(private readonly supabase: SupabaseService, private readonly authService: AuthService) {
  }

  async createMemo(memo: IMemo) {
    const userId = await this.authService.getProfile()

    return await this.supabase.getSupabase().from('memos')
      .insert({ user_id: userId, ...memo })
  }

  async getMemos() {
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 10); // ISO 8601 문자열로 변환

    const userId = await this.authService.getProfile()

    const { data, error } = await this.supabase.getSupabase().from('memos')
      .select('*')
      .eq('user_id', userId)
      .eq('created_at', timestamp)

    if (error) {
      return
    }

    return data.map((memo: any) => memo as IMemo)
  }

  async getMemo(id: number) {
    const userId = await this.authService.getProfile()

    const { data, error } = await this.supabase.getSupabase().from('memos')
      .select('*')
      .eq('user_id', userId)
      .eq('id', id)
      .single();

    if (error) {
      return;
    }

    return data as IMemo;
  }


  async updateSuccessMemo(id: number, isSuccess: boolean) {
    return await this.supabase.getSupabase().from('memos')
      .update({ is_succes: isSuccess })
      .eq('id', id)
      .single();
  }

  async updateMemo(id: number, memo: IMemo) {
    return await this.supabase.getSupabase().from('memos')
      .update({ ...memo })
      .eq('id', id)
      .single();
  }

  async deleteMemo(id: number) {
    return await this.supabase.getSupabase().from('memos')
      .delete()
      .eq('id', id)
      .single();
  }

}

