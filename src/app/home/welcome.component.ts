import { Component, VERSION as ANGULAR_VERSION } from '@angular/core';

@Component({
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  pageTitle = 'Welcome';
  get ngVersion(): string {
    return ANGULAR_VERSION.full;
  }
}
