"use client";
import { useCallback, useState } from "react";
import LogoButton from "../LogoButton";
import HeaderNav from "./HeaderNav";
import SearchBar from "./SearchBar";

export default function Header() {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const handleSearch = useCallback(() => {
    setShowSearch((prev) => !prev);
  }, [setShowSearch]);

  return (
    <>
      <nav className="w-full flex relative justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <LogoButton />
          <HeaderNav handleSearch={handleSearch} />
        </div>
      </nav>
      {showSearch ? <SearchBar setShowSearch={setShowSearch} /> : null}
    </>
  );
}
