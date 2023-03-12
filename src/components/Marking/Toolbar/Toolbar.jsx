import React from "react";
import "../../../styles/toolbar.scss";
import { data } from "./data";
import BarButton from "../BarButton";

const Toolbar = () => {
  return (
    <div className="toolbar">
      {Object.keys(data).map((name) => {
        return (
          <BarButton
            key={name}
            name={name}
            onClick={data[name][0]}
            src={data[name][1]}
          />
        );
      })}
    </div>
  );
};

export default Toolbar;
