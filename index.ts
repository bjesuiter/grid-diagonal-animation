// Import stylesheets
import './style.css';

// Generate Tiles
function generateTiles(grid: HTMLElement, elemCount: number, gridCols: number) {
  //
  //
  /**
   * Idea: A diagonal for my case is defined by:
   * indexOfTile % --gridCols
   *
   * Example: Tile 6 / 4 Cols = Diagonal 2
   * (Important: Indexed by 1!)
   *
   * Problem: what happens after the first overflow?
   * Tile 4 % 4 Cols = Diagonal 0 => Problem
   *
   * Solution:
   * indexOfTile / --gridCols = diagonalOverflow
   * diagonalOverflow + indexOfTile % --gridCols
   * => correct diagonal index!
   */

  for (let i = 0; i < elemCount; i++) {
    const elem = document.createElement('div');
    elem.classList.add('tile');

    // Calc + Set CSS vars
    elem.style.setProperty('--index', `${i}`);

    const diagonalOverflow = Math.floor(i / gridCols);
    const diagonalAnimationGroup = diagonalOverflow + (i % gridCols);
    elem.style.setProperty(
      '--diagonal-animation-group',
      `${diagonalAnimationGroup}`
    );
    elem.setAttribute(
      'data-diagonalAnimationGroup',
      `${diagonalAnimationGroup}`
    );
    elem.innerText = `Tile ${i}`;

    grid.appendChild(elem);
  }
}

// Generate Grid
function generateGrid(elemCount: number, gridCols: number) {
  const grid = document.createElement('div');
  grid.classList.add(`grid`);

  // Add css vars to grid
  grid.style.setProperty('--element-count', `${elemCount}`);
  grid.style.setProperty('--grid-cols', `${gridCols}`);
  grid.style.setProperty('--grid-rows', `${elemCount / gridCols}`);
  generateTiles(grid, elemCount, gridCols);

  return grid;
}

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', (e: Event) => {
    const target = document.querySelector('.templateTarget');
    const oldGrid = document.querySelector('.grid');
    const animSpeed = (e.target as HTMLButtonElement).getAttribute(
      'data-animation-speed'
    );

    const newGrid = generateGrid(20, 4);
    newGrid.classList.add(animSpeed);

    if (oldGrid) oldGrid.remove();

    target.appendChild(newGrid);
  });
});
