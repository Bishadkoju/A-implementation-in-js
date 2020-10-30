function removeFromArray(arr,elt){
  for(var i=arr.length-1;i>=0;i--){
    if(arr[i]==elt){
    arr.splice(i,1);
    }
  }
}
function euclideanHeuristic(a,b){
  var d= dist(b.x,b.y,a.x,a.y);//euclidean
  //var d= abs(a.x-b.x)+abs(a.y-b.y); //manhattan
  return d;
}
function manhattanHeuristic(a,b){
  var d= abs(a.x-b.x)+abs(a.y-b.y); //manhattan
  return d;
}
var cols=40;
var rows=40;
var grid = new Array(cols);
var path=[];

openSet=[];
closedSet=[];
var start;
var end;
var w,h;
var renderCount;






function setup() {
  // put setup code here
  createCanvas(700,700);
  console.log('A*');
  w=width/cols;
  h=height/cols;

  for(var i=0;i<cols;i++){
    grid[i]=new Array(rows);
  }

  for(var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      grid[i][j]=new Spot(i,j);
    }
  }

  for(var i=0;i<cols;i++){
    for(var j=0;j<rows;j++){
      grid[i][j].evaluateNeighbours(grid);
    }
  }

  start=grid[0][0];
  end=grid[cols-1][rows-1];
  start.wall=false;
  end.wall=false;
  openSet.push(start);
}

















function draw() {
  // put drawing code here


if(openSet.length>0){
  var winner=0;
  for(var i=0;i<openSet.length;i++){
    if(openSet[i].f<openSet[winner].f){
      winner=i;
    }
  }
   current=openSet[winner];
  //console.log("x="+current.x+" y="+current.y+"G="+current.g+" H="+current.h);
  if(current==end){
    console.log("Found");
    noLoop();
  }

  removeFromArray(openSet,current);
  closedSet.push(current);   

  var neighbours=current.neighbours;

  for(var i=0;i<neighbours.length;i++){
    var neighbour=neighbours[i];
    var isNewPath=false;
    if(!closedSet.includes(neighbour)&&!neighbour.wall){
      var tempG=current.g+euclideanHeuristic(current,neighbour);
      //var tempG=0;  /// For greedy alogorithm
        if(openSet.includes(neighbour)){
          if(tempG < neighbour.g){
            neighbour.g=tempG;
            isNewPath=true;
          }
        }else{
          neighbour.g=tempG;
          openSet.push(neighbour);
          isNewPath=true;
          
        }
if(isNewPath){
        neighbour.h=euclideanHeuristic(end,neighbour);
        neighbour.f=neighbour.h+neighbour.g;
        neighbour.previous=current;
}
    }
  }
}






background(255);
for(var i=0;i<cols;i++){
  for(var j=0;j<rows;j++){
    grid[i][j].show(color(255));
  }
}

for(var i=0;i<closedSet.length;i++){
  closedSet[i].show(color(255,0,0));
}
for(var i=0;i<openSet.length;i++){
  openSet[i].show(color(237, 160, 5));
}
path=[];
    var temp=current;
    path.push(temp);
    while(temp.previous!=null){
      path.push(temp.previous);
      temp=temp.previous;
    }
for(var i=0;i<path.length;i++){
  path[i].show(color(0,0,255));
}
}

