export function bsf(grid, startNode, finishNode) {
  let visitedNode = [];
  let q = [];
  startNode.isVisited = true;
  q.unshift(startNode);
  while (q.length !== 0) {
    let current = q.shift();
    visitedNode.push(current);
    if (current === finishNode) {
      console.log("yeeh boii");
      return visitedNode;
    }
    const neibhours = getNeighborNode(current, grid);
    for (let i of neibhours) {
      if (!i.isWall) {
        i.isVisited = true;
        q.push(i);
        i.previousNode = current;
      }
    }
  }
}
function getNeighborNode(node, grid) {
  const neighborNode = [];
  const { row, col } = node;
  if (row > 0) neighborNode.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighborNode.push(grid[row + 1][col]);
  if (col > 0) neighborNode.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighborNode.push(grid[row][col + 1]);

  return neighborNode.filter((neighbor) => !neighbor.isVisited);
}
