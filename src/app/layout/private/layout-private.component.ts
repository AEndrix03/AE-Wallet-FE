import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { PrivateSidebarComponent } from './private-sidebar/private-sidebar.component';
import { PrivateNavbarComponent } from './private-navbar/private-navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { userStore } from '@aredegalli/ng-auth';

@Component({
  selector: 'wlt-layout-private',
  imports: [PrivateSidebarComponent, PrivateNavbarComponent, RouterOutlet],
  templateUrl: './layout-private.component.html',
})
export class LayoutPrivateComponent {
  private readonly userStore = inject(userStore);

  public readonly visibleSidebar: WritableSignal<boolean> = signal(true);
  public readonly userName: Signal<string>;
  public readonly userRole: Signal<string>;

  constructor(private readonly router: Router) {
    this.userRole = computed(
      () =>
        (this.userStore.activeRoleId() != null && this.userStore.user() != null
          ? this.userStore.user()?.roles[this.userStore.activeRoleId() ?? '']
          : 'No Role') ?? 'ERROR'
    );

    this.userName = computed(() => ((this.userStore.user()?.firstName ?? '') + ' ' + (this.userStore.user()?.lastName ?? '')).trim());

    // Auto-collapse sidebar on mobile
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  public logout() {
    this.router.navigate(['logout']);
  }

  public goToProfile() {
    this.router.navigate(['profile']);
  }

  private checkScreenSize() {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      this.visibleSidebar.set(false);
    }
  }
}