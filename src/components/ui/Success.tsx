import { HTMLProps } from "react";

export default function SuccessMessage({
  className,
  ...props
}: HTMLProps<HTMLParagraphElement>): JSX.Element {
  return (
    <p
      className={`mb-2 p-2 bg-black/10 text-green-700 text-center border border-green-700 font-bold ${className}`}
      {...props}
    />
  );
}
