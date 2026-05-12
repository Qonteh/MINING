import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { About } from "@/components/about"
import { Minerals } from "@/components/minerals"
import { Services } from "@/components/services"
import { GlobalReach } from "@/components/global-reach"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <About />
      <Minerals />
      <Services />
      <GlobalReach />
      <Contact />
      <Footer />
    </main>
  )
}
