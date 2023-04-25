import {
  canvasState,
  toolState,
  figureState,
} from "../../../helpers/importsState";
import { Polygon, Ellipse, Rectangle } from "../../../helpers/importsFigures";
import { checkSegmentsIntersection, creatingShell, grahamAlgorithm, IndexMaxSide, kdTree, kdTree2, notConvexHull, NotEmptyTreangle, obrMass, rotate, sortPoints, sortPointsBFS, sortPointsDFS, SortPosledovat } from "./obtMass";

export const changeWidth = (e) => {
  toolState.setLineWidth(e.target.value);
};

export const changeColor = (e) => {
  toolState.setStrokeColor(e.target.value);
  toolState.setFillColor(e.target.value);
};

export const loadImage = (e, setImageName) => {
  if (!e.target.files.length) {
    return;
  }
  let file = document.querySelector("#image-input").files[0];
  let reader = new FileReader();
  const img = new Image();
  reader.onload = () => {
    img.src = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);

    setImageName(file.name);
  } else {
    img.src = "";
  }
  img.onload = () => {
    let ctx = canvasState.canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasState.canvaswidth, canvasState.canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      canvasState.canvas.width,
      canvasState.canvas.height
    );
  };
};

export const drawMask = (e, setMaskName) => {
  let file = document.querySelector("#mask-input").files[0];
  let reader = new FileReader();
  let mask = "";
  reader.onload = () => {
    mask = JSON.parse(JSON.parse(reader.result));

    for (let figure in mask) {
      for (let points in mask[figure]) {
        switch (figure) {
          case "Polygon":
            figureState.setFigure(
              new Polygon(canvasState.canvas, mask[figure][points])
            );
            break;
          case "Ellipse":
            figureState.setFigure(
              new Ellipse(canvasState.canvas, mask[figure][points])
            );
            break;
          case "Rectangle":
            figureState.setFigure(
              new Rectangle(canvasState.canvas, mask[figure][points])
            );
            break;
          default:
            break;
        }
        canvasState.pushToFigure(figureState.figure);
      }
    }

    toolState.setFillColor("white");
    toolState.setStrokeColor("white");
    canvasState.figureList.forEach((fig) => {
      fig.draw();
    });
  };

  if (file) {
    reader.readAsText(file);
    setMaskName(file.name);
  }
};

export const convertMaskToJson = (algoritm) => {
  let ctx = canvasState.canvas.getContext("2d");
  figureState.setFigure(new Polygon(canvasState.canvas));
  

  let [test,imgData] = creatingShell()
    ctx.putImageData(imgData, 0, 0);
   
 

switch(algoritm){
  case "sortPosledovat": test = SortPosledovat(test); console.log("sortPosledovat");
  break;
  case "sortPointsDFS": test = sortPointsDFS(test); console.log("sortPointsDFS");
  break;
  case "sortPointsBFS": test = sortPointsBFS(test); console.log("sortPointsBFS");
  break;
  case "sortPoints": test = sortPoints(test); console.log("sortPoints");
  break;
  case "obrMass": test = obrMass(test); console.log("obrMass");
  break;
  case "grahamAlgorithm": let test2 = grahamAlgorithm(test); test = notConvexHull(test2,test); console.log("grahamAlgorithm");
  break;
}


let MBO = []
 for (let i = 0; i < test.length; i++) {
  figureState.figure.addPoint(test[i].X, test[i].Y);
  MBO.push(test[i])
}

  toolState.setStrokeColor("rgba(0, 0, 255, 1)");
  toolState.setFillColor("rgba(0, 0, 255, 1)");
  toolState.setLineWidth(1);
  ctx.beginPath();
   ctx.moveTo(MBO[0].X, MBO[0].Y);
  let i = 0;
  for (i = 1; i < MBO.length; i ++) {
    ctx.lineTo(MBO[i].X, MBO[i].Y);
   // ctx.ellipse(MBO[i].X, MBO[i].Y, 3, 3, 0, 0, 2 * Math.PI);
    ctx.moveTo(MBO[i].X, MBO[i].Y);
  }
  ctx.stroke();
  ctx.fill();
 
 ctx.lineTo(MBO[0].X, MBO[0].Y);
  toolState.setStrokeColor("black");
  toolState.setFillColor("black");
  canvasState.pushToFigure(figureState.figure);
 
 
  
};
