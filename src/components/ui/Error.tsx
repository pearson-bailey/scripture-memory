import { HTMLProps } from "react";

export default function ErrorMessage({
  className,
  ...props
}: HTMLProps<HTMLParagraphElement>): JSX.Element {
  return (
    <p
      className={`mb-2 p-2 bg-black/10 text-red-600 text-center border border-red-600 font-bold whitespace-normal
        ${className}`}
      {...props}
    />
  );
}
