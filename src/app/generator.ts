export interface COORD {
  readonly x: number;
  readonly y: number;
  readonly value: number;
}

export interface CONFIG {
  readonly response: true;
  readonly size: string;
  readonly squares: readonly COORD[];
}


// Type pour définir un tableau de tableau de nombre immuable.
export type Ro2T<T> = readonly (readonly T[])[];
export type Ro2Number  = Ro2T<number>;
export type Ro2Boolean = Ro2T<boolean>;

// Interface d'un plateau de Sudoku
export interface Board {
  isInitial: Ro2Boolean;
  readonly size: number;
  readonly data: Ro2Number;
}

export interface BoardRW {
  isInitial: Ro2Boolean;
  readonly size: number;
  readonly data: number[][];
}

// Interface d'un plateau de Sudoku étendu avec des tableaux décrivant les lignes, colonnes et régions
export interface BoardProcessed extends Board {
  lines: Ro2Number;   // Le tableau des lignes   du plateau
  columns: Ro2Number; // Le tableau des colonnes du plateau
  regions: Ro2Number; // Le tableau des régions (les sous-blocs carrés),
                      // les cases de chaque région sont ordonnées dans le sens de la lecture.
}

export function RwBoard(size: number): number[][] {
  return new Array(size).fill(0).map( L => new Array(size).fill(0) );
}

const config: CONFIG[] = [
  {response:true,size:'9',squares:[{x:0,y:0,value:9},{x:0,y:5,value:2},{x:1,y:6,value:1},{x:2,y:1,value:1},{x:2,y:4,value:6},{x:2,y:6,value:8},{x:3,y:0,value:6},{x:3,y:7,value:8},{x:4,y:4,value:2},{x:4,y:8,value:4},{x:5,y:1,value:9},{x:5,y:8,value:3},{x:6,y:5,value:5},{x:6,y:6,value:3},{x:6,y:7,value:6},{x:7,y:3,value:2},{x:7,y:5,value:6},{x:8,y:0,value:4},{x:8,y:1,value:5},{x:8,y:2,value:6},{x:8,y:6,value:9}]},
  {response:true,size:'9',squares:[{x:0,y:0,value:1},{x:0,y:1,value:2},{x:1,y:3,value:6},{x:1,y:5,value:9},{x:2,y:4,value:1},{x:2,y:8,value:8},{x:3,y:2,value:2},{x:3,y:7,value:4},{x:3,y:8,value:6},{x:4,y:0,value:7},{x:4,y:3,value:9},{x:4,y:4,value:4},{x:5,y:3,value:7},{x:5,y:5,value:6},{x:5,y:7,value:1},{x:6,y:1,value:7},{x:6,y:4,value:9},{x:6,y:6,value:1},{x:7,y:7,value:7},{x:8,y:2,value:5},{x:8,y:8,value:3}]},
  {response:true,size:'9',squares:[{x:0,y:2,value:9},{x:0,y:4,value:1},{x:0,y:8,value:8},{x:1,y:5,value:4},{x:1,y:7,value:1},{x:2,y:3,value:8},{x:2,y:4,value:9},{x:3,y:5,value:1},{x:4,y:1,value:9},{x:4,y:2,value:8},{x:4,y:6,value:1},{x:5,y:5,value:7},{x:5,y:7,value:6},{x:6,y:0,value:6},{x:6,y:4,value:2},{x:7,y:3,value:7},{x:7,y:7,value:5},{x:7,y:8,value:6},{x:8,y:2,value:4},{x:8,y:8,value:1}]},
  {response:true,size:'9',squares:[{x:0,y:8,value:1},{x:1,y:3,value:7},{x:2,y:2,value:7},{x:2,y:6,value:2},{x:3,y:1,value:4},{x:3,y:5,value:6},{x:3,y:7,value:8},{x:4,y:0,value:8},{x:4,y:1,value:6},{x:4,y:4,value:2},{x:5,y:1,value:7},{x:5,y:7,value:2},{x:6,y:2,value:6},{x:6,y:6,value:7},{x:6,y:8,value:4},{x:7,y:3,value:1},{x:7,y:6,value:8},{x:7,y:8,value:5},{x:8,y:3,value:6},{x:8,y:5,value:4}]},
  {response:true,size:'9',squares:[{x:1,y:4,value:2},{x:1,y:6,value:1},{x:2,y:2,value:1},{x:2,y:6,value:2},{x:2,y:8,value:3},{x:3,y:2,value:5},{x:3,y:4,value:8},{x:3,y:8,value:7},{x:4,y:0,value:6},{x:4,y:3,value:3},{x:4,y:5,value:1},{x:5,y:0,value:1},{x:5,y:7,value:3},{x:6,y:6,value:3},{x:7,y:0,value:8},{x:7,y:4,value:1},{x:7,y:7,value:6},{x:8,y:1,value:2},{x:8,y:3,value:9},{x:8,y:8,value:1}]},
  {response:true,size:'9',squares:[{x:0,y:0,value:5},{x:0,y:2,value:1},{x:0,y:7,value:9},{x:1,y:3,value:9},{x:1,y:5,value:2},{x:1,y:8,value:5},{x:2,y:2,value:8},{x:2,y:5,value:4},{x:2,y:6,value:3},{x:3,y:0,value:3},{x:3,y:1,value:1},{x:3,y:4,value:2},{x:4,y:3,value:4},{x:4,y:5,value:5},{x:4,y:8,value:1},{x:5,y:2,value:5},{x:6,y:7,value:7},{x:7,y:7,value:8},{x:8,y:0,value:9},{x:8,y:1,value:5},{x:8,y:3,value:7}]},
  {response:true,size:'4',squares:[{x:0,y:0,value:3},{x:1,y:3,value:4},{x:2,y:2,value:4},{x:3,y:1,value:3},{x:3,y:3,value:1}]},
  {response:true,size:'4',squares:[{x:0,y:1,value:4},{x:1,y:3,value:3},{x:2,y:0,value:4},{x:3,y:2,value:2}]},
  {response:true,size:'4',squares:[{x:0,y:0,value:3},{x:1,y:3,value:3},{x:2,y:1,value:1},{x:2,y:3,value:4},{x:3,y:2,value:1}]},
  {response:true,size:'4',squares:[{x:0,y:2,value:3},{x:1,y:1,value:2},{x:2,y:3,value:4},{x:3,y:0,value:1}]},
  {response:true,size:'4',squares:[{x:0,y:0,value:1},{x:1,y:2,value:2},{x:2,y:1,value:3},{x:2,y:3,value:4},{x:3,y:1,value:1}]}
];

export const emptyBoard: BoardProcessed = {
  size: 0,
  data: [],
  lines: [],
  columns: [],
  regions: [],
  isInitial: []
};

export function getRandomConfig(): Promise<CONFIG> {
  return new Promise<CONFIG>( (resolve, reject) => {
    setTimeout( () => resolve( config[ Math.floor(Math.random() * config.length) ]), 100);
  } );
}
