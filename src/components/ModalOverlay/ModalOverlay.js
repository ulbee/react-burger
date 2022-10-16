import React from "react";
import ModalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay({onClick}) {

  return (
    <div className={ModalOverlayStyles.overlay} onClick={onClick} />
  )
}

export default ModalOverlay;
