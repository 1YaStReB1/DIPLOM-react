
import {
  clearMask,
  drawMask,
  redo,
  save,
  selectBrush,
  selectCircle,
  selectLine,
  selectRect,
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

export const data = {
  brush: [selectBrush, penIconSrc],
  rect: [selectRect,rectIconSrc],
  circle: [selectCircle, circleIconSrc],
  line: [selectLine, lineIconSrc],
  undo: [undo, undoIconSrc],
  redo: [redo, redoIconSrc],
  drawMask: [drawMask, drawMaskIconSrc],
  save: [save, saveIconSrc],
  clear: [clearMask, clearIconSrc]
};
