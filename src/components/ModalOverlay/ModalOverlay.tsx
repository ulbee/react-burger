import { FC } from "react";
import ModalOverlayStyles from './ModalOverlay.module.css';

type TModalProps = {
  onClick: () => void;
}

const ModalOverlay: FC<TModalProps> = ({onClick}) => {

  return (
    <div className={ModalOverlayStyles.overlay} onClick={onClick} />
  )
}

export default ModalOverlay;
