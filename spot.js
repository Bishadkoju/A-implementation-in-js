function Spot(i,j){
    this.x=i;
    this.y=j;
    this.f=0;
    this.g=0;
    this.h=0;
    this.neighbours=[];
    this.previous=null;
    this.wall=false;
    if(random(1)<0.35){
        this.wall=true;
    }
  
    this.show = function(col){
      fill(col);
      if(this.wall){
          fill(color(5, 56, 12));
      }
      noStroke();
      rect(this.x*w,this.y*h,w,h,w*0.3);
    }
  
    this.evaluateNeighbours = function(grid){
      // if(this.x<cols-1){
      //   this.neighbours.push(grid[this.x+1][this.y]);
      // }
      // if(this.x>0){
      //   this.neighbours.push(grid[this.x-1][this.y]);
      // }
      
      // if(this.y>0){
      //   this.neighbours.push(grid[this.x][this.y-1]);
      // }
      // if(this.y<rows-1){
      //   this.neighbours.push(grid[this.x][this.y+1]);
      // }
  
      var offset=[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];
      var nextPositionX=0,nextPositionY=0;
      for(var i=0;i<offset.length;i++){
        nextPositionX=offset[i][0]+this.x;
        nextPositionY=offset[i][1]+this.y;
        if((nextPositionX>=0&&nextPositionX<cols)&&(nextPositionY>=0&&nextPositionY<rows)){
          this.neighbours.push(grid[nextPositionX][nextPositionY]);
  
        }
      }
  
  
    }
  
  
  }