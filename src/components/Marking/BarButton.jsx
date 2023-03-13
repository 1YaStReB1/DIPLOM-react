import React, { useEffect, useState } from "react";
import { Icon } from "../../helpers/Icon";
import "../../styles/btn.scss";
const BarButton = ({ name, onClick, src, tooltipText }) => {
  const [hover, setHover] = useState(false);
  const [tooltipStyle, setTooltiptyle] = useState('none')
  const [coordinate, steCoordinate] = useState({X:0, Y:0})
  const handleMouseIn = (e) => {
     setHover(true);
     let x =  window.innerWidth < e.pageX + 150 ? e.pageX - 120 : e.pageX + 15
     steCoordinate({X: x, Y: e.pageY + 15})
  };
  const handleMouseOut = (e) => {
    setHover(false);
  };

  useEffect(() => {
    const style =  hover ? 'block' : 'none'
    
    const timer = setTimeout(() => { setTooltiptyle(style)},1000)
  
    return () => clearTimeout(timer);
  }, [hover])
  

  return (
    <>
      <button
        id={name}
        className={`${name} btn`}
        onMouseOver={(e) => handleMouseIn(e)}
        onMouseOut={(e) => handleMouseOut(e)}
        onClick={(e) => onClick(e)}
      >
        <Icon src={src} name={name} />
      </button>
        {tooltipText && <div  className="tooltip" style={{display: tooltipStyle, top: coordinate.Y, left: coordinate.X }}>{tooltipText}</div>}
      
    </>
  );
};

export default BarButton;
