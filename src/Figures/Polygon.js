import Figure from "./Figure";

export default class Polygon extends Figure {
  

  draw(){
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0], this.points[1])
    for(let i =2 ;i< this.points.length; i+=2){
    this.ctx.lineTo(this.points[i],this.points[i+1])
    }
    this.ctx.fill();
  }
}