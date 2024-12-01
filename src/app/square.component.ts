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
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
        height: 160px;
      }
    `,
  ],
})
export class SquareComponent {
  @Input() value: Maybe<Square>;
  @Input() index: Maybe<number>;

  getStyles() {
    if (this.index === undefined) return {};

    let styles: { [key: string]: string } = {};

    switch (this.index) {
      case 0:
        styles['border-right'] = '1px solid black';
        styles['border-bottom'] = '1px solid black';
        break;
      case 1:
        styles['border-right'] = '1px solid black';
        styles['border-bottom'] = '1px solid black';
        break;
      case 2:
        styles['border-bottom'] = '1px solid black';

        break;
      case 3:
        styles['border-right'] = '1px solid black';
        styles['border-bottom'] = '1px solid black';
        break;
      case 4:
        styles['border-right'] = '1px solid black';
        styles['border-bottom'] = '1px solid black';
        break; // Center square, no border
      case 5:
        styles['border-bottom'] = '1px solid black';
        break;
      case 6:
        styles['border-right'] = '1px solid black';
        break;
      case 7:
        styles['border-right'] = '1px solid black';
        break;
      default:
        break;
    }

    return styles;
  }
}
