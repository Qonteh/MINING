// Site configuration - This stores all editable content for the landing page
// In production, this would be stored in a database

export interface HeroContent {
  subtitle: string;
  title1: string;
  title2: string;
  description: string;
  button1Text: string;
  button1Link: string;
  button2Text: string;
  button2Link: string;
  badgeText1: string;
  badgeText2: string;
  yearsText: string;
  yearsNumber: string;
  heroImage: string;
}

export interface AboutContent {
  subtitle: string;
  title1: string;
  title2: string;
  description: string;
  buttonText: string;
  aboutImage: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface Mineral {
  id: string;
  name: string;
  quality: string;
  image: string;
  origin: string;
  isVisible: boolean;
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  isVisible: boolean;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  subtitle: string;
  title: string;
  description: string;
}

export interface StatsItem {
  id: string;
  icon: string;
  value: string;
  label: string;
  sublabel: string;
}

export interface GlobalReachContent {
  subtitle: string;
  title1: string;
  title2: string;
  description: string;
  stats: {
    value: string;
    label: string;
  }[];
}

export interface SocialLink {
  platform: string;
  url: string;
  isVisible: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  isArchived: boolean;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
}

export interface SiteConfig {
  hero: HeroContent;
  about: AboutContent;
  minerals: Mineral[];
  services: Service[];
  contact: ContactInfo;
  stats: StatsItem[];
  globalReach: GlobalReachContent;
  socialLinks: SocialLink[];
  theme: ThemeConfig;
}

// Default site configuration (matches current hardcoded content)
export const defaultSiteConfig: SiteConfig = {
  hero: {
    subtitle: "GLOBAL MINERAL SOLUTIONS",
    title1: "CONNECTING MINERALS.",
    title2: "POWERING POSSIBILITIES.",
    description: "Gemora International is a trusted mineral dealer delivering premium quality minerals with integrity, reliability, and global excellence.",
    button1Text: "Explore Minerals",
    button1Link: "#minerals",
    button2Text: "About Us",
    button2Link: "#about",
    badgeText1: "RARE BY NATURE.",
    badgeText2: "VALUABLE BY TRUST.",
    yearsNumber: "15+",
    yearsText: "Years of Trust",
    heroImage: "/images/hero-mineral.jpg",
  },
  about: {
    subtitle: "ABOUT GEMORA INTERNATIONAL",
    title1: "BUILT ON TRUST.",
    title2: "FOCUSED ON EXCELLENCE.",
    description: "We source, trade, and supply high-quality minerals to industries worldwide. Our commitment to ethical sourcing, quality assurance, and long-term partnerships sets us apart in the global market.",
    buttonText: "Learn More",
    aboutImage: "/images/amethyst.jpg",
    features: [
      { icon: "Leaf", title: "ETHICAL SOURCING", description: "Responsibly sourced minerals with full traceability." },
      { icon: "CheckCircle", title: "QUALITY ASSURED", description: "Rigorous quality control for international standards." },
      { icon: "Truck", title: "RELIABLE SUPPLY", description: "Consistent supply chain and on-time global delivery." },
    ],
  },
  minerals: [
    { id: "1", name: "Tanzanite", quality: "Premium Quality", image: "/images/amethyst.jpg", origin: "Tanzania", isVisible: true },
    { id: "2", name: "Gold Ore", quality: "Pure & Refined", image: "/images/gold-ore.jpg", origin: "East Africa", isVisible: true },
    { id: "3", name: "Quartz", quality: "High Grade", image: "/images/quartz.jpg", origin: "Tanzania", isVisible: true },
    { id: "4", name: "Sapphire", quality: "Natural & Premium", image: "/images/sapphire.jpg", origin: "East Africa", isVisible: true },
    { id: "5", name: "Emerald", quality: "High Concentrate", image: "/images/emerald.jpg", origin: "Tanzania", isVisible: true },
  ],
  services: [
    { id: "1", icon: "Search", title: "Mineral Sourcing", description: "Expert sourcing from verified mines with complete documentation and origin certification.", isVisible: true },
    { id: "2", icon: "Shield", title: "Quality Assurance", description: "Rigorous testing and certification to meet international quality standards.", isVisible: true },
    { id: "3", icon: "Truck", title: "Global Logistics", description: "Efficient worldwide shipping with real-time tracking and secure handling.", isVisible: true },
    { id: "4", icon: "FileText", title: "Documentation", description: "Complete export documentation, certificates of origin, and compliance paperwork.", isVisible: true },
    { id: "5", icon: "Package", title: "Custom Packaging", description: "Specialized packaging solutions tailored to mineral type and destination requirements.", isVisible: true },
    { id: "6", icon: "Headphones", title: "24/7 Support", description: "Dedicated support team available around the clock for all your inquiries.", isVisible: true },
  ],
  contact: {
    phone: "+255 738 040 423",
    email: "info@gemoraminerals.com",
    address: "Dar es Salaam, Tanzania",
    subtitle: "LET'S DO GREAT THINGS TOGETHER",
    title: "GET IN TOUCH",
    description: "Ready to source premium minerals for your business? Get in touch with our team and let us help you find the perfect solution.",
  },
  stats: [
    { id: "1", icon: "Globe2", value: "20+", label: "COUNTRIES", sublabel: "SERVED" },
    { id: "2", icon: "Package", value: "100+", label: "MINERAL", sublabel: "PRODUCTS" },
    { id: "3", icon: "Users", value: "500+", label: "TRUSTED", sublabel: "CLIENTS" },
    { id: "4", icon: "Award", value: "100%", label: "QUALITY", sublabel: "COMMITMENT" },
  ],
  globalReach: {
    subtitle: "GLOBAL REACH",
    title1: "DELIVERING VALUE",
    title2: "ACROSS THE WORLD.",
    description: "With a strong global network, we connect quality minerals from reliable sources to industries that build the future. From our base in Tanzania, we reach every corner of the globe.",
    stats: [
      { value: "6", label: "Continents Covered" },
      { value: "50+", label: "Partner Companies" },
      { value: "24/7", label: "Global Support" },
      { value: "15+", label: "Years Experience" },
    ],
  },
  socialLinks: [
    { platform: "Facebook", url: "#", isVisible: true },
    { platform: "Twitter", url: "#", isVisible: true },
    { platform: "LinkedIn", url: "#", isVisible: true },
    { platform: "Instagram", url: "#", isVisible: true },
  ],
  theme: {
    primaryColor: "oklch(0.62 0.16 70)",
    secondaryColor: "oklch(0.18 0.04 250)",
    accentColor: "oklch(0.75 0.13 75)",
    fontHeading: "Inter",
    fontBody: "Inter",
  },
};

// Demo messages for contact form
export const demoMessages: ContactMessage[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    message: "I am interested in purchasing Tanzanite for our jewelry business. Could you provide pricing for bulk orders?",
    createdAt: "2024-01-15T10:30:00Z",
    isRead: true,
    isArchived: false,
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.garcia@mining.co",
    message: "We are looking for a reliable supplier of Gold Ore. Please send us your catalog and certifications.",
    createdAt: "2024-01-14T14:20:00Z",
    isRead: true,
    isArchived: false,
  },
  {
    id: "3",
    name: "Ahmed Hassan",
    email: "ahmed@gemstones.ae",
    message: "Interested in establishing a long-term partnership for sapphire supply to UAE market.",
    createdAt: "2024-01-13T09:15:00Z",
    isRead: false,
    isArchived: false,
  },
  {
    id: "4",
    name: "Sarah Chen",
    email: "sarah.chen@industrial.com",
    message: "Need quotation for industrial-grade quartz crystals. Monthly requirement: 500kg.",
    createdAt: "2024-01-12T16:45:00Z",
    isRead: false,
    isArchived: false,
  },
  {
    id: "5",
    name: "David Miller",
    email: "d.miller@exports.uk",
    message: "Requesting information about your emerald collection and shipping options to UK.",
    createdAt: "2024-01-11T11:00:00Z",
    isRead: false,
    isArchived: false,
  },
];
