"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Send } from "lucide-react"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
    alert("Thank you for your message! We will get back to you soon.")
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-muted">
      {/* Background decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold tracking-widest text-sm mb-4">
            {"LET'S DO GREAT THINGS TOGETHER"}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            GET IN <span className="text-gold-gradient">TOUCH</span>
          </h2>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div className="space-y-8">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ready to source premium minerals for your business? Get in touch with our team and let us help you find the perfect solution.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-5 group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all card-hover shadow-sm">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Phone</p>
                  <p className="text-muted-foreground">+255 738 040 423</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all card-hover shadow-sm">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Email</p>
                  <p className="text-muted-foreground">info@gemoraminerals.com</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all card-hover shadow-sm">
                <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Address</p>
                  <p className="text-muted-foreground">Dar es Salaam, Tanzania</p>
                </div>
              </div>
            </div>

            <p className="text-primary font-semibold">
              We are ready to serve your mineral needs.
            </p>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-card p-8 md:p-10 rounded-2xl shadow-xl border border-border relative overflow-hidden">
            {/* Form glow effect */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative">
              <div>
                <label className="text-xs font-semibold text-primary tracking-wider mb-2 block">YOUR NAME</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-background border-border focus:border-primary h-12"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary tracking-wider mb-2 block">YOUR EMAIL</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-background border-border focus:border-primary h-12"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-primary tracking-wider mb-2 block">YOUR MESSAGE</label>
                <Textarea
                  placeholder="Tell us about your mineral requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-base font-semibold group"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
