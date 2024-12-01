import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Square } from './types/square';
import { Maybe } from './types/maybe';

@Component({
  selector: 'app-square',
  imports: [NgStyle],
  template: `
    <div [ngStyle]="getStyles()">
      {{ value ?? '' }}
    </div>
  `,
  styles: [
    `
      div {
        font-size: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-align: center;
        cursor: pointer;
        height: 140px;
      }
    `,
  ],
})
export class SquareComponent {
  @Input() value: Maybe<Square>;

  getStyles() {
    let styles: { [key: string]: string } = {};

    switch (this.value) {
      case 'X':
        styles['color'] = 'red';
        break;
      case 'O':
        styles['color'] = 'blue';
        break;
    }

    return styles;
  }
}
