import { Component, output } from '@angular/core';
import { AccordionComponent } from '../../accordion/accordion.component';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'wlt-filters-template',
  imports: [AccordionComponent, ButtonComponent],
  templateUrl: './filters-template.component.html',
  styleUrl: './filters-template.css',
})
export class FiltersTemplateComponent {
  public readonly onSearch = output<void>();
  public readonly onReset = output<void>();
}
