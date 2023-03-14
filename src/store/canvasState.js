import { makeAutoObservable } from "mobx";
import toolState from "./toolState";

class CanvasState {
  canvas = null;

  test = []
  undoList = [];
  redoList = [];
  figureList = [];
  figureListRedo = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }
  pushToFigure(data) {
    this.figureList.push(data);
  }

  pushToUndo(data) {
    this.undoList.push(data);
  }
  pushToRedo(data) {
    this.redoList.push(data);
  }

  tests(){
    let ctx = this.canvas.getContext("2d");
    // for (let i=0;i<this.test.length-2;i+=2){
    //   toolState.setStrokeColor("red")
    //    toolState.setFillColor("red")
    //    ctx.beginPath();
    //    ctx.moveTo(this.test[i], this.test[i+1]);
    //     ctx.lineTo(this.test[i]+1, this.test[i+1]+1);
    //      ctx.stroke();

      
    // }
    console.log(test)
   
  }

  undo() {
    let ctx = this.canvas.getContext("2d");
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL());
      
      let figure = this.figureList.pop();
      this.figureListRedo.push(figure)
      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    let ctx = this.canvas.getContext("2d");
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL());
      let figure = this.figureListRedo.pop();
      this.figureList.push(figure)

      let img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  }
}

export default new CanvasState();
