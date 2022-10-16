import React from "react";
import PropTypes from 'prop-types';
import ModalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay({onClick}) {

  return (
    <div className={ModalOverlayStyles.overlay} onClick={onClick} />
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default ModalOverlay;
