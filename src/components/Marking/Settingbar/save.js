export const convertMaskToJson = () => {
  let ctx = canvasState.canvas.getContext("2d");
  let imgData = ctx.getImageData(
    0,
    0,
    canvasState.canvas.width,
    canvasState.canvas.height
  );

  //for(let t =0;t<=canvasState.canvas.height;t+=40){
  // for(let l=0;l<=canvasState.canvas.width;l+=64){

  const width = canvasState.canvas.width;
  const height = canvasState.canvas.height;
  // const width = 64
  // const height = 40
  imgData = ctx.getImageData(0, 0, width, height);
  let test = [];
  figureState.setFigure(new Polygon(canvasState.canvas));

  for (let i = 0; i < imgData.data.length; i += 4) {
    toolState.setStrokeColor("red");
    toolState.setFillColor("red");
    imgData.data[i] = 255 - imgData.data[i];
    imgData.data[i + 1] = 255 - imgData.data[i + 1];
    imgData.data[i + 2] = 255 - imgData.data[i + 2];
    imgData.data[i + 3] = 255;
  }
  for (let i = 0; i < imgData.data.length; i += 4) {
    const currentR = imgData.data[i];
    const currentG = imgData.data[i + 1];
    const currentB = imgData.data[i + 2];

    const pixLeft = imgData.data[i - 4];
    const pixRight = imgData.data[i + 4];

    const pixUp = imgData.data[i + width * 4];
    const pixDown = imgData.data[i - width * 4];

    if (
      currentR !== 255 &&
      currentG !== 255 &&
      currentB !== 255 &&
      ((pixRight === 255 && (i / 4) % width !== width - 1) ||
        (pixLeft === 255 && (i / 4) % width !== 0) ||
        pixUp === 255 ||
        pixDown === 255 ||
        (i / 4) % width === width - 1 ||
        (i / 4) % width === 0)
      // ||((i/4) % width === 0) || ((i/4)%width === width ) || (Math.round((i/4)/width) === 0 ) || (Math.round((i/4)/width) === height )))
    ) {
      imgData.data[i] = 220;
      imgData.data[i + 1] = 0;
      imgData.data[i + 2] = 0;
      imgData.data[i + 3] = 255;

      test.push({X: (i / 4) % width, Y: Math.floor(i / 4 / width)})
     // test.push((i / 4) % width);
     // test.push(Math.floor(i / 4 / width));
    } else if (
      imgData.data[i] !== 255 ||
      imgData.data[i + 1] !== 255 ||
      imgData.data[i + 2] !== 255
    ) {
      imgData.data[i] = 0;
      imgData.data[i + 1] = 220;
      imgData.data[i + 2] = 0;
      imgData.data[i + 3] = 255;
    } else {
    }
    //  imgData.data[i]=255-imgData.data[i];
    //  imgData.data[i+1]=255-imgData.data[i+1];
    //  imgData.data[i+2]=255-imgData.data[i+2];
    //  imgData.data[i+3]=255;
  }
  toolState.setStrokeColor("red");
  toolState.setFillColor("red");

  //test = obrMass(test);
  // for(let i = 0; i < test.length; i+=2) {
  //   test.splice(i+2,6);
  // }
  
  // test = [200,100,250,100,150,150,300,150,100,200,350,200,150,250,300,250,200,300,250,300]
 //  test = [150,150,300,150,225,180,100,200,350,200,150,250,300,250,200,300,250,300]
//АЛГОРИТМ ГРЭХЭМА

  let P = []; // создаем пустой массив
 // console.log(test)
  for (let i = 0; i < test.length/2; i++) {
    P.push(i); // добавляем каждое число в массив
  }
 
  for (let i = 4; i < test.length; i+=2) {
    let j = i/2;
    // if(rotate([test[P[0]],test[P[0] + 1]], [test[P[j-1]*2],test[P[j-1]*2 + 1]], [test[P[j]*2],test[P[j]*2 + 1] ])===0){
    //   test.splice(j,2)
    //   i-=2
    // }
    
    while (j > 1 && rotate([test[P[0]],test[P[0] + 1]], [test[P[j-1]*2],test[P[j-1]*2 + 1]], [test[P[j]*2],test[P[j]*2 + 1] ]) < 0) {
      //console.log(P,j)
   // console.log(test[P[j]*2],test[P[j]*2 + 1])
   // console.log(test[P[j-1]*2],test[P[j-1]*2 + 1])
      let temp = P[j]
      P[j] =  P[j - 1]
      P[j - 1] = temp
      j -= 1;
      
    }
  }

//console.log(test)
let S = [P[0],P[1]]
for (let i = 2; i < test.length/2; i ++) {
 
  while (rotate([test[S[S.length-2]*2],test[S[S.length-2]*2+1]],[test[S[S.length-1]*2],test[S[S.length-1]*2+1]],[test[P[i]*2],test[P[i]*2 + 1] ])<0){

    S.pop()
  }
  S.push(P[i])
}

console.log(P)
P = S
console.log(P)
for (let i = 0; i < P.length; i ++) {
  figureState.figure.addPoint(test[P[i]*2], test[P[i]*2+1]);
}
let MBO = figureState.figure.getPoints();

// let a = [{X:1, Y: 2}, {X:1, Y:3},{X:6,Y:10}]
//  let b = [{X:7, Y: 2}, {X:1, Y:3}]
//  let firstArray  = a.filter(o=> !b.some(i=> i.X === o.X && i.Y === o.Y))
//  firstArray.map(o=> {return {'X' :  o.X, 'Y': o.Y}})
//  console.log(firstArray)
  
  ctx.putImageData(imgData, 0, 0);

  toolState.setStrokeColor("rgba(0, 0, 255, 1)");
  toolState.setFillColor("rgba(0, 0, 255, 1)");
  toolState.setLineWidth(1);
  
 
//console.log(test)
  ctx.beginPath();
 // ctx.moveTo(test[0], test[1]);
  let i = 0;
  for (i = 0; i < MBO.length; i+=2) {
    
   // console.log(test[i],test[i+1],i)
    
    ctx.lineTo(MBO[i], MBO[i+1]);
    ctx.ellipse(MBO[i], MBO[i+1],3,3, 0,0,2*Math.PI);
    ctx.moveTo(MBO[i], MBO[i+1]);
  }
 //ctx.lineTo(test[0], test[1]);
  ctx.stroke();
  //ctx.fill();

  toolState.setStrokeColor("black");
  toolState.setFillColor("black");
  canvasState.pushToFigure(figureState.figure);

  //console.log(test)
  //ctx.putImageData(imgData,l,t);
  // }
  //}

  //ctx.clearRect(0,0,canvasState.canvaswidth,canvasState.canvas.height)
};


export const obrMass = (test) => {
  //ОБРАБОТКА МАССИВА
  let j = test.length;
  let max = test.length -1;
  let flag = false;
  let temp;
  let ctx = canvasState.canvas.getContext("2d");

  

  
  for (let i = 0; i < max; ) {
    if (test[i].Y !== temp) {
      flag = false;
    }
    if (i === 0 || flag) {
      //  console.log("Пропуск")
      while (test[i].Y === test[i+1].Y && test[i+1].X - test[i].X <= 10) {
        toolState.setStrokeColor("rgba(255, 0, 255, 1)");
        toolState.setFillColor("rgba(255, 0, 255, 1)");
         toolState.setLineWidth(1);
         ctx.beginPath();
         ctx.ellipse(test[i].X, test[i+1].Y, 3, 3, 0, 0, 2 * Math.PI);
         ctx.stroke();
        i += 1;
      }
      i += 1;
      flag = false;
     
    }
     else if (test[i].Y === test[i + 1].Y && test[i + 1].X - test[i].X > 10) {
      temp = test[i].Y;
      let dop = test.slice(i, i + 1);
      test.splice(j, 0, dop[0]);
      test.splice(i, 1);
      max -= 1;
      j -= 1;
      flag = true;
      //  console.log("ИФ")
    } else {
      // console.log("ИНАЧЕ")
      let dop = test.slice(i, i + 1);
      test.splice(j, 0, dop[0]);
      test.splice(i, 1);
      j -= 1;
      max -= 1;
    }
  } //КОНЕЦ ОБРАБОТКИ МАССИВА


  
  // Найти следующую точку и добавлять ее в упорядоченный массив
  /*let nextPoint = findNextPoint(leftmostPoint, points);
  for (let i = 0; i < max; ) {
    if (nextPoint !== null) {
      orderedPoints.push(nextPoint);
      i++;
    } else {
      const m = orderedPoints.pop(nextPoint);
      toolState.setStrokeColor("rgba(255, 0, 255, 1)");
      toolState.setFillColor("rgba(255, 0, 255, 1)");
      toolState.setLineWidth(1);
      ctx.beginPath();
      ctx.ellipse(m.X, m.Y, 3, 3, 0, 0, 2 * Math.PI);
      ctx.stroke();
      points.splice(indexPoint(points, m), 1);
      max--;
      i++;
    }
    if (i === max - 1 || orderedPoints.length === 0) {
      break;
    }
    nextPoint = findNextPoint(orderedPoints[orderedPoints.length - 1], points);
  }
  




  // Функция для поиска следующей точки
  function findNextPoint(currentPoint, points) {
    let minDistance = 10;
    let nextPoint = null;

    let idx =  indexPoint(points, currentPoint)
     const minIdx = idx > 100 ? idx - 100: 0
    const maxIdx = points.length < idx + 100 ? points.length  : idx + 100
    for (let i = 0; i < points.length; i++) {
      const candidate = points[i];

      if (
        !orderedPoints.some((p) => p.X === candidate.X && p.Y === candidate.Y)
      ) {
        const distance = Math.sqrt(
          (currentPoint.X - candidate.X) ** 2 +
            (currentPoint.Y - candidate.Y) ** 2
        );
        if (distance < minDistance) {
          minDistance = distance;
          nextPoint = candidate;
        }
      }
    }

    return nextPoint;
  }


*/
  return test;
};