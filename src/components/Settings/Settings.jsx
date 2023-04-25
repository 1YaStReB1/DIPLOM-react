import React from "react";
import "../../styles/Settings/settings.scss";

const Settings = () => {
  return (
    <div className="settings">
      <div className="btn__settings">
        <div className="name">Открыть следующее изображение и сохранить маску текущего</div>
        <div className="key">F</div>
      </div>
      <div className="btn__settings">
        <div className="name">Сохранить маску</div>
        <div className="key">S</div>
      </div>
      <div className="btn__settings">
        <div className="name">Сохранить изображение</div>
        <div className="key">C</div>
      </div>
      <div className="btn__settings">
        <div className="name">Нарисовать фигуры</div>
        <div className="key">V</div>
      </div>
      <div className="btn__settings">
        <div className="name">Очистить массив фигур</div>
        <div className="key">D</div>
      </div>
      <div className="btn__settings">
        <div className="name">Шаг назад</div>
        <div className="key">Ctrl + Z</div>
      </div>
      <div className="btn__settings">
        <div className="name">Шаг вперёд</div>
        <div className="key">Ctrl + X</div>
      </div>
    </div>
  );
};

export default Settings;
