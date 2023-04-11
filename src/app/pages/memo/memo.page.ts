import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from 'src/services/user.service';
import { MemoService } from 'src/services/memo.service';
import { IMemo } from 'src/interface/memo';

@Component({
  selector: 'app-memo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './memo.page.html',
  styles: [
  ]
})
export class MemoPage {
  memos$?: IMemo[]

  constructor(private readonly userService: UserService, private readonly memoService: MemoService, private readonly router: Router) { }

  async ngOnInit() {
    this.getMemos()
  }

  async onLogout() {
    const { error } = await this.userService.signOut();

    if (error) {
      return
    }

    this.router.navigate(['/login'])
  }

  async getMemos() {
    this.memos$ = await this.memoService.getMemos()
  }

  async onDeleteMemo(id: number) {
    const { error } = await this.memoService.deleteMemo(id)

    if (error) {
      return
    }

    this.getMemos();
  }
}
