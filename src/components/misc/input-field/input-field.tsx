import { forwardRef } from "react";
import { useState } from "react";
import "./input-field.scss";

interface _props {
  type: string;
  label: string;
}

export const InputField = forwardRef<HTMLInputElement, _props>(
  ({ type, label }, ref) => {
    const [passwordShown, setPasswordShown] = useState(false);

    return (
      <div className="input-field">
        <label className="label" htmlFor={label}>
          {label}
        </label>
        {type === "password" ? (
          <>
            <input
              className="input"
              type={passwordShown ? "text" : "password"}
              title={label}
              name={label}
              ref={ref}
            />
            <div className="checkbox">
              <label className="label">Show Password</label>
              <input
                type="checkbox"
                onChange={(value) => {
                  setPasswordShown(() => value.target.checked);
                }}
              />
            </div>
          </>
        ) : (
          <input
            className="input"
            ref={ref}
            type={type}
            title={label}
            name={label}
            autoComplete="on"
          />
        )}
      </div>
    );
  }
);

export default InputField;
