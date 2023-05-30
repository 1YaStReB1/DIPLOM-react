import canvasState from "../../../store/canvasState";
import toolState from "../../../store/toolState";



export const sortPointsDFS = (points) => {
  // Находим центральную точку фигуры (среднее арифметическое всех точек)
  const center = points.reduce(
    (acc, p) => ({ X: acc.X + p.X, Y: acc.Y + p.Y }),
    { X: 0, Y: 0 }
  );
  center.X /= points.length;
  center.Y /= points.length;

  // Сортируем точки по углу между вектором, соединяющим центральную точку и точку, и осью X
  const sorted = points.sort((a, b) => {
    const angleA = Math.atan2(a.Y - center.Y, a.X - center.X);
    const angleB = Math.atan2(b.Y - center.Y, b.X - center.X);
    return angleA - angleB;
  });

  return sorted;
};

export const sortPointsBFS = (points) => {
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

export const obrMass = (test) => {
  let j = test.length;
  let max = test.length - 1;
  let flag = false;
  let temp;

  for (let i = 0; i < max; ) {
    if (test[i].Y !== temp) {
      flag = false;
    }
    if (i === 0 || flag) {
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
  const imgData = ctx.getImageData(0, 0, width, height);
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

  let MBO = [];
  for (let i = 0; i < P.length; i++) {
    MBO.push(test[P[i]]);
  }
  return MBO;
};

export const notConvexHull = (MBO, test) => {
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

        if (NotEmptyTreangle(pb, pe, pt, G)) continue;

        if (IsCrossHull(pb, pe, pt, MBO)) continue;
        jpt = G.indexOf(pt);
        Sqmax = Sqt;
      }
    }
    if (jpt >= 0) {
      MBO.splice(im + 1, 0, G[jpt]);
      G.splice(jpt, 1);
      check = 0;
    } else {
      check += 1;
    }
  }

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
  for (let i = 0; i < MBO.length - 1; i++) {
    let m1 = MBO[i];
    let m2 = MBO[i + 1];

    if (
      checkSegmentsIntersection(pb, pt, m1, m2) ||
      checkSegmentsIntersection(pe, pt, m1, m2)
    ) {
      return 1;
    }
  }
  return 0;
};
