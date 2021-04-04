import { EventEmitter } from "@angular/core";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output
} from "@angular/core";
import { COORD, emptyBoard, BoardProcessed } from "../generator";

@Component({
  selector: "app-sudoku",
  templateUrl: "./sudoku.component.html",
  styleUrls: ["./sudoku.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuComponent implements OnInit {
  @Input() board: BoardProcessed = emptyBoard;
  @Output() selection = new EventEmitter<COORD>();
  @Input() caseSelected: COORD = { x: -1, y: -1, value: -1 };

  constructor() {}

  ngOnInit(): void {}

  isBorder(v: number): boolean {
    return v % Math.sqrt(this.board.size) === 0;
  }

  setCaseSelected(c: COORD): void {
    this.caseSelected = c;
    this.selection.emit(c);
  }

  trackByIndex(i: number): number {
    return i;
  }
}
