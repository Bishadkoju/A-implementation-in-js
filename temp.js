function Point(x, y) {
    this.x = x;
    this.y = y;
    this.fCost = 0;
    this.gCost = 0;
    this.hCost = 0;
    this.neighbours =[];
    this.parent = null;
}

Point.prototype.Show = function (gridColor) {
    noStroke();

    fill(gridColor);
    rect(this.x * gridWidth, this.y * gridHeight, gridWidth - 1, gridHeight - 1);
}
Point.prototype.GetNeighbours = function (grid) {
    var i = this.x; var j = this.y;

    if (i > 0)
        this.neighbours.push(grid[i - 1][j]);
    if (i < rows - 1)
        this.neighbours.push(grid[i + 1][j]);
    if (j > 0)
        this.neighbours.push(grid[i][j - 1]);
    if (j < cols - 1)
        this.neighbours.push(grid[i][j + 1]);
    return this.neighbours;

}

var cols = 50;
var rows = 50;

var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var obstacles = [];
var start, end;

var gridWidth, gridHeight;

var foundPath = false;
var path = [];

function setup() {
    createCanvas(500, 500);
    console.log('A*');

    gridHeight = height / cols;
    gridWidth = width / rows;

    //Making a 2D array
    for (i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows; j++) {
            grid[i][j] = new Point(i,j);
        }
    }

    start = grid[4][4];
    end = grid[cols - 1][rows - 1];

    //Put starting point into openSet
    openSet.push(start);

   // CreateObstacles();
    console.log(grid);
}

function draw() {
    var current=end;
    //while openSet not empty
    current=FindPath(current);

    background(0);

    for (i = 0; i < cols; i++) {
        for (j = 0; j < rows;  j++) {
            grid[i][j].Show(color(255));
        }
    }

    for (i = 0; i < closedSet.length; i++) {
        closedSet[i].Show(color(100, 100, 0));
    }
    for (i = 0; i < obstacles.length; i++) {
        obstacles[i].Show(color(255, 0, 0));
    }
    for (i = 0; i < openSet.length; i++) {
        openSet[i].Show(color(0, 255, 0));
    }

    path = [];
    var temp = current;
    path.push(temp);
    while (temp.parent != null) {
        path.push(temp.parent);
        temp = temp.parent;
    }

    for (i = 0; i < path.length; i++) {
        path[i].Show(color(0, 0, 255));
    }
}

function RemoveFromArray(array, element) {
    for (i = array.length - 1; i >= 0; i--) {
        if (array[i] == element) {
            array.splice(i, 1);
        }
    }
}
function GetDistanceEuclidean(pointA, pointB){
    return dist(pointA.x, pointA.y, pointB.x, pointB.y);
}
function GetDistanceManhattan(pointA, pointB){
    return (abs(pointA.x-pointB.x) + abs(pointA.j-pointB.j));
}
function AddObstacle(x, y, width, height) {
    for (i = x; i < x + width; i++) {
        for (j = y; j < y + height; j++) {
            if (i >= 0 && i < rows && j >= 0 && j < cols) {
                if (!(i == rows - 1 && j == cols - 1)) {
                    closedSet.push(grid[i][j]);
                    obstacles.push(grid[i][j]);
                }
            }
        }
    }
}
function FindPath() {
    if (openSet.length > 0 && !foundPath) {

        //current = node in openSet with lowest fScore
        current = openSet[0];
        for (i = 1; i < openSet.length; i++) {
            if (openSet[i].fCost < current.fCost) {
                current = openSet[i];
            }
        }
        console.log("x="+current.x+" y="+current.y+"G="+current.f+" H="+current.h);

        //if current node is end node; path is found
        if (current == end) {
            foundPath = true;
            console.log("DONE!!");
        }

        //remove current from openset and add to closed
        RemoveFromArray(openSet, current);
        closedSet.push(current);
        //check neighbours. if they are closed else update path
        var neighbours = current.GetNeighbours(grid);
        for (i = 0; i < neighbours.length; i++) {
            var neighbour = neighbours[i];

            //ignore neighbour if closed
            if (!(closedSet.includes(neighbour))) {
                var tempGCost = current.gCost + 1;

                //add neighbour to openSet if not present
                if (openSet.includes(neighbour)) {
                    if (tempGCost < neighbour.g) {
                        neighbour.g = tempGCost;
                    }
                }
                else {
                    neighbour.g = tempGCost;
                    openSet.push(neighbour);

                }

                neighbour.hCost = GetDistanceEuclidean(neighbour, end);
                neighbour.fCost = neighbour.gCost + neighbour.hCost;
                neighbour.parent = current;
            }
        }
    }
    else {
        //no solution
    }
    return current;
}