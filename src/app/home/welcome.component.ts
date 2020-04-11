import { Component, VERSION } from '@angular/core';

@Component({
	templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
	public pageTitle = 'Welcome';
	public get ngVersion(): string {
		return VERSION.full;
	}
}
