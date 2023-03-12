import {canvasState,toolState,figureState} from '../../../helpers/importsState'
import {Polygon,Ellipse,Rectangle} from '../../../helpers/importsFigures'


export const changeWidth = (e) => {
  
  toolState.setLineWidth(e.target.value);
};

export const changeColor = e =>{
  toolState.setStrokeColor(e.target.value)
  toolState.setFillColor(e.target.value)
}

export const loadImage = (e,setImageName) =>{
  if (!e.target.files.length) {
    return
  }
let file  = document.querySelector('#image-input').files[0];
let reader  = new FileReader();
const img = new Image()
reader.onload = () => {
  img.src = reader.result;
}
if (file) {
  reader.readAsDataURL(file);

  setImageName(file.name)
} else {
  img.src = "";
}
img.onload = () =>{
  let ctx = canvasState.canvas.getContext("2d")
  ctx.clearRect(0,0,canvasState.canvaswidth,canvasState.canvas.height)
  ctx.drawImage(img,0,0,canvasState.canvas.width,canvasState.canvas.height)
  }
}


export const drawMask = (e,setMaskName) =>{
  let file  = document.querySelector('#mask-input').files[0];
  let reader  = new FileReader();
  let mask = ""
  reader.onload = () => {
    mask = JSON.parse(reader.result)
  }
  if(file){
    reader.readAsText(file);
    setMaskName(file.name)
  }
  

  for(let figure in mask){
    for(let points in mask[figure]){
        switch(figure){
        case "polygon" :
            figureState.setFigure(new Polygon(canvasState.canvas, mask[figure][points] ))
            break
        case "ellipse":
          figureState.setFigure(new Ellipse(canvasState.canvas, mask[figure][points] ))
          break
        case "rectangle":
          figureState.setFigure(new Rectangle(canvasState.canvas, mask[figure][points] ))
          break
        default:
          break
        
        }
        canvasState.pushToFigure(figureState.figure)
    }
  }
  toolState.setFillColor("white")
  toolState.setStrokeColor("white")
  canvasState.figureList.forEach( fig => {fig.draw()})   
  changeColor()
}