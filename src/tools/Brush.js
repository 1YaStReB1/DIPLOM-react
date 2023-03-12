import Polygon from "../Figures/Polygon";
import { canvasState, figureState } from "../helpers/importsState";
import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.ctx.fill();
    canvasState.pushToFigure(figureState.figure);
  }

  mouseDownHandler(e) {
    figureState.setFigure(new Polygon(canvasState.canvas));
    figureState.figure.addPoint(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );

    this.mouseDown = true;

    this.ctx.beginPath();
    this.ctx.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      figureState.figure.addPoint(
        e.pageX - e.target.offsetLeft,
        e.pageY - e.target.offsetTop
      );
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
