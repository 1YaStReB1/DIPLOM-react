import Figure from "./Figure";

export default class Ellipse extends Figure {
  draw(){
    let currentX = this.points[2];
    let currentY =this.points[3];
    let startX = this.points[0];
    let startY = this.points[1];
    let width = Math.abs(currentX - startX) ;
    let height = Math.abs(currentY - startY);
    let radiusX =  width/2
    let radiusY =  height/2


    let centrX = startX + radiusX
    let centrY = startY + radiusY
    //центр всегда положителен
    if(currentY < startY)
      centrY = currentY+ radiusY
    if(currentX < startX)
      centrX = currentX+ radiusX

    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0], this.points[1])
    this.ctx.ellipse(centrX, centrY,radiusX,radiusY, 0,0,2*Math.PI);
    this.ctx.fill();
  }
}