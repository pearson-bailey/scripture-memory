import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

const Check = () => {
  return <CheckIcon className="fill-current stroke-current w-4 h-4" />;
};

const XMark = () => {
  return <XMarkIcon className="fill-current stroke-current w-4 h-4" />;
};

export default function PasswordError({
  className,
  password,
}: {
  className?: string;
  password: string;
}): JSX.Element {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  return (
    <ul
      className={clsx(
        "mb-2 p-2 bg-black/10 text-red-600 border border-red-600 font-bold text-sm",
        className
      )}
    >
      <li
        className={clsx(
          { "text-green-600": hasMinLength },
          "flex items-center"
        )}
      >
        {hasMinLength ? <Check /> : <XMark />}
        Password must contain at least 8 characters
      </li>
      <li
        className={clsx({ "text-green-600": hasNumber }, "flex items-center")}
      >
        {hasNumber ? <Check /> : <XMark />}
        Password must contain at least 1 number
      </li>
      <li
        className={clsx(
          { "text-green-600": hasUppercase },
          "flex items-center"
        )}
      >
        {hasUppercase ? <Check /> : <XMark />}
        Password must contain at least 1 uppercase letter
      </li>
      <li
        className={clsx(
          { "text-green-600": hasLowercase },
          "flex items-center"
        )}
      >
        {hasLowercase ? <Check /> : <XMark />}
        Password must contain at least 1 lowercase letter
      </li>
    </ul>
  );
}
