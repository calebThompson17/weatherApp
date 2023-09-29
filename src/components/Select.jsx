import React from "react";
import PropTypes from "prop-types";

const Select = ({
  name,
  id,
  options,
  value,
  label,
  onChange,
  className,
  required,
  disabled,
  error,
  dataCy
}) => {
  return (
    <div
      className={className ? `select select--${className}` : "select"}
      data-cy={dataCy || ""}
    >
      {label && (
        <div>
          <label
            id={`${id}-label`}
            htmlFor={id}
            className={
              className
                ? `select__label select--${className}__label`
                : "select__label"
            }
          >
            {label}
            {required && <span className="select__label-required">*</span>}
            {error && error.length > 0 && (
              <span className="select__label-error">{error}</span>
            )}
          </label>
          <br />
        </div>
      )}

      <select
        name={name}
        id={id}
        value={value}
        aria-labelledby={`${id}-label`}
        className={
          className
            ? `select__input select--${className}__input`
            : "select__input"
        }
        onChange={onChange}
        aria-required={required || false}
        disabled={disabled || false}
      >
        {options && options.map((option, index) => {
          return (
            <option 
              key={index}
              value={typeof option === 'string' ? option : option.value}
              label={typeof option === 'string' ? option : option.value}
            >
              {/* {option.label || option} */}
              {typeof option === 'string' ? option : option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

Select.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  dataCy: PropTypes.string
};

export default Select;
