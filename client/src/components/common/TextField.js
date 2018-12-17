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
  link,
  inputType,
  rows
}) => {
  const InputType = `${inputType}`;
  return (
    <div className="form-group">
      <InputType
        rows={rows ? rows : null}
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      {info && (
        <small className="form-text text-muted">
          {info}{" "}
          <a href={link} target="_blank" rel="noopener noreferrer">
            Gravatar
          </a>
        </small>
      )}
      {error && <div className="invalid-feedback">{error}</div>}
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
  disabled: PropTypes.string
};

TextField.defaultProps = {
  type: "text"
};
