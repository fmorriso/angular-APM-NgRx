import { Component, VERSION } from '@angular/core';

@Component({
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  pageTitle = 'Welcome';
  get ngVersion(): string {
    return VERSION.full;
  }
}
