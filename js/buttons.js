/* sets the important buttons to disabled */
function setButtonsOff() {
  toggleStart = false;
  toggleEnd = false;
  document.getElementById("start").disabled = true;
  document.getElementById("randWalls").disabled = true;
}

/* sets the important buttons to disabled */
function setButtonsOn() {
  toggleStart = false;
  toggleEnd = false;
  document.getElementById("start").disabled = false;
  document.getElementById("randWalls").disabled = false;
}

/*
 * resets the board by resetting color and visited.
 */
function reset(squares) {
  setButtonsOn();
  if (squares) {
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        squares[i][j].visited = false;
        if (squares[i][j].type === "Empty") {
          squares[i][j].cell.bgColor = DEFAULT_COLOR;
        }
      }
    }
  }
}

/* Button functionality */
$(function() {
  // open modal on page load
  $(window).on("load", function() {
    $("#instructions").modal("show");
  });
  let squares = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    squares[i] = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      squares[i][j] = new square();
    }
  }
  createGrid(squares);
  //set the description and pseudo code for the default top value
  let alg = $("#algoSelect").val();
  $("#description").text(getDescriptions(alg));
  $("#code").text(getCode(alg));

  //add random walls
  $("#randWalls").click(function() {
    setButtonsOn();
    reset(squares);
    randomWalls(squares);
  });

  //changes description and pseudo code when user changes algorithms
  $("#algoSelect").change(function() {
    setButtonsOn();
    let alg = $("#algoSelect").val();
    $("#description").text(getDescriptions(alg));
    $("#code").text(getCode(alg));
  });

  //resets board and stops currently running algorithm
  $("#clear").click(function() {
    setButtonsOn();
    squares = null;
    squares = [];
    for (let i = 0; i < GRID_SIZE; i++) {
      squares[i] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        squares[i][j] = new square();
      }
    }
    createGrid(squares);
  });

  //starts running algorithm and displays
  $("#start").click(function() {
    let interval = parseInt($("#interval").val());
    setButtonsOn();
    reset(squares);
    let alg = $("#algoSelect").val();
    let pathFunction = getAlgorithms(alg);
    pathFunction(squares, interval);
  });
});
