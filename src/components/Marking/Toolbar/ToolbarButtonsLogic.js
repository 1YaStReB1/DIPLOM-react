import {canvasState,toolState,figureState} from '../../../helpers/importsState'
import {Brush,Circle,Line,Rect} from '../../../helpers/importsTools'
import {Polygon,Ellipse,Rectangle} from '../../../helpers/importsFigures'
//import { changeColor } from '../Settingbar/SettingbarButtonsLogic';

const activeClass = (id) =>{
  const btns = document.getElementsByClassName("btn");

  for( let i =0 ;i< btns.length ; i++){
    btns[i].classList.remove("active")
  }
  
  const active = document.getElementById(id)
  active.classList.add("active")

}


export const selectBrush = (e) =>{
  activeClass(e.currentTarget.id)
  toolState.setTool(new Brush(canvasState.canvas))
  console.log(canvasState.canvas)
}
export const selectRect = (e) =>{
  activeClass(e.currentTarget.id)
  toolState.setTool(new Rect(canvasState.canvas))
}

export const selectCircle = (e) =>{
  activeClass(e.currentTarget.id)
  toolState.setTool(new Circle(canvasState.canvas))
}

export const selectLine = (e) =>{
  activeClass(e.currentTarget.id)
  toolState.setTool(new Line(canvasState.canvas))
}

export const tet = (e) => {
 // console.log(canvasState.test)
  canvasState.tests()
}

export const undo = (e) =>{
  canvasState.undo()
}

export const redo = (e) =>{
  canvasState.redo()
}

export const clearMask = () =>{
  canvasState.figureList = []
}

export const drawMask = () =>{
  let file  = document.querySelector('#mask-input').files[0];
  let reader  = new FileReader();
  let mask = ""
  reader.onload = () => {
    mask = JSON.parse(reader.result)
  }

  if(file){
    reader.readAsText(file);

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
}
let ctx = canvasState.canvas.getContext("2d");
toolState.setFillColor("rgba(0, 0, 0, 1)")
toolState.setStrokeColor("rgba(0, 0, 0, 1)")
ctx.beginPath();
ctx.rect(0, 0, canvasState.canvas.width, canvasState.canvas.height)
 ctx.stroke();
 ctx.fill();

  toolState.setStrokeColor("rgba(255, 255, 255, 1)")
  toolState.setFillColor("rgba(255, 255, 255, 1)")
  canvasState.figureList.forEach( fig => {fig.draw()})   
}

export const save = () =>{
  let data = {
      Polygon : {},
      Ellipse: {},
      Rectangle: {}
      }
 
    for(let i=0; i< canvasState.figureList.length;i++){
      let figure = canvasState.figureList[i].constructor.name
      data[figure][i] = canvasState.figureList[i].points
      }
    
  let json = JSON.stringify(data);
  let b = new Blob([JSON.stringify(json)], {type : "application/json"})
  let link = document.createElement('a');
  link.download = 'mask.json';
  const url  = URL.createObjectURL(b);
  link.href = url;
  link.click(); 
}

export const saveImage = () =>{

  let link = document.createElement('a');
  link.download = 'image.jpg';
  

  //const url  = canvasState.canvas.toDataURL();
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', canvasState.size[0]);
  canvas.setAttribute('height', canvasState.size[1]);
  let context = canvas.getContext("2d")
 

   context.drawImage(
    canvasState.canvas,
     0,
     0,
     canvas.width,
     canvas.height
   );
  const url2  = canvas.toDataURL();

  link.href = url2;
  link.click(); 
}
