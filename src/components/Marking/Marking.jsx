import React from "react";
import Canvas from "./Canvas";
import DontWorkMobily from "./DontWorkMobily";
import SettingBar from "./Settingbar/SettingBar";
import Toolbar from "./Toolbar/Toolbar";

const Marking = () => {
  let component =
    window.innerWidth > 800 ? (
      <>
        <Toolbar></Toolbar>
        {/* <SettingBar></SettingBar> */}
        <Canvas></Canvas>
      </>
    ) : (
      <DontWorkMobily/>
    );

  return <>{component}</>;
  
};

export default Marking;
