import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

export const TextField = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  handleChange,
  disabled,
  inputType,
  rows,
  autoComplete
}) => {
  const InputType = `${inputType}`;
  return (
    <div className="form-group">
      <InputType
        rows={rows ? rows : null}
        type={type}
        className={classnames("form-control form-control-lg mb-0", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        autoComplete={
          autoComplete !== null || autoComplete !== undefined
            ? autoComplete
            : null
        }
      />
      {info && <small className="form-text text-muted">{info} </small>}
      {error && <div className="invalid-feedback text-center">{error}</div>}
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

TextField.defaultProps = {
  type: "text"
};
