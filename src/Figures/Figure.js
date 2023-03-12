export default class Figure {
  
  constructor(canvas, points = []){
   
    this.points = points
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
  }
  addPoint(x,y){
    this.points.push(x)
    this.points.push(y)
  }
  removePoints(){
    this.points = []
  }
  getPoints(){
    return this.points
  }

}