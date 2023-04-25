
import canvasState from "../../../store/canvasState";
import toolState from "../../../store/toolState";



export const SortPosledovat = (points) => {
  let ctx = canvasState.canvas.getContext("2d");
  // Найти самую левую точку в массиве
  let leftmostPoint = points.reduce(
    (acc, p) => (p.X < acc.X ? p : acc),
    points[0]
  );
  // Добавить самую левую точку в упорядоченный массив
  const orderedPoints = [leftmostPoint];
  let max = points.length;

// Найти следующую точку и добавлять ее в упорядоченный массив
let currentPoint = leftmostPoint;
while (orderedPoints.length < max) {
  let minDistance = Infinity;
  let nextPoint = null;

  //let idx = points.indexOf(currentPoint);
  //const minIdx = idx > 100 ? idx - 100 : 0;
  //const maxIdx = Math.min(points.length, idx + 100);
  for (let i = 0; i < points.length; i++) {
    const candidate = points[i];

    if (
      !orderedPoints.some((p) => p.X === candidate.X && p.Y === candidate.Y)
    ) {
      const distance = Math.sqrt(
        (currentPoint.X - candidate.X) ** 2 + (currentPoint.Y - candidate.Y) ** 2
      );
      if (distance < minDistance) {
        minDistance = distance;
        nextPoint = candidate;
      }
    }
  }

  if (nextPoint === null) {
    const m = orderedPoints.pop();
    ctx.beginPath();
    ctx.ellipse(m.X, m.Y, 3, 3, 0, 0, 2 * Math.PI);
    ctx.stroke();
  } else {
    orderedPoints.push(nextPoint);
    currentPoint = nextPoint;
  }
}

  return orderedPoints;
};

export const sortPointsDFS = (points) => {
  const visited = new Array(points.length).fill(false);
  const orderedPoints = [];

  const dfs = (currentIndex) => {
    visited[currentIndex] = true;
    orderedPoints.push(points[currentIndex]);

    const adjacentPoints = findAdjacentPoints(currentIndex);
    for (let i = 0; i < adjacentPoints.length; i++) {
      const nextIndex = adjacentPoints[i];
      if (!visited[nextIndex]) {
        dfs(nextIndex);
      }
    }
  };

  dfs(0);

  function findAdjacentPoints(index) {
    const adjacentPoints = [];
    for (let i = 0; i < points.length; i++) {
      if (i !== index) {
        const dx = points[i].X - points[index].X;
        const dy = points[i].Y - points[index].Y;
        if (Math.sqrt(dx * dx + dy * dy) <= 10) {
          adjacentPoints.push(i);
        }
      }
    }
    adjacentPoints.sort((a, b) => {
      const aDx = points[a].X - points[index].X;
      const aDy = points[a].Y - points[index].Y;
      const bDx = points[b].X - points[index].X;
      const bDy = points[b].Y - points[index].Y;
      return Math.atan2(aDy, aDx) - Math.atan2(bDy, bDx);
    });
    return adjacentPoints;
  }

  return orderedPoints;
};

export const sortPointsBFS = (points) => {
  // Создаем Set для хранения посещенных точек

  const visited = new Set();

  // Создаем пустой массив для сохранения упорядоченных точек
  const orderedPoints = [];

  // Создаем очередь для BFS
  const queue = [0];

  // Добавляем начальную точку в посещенные и упорядоченные массивы
  visited.add(0);
  orderedPoints.push(points[0]);

  while (queue.length) {
    // Извлекаем первый элемент из очереди
    const currentIndex = queue.shift();

    // Находим все смежные точки
    const adjacentPoints = findAdjacentPoints(currentIndex);
   // console.log(adjacentPoints);
    // Добавляем смежные точки в очередь, если они еще не были посещены
    for (let i = 0; i < adjacentPoints.length; i++) {
      const nextIndex = adjacentPoints[i];
      if (!visited.has(nextIndex)) {
        visited.add(nextIndex);
        orderedPoints.push(points[nextIndex]);
        queue.push(nextIndex);
      }
    }
  }

  // Функция для поиска смежных точек
  function findAdjacentPoints(index) {
    const adjacentPoints = [];
    for (let i = 0; i < points.length; i++) {
      if (i !== index) {
        const dx = points[i].X - points[index].X;
        const dy = points[i].Y - points[index].Y;
        // Если точки находятся достаточно близко, то они считаются смежными
        if (Math.sqrt(dx * dx + dy * dy) <= 4) {
          adjacentPoints.push(i);
        }
      }
    }
    return adjacentPoints;
  }

  return orderedPoints;
};

export const sortPoints = (points) => {
  // Создаем массив посещенных точек
  const visited = new Array(points.length).fill(false);

  // Создаем пустой массив для сохранения упорядоченных точек
  const orderedPoints = [];

  // Начинаем обход в глубину с первой точки
  dfs(0);

  // Функция обхода в глубину
  function dfs(index) {
    // console.log(index)//{X: 479, Y: 183}    {X: 495, Y: 156}
    // Помечаем текущую точку как посещенную
    visited[index] = true;
    // Добавляем текущую точку в упорядоченный массив
    orderedPoints.push(points[index]);

    // Находим все смежные точки
    const adjacentPoints = findAdjacentPoints(index); //[738, 739, 747, 748, 756, 757, 758, 778]

    // Рекурсивно вызываем функцию обхода в глубину для каждой смежной точки
    for (let i = 0; i < adjacentPoints.length; i++) {
      const nextIndex = adjacentPoints[i];
      if (!visited[nextIndex]) {
        dfs(nextIndex);
      }
    }
  }

  // Функция для поиска смежных точек
  function findAdjacentPoints(index) {
    const adjacentPoints = [];
    for (let i = 0; i < points.length; i++) {
      if (i !== index) {
        const dx = points[i].X - points[index].X;
        const dy = points[i].Y - points[index].Y;

        //console.log(points[i],points[index])   779
        // Если точки находятся достаточно близко, то они считаются смежными
        if (Math.sqrt(dx * dx + dy * dy) <= 3) {
          adjacentPoints.push(i);
        }
      }
    }
    return adjacentPoints;
  }

  return orderedPoints;
};

export const obrMass = (test) => {
  //ОБРАБОТКА МАССИВА
  let j = test.length;
  let max = test.length - 1;
  let flag = false;
  let temp;

  for (let i = 0; i < max; ) {
    if (test[i].Y !== temp) {
      flag = false;
    }
    if (i === 0 || flag) {
      //  console.log("Пропуск")
      //Оставлять точки, расположенные слева-направо в исходном виде
      while (test[i].Y === test[i + 1].Y && test[i + 1].X - test[i].X <= 10) {
        i += 1;
      }
      i += 1;
      flag = false;
    }
    //Если рассматриваются точки на далёком расстоянии друг от друга, то левая точка переносится к концу пассива в позицию j и включается обработка цифр слева-направо
    else if (test[i].Y === test[i + 1].Y && test[i + 1].X - test[i].X > 10) {
      temp = test[i].Y;

      let dop = test.slice(i, i + 1);
      test.splice(j, 0, dop[0]);
      test.splice(i, 1);
      max -= 1;
      j -= 1;
      flag = true;
    } else {
      // В противном случае  точка переносится к концу пассива в позицию j
      let dop = test.slice(i, i + 1);
      test.splice(j, 0, dop[0]);
      test.splice(i, 1);
      j -= 1;
      max -= 1;
    }
  } //КОНЕЦ ОБРАБОТКИ МАССИВА

  return test;
};

export const rotate = (A, B, C) => {
  return (B[0] - A[0]) * (C[1] - B[1]) - (B[1] - A[1]) * (C[0] - B[0]);
};

export const IndexMaxSide = (A) => {
  let max = Math.sqrt(
    (A[A.length - 1].X - A[0].X) ** 2 + (A[A.length - 1].Y - A[0].Y) ** 2
  );
  let idx = A.length - 1;
  for (let i = 1; i < A.length; i++) {
    let d = Math.sqrt((A[i - 1].X - A[i].X) ** 2 + (A[i - 1].Y - A[i].Y) ** 2);
    if (max < d) {
      max = d;
      idx = i - 1;
    }
  }
  return idx;
};

export const NotEmptyTreangle = (pb, pe, pt, G) => {
  let ctx = canvasState.canvas.getContext("2d");
  let min = pb.X < pe.X ? pb : pe;
  let max = pb.X > pe.X ? pb : pe;

  for (let j in G) {
    let m = G[j];

    let a = (pb.X - m.X) * (pe.Y - pb.Y) - (pe.X - pb.X) * (pb.Y - m.Y);
    let b = (pe.X - m.X) * (pt.Y - pe.Y) - (pt.X - pe.X) * (pe.Y - m.Y);
    let c = (pt.X - m.X) * (pb.Y - pt.Y) - (pb.X - pt.X) * (pt.Y - m.Y);

    if (
      ((a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0)) &&
      !(m.X === pt.X && m.Y === pt.Y)
    ) {
      return 1;
    }
  }
  return 0;
};

export const creatingShell = () => {
  let ctx = canvasState.canvas.getContext("2d");

  const width = canvasState.canvas.width;
  const height = canvasState.canvas.height;

  let imgData = ctx.getImageData(0, 0, width, height);
  let test = [];

  for (let i = 0; i < imgData.data.length; i += 4) {
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
    ) {
      imgData.data[i] = 220;
      imgData.data[i + 1] = 0;
      imgData.data[i + 2] = 0;
      imgData.data[i + 3] = 255;

      test.push({ X: (i / 4) % width, Y: Math.floor(i / 4 / width) });
    } else if (
      imgData.data[i] !== 255 ||
      imgData.data[i + 1] !== 255 ||
      imgData.data[i + 2] !== 255
    ) {
      imgData.data[i] = 0;
      imgData.data[i + 1] = 220;
      imgData.data[i + 2] = 0;
      imgData.data[i + 3] = 255;
    }
  }
  return [test, imgData];
};

export const grahamAlgorithm = (test) => {
  let ctx = canvasState.canvas.getContext("2d");
  let P = [];
  for (let i = 0; i < test.length; i++) {
    P.push(i); // добавляем каждое число в массив
  }

  for (let i = 2; i < test.length; i++) {
    let j = i;

    while (
      j > 1 &&
      rotate(
        [test[P[0]].X, test[P[0]].Y],
        [test[P[j - 1]].X, test[P[j - 1]].Y],
        [test[P[j]].X, test[P[j]].Y]
      ) < 0
    ) {
      let temp = P[j];
      P[j] = P[j - 1];
      P[j - 1] = temp;
      j -= 1;
    }
  }
 
  let S = [P[0], P[1]];
  for (let i = 2; i < test.length; i++) {
    while (
      rotate(
        [test[S[S.length - 2]].X, test[S[S.length - 2]].Y],
        [test[S[S.length - 1]].X, test[S[S.length - 1]].Y],
        [test[P[i]].X, test[P[i]].Y]
      ) < 0
    ) {
      S.pop();
    }
    S.push(P[i]);
  }
  P = S;

  let MBO = []
  for (let i = 0; i < P.length; i++) {
    MBO.push(test[P[i]])
  }
  return MBO;
};

export const notConvexHull = (MBO, test) => {
  let ctx = canvasState.canvas.getContext("2d");
  let nh = MBO.length;
  let G = test.filter((o) => !MBO.some((i) => i.X === o.X && i.Y === o.Y));
  G.map((o) => {
    return { X: o.X, Y: o.Y };
  });
  let check = 0;
  for (let i = 0; i < 3 * nh; i++) {
    let im = IndexMaxSide(MBO); // индекс в H начальной точки наибольшей стороны
    if (check !== 0) {
      im += check;
    }
    //let im = i%nh

    let pb = MBO[im];
    let pe = MBO[(im + 1) % MBO.length];

    let jpt = -1;
    let qd0 = (pb.X - pe.X) ** 2 + (pb.Y - pe.Y) ** 2;
    let Sqmax = 0;
    for (let j in G) {
      let pt = G[j];

      let qd1 = (pb.X - pt.X) ** 2 + (pb.Y - pt.Y) ** 2;
      let qd2 = (pe.X - pt.X) ** 2 + (pe.Y - pt.Y) ** 2;

      if (qd0 > Math.abs(qd1 - qd2)) {
        let Sqt =
          Math.abs(
            pb.X * (pe.Y - pt.Y) + pe.X * (pt.Y - pb.Y) + pt.X * (pb.Y - pe.Y)
          ) / 2;

        if (Sqt < Sqmax) continue;
        if (pt.X === 513 && pt.Y === 30) {
          //console.log("NAZCHOL", pb, pe, pt);

          toolState.setStrokeColor("rgba(255, 0, 255, 1)");
          toolState.setFillColor("rgba(255, 0, 255, 1)");
          toolState.setLineWidth(1);
          ctx.beginPath();
          ctx.ellipse(pt.X, pt.Y, 3, 3, 0, 0, 2 * Math.PI);
          ctx.stroke();

          toolState.setStrokeColor("rgba(255, 0, 0, 1)");
          toolState.setFillColor("rgba(255, 0, 0, 1)");
          toolState.setLineWidth(1);
          ctx.beginPath();
          ctx.ellipse(pb.X, pb.Y, 3, 3, 0, 0, 2 * Math.PI);
          ctx.stroke();

          toolState.setStrokeColor("rgba(0, 255, 0, 1)");
          toolState.setFillColor("rgba(0, 255, 0, 1)");
          toolState.setLineWidth(1);
          ctx.beginPath();
          ctx.ellipse(pe.X, pe.Y, 3, 3, 0, 0, 2 * Math.PI);
          ctx.stroke();
        }
        if (NotEmptyTreangle(pb, pe, pt, G)) continue;

        if (IsCrossHull(pb, pe, pt, MBO)) continue;
        jpt = G.indexOf(pt);
        Sqmax = Sqt;
      }
    }
    if (jpt >= 0) {
      // toolState.setStrokeColor("rgba(255, 0, 0, 1)");
      // toolState.setFillColor("rgba(255, 0, 0, 1)");
      // toolState.setLineWidth(3);
      // ctx.beginPath();
      // ctx.ellipse(G[jpt].X, G[jpt].Y, 5, 5, 0, 0, 2 * Math.PI);
      // ctx.fill();
      MBO.splice(im + 1, 0, G[jpt]);
      G.splice(jpt, 1);
      check = 0;
    } else {
      check += 1;
    }
    // break;
  }
  //console.log(MBO);
  return MBO;
};

export const checkSegmentsIntersection = (p1, p2, p3, p4) => {
  // вычисляем уравнения отрезков
  // определяем векторы для двух отрезков
  const v1 = { x: p2.X - p1.X, y: p2.Y - p1.Y };
  const v2 = { x: p4.X - p3.X, y: p4.Y - p3.Y };
  // определяем знаменатель уравнения для параметров t и u
  const denominator = v2.y * v1.x - v2.x * v1.y;

  // если знаменатель равен 0, отрезки параллельны
  if (denominator === 0) {
    return false;
  }

  // определяем параметры t и u
  const t = ((p3.X - p1.X) * v2.y - (p3.Y - p1.Y) * v2.x) / denominator;
  const u = -((p3.X - p1.X) * v1.y - (p3.Y - p1.Y) * v1.x) / denominator;

  // если параметры t и u лежат в диапазоне от 0 до 1, то отрезки пересекаются
  return (
    t > 0 &&
    t < 1 &&
    u > 0 &&
    u < 1 &&
    p1 !== p3 &&
    p1 !== p4 &&
    p2 !== p3 &&
    p2 !== p4
  );
};

export const IsCrossHull = (pb, pe, pt, MBO) => {
  let ctx = canvasState.canvas.getContext("2d");
  for (let i = 0; i < MBO.length - 1; i++) {
    let m1 = MBO[i];
    let m2 = MBO[i + 1];

    if (
      checkSegmentsIntersection(pb, pt, m1, m2) ||
      checkSegmentsIntersection(pe, pt, m1, m2)
    ) {
      // if(pt.X=== 513 && pt.Y === 30){
      //   if(checkSegmentsIntersection(pb,pt,m1,m2) )
      //   console.log("gggggggggggggggggg")
      //     console.log(pb,pt,m1,m2,)
      //     toolState.setStrokeColor("rgba(0, 255, 255, 1)");
      //     toolState.setFillColor("rgba(0, 255, 255, 1)");
      //     toolState.setLineWidth(3);
      //     ctx.beginPath();
      //     ctx.moveTo(pb.X, pb.Y);
      //     ctx.lineTo(pt.X, pt.Y);
      //     ctx.stroke();

      // toolState.setStrokeColor("rgba(255, 0, 0, 1)");
      // toolState.setFillColor("rgba(255, 0,0, 1)");
      // toolState.setLineWidth(3);
      // ctx.beginPath();
      // ctx.moveTo(m1.X, m1.Y);
      // ctx.lineTo(m2.X, m2.Y);
      // ctx.stroke();

      //}
      return 1;
    }
  }
  return 0;
};
