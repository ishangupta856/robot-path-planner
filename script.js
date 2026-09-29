const ROWS = 10;
const COLS = 15;

const grid = document.getElementById("grid");
const statusText = document.getElementById("status");

const startModeBtn = document.getElementById("startMode");
const endModeBtn = document.getElementById("endMode");
const obstacleModeBtn = document.getElementById("obstacleMode");
const findPathBtn = document.getElementById("findPath");
const randomBtn = document.getElementById("randomObstacles");
const resetBtn = document.getElementById("reset");

let mode = "obstacle";
let start = null;
let end = null;
let obstacles = new Set();

function cellKey(row, col) {
  return `${row},${col}`;
}

function setMode(newMode) {
  mode = newMode;

  [startModeBtn, endModeBtn, obstacleModeBtn].forEach(button =>
    button.classList.remove("active")
  );

  if (mode === "start") startModeBtn.classList.add("active");
  if (mode === "end") endModeBtn.classList.add("active");
  if (mode === "obstacle") obstacleModeBtn.classList.add("active");

  statusText.textContent =
    mode === "start" ? "Click a cell to place the start point." :
    mode === "end" ? "Click a cell to place the end point." :
    "Click cells to add or remove obstacles.";
}

function createGrid() {
  grid.innerHTML = "";

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", () => handleCellClick(row, col));
      grid.appendChild(cell);
    }
  }

  render();
}

function handleCellClick(row, col) {
  const key = cellKey(row, col);

  if (mode === "start") {
    if (end && end.row === row && end.col === col) return;
    obstacles.delete(key);
    start = { row, col };
  } else if (mode === "end") {
    if (start && start.row === row && start.col === col) return;
    obstacles.delete(key);
    end = { row, col };
  } else {
    const isStart = start && start.row === row && start.col === col;
    const isEnd = end && end.row === row && end.col === col;

    if (isStart || isEnd) return;

    if (obstacles.has(key)) {
      obstacles.delete(key);
    } else {
      obstacles.add(key);
    }
  }

  clearPath();
  render();
}

function render() {
  document.querySelectorAll(".cell").forEach(cell => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    const key = cellKey(row, col);

    cell.className = "cell";

    if (obstacles.has(key)) cell.classList.add("obstacle");
    if (start && start.row === row && start.col === col) cell.classList.add("start");
    if (end && end.row === row && end.col === col) cell.classList.add("end");
  });
}

function clearPath() {
  document.querySelectorAll(".cell.path").forEach(cell => {
    cell.classList.remove("path");
  });
}

function findShortestPath() {
  clearPath();

  if (!start || !end) {
    statusText.textContent = "Please set both a start point and an end point.";
    return;
  }

  const queue = [{ row: start.row, col: start.col }];
  const visited = new Set([cellKey(start.row, start.col)]);
  const previous = new Map();

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.row === end.row && current.col === end.col) {
      drawPath(previous);
      return;
    }

    for (const [dr, dc] of directions) {
      const nextRow = current.row + dr;
      const nextCol = current.col + dc;
      const nextKey = cellKey(nextRow, nextCol);

      const inBounds =
        nextRow >= 0 &&
        nextRow < ROWS &&
        nextCol >= 0 &&
        nextCol < COLS;

      if (
        inBounds &&
        !visited.has(nextKey) &&
        !obstacles.has(nextKey)
      ) {
        visited.add(nextKey);
        previous.set(nextKey, current);
        queue.push({ row: nextRow, col: nextCol });
      }
    }
  }

  statusText.textContent = "No path found. Try removing some obstacles.";
}

function drawPath(previous) {
  let current = end;
  const path = [];

  while (!(current.row === start.row && current.col === start.col)) {
    path.push(current);
    const key = cellKey(current.row, current.col);
    current = previous.get(key);

    if (!current) {
      statusText.textContent = "No path found.";
      return;
    }
  }

  path.reverse();

  path.forEach((position, index) => {
    const isEnd = position.row === end.row && position.col === end.col;
    if (isEnd) return;

    setTimeout(() => {
      const cell = getCell(position.row, position.col);
      cell.classList.add("path");
    }, index * 35);
  });

  statusText.textContent = `Shortest path found: ${path.length} moves.`;
}

function getCell(row, col) {
  return document.querySelector(
    `.cell[data-row="${row}"][data-col="${col}"]`
  );
}

function randomObstacles() {
  obstacles.clear();
  clearPath();

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const isStart = start && start.row === row && start.col === col;
      const isEnd = end && end.row === row && end.col === col;

      if (!isStart && !isEnd && Math.random() < 0.22) {
        obstacles.add(cellKey(row, col));
      }
    }
  }

  render();
  statusText.textContent = "Random obstacles added.";
}

function resetGrid() {
  start = null;
  end = null;
  obstacles.clear();
  clearPath();
  render();
  setMode("obstacle");
}

startModeBtn.addEventListener("click", () => setMode("start"));
endModeBtn.addEventListener("click", () => setMode("end"));
obstacleModeBtn.addEventListener("click", () => setMode("obstacle"));
findPathBtn.addEventListener("click", findShortestPath);
randomBtn.addEventListener("click", randomObstacles);
resetBtn.addEventListener("click", resetGrid);

createGrid();
setMode("obstacle");
