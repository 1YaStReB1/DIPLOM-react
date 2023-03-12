import Figure from "./Figure";

export default class Rectangle extends Figure {
  

  draw(){
    let currentX = this.points[2];
    let currentY =this.points[3];
    let width = currentX - this.points[0];
    let height = currentY - this.points[1];
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0], this.points[1])
    this.ctx.rect(this.points[0],this.points[1],width,height);
    this.ctx.fill();
  }
}