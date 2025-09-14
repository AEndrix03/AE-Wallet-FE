import {
  Component,
  EventEmitter,
  Input,
  Output, signal,
  ViewChild, WritableSignal
} from '@angular/core';
import { Menu, MenuModule } from 'primeng/menu';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ThemeModeButtonComponent, ThemeModeService } from '@aredegalli/ng-primeng';

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
  styles: [`
    /* Custom menu styling */
    :host ::ng-deep .p-menu {
      @apply bg-white/95 dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl backdrop-blur-sm;
    }
    
    :host ::ng-deep .p-menu .p-menuitem-link {
      @apply text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors rounded-lg;
    }
    
    :host ::ng-deep .p-menu .p-menuitem-link:hover {
      @apply bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30;
    }
    
    :host ::ng-deep .p-menu .p-menuitem-icon {
      @apply text-emerald-600 dark:text-emerald-400;
    }
  `]
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
      separator: true
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => this.logout.emit(),
      styleClass: 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30'
    },
  ];

  constructor(private readonly themeService: ThemeModeService) {
    this.isDarkMode.set(this.themeService.darkMode());
  }

  toggleUserMenu(event: MouseEvent) {
    this.userMenu.toggle(event);
  }
}