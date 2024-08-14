import React from 'react';
import ReactDOM from 'react-dom';
import './modal.scss'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

const Modal = ({ isShowing, close, children }) => {

    return isShowing ? ReactDOM.createPortal(
            <div
                onClick={close}
                className="Modal_overlay">
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="Modal_content">
                    <CloseIcon
                        role="button"
                        onClick={close}
                        className="Modal_content_close-icon" />
                    {children}
                </div>
            </div>,
            document.getElementById('modal')
        )
        : null;
};

export default Modal;
