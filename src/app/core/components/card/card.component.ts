import { Component } from '@angular/core';

@Component({
  selector: 'wlt-card',
  template: `
    <article
      class="group flex flex-col w-full h-full border-4 border-slate-300 dark:border-slate-600 rounded-xl cursor-pointer hover:border-emerald-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ease-in-out bg-white dark:bg-slate-800 overflow-hidden"
    >
      <ng-content></ng-content>
    </article>
  `,
})
export class CardComponent {}
