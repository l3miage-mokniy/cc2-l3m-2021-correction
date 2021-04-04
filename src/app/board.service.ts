import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  Board,
  BoardProcessed,
  BoardRW,
  COORD,
  emptyBoard,
  getRandomConfig,
  RwBoard
} from "./generator";

@Injectable()
export class BoardService {
  private BS = new BehaviorSubject<BoardRW>({
    size: 0,
    data: [],
    isInitial: []
  });
  private initial: Board = emptyBoard;
  private bp!: BoardProcessed;
  public observable: Observable<BoardProcessed> = this.BS.pipe(
    map(board => ({
      ...board,
      lines: board.data,
      columns: board.data.map((_, i) => board.data.map(L => L[i])),
      regions: board.data.map((_, d) => {
        const n = Math.sqrt(board.data.length);
        const y = Math.floor(d / n);
        const x = d % n;
        const L: number[] = [];
        for (let i = n * x; i < n * (x + 1); i++) {
          for (let j = n * y; j < n * (y + 1); j++) {
            L.push(board.data[i][j]);
          }
        }
        return L;
      })
    }))
  );

  constructor() {
    this.newGame();
    this.observable.subscribe({ next: bp => (this.bp = bp) });
  }

  /*
   * Appelle getRandomConfig pour obtenir un plateau de type CONFIG
   * Publie ensuite cee plateau sous la forme d'un BoardProcessed via BS
   *
   */
  async newGame(): Promise<void> {
    const c = await getRandomConfig();
    const B = RwBoard(+c.size);
    c.squares.forEach(({ x, y, value }) => (B[x][y] = value));
    const bp: BoardRW = {
      size: +c.size,
      data: B,
      isInitial: B.map(L => L.map(v => v !== 0))
    };
    this.initial = {
      size: bp.size,
      data: bp.data.map(L => L.map(x => x)),
      isInitial: bp.isInitial.map(L => L.map(x => x))
    };
    this.BS.next(bp);
  }

  canPlay({ x, y, value }: COORD): number[] {
    const L: number[] = [];
    const n = Math.sqrt(this.initial.data.length);
    const p = n * Math.floor(y / n) + Math.floor(x / n);
    console.log(x, y, p);
    if (this.initial.data[x][y] === 0) {
      L.push(0);
      for (let i = 1; i <= this.initial.data.length; i++) {
        if (
          this.bp.lines[x].indexOf(i) === -1 &&
          this.bp.columns[y].indexOf(i) === -1 &&
          this.bp.regions[p].indexOf(i) === -1
        ) {
          L.push(i);
        }
      }
      if (value > 0) {
        L.push(value);
      }
    }
    return L.sort((a, b) => a - b);
  }

  setValue(c: COORD): void {
    const { x, y, value } = c;
    const board = this.BS.value;
    const old = board.data[x][y];
    board.data[x][y] = 0;
    if (this.canPlay(c).indexOf(value) >= 0) {
      board.data[x][y] = value;
      this.BS.next(board);
    } else {
      board.data[x][y] = old;
    }
  }
}
