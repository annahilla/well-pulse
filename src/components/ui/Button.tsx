interface ButtonProps {
  children: React.ReactNode;
  textSize: "text-md" | "text-lg";
  size: "sm" | "lg";
  type: "primary" | "secondary";
  handleClick?: () => void;
}

const Button = ({
  children,
  textSize,
  size,
  type,
  handleClick,
}: ButtonProps) => {
  const basicButtonStyles = "rounded-md shadow outline-0 hover:animate-pulse";
  let btnSize;

  if (size === "sm") {
    btnSize = "px-4 py-2";
  } else if (size === "lg") {
    btnSize = "px-7 py-4";
  }

  if (type === "primary") {
    return (
      <button
        onClick={handleClick}
        className={`text-white bg-green ${btnSize} ${textSize} ${basicButtonStyles} `}
      >
        {children}
      </button>
    );
  }

  if (type === "secondary") {
    return (
      <button
      type={handleClick ? "button" : "submit"}
        onClick={handleClick}
        className={`border border-green text-green ${btnSize} ${textSize} ${basicButtonStyles}`}
      >
        {children}
      </button>
    );
  }
};

export default Button;
