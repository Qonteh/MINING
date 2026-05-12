import { Search, Shield, Truck, FileText, Package, Headphones } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Mineral Sourcing",
    description: "Expert sourcing from verified mines with complete documentation and origin certification.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous testing and certification to meet international quality standards.",
  },
  {
    icon: Truck,
    title: "Global Logistics",
    description: "Efficient worldwide shipping with real-time tracking and secure handling.",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Complete export documentation, certificates of origin, and compliance paperwork.",
  },
  {
    icon: Package,
    title: "Custom Packaging",
    description: "Specialized packaging solutions tailored to mineral type and destination requirements.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support team available around the clock for all your inquiries.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/50 to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-primary font-semibold tracking-widest text-sm mb-4">
            OUR SERVICES
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            COMPREHENSIVE
            <br />
            <span className="text-gold-gradient">MINERAL SOLUTIONS</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From sourcing to delivery, we provide end-to-end services to ensure your mineral supply chain runs smoothly.
          </p>
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8" />
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/40 transition-all duration-300 card-hover relative overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="p-4 bg-primary/10 rounded-2xl w-fit mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                
                {/* Bottom line accent */}
                <div className="h-0.5 w-12 bg-primary/30 rounded-full mt-6 group-hover:w-full group-hover:bg-primary/50 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
