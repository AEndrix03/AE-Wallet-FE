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
import { AuthFacadeService } from '../../../aewallet/store/auth-facade.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, DialogWrapperComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fg: FormGroup<LoginForm> | null = null;

  constructor(
    private _fb: FormBuilder,
    private authFacade: AuthFacadeService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {
    this.fg = this._fb.group({
      email: this._fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      password: this._fb.control('', { validators: [Validators.required] }),
    });
  }

  login() {
    if (this.fg?.valid) {
      this.authFacade.login(
        this.fg.value.email || '',
        this.fg.value.password || ''
      );
      this.dialogRef.close();
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
