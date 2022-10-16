import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalStyles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalsContainer = document.querySelector('#modals');

function Modal({ title, onClose, children }) {

  React.useEffect(() => {
    const handleEscKeydown = (e) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
    };
  }, []);

  return ReactDOM.createPortal(
    (<div className={ModalStyles.container}>
      <ModalOverlay onClick={onClose} />
      <div className={ModalStyles.modal + ' pt-10 pr-10 pl-10 pb-15'}>
        <div  className={ModalStyles.close} onClick={onClose}>
          <CloseIcon type="primary"/>
        </div>
        {title && <h3 className={ModalStyles.title + ' text text_type_main-large pt-3'}>{title}</h3>}
        {children} 
      </div>
    </div>),
    modalsContainer
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Modal;
