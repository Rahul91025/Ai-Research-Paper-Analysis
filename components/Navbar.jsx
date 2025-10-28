"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/research", label: "Research" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-black text-white border-b border-white/10 relative">
      {/* Subtle purple glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[100px] bg-purple-500/5 blur-[80px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center bg-white text-black font-bold text-sm transition-all duration-300 group-hover:bg-purple-500 group-hover:text-white relative">
              <div className="absolute inset-0 bg-white/20 translate-x-[2px] translate-y-[2px] -z-10 group-hover:bg-purple-500/20" />
              AI
            </div>
            <span className="text-sm font-light tracking-widest text-white uppercase transition-colors duration-300 group-hover:text-purple-500">
              AI Research Analyzer
            </span>
          </Link>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) =>
              label === "Research" ? (
                <Link
                  key={href}
                  href={href}
                  className="relative group"
                >
                  <div className="bg-white text-black hover:bg-purple-500 hover:text-white font-light text-xs tracking-widest uppercase border border-white/20 transition-all duration-300 h-10 px-6 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-white/20 translate-x-[2px] translate-y-[2px] -z-10 transition-all duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[3px] group-hover:bg-purple-500/20" />
                    {label}
                  </div>
                </Link>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="text-white/60 hover:text-white transition-colors duration-300 font-light text-xs tracking-widest uppercase px-6 h-10 flex items-center border border-transparent hover:border-white/20"
                >
                  {label}
                </Link>
              )
            )}
          </div>

          {/* Right: User Profile / Sign In */}
          <div className="flex items-center gap-2 sm:gap-4">
            <SignedIn>
              <div className="border border-white/20 p-1">
                <UserButton appearance={{ 
                  elements: { 
                    userButtonAvatarBox: "w-8 h-8",
                    userButtonBox: "border-none"
                  } 
                }} />
              </div>
            </SignedIn>

            <SignedOut>
              <Link
                href="/sign-in"
                className="hidden md:block text-white/60 hover:text-white transition-colors duration-300 font-light text-xs tracking-widest uppercase px-6 h-10 flex items-center border border-white/20 hover:border-white/40"
              >
                Sign In
              </Link>
            </SignedOut>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden w-10 h-10 text-white/60 hover:text-white transition-colors duration-300 border border-white/20 hover:border-white/40 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                {open ? (
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-white/10 py-4 sm:py-6 space-y-1">
            {navLinks.map(({ href, label }) =>
              label === "Research" ? (
                <Link
                  key={href}
                  href={href}
                  className="block relative group"
                >
                  <div className="bg-white text-black hover:bg-purple-500 hover:text-white font-light text-xs tracking-widest uppercase border border-white/20 transition-all duration-300 h-12 px-6 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-white/20 translate-x-[2px] translate-y-[2px] -z-10 group-hover:bg-purple-500/20" />
                    {label}
                  </div>
                </Link>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="block px-6 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 font-light text-xs tracking-widest uppercase border border-transparent hover:border-white/20"
                >
                  {label}
                </Link>
              )
            )}

            {/* Mobile profile */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <SignedIn>
                <div className="flex items-center justify-center p-2 border border-white/20">
                  <UserButton appearance={{ 
                    elements: { 
                      userButtonAvatarBox: "w-8 h-8",
                      userButtonBox: "border-none"
                    } 
                  }} />
                </div>
              </SignedIn>
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="block px-6 py-3 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 font-light text-xs tracking-widest uppercase border border-white/20 hover:border-white/40 text-center"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}