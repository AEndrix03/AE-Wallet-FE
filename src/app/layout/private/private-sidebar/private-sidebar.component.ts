import {
  Component,
  effect,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ThemeModeService } from '@aredegalli/ng-primeng';

@Component({
  selector: 'wlt-private-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    TooltipModule,
    NgClass,
  ],
  templateUrl: './private-sidebar.component.html',
  styles: [`
    /* Active navigation item styling */
    :host ::ng-deep .active-nav-item {
      @apply bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25;
    }
    
    :host ::ng-deep .active-nav-item + .active-indicator {
      @apply opacity-100;
    }
    
    /* Button hover effects */
    :host ::ng-deep .p-button:hover {
      @apply transform scale-105;
    }
    
    :host ::ng-deep .p-button.p-button-rounded {
      @apply bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/30;
    }
    
    :host ::ng-deep .p-button.p-button-rounded:hover {
      @apply shadow-lg shadow-emerald-500/20;
    }
    
    /* Dark mode specific adjustments */
    :host-context(.dark) ::ng-deep .p-button.p-button-rounded {
      @apply bg-slate-800 hover:bg-slate-700 border-slate-600 hover:border-slate-500;
    }

    :host ::ng-deep .active-nav-item {
      @apply bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg;
    }

    :host ::ng-deep .active-nav-item + .active-indicator {
      @apply opacity-100;
    }
  `]
})
export class PrivateSidebarComponent {
  public readonly visible: InputSignal<boolean> = input.required();

  protected readonly isDarkMode: WritableSignal<boolean> = signal(false);
  protected readonly collapsed: WritableSignal<boolean> = signal(false);

  protected readonly navItems = [
    {
      icon: 'pi pi-chart-line',
      label: 'Dashboard',
      route: '/dashboard',
    },
    {
      icon: 'pi pi-wallet',
      label: 'Portfolios',
      route: '/portfolios'
    },
    {
      icon: 'pi pi-credit-card',
      label: 'Transactions',
      route: '/transactions',
    },
    {
      icon: 'pi pi-chart-pie',
      label: 'Analytics',
      route: '/analytics',
    },
    {
      icon: 'pi pi-money-bill',
      label: 'Budget',
      route: '/budget',
    },
    {
      icon: 'pi pi-bell',
      label: 'Alerts',
      route: '/alerts'
    },
    {
      icon: 'pi pi-cog',
      label: 'Settings',
      route: '/settings',
    },
  ];

  constructor(private readonly themeService: ThemeModeService) {
    this.isDarkMode.set(this.themeService.darkMode());
    effect(() => this.isDarkMode.set(this.themeService.darkMode()));
  }

  toggleCollapse(): void {
    this.collapsed.set(!this.collapsed());
  }
}