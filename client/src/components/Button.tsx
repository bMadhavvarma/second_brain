import type { ReactElement } from "react";

interface ButtonProps {
  text: string;
  startIcon: ReactElement;
  varient: "primary" | "secondary";
  onClick?: () => void;
}

const variantProps = {
  primary: "bg-blue-700 text-white hover:bg-blue-800",
  secondary: "bg-blue-200 text-blue-700 hover:bg-blue-300",
};

const defaultStyles =
  "px-6 py-2 rounded-md w-46 cursor-pointer flex items-center font-normal transition";

const Button = ({ text, startIcon, varient, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${variantProps[varient]} ${defaultStyles}`}
    >
      <div className="pr-3">{startIcon}</div>
      {text}
    </button>
  );
};

export default Button;
