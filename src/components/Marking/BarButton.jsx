import React from 'react'
import { Icon } from '../../helpers/Icon'
import "../../styles/btn.scss"
const BarButton = ({name, onClick,src}) => {
  console.log(name,onClick)
  return (
    <button id={name} className={`${name} btn`} onClick={(e) => onClick(e)}>
      <Icon src={src} name={name}/>
  </button>
  )
}

export default BarButton