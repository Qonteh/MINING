"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Diamond } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  siteTitle?: string
}

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#minerals", label: "Our Minerals" },
  { href: "#services", label: "Services" },
  { href: "#global", label: "Global Reach" },
  { href: "#contact", label: "Contact" },
]

export function Header({ siteTitle }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const brandName = siteTitle?.split('|')[0]?.trim() || "GEMORA"

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/10" 
        : "bg-gradient-to-b from-background/80 to-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Diamond className="h-9 w-9 text-primary group-hover:text-accent transition-colors duration-300" />
              <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground tracking-wide">{brandName.toUpperCase()}</span>
              <span className="text-[10px] text-muted-foreground tracking-[0.25em] -mt-0.5">INTERNATIONAL</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-11 relative overflow-hidden group">
              <Link href="#contact">
                <span className="relative z-10 font-semibold">Get in Touch</span>
                <span className="ml-2 relative z-10 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="bg-background/98 backdrop-blur-md border-t border-border">
          <div className="flex flex-col py-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border-b border-border/50 last:border-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                Get in Touch
                <span className="ml-2">→</span>
              </Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
