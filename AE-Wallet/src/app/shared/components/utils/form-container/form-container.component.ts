import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-container',
  standalone: true,
  imports: [],
  styles: [
    '.container {padding: 16px;color: whitesmoke;box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);border-radius: 0 0 8px 8px;}',
    '.form-header {padding: 4px 4px 4px 16px;background-color: rgb(240, 240, 240);border-radius: 8px 8px 0 0;p {margin: 0;color: rgb(129, 129, 129);font-size: 1rem;font-weight: 500;}}',
  ],
  template:
    '<div class="form-header"><p>{{ title }}</p></div><div class="container"><ng-content></ng-content></div>',
})
export class FormContainerComponent {
  @Input() title: string = '';
}
