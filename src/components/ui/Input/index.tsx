import React from "react";
import { theme } from "../../../theme";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, error, required, fullWidth = true, id, ...props }) => {
  return (
    <div
      className={fullWidth ? "input-group" : "not-full-width"}
    >
      {label && (
        <label
          htmlFor={id}
          className="label"
        >
          {label}
          {" "}
          {required && (
            <span style={{ color: theme.palette.error.main }}>*</span>
          )}
        </label>
      )}
      <input
        id={id}
        className="input"
        {...props}
      />
      <span
        className="error-text"
        style={{ color: theme.palette.error.main }}
      >
        {error || ""}
      </span>
    </div>
  );
};
