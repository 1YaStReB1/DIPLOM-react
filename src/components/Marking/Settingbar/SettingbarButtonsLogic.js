import {canvasState,toolState,figureState} from '../../../helpers/importsState'
import {Polygon,Ellipse,Rectangle} from '../../../helpers/importsFigures'
import { obrMass } from './obtMass';


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


export const convertMaskToJson = () =>{
  let ctx = canvasState.canvas.getContext("2d")
  let imgData=ctx.getImageData(0,0,canvasState.canvas.width,canvasState.canvas.height);

//for(let t =0;t<=canvasState.canvas.height;t+=40){
 // for(let l=0;l<=canvasState.canvas.width;l+=64){

          
        const width = canvasState.canvas.width 
         const height = canvasState.canvas.height 
          // const width = 64
         // const height = 40
         imgData=ctx.getImageData(0,0,width,height);
          let test = []
          figureState.setFigure(new Polygon(canvasState.canvas));
         
          for (let i=0; i<imgData.data.length; i+=4){ 
            toolState.setStrokeColor("red")
            toolState.setFillColor("red")
             imgData.data[i]=255-imgData.data[i];
             imgData.data[i+1]=255-imgData.data[i+1];
             imgData.data[i+2]=255-imgData.data[i+2];
             imgData.data[i+3]=255;
           
          }
          for (let i=0; i<imgData.data.length; i+=4)
        {
          const currentR = imgData.data[i]
          const currentG =imgData.data[i+1]
          const currentB = imgData.data[i+2]

          const pixLeft = imgData.data[i-4]
          const pixRight = imgData.data[i+4]

          const pixUp = imgData.data[i + width * 4]
          const pixDown = imgData.data[i- width * 4 ]

          if(((currentR!==255 && currentG!==255 && currentB!==255)  &&
             ( ((  (pixRight === 255 && (i/4)%width !==width-1)   || (pixLeft === 255 && (i/4)%width !==0) || pixUp=== 255 || pixDown === 255))
             || 
             (i/4)%width === width-1 || (i/4)%width ===0)
              // ||((i/4) % width === 0) || ((i/4)%width === width ) || (Math.round((i/4)/width) === 0 ) || (Math.round((i/4)/width) === height )))
          ))
              
          {
              imgData.data[i] = 220;
              imgData.data[i+1]=0;
              imgData.data[i+2]=0;
              imgData.data[i+3]=255;
              
              test.push((i/4)%width)
              test.push(Math.floor((i/4)/width))
             
          }
          else if(imgData.data[i]!==255 || imgData.data[i+1]!==255 || imgData.data[i+2]!==255){
            imgData.data[i] = 0;
              imgData.data[i+1]=220;
              imgData.data[i+2]=0;
              imgData.data[i+3]=255;
          }
          else{
          }
          //  imgData.data[i]=255-imgData.data[i];
          //  imgData.data[i+1]=255-imgData.data[i+1];
          //  imgData.data[i+2]=255-imgData.data[i+2];
          //  imgData.data[i+3]=255;

          
        }
        toolState.setStrokeColor("red")
            toolState.setFillColor("red")
        
      

       // test = [0,100,100,100,200,100,300,100,0,150,100,150,300,150,100,200,300,200,400,200,500,200,100,250,500,250,100,300,200,300,300,300,400,300,500,300]


      // test = [200,100,250,100,150,150,300,150,100,200,350,200,150,250,300,250,200,300,250,300]
//test = [447, 1, 449, 1, 451, 1, 454, 1]
//test = [60, 148, 60, 149, 60, 150, 60, 150, 61, 150, 62, 150, 63, 150, 64, 150, 65, 128, 66, 150, 66, 128, 67, 150, 67, 128, 68, 150, 68]
        
      // console.log(test)
        
        
       // console.log(test)
      // console.log(test)
      
      test = obrMass(test)

      for(let i=0;i<test.length-1;i+=2){
        figureState.figure.addPoint(test[i],test[i+1])
      }

       ctx.putImageData(imgData,0,0);
       
        toolState.setStrokeColor("rgba(0, 0, 255, 1)")
        toolState.setFillColor("rgba(0, 0, 255, 1)")
        toolState.setLineWidth(1) 
test = figureState.figure.getPoints()
        ctx.beginPath();
        ctx.moveTo(test[0] ,test[1] )
        let i=0
        for(i=2;i<test.length;i+=2){
          // if(test[i] >=500)
          //   console.log(test[i] + l,test[i+1] + t)
          ctx.lineTo(test[i] ,test[i+1] )
          
        }
        ctx.lineTo(test[0] ,test[1] )
        ctx.stroke();
        ctx.fill();

        toolState.setStrokeColor("black")
        toolState.setFillColor("black")
        canvasState.pushToFigure(figureState.figure);
        


//console.log(test)
  //ctx.putImageData(imgData,l,t);
     // }
//}
 
 //ctx.clearRect(0,0,canvasState.canvaswidth,canvasState.canvas.height)

}