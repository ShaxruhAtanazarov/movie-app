import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { VscClose } from "react-icons/vsc";

// importing styles
import "./Modal.scss";

const Modal = (props) => {
  const { active, children, id } = props;

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  return (
    <div id={id} className={`modal ${isActive ? "active" : ""}`}>
      {children}
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

const ModalContent = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    if (props.onClose) props.onClose();
  };

  return (
    <div className="modal__content" ref={contentRef}>
      {props.children}
      <div className="modal__content-close" onClick={closeModal}>
        <VscClose />
      </div>
    </div>
  );
};

ModalContent.propTypes = {
  onClose: PropTypes.func,
};

export { Modal, ModalContent };
