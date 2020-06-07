
function displayPath(path) {
  for (let i = 0; i < path.length; i++) {
    if (path[i].type !== "End") {
      path[i].cell.bgColor = PATH_COLOR;
    }
  }
 
  setButtonsOff();
}


function findPlacement(cur, squares) {
  let placement = [2];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      if (cur.cellId === squares[i][j].cellId) {
        placement[0] = i;
        placement[1] = j;
        return placement;
      }
    }
  }
}


function checkSearch(cur, search) {
  for (let i = 0; i < search.length; i++) {
    if (cur.cellId === search[i].cellId) {
      return true;
    }
  }
  return false;
}


function findNeighbors(cur, squares, search) {

  let placement = findPlacement(cur, squares);
  let row = placement[0];
  let col = placement[1];

  let path = [];
 
  if (row - 1 >= 0) {
    if (checkSearch(squares[row - 1][col], search) === false) {
      if (
        squares[row - 1][col].visited === false &&
        squares[row - 1][col].type !== "Wall"
      ) {
        squares[row - 1][col].parent = squares[row][col];
        path.push(squares[row - 1][col]);
      }
    }
  }
  if (row + 1 < GRID_SIZE) {
    if (checkSearch(squares[row + 1][col], search) === false) {
      if (
        squares[row + 1][col].visited === false &&
        squares[row + 1][col].type != "Wall"
      ) {
        squares[row + 1][col].parent = squares[row][col];
        path.push(squares[row + 1][col]);
      }
    }
  }
  if (col - 1 >= 0) {
    if (checkSearch(squares[row][col - 1], search) === false) {
      if (
        squares[row][col - 1].visited === false &&
        squares[row][col - 1].type != "Wall"
      ) {
        squares[row][col - 1].parent = squares[row][col];
        path.push(squares[row][col - 1]);
      }
    }
  }
  if (col + 1 < GRID_SIZE) {
    if (checkSearch(squares[row][col + 1], search) === false) {
      if (
        squares[row][col + 1].visited === false &&
        squares[row][col + 1].type != "Wall"
      ) {
        squares[row][col + 1].parent = squares[row][col];
        path.push(squares[row][col + 1]);
      }
    } else {
    }
  }
  return path;
}


function backTrace(end) {
  let path = [];
  let cur = end;
  while (cur.type !== "Start") {
    path.push(cur);
    cur = cur.parent;
  }
  return path.reverse();
}


function breadthFirst(squares, interval) {
 
  setButtonsOff();
  let search = [];
  let path = [];
  search.push(squares[STARTI][STARTJ]);
  let step = window.setInterval(function() {
    let node = search.shift(); 
    path.push(node);
    node.visited = true; 
    if (node.type === "Empty") {
      node.cell.bgColor = VISITED_COLOR;
    }
    if (node.type === "End") {
      clearInterval(step);
     
      let finalPath = backTrace(node);
      displayPath(finalPath);
      setButtonsOn();
    } else {
      let neighbors = findNeighbors(node, squares, search);
      search = search.concat(neighbors); 
    }
    if (search.length === 0) {
      alert("Jalur tidak ditemukan");
      setButtonsOff();
      clearInterval(step);
    document.body.style.backgroundColor = "red";

    }
  }, interval);
}




function depthFirst(squares, interval) {
  
  setButtonsOff();
  let search = [];
  let path = [];
  search.push(squares[STARTI][STARTJ]);
  let step = window.setInterval(function() {
    let node = search.pop(0); 
    path.push(node);
    node.visited = true; 
    if (node.type === "Empty") {
      node.cell.bgColor = VISITED_COLOR;
    }
    if (node.type === "End") {
      clearInterval(step);
      
      let finalPath = backTrace(node);
      displayPath(finalPath);
      setButtonsOn();
    } else {
      let neighbors = findNeighbors(node, squares, search);
      search = search.concat(neighbors); 
    }
    if (search.length === 0) {
      alert("No path found");
      setButtonsOff();
      clearInterval(step);
    }
  }, interval);
}


let algorithms = {
  breadth: breadthFirst,
  depth: depthFirst
};


let descriptions = {
  breadth:
    "Breadth-first search adalah algoritma yang melakukan pencarian secara melebar yang mengunjungi simpul secara preorder yaitu mengunjungi suatu simpul kemudian mengunjungi semua simpul yang bertetangga dengan simpul tersebut terlebih dahulu. Sumber : Wikipedia.com",
  depth:
    "Program Ini dibuat oleh kelompok 6 dengan untuk memenuhi tugas Kecerdasan Buatan."
};


let code = {
  breadth: "code for breadth first",
  depth: "code for depth first"
};


function getAlgorithms(alg) {
  return algorithms[alg];
}


function getDescriptions(alg) {
  return descriptions[alg];
}

function getCode(alg) {
  return code[alg];
}
