import { Component } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';
import { DialogWrapperComponent } from '../utils/dialog-wrapper/dialog-wrapper.component';
import { AuthService } from '../../../aewallet/services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, DialogWrapperComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fg: FormGroup<LoginForm> | null = null;

  constructor(private _fb: FormBuilder, private authService: AuthService) {
    this.fg = this._fb.group({
      email: this._fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      password: this._fb.control('', { validators: [Validators.required] }),
    });
  }

  login() {
    if (this.fg?.valid) {
      this.authService
        .login(this.fg.value.email || '', this.fg.value.password || '')
        .pipe(tap((x) => console.log(x)))
        .subscribe();
    }
  }

  emailFc(): FormControl<string | null> {
    return this.fg?.controls.email as FormControl<string | null>;
  }

  passwordFc(): FormControl<string | null> {
    return this.fg?.controls.password as FormControl<string | null>;
  }
}

export interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
