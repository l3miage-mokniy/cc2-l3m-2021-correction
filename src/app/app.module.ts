import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BoardService } from './board.service';
import { SudokuComponent } from './sudoku/sudoku.component';
import { GameComponent } from './game/game.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, SudokuComponent, GameComponent ],
  bootstrap:    [ AppComponent ],
  providers: [BoardService]
})
export class AppModule { }
