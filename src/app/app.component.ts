import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-card-comp></app-card-comp>
    <br>
    <app-creating-comp></app-creating-comp>
  `,
})
export class AppComponent {
  title = 'app';
}
