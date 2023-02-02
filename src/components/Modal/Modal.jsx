import React, { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { OverlayModal, ModalBox } from "./Modal.styled";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.closeOnKeydown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeOnKeydown);
  }

  closeOnKeydown = (event) => {
    if (event.code === "Escape") {
      this.props.onClose();
    }
  };
  closeOnBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };
  handleKeyDown = (e) => {
    if (e.code === "ArrowLeft") {
      this.props.onLeft();
    } else if (e.code === "ArrowRight") {
      this.props.onRight();
    }
  };
  render() {
    const modalRoot = document.getElementById("modal-root");
    return createPortal(
      <OverlayModal onClick={this.closeOnBackdrop}>
        <ModalBox>{this.props.children}</ModalBox>
      </OverlayModal>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  src: PropTypes.string,
  tags: PropTypes.string,
};
