import { Component } from '@angular/core';
import { BoardComponent } from './board.component';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  template: `<app-board />`,
  styles: `
    app-board {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `,
})
export class AppComponent {
  title = 'tic-tac-toe';
}
