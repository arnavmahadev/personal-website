import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Interests from '@/components/Interests'
import Coursework from '@/components/Coursework'
import Adventures from '@/components/Adventures'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Coursework />
      <Interests />
      <Adventures />
      <Contact />
      <Footer />
    </main>
  )
}
