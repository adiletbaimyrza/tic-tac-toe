import { Component, Input } from '@angular/core';
import { Square } from '../types/square';
import { Maybe } from '../types/maybe';

@Component({
  selector: 'app-square',
  imports: [],
  templateUrl: './square.component.html',
  styleUrl: './square.component.scss',
})
export class SquareComponent {
  @Input() value: Maybe<Square>;
}
