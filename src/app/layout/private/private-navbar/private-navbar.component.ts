import {
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { Menu, MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ThemeModeButtonComponent,
  ThemeModeService,
} from '@aredegalli/ng-primeng';

@Component({
  selector: 'wlt-private-navbar',
  standalone: true,
  imports: [
    MenuModule,
    AvatarModule,
    ThemeModeButtonComponent,
    NgOptimizedImage,
    CommonModule,
  ],
  templateUrl: './private-navbar.component.html',
  styles: [
    `
      /* Custom menu styling */
      :host ::ng-deep .p-menu {
        background-color: rgba(255, 255, 255, 0.95);
        border: 1px solid rgb(226, 232, 240);
        border-radius: 0.75rem;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 8px 10px -6px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(12px);
      }

      :host-context(.dark) ::ng-deep .p-menu {
        background-color: rgba(30, 41, 59, 0.95);
        border-color: rgb(51, 65, 85);
      }

      :host ::ng-deep .p-menu .p-menuitem-link {
        color: rgb(51, 65, 85);
        transition: all 0.2s;
        border-radius: 0.5rem;
      }

      :host-context(.dark) ::ng-deep .p-menu .p-menuitem-link {
        color: rgb(203, 213, 225);
      }

      :host ::ng-deep .p-menu .p-menuitem-link:hover {
        background-color: rgb(249, 250, 251);
        background-image: linear-gradient(
          to right,
          rgb(236, 253, 245),
          rgb(240, 253, 250)
        );
      }

      :host-context(.dark) ::ng-deep .p-menu .p-menuitem-link:hover {
        background-color: rgb(51, 65, 85);
        background-image: linear-gradient(
          to right,
          rgba(16, 185, 129, 0.3),
          rgba(20, 184, 166, 0.3)
        );
      }

      :host ::ng-deep .p-menu .p-menuitem-icon {
        color: rgb(16, 185, 129);
      }

      :host-context(.dark) ::ng-deep .p-menu .p-menuitem-icon {
        color: rgb(52, 211, 153);
      }
    `,
  ],
})
export class PrivateNavbarComponent {
  @Input() userRole = 'No Role';
  @Input() userName = 'Guest';

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() profile = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  @ViewChild('userMenu') userMenu!: Menu;

  protected readonly isDarkMode: WritableSignal<boolean> = signal(false);

  userMenuItems = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => this.profile.emit(),
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout.emit(),
      styleClass: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30',
    },
  ];

  constructor(private readonly themeService: ThemeModeService) {
    this.isDarkMode.set(this.themeService.darkMode());
  }

  toggleUserMenu(event: MouseEvent) {
    this.userMenu.toggle(event);
  }
}
