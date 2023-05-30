import React, { useEffect, useRef, useState } from "react";
import {
  changeWidth,
  convertMaskToJson,
  drawMask,
  loadImage,
} from "./SettingbarButtonsLogic";
import { changeColor } from "./SettingbarButtonsLogic";
import BarButton from "../BarButton";
import openMaskIconSrc from "../../../assets/img/openMask.svg";
import openImageIconSrc from "../../../assets/img/open.svg";
import convertIconSrc from "../../../assets/img/convert.svg";
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

  const options = [
    {value: 'sortPointsDFS', text: 'По векторам'},
    {value: 'sortPointsBFS', text: 'В ширину'},
    {value: 'obrMass', text: 'По границе'},
    {value: 'grahamAlgorithm', text: 'Грэхэма'}
  ];

  const [selected, setSelected] = useState(options[0].value);

  const selectAlgoritm = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };
  return (
    <div className="setting-bar">
      {/* <label htmlFor="line-width" className="line__width">
        Толщина линии
      </label> */}
      <input
        onChange={(e) => {
          changeWidth(e);
        }}
        
        id="line-width"
        type="range"
        defaultValue={1}
        min={1}
        max={30}
      />
      <input
        style={{ margin: "0 8px" }}
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
      <BarButton
        name="openMask"
        onClick={(e) => {convertMaskToJson(selected)}}
        src={convertIconSrc}
      />


    <div className="select-wrapper">
        <select className="algoritms" value={selected} onChange={selectAlgoritm}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SettingBar;
