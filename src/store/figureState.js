import { makeAutoObservable } from "mobx";

class FigureState {
  figure = null;
  constructor() {
    makeAutoObservable(this);
  }
  setFigure(figure) {
    this.figure = figure;
  }
}

export default new FigureState();
