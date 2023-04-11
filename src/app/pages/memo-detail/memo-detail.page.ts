import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/services/user.service';
import { MemoService } from 'src/services/memo.service';
import { IMemo } from 'src/interface/memo';

@Component({
  selector: 'app-memo-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './memo-detail.page.html',
  styles: [
  ]
})
export class MemoDetailPage {
  id?: number;
  memo$?: IMemo
  memoForm?: FormGroup;

  constructor(private fb: FormBuilder, private readonly memoService: MemoService, private readonly router: Router, public route: ActivatedRoute) {
    this.memoForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      is_success: [false],
      created_at: [new Date()]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      this.id = params['id'];
      this.memo$ = await this.memoService.getMemo(this.id!)
      this.memoForm?.patchValue({ ...this.memo$ })
    });

  }

  async onCreateMemo() {
    const { error } = await this.memoService.createMemo(this.memoForm?.value)

    if (error) {
      return
    }

    this.router.navigate(['/memo'])
  }

  async onUpdateMemo() {
    const { error } = await this.memoService.updateMemo(this.id!, this.memoForm?.value)

    if (error) {
      return
    }

    this.router.navigate(['/memo'])
  }
}

