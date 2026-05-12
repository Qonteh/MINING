"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const minerals = [
  {
    name: "Tanzanite",
    quality: "Premium Quality",
    image: "/images/amethyst.jpg",
    origin: "Tanzania",
  },
  {
    name: "Gold Ore",
    quality: "Pure & Refined",
    image: "/images/gold-ore.jpg",
    origin: "East Africa",
  },
  {
    name: "Quartz",
    quality: "High Grade",
    image: "/images/quartz.jpg",
    origin: "Tanzania",
  },
  {
    name: "Sapphire",
    quality: "Natural & Premium",
    image: "/images/sapphire.jpg",
    origin: "East Africa",
  },
  {
    name: "Emerald",
    quality: "High Concentrate",
    image: "/images/emerald.jpg",
    origin: "Tanzania",
  },
]

export function Minerals() {
  return (
    <section id="minerals" className="py-24 relative overflow-hidden bg-secondary">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-primary font-semibold tracking-widest text-sm mb-4">
              OUR MINERALS
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground">
              PREMIUM MINERALS.
              <br />
              <span className="text-primary">GLOBAL DEMAND.</span>
            </h2>
          </div>
          <Button asChild className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground self-start md:self-auto group transition-all duration-300">
            <Link href="#contact">
              <span>View All Minerals</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </Button>
        </div>

        {/* Minerals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {minerals.map((mineral, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-secondary-foreground/5 border border-secondary-foreground/10 hover:border-primary/40 transition-all duration-500 card-hover"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={mineral.image}
                  alt={mineral.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
                
                {/* Gold shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <p className="text-primary text-xs font-bold tracking-wider">{mineral.name.toUpperCase()}</p>
                </div>
                <p className="text-secondary-foreground/70 text-xs mb-1">{mineral.quality}</p>
                <p className="text-secondary-foreground/50 text-[10px]">Origin: {mineral.origin}</p>
                <Link 
                  href="#contact"
                  className="inline-flex items-center text-xs text-secondary-foreground/60 mt-3 group-hover:text-primary transition-colors"
                >
                  VIEW DETAILS
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
