import { Brain } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "../theme-toggle";
import { Button } from "../ui/button";

export function Headers() {
  return (
    <header className="sticky top-0 z-50 w-full glassmorphism backdrop-blur-lg border-b border-white/10 dark:border-gray-800/50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-gradient">KOLab.ai</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-primary transition-colors duration-200"
          >
            Features
          </Link>
          <Link
            href="#benefits"
            className="text-sm font-medium hover:text-primary transition-colors duration-200"
          >
            Benefits
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium hover:text-primary transition-colors duration-200"
          >
            How It Works
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium hover:text-primary transition-colors duration-200"
          >
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            className="transition-all duration-300 hover:border-primary rounded-full border-white/20 dark:border-gray-800/50"
          >
            Log in
          </Button>
          <Button
            size="sm"
            className="transition-all duration-300 hover:opacity-90 hover:scale-105 bg-gradient-brand rounded-full"
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
}
