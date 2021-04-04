import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { BoardService } from "../board.service";
import { COORD, BoardProcessed } from "../generator";

interface DataGame {
  board: BoardProcessed;
  selectedCase: COORD;
  Lplayable: number[];
}
@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  public obs: Observable<DataGame>;
  private caseSelected = new BehaviorSubject<COORD>({
    x: -1,
    y: -1,
    value: -1
  });

  constructor(private BS: BoardService) {
    this.obs = combineLatest([BS.observable, this.caseSelected]).pipe(
      map(([board, c]) => ({
        board,
        selectedCase: c,
        Lplayable: c.value >= 0 ? BS.canPlay(c) : []
      }))
    );
  }

  ngOnInit(): void {}

  newGame(): void {
    this.caseSelected.next({
      x: -1,
      y: -1,
      value: -1
    });
    this.BS.newGame();
  }

  select(c: COORD): void {
    this.caseSelected.next(c);
  }

  play(v: number): void {
    const c: COORD = {
      ...this.caseSelected.value,
      value: v
    };
    this.BS.setValue(c);
    this.caseSelected.next(c);
  }
}
