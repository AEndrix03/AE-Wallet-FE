import { Component } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';
import { DialogWrapperComponent } from "../utils/dialog-wrapper/dialog-wrapper.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, DialogWrapperComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fg: FormGroup<LoginForm> | null = null;

  constructor(private _fb: FormBuilder) {
    this.fg = this._fb.group({
      email: this._fb.control('', {
        validators: [Validators.required, Validators.email],
      }),
      password: this._fb.control('', { validators: [Validators.required] }),
    });
  }
}

export interface LoginForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}
