import { Component } from '@angular/core';
import { Square } from './types/square';
import { Maybe } from './types/maybe';
import { SquareComponent } from './square.component';

@Component({
  selector: 'app-board',
  imports: [SquareComponent],
  template: `
    <h1>Current Player: {{ player }}</h1>
    <button (click)="newGame()">Start new Game</button>

    @if (winner && winner !== 'Draw') {
    <h2>Player {{ winner }} won the game!</h2>
    } @else if (winner && winner === 'Draw') {
    <h2>This is a draw!</h2>
    }

    <main>
      @for (value of squares; track $index) {
      <app-square [value]="value" [index]="$index" (click)="makeMove($index)">
      </app-square>
      }
    </main>
  `,
  styles: `main {
    display: grid;
    grid-template-columns: 160px 160px 160px;
    grid-gap: 0px;
  }
  `,
})
export class BoardComponent {
  squares: Array<Maybe<Square>> = Array(9).fill(undefined);
  xIsNext: boolean = true;
  winner: Maybe<Square | 'Draw'>;
  turns: number = 0;

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
        return this.squares[a];
      }
    }

    if (this.turns === 9) return 'Draw';

    return;
  }
}
