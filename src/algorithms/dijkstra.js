export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodeByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) {
      console.log("yes");
      continue;
    }
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisistedNeighbors(closestNode, grid);
  }
}
function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}
function sortNodeByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}
function updateUnvisistedNeighbors(node, grid) {
  const neighorsNode = getNeighborNode(node, grid);
  for (const neigbhor of neighorsNode) {
    let dist = 1;
    if (neigbhor.isWeighted) dist = 10;
    neigbhor.distance = node.distance + dist;
    neigbhor.previousNode = node;
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
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
