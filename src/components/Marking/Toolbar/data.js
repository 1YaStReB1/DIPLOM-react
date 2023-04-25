import {
  clearMask,
  drawMask,
  redo,
  save,
  saveImage,
  selectBrush,
  selectCircle,
  selectLine,
  selectRect,
  tet,
  undo,
} from "./ToolbarButtonsLogic";

import penIconSrc from "../../../assets/img/pen.svg";
import circleIconSrc from "../../../assets/img/circle.svg";
import clearIconSrc from "../../../assets/img/clear.svg";
import lineIconSrc from "../../../assets/img/line.svg";
import rectIconSrc from "../../../assets/img/rect.svg";
import redoIconSrc from "../../../assets/img/redo.svg";
import saveIconSrc from "../../../assets/img/save.svg";
import undoIconSrc from "../../../assets/img/undo.svg";
import drawMaskIconSrc from "../../../assets/img/drawMask.svg";
import saveMaskIconSrc from "../../../assets/img/saveImage.svg";

export const data = {
  brush: [selectBrush, penIconSrc, "Рисование сплошной линией"],
  rect: [selectRect, rectIconSrc, "Закрашенный прямоугольник"],
  circle: [selectCircle, circleIconSrc, "Закрашенный овал"],
  line: [selectLine, lineIconSrc, "Рисование прямыми линиями"],
  undo: [undo, undoIconSrc, "Шаг назад"],
  redo: [redo, redoIconSrc, "Шаг вперёд"],
  drawMask: [drawMask, drawMaskIconSrc, "Нарисовать маску"],
  clear: [clearMask, clearIconSrc, "Очистить"],
  save: [save, saveIconSrc, "Сохранить маску"],
  saveImage: [saveImage, saveMaskIconSrc, "Сохранить изображение"],
  // tt: [tet, saveMaskIconSrc,"Сохранить изображение"]
};
