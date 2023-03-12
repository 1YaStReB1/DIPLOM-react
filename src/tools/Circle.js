import Ellipse from "../Figures/Ellipse";
import canvasState from "../store/canvasState";
import figureState from "../store/figureState";
import Tool from "./Tool";

export default class Circle extends Tool {
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
    figureState.figure.addPoint(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
    canvasState.pushToFigure(figureState.figure);
  }

  mouseDownHandler(e) {
    figureState.setFigure(new Ellipse(canvasState.canvas));
    figureState.figure.addPoint(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    );
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      //текущая позиция
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;

      let width = Math.abs(currentX - this.startX);
      let height = Math.abs(currentY - this.startY);
      let radiusX = width / 2;
      let radiusY = height / 2;

      let centrX = this.startX + radiusX;
      let centrY = this.startY + radiusY;
      //центр всегда положителен
      if (currentY < this.startY) centrY = currentY + radiusY;
      if (currentX < this.startX) centrX = currentX + radiusX;

      this.draw(centrX, centrY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    }
  }

  draw(x, y, radiusX, radiusY, rotation, startAngle, endAngle) {
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }
}
