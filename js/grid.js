
let SET = false; 
let GRID_SIZE =20; 
let toggleStart = false;
let toggleEnd = false;

let DEFAULT_COLOR = "#ffffff";
let VISITED_COLOR = "#fff700";
let WALL_COLOR = "#777";
let START_COLOR = new Image();
START_COLOR.src = "https://asset-a.grid.id/crop/0x0:0x0/360x240/photo/2020/04/09/663219154.png";
let END_COLOR = "#fc0303"; 
let PATH_COLOR = "#2fff00"; 

let STARTI = GRID_SIZE / 2;
let STARTJ = 1;
let ENDI = 1;
let ENDJ = 2;



class square {
  constructor(
    cellId = null,
    type = "Empty",
    visited = false,
    color = DEFAULT_COLOR,
    cell = null,
    cost = Infinity,
    parent = null
  ) {
    this.cellId = cellId;
    this.type = type; 
    this.visited = visited; 
    this.color = color;
    this.cell = cell; 
    this.cost = cost;
    this.parent = parent;
  }

  get cellId() {
    return this._cellId;
  }

  get type() {
    return this._type;
  }

  get visited() {
    return this._visited;
  }

  get color() {
    return this._color;
  }

  get cell() {
    return this._cell;
  }

  get cost() {
    return this._cost;
  }

  get parent() {
    return this._parent;
  }

  set cellId(id) {
    this._cellId = id;
  }

  set type(t) {
    this._type = t;
    if (this._cell) {
      switch (t) {
        case "Empty":
          this._cell.bgColor = DEFAULT_COLOR;
          return;
        case "Wall":
          this._cell.bgColor = WALL_COLOR;
          return;
        case "Start":
          this._cell.bgColor = START_COLOR;
          return;
        case "End":
          this._cell.bgColor = END_COLOR;
          return;
        default:
          this._cell.bgColor = DEFAULT_COLOR;
          return;
      }
    }
  }

  set visited(v) {
    this._visited = v;
  }

  set color(clr) {
    this._color = clr;
  }

  set cell(c) {
    this._cell = c;
  }

  set cost(cs) {
    this._cost = cs;
  }
  set parent(p) {
    this._parent = p;
  }
}


function setStartAndEnd(squares) {
  squares[STARTI][STARTJ].type = "Start";
  squares[ENDI][ENDJ].type = "End";
}


function randInt(high, low) {
  return Math.floor(Math.random() * (high - low) + low);
}

function randomWalls(squares) {
  let numWalls = randInt(GRID_SIZE / 2, GRID_SIZE - 1);
  while (numWalls > 0) {
    let randRow = randInt(0, GRID_SIZE - 1);
    let randCol = randInt(0, GRID_SIZE - 1);
    if (squares[randRow][randCol].type === "Empty") {
      squares[randRow][randCol].type = "Wall";
      numWalls--;
    }
  }
}




function createGrid(squares) {
  let grid = null;

  if (SET === true) {
    $(".grid").remove();
  }
  $("#setStart").click(function() {
    if (toggleEnd === false) {
      toggleStart = !toggleStart;
    } else {
      toggleStart = false;
    }
  });

  $("#setEnd").click(function() {
    if (toggleStart === false) {
      toggleEnd = !toggleEnd;
    } else {
      toggleEnd = false;
    }
  });
  SET = true;
  let c = 0;
  let gridDiv = document.getElementById("grid");
  grid = document.createElement("table");
  grid.className = "grid";
  for (let i = 0; i < GRID_SIZE; ++i) {
    let tr = grid.appendChild(document.createElement("tr"));
    for (let j = 0; j < GRID_SIZE; ++j) {
      squares[i][j].cell = tr.appendChild(document.createElement("td"));
      
      c++;
      squares[i][j].cellId = c;
    
      squares[i][j].cell.addEventListener(
        "click",
        function(event) {
          if (toggleStart) {
            if (squares[i][j].type !== "End") {
              squares[STARTI][STARTJ].type = "Empty";
              squares[i][j].type = "Start";
              STARTI = i;
              STARTJ = j;
              toggleStart = false;
            }
          } else if (squares[i][j].type === "Start") {
            toggleStart = true;
          }
          if (toggleEnd) {
            if (squares[i][j].type !== "Start") {
              squares[ENDI][ENDJ].type = "Empty";
              squares[i][j].type = "End";
              ENDI = i;
              ENDJ = j;
              toggleEnd = false;
            }
          } else if (squares[i][j].type === "End") {
            toggleEnd = true;
          }

        
          if (squares[i][j].type === "Wall") {
            squares[i][j].type = "Empty";
          } else if (squares[i][j].type === "Empty") {
            squares[i][j].type = "Wall";
          }
        },
        false
      );
    }
  }
  gridDiv.appendChild(grid);
  setStartAndEnd(squares);
}
