import Polygon from "../Figures/Polygon";
import { canvasState, figureState } from "../helpers/importsState";
import Tool from "./Tool";

export default class Line extends Tool {
  constructor(canvas) {
    super(canvas);
    this.noPath = true;
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onclick = this.mouseleftHandler.bind(this);
    this.canvas.oncontextmenu = this.mouseRightHandler.bind(this);
  }

  mouseRightHandler(e) {
    e.preventDefault();
    this.noPath = true;
    this.mouseDown = false;
    figureState.figure.addPoint(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
    figureState.figure.draw();
    canvasState.pushToFigure(figureState.figure);
  }

  mouseleftHandler(e) {
    e.preventDefault();
    if (this.noPath) {
      figureState.setFigure(new Polygon(canvasState.canvas));
    }
    figureState.figure.addPoint(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
    console.log( e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop)
    this.mouseDown = true;
    this.noPath = false;
    console.log("ggg");
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.draw(currentX, currentY);
    }
  }

  draw(x, y) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    };
  }
}
