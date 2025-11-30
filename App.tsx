import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Impact from './components/Impact';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import GetInvolved from './components/GetInvolved';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import DebateCoach from './components/DebateCoach';

const App: React.FC = () => {
  return (
    <div className="bg-brand-light font-sans text-gray-800">
      <Header />
      <main>
        <Hero />
        <About />
        <Impact />
        <Testimonials />
        <Gallery />
        <GetInvolved />
      </main>
      <Footer />
      <BackToTopButton />
      <DebateCoach />
    </div>
  );
};

export default App;