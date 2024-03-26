import Link from "next/link";

export default function LogoButton() {
  return (
    <Link
      className="py-2 px-3 flex items-center no-underline space-x-2"
      href="/"
    >
      <img
        src="/scripture-memory-logo512.png"
        width={512}
        height={512}
        alt="Scripture Memory Logo"
        className="w-12 h-12"
      />
      <span className="font-bold text-2xl text-teal-500 leading-6">
        Scripture Memory
      </span>
    </Link>
  );
}
