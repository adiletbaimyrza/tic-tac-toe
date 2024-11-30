import { Component } from '@angular/core';
import { Square } from '../types/square';
import { Maybe } from '../types/maybe';
import { SquareComponent } from '../square/square.component';

@Component({
  selector: 'app-board',
  imports: [SquareComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  squares: Array<Maybe<Square>> = Array(9).fill(undefined);
  xIsNext: boolean = true;
  winner: Maybe<Square>;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(undefined);
    this.xIsNext = true;
    this.winner = undefined;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
      this.squares[idx] = this.player;
      this.xIsNext = !this.xIsNext;
    }
  }

  calculateWinner(): Square | null {
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

    return null;
  }
}
