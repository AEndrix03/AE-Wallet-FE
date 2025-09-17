import { Component, input, InputSignal } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'wlt-accordion',
  imports: [AccordionModule],
  template: `
    <article>
      <p-accordion value="0">
        <p-accordion-panel value="0">
          <p-accordion-header>{{ header() }}</p-accordion-header>
          <p-accordion-content>
            <ng-content></ng-content>
          </p-accordion-content>
        </p-accordion-panel>
      </p-accordion>
    </article>
  `,
})
export class AccordionComponent {
  public readonly header: InputSignal<string> = input.required();
}
