import React from "react";
import PropTypes from "prop-types";
import { ButtonLoadMore } from "./Button.styled";

export default function Button({
  children,
  disabled,
  active,
  onClick,
  ...attrs
}) {
  return (
    <ButtonLoadMore {...attrs} disabled={disabled} onClick={onClick}>
      {children}
    </ButtonLoadMore>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

Button.defaultProps = {
  children: "Default button",
  onClick: () => {},
  disabled: false,
  active: false,
};
