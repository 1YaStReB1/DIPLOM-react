import React, { useEffect, useRef, useState } from "react";
import { changeWidth, drawMask, loadImage } from "./SettingbarButtonsLogic";
import { changeColor } from "./SettingbarButtonsLogic";
import BarButton from "../BarButton";
import openMaskIconSrc from "../../../assets/img/openMask.svg";
import openImageIconSrc from "../../../assets/img/open.svg";
import "../../../styles/settingbar.scss";
const SettingBar = () => {
  const imageRef = useRef();
  const maskRef = useRef();
  const [imageName, setImageName] = useState("");
  const [maskName, setMaskName] = useState("");

  useEffect(() => {}, [imageName]);

  const openImageButton = () => {
    imageRef.current.click();
  };

  const openMaskButton = () => {
    maskRef.current.click();
  };

  return (
    <div className="setting-bar">
      <label htmlFor="line-width" className="line__width">
        Толщина линии
      </label>
      <input
        onChange={(e) => {
          changeWidth(e);
        }}
        style={{ margin: "0 10px" }}
        id="line-width"
        type="range"
        defaultValue={1}
        min={1}
        max={50}
      />
      <input
        style={{ margin: "0 10px" }}
        type="color"
        onChange={(e) => changeColor(e)}
      />

      <input
        ref={imageRef}
        id="image-input"
        type="file"
        name="name"
        accept="image/png, image/jpeg"
        onChange={(e) => loadImage(e, setImageName)}
      />
      <input
        ref={maskRef}
        id="mask-input"
        type="file"
        name="name"
        accept="application/JSON"
        onChange={(e) => drawMask(e, setMaskName)}
      />

      <BarButton
        name="openImage"
        onClick={openImageButton}
        src={openImageIconSrc}
      />
      <label htmlFor="line-width" className="line__width">
        Открыть изображение <br />
        {imageName}
      </label>
      <BarButton
        name="openMask"
        onClick={openMaskButton}
        src={openMaskIconSrc}
      />

      <label htmlFor="line-width" className="line__width">
        Вставить маску <br />
        {maskName}
      </label>
    </div>
  );
};

export default SettingBar;
