import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CarList from './components/CarList'
import ContactInfo from './components/ContactInfo'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <CarList />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  )
}

export default App

