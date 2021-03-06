import React from 'react'
import './Button.css'

const Button = (props) => {
  return (
    <button className={`category-button ${props.activeClass}`} value={props.name} onClick={props.onClick}>{props.name}</button>
  )
}

export default Button;
