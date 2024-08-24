import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
})
export class UserInfoComponent {
  @Input() name: string = '';
  @Input() surname: string = '';
  @Input() email: string = '';

  constructor() {}

  
}
