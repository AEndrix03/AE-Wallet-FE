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
  imports: [CommonModule, RouterModule, ButtonModule, TooltipModule, NgClass],
  templateUrl: './private-sidebar.component.html',
  styles: [
    `
      /* Active navigation item styling */
      :host ::ng-deep .active-nav-item {
        background-image: linear-gradient(to right, #10b981, #14b8a6);
        color: white;
        box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.25),
          0 4px 6px -4px rgba(16, 185, 129, 0.25);
      }

      :host ::ng-deep .active-nav-item + .active-indicator {
        opacity: 1;
      }

      /* Button hover effects */
      :host ::ng-deep .p-button:hover {
        transform: scale(1.05);
      }

      :host ::ng-deep .p-button.p-button-rounded {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
      }

      :host ::ng-deep .p-button.p-button-rounded:hover {
        background-color: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2),
          0 4px 6px -4px rgba(16, 185, 129, 0.2);
      }

      /* Dark mode specific adjustments */
      :host-context(.dark) ::ng-deep .p-button.p-button-rounded {
        background-color: rgb(30, 41, 59);
        border-color: rgb(71, 85, 105);
      }

      :host-context(.dark) ::ng-deep .p-button.p-button-rounded:hover {
        background-color: rgb(51, 65, 85);
        border-color: rgb(100, 116, 139);
      }
    `,
  ],
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
      route: '/portfolios',
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
      route: '/alerts',
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
