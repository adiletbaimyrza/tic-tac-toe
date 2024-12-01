import { Component } from '@angular/core';
import { Square } from './types/square';
import { Maybe } from './types/maybe';
import { SquareComponent } from './square.component';
import { Line1Component } from './assets/line1.component';
import { Line2Component } from './assets/line2.component';
import { Line3Component } from './assets/line3.component';
import { Line4Component } from './assets/line4.component';
import { ArrowCircleComponent } from './assets/arrow-circle.component';

@Component({
  selector: 'app-board',
  imports: [
    SquareComponent,
    Line1Component,
    Line2Component,
    Line3Component,
    Line4Component,
    ArrowCircleComponent,
  ],
  template: `
    @if (winner && winner !== 'Draw') {
    <h1>Player {{ winner }} won the game!</h1>
    } @else if (winner && winner === 'Draw') {
    <h1>This is a draw!</h1>
    } @else {
    <h1>Current Player: {{ player }}</h1>
    }

    <button (click)="newGame()">Start A New Game</button>

    <main>
      @for (value of squares; track $index) {
      <app-square [value]="value" (click)="makeMove($index)" />
      }

      <app-line1 />
      <app-line2 />
      <app-line3 />
      <app-line4 />
    </main>

    <footer>
      <h1>X: {{ xWins }}</h1>
      <h1>O: {{ oWins }}</h1>
      <h1>Draws: {{ draws }}</h1>
      <app-arrow-circle (click)="resetScore()" />
    </footer>
  `,
  styles: `
    h1 {
      font-size: 40px;
    }

    button {
      background:transparent;
      padding: 5px;
      margin-top: 20px;
      margin-bottom: 20px;
      font-size: 16px;
      border-top-left-radius: 255px 15px;
      border-top-right-radius: 15px 225px;
      border-bottom-right-radius: 225px 15px;
      border-bottom-left-radius:15px 255px;
      cursor: pointer;
    }
    
    button:hover {
      transform: scale(1.1);
    }

    main {
      display: grid;
      grid-template-columns: 140px 140px 140px;
      grid-gap: 0px;
    }

    app-line1 {
      position: relative;
      bottom: 290px;
      right: 4px;
    }

    app-line2 {
      position: relative;
      bottom: 152px;
      right: 142px;
    }

    app-line3 {
      position: relative;
      transform: rotate(90deg);
      bottom: 370px;
      right: 212px;
    }

    app-line4 {
      position: relative;
      transform: rotate(90deg);
      bottom: 400px;
      left: 208px;
    }

    footer {
      display: flex;
      align-items: center;

      app-arrow-circle {
        height: 40px;
        cursor: pointer;
      }

      app-arrow-circle:hover {
        transform: scale(1.1);
      }
    }

    footer h1:not(:last-child) {
      margin-right: 40px;
    }
  `,
})
export class BoardComponent {
  squares: Array<Maybe<Square>> = Array(9).fill(undefined);
  xIsNext: boolean = true;
  winner: Maybe<Square | 'Draw'>;
  turns: number = 0;
  xWins: number = 0;
  oWins: number = 0;
  draws: number = 0;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(undefined);
    this.xIsNext = true;
    this.winner = undefined;
    this.turns = 0;
  }

  resetScore() {
    this.xWins = 0;
    this.oWins = 0;
    this.draws = 0;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (this.turns < 9 && this.winner === undefined) {
      if (!this.squares[idx]) {
        this.squares[idx] = this.player;
        this.xIsNext = !this.xIsNext;
      }

      this.turns += 1;
      this.winner = this.calculateWinner();
    }
  }

  calculateWinner(): Maybe<Square | 'Draw'> {
    const lines: Array<Array<number>> = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;

      if (
        this.squares[a] &&
        this.squares[a] == this.squares[b] &&
        this.squares[a] == this.squares[c]
      ) {
        if (this.squares[a] === 'X') {
          this.xWins += 1;
        } else {
          this.oWins += 1;
        }

        return this.squares[a];
      }
    }

    if (this.turns === 9) {
      this.draws += 1;
      return 'Draw';
    }

    return;
  }
}
