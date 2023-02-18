import { MiniLoader } from "../loader/loader";

import "./icon-button.scss";

interface _props {
  onClick: (event?: any) => any;
  isLoading: boolean;
  text?: string;
  icon: string;
  className?: string;
}
export function IconButton({
  onClick,
  isLoading,
  text,
  icon,
  className,
}: _props) {
  return (
    <span
      className={`icon-button ${className}`}
      title={text}
      onClick={(event) => !isLoading && onClick(event)}
    >
      {isLoading ? (
        <MiniLoader />
      ) : (
        <img src={icon} alt={text} className="button-icon" />
      )}
      <h4>{text} </h4>
    </span>
  );
}
