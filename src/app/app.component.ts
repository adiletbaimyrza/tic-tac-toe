import { Component } from '@angular/core';
import { BoardComponent } from './board.component';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  template: `<app-board />`,
})
export class AppComponent {
  title = 'tic-tac-toe';
}
