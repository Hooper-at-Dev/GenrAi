"use client";
import React, { useState } from "react";
// import { HoveredLink, Menu, MenuItem, ProductItem } from "../ui/navbar-menu";
import { HoveredLink, Menu, MenuItem } from "./ui/navbar-menu";
import { cn } from "../utils/utils";
import Link from "next/link";
function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href="/"><MenuItem setActive={setActive} active={active} item="Home"></MenuItem></Link>
        <MenuItem setActive={setActive} active={active} item="About Us">
          <div className="flex flex-col space-y-4 text-sm hover:text-red-600">
            <HoveredLink href="/creator-info">Creator Info</HoveredLink>
            <HoveredLink href="/dataset-info">DataSet Info</HoveredLink>
            <HoveredLink href="/model-data">Model Ifno</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Navbar;
