import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: 'about', label: 'Our Mission' },
    { id: 'impact', label: 'Impact' },
    { id: 'testimonials', label: 'Stories' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'get-involved', label: 'Get Involved' },
  ];

  return (
    <header className="bg-brand-blue/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-black text-white tracking-wider group" onClick={scrollToSection('hero')}>
          Jukwaa<span className="text-brand-gold inline-block transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:brightness-125">NiLako</span>
        </a>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={scrollToSection(link.id)} className="text-white hover:text-brand-gold transition-colors duration-300 font-medium">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                </svg>
            </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-brand-blue">
            <nav className="flex flex-col items-center py-4 space-y-4">
                {navLinks.map((link) => (
                    <a key={link.id} href={`#${link.id}`} onClick={scrollToSection(link.id)} className="text-white hover:text-brand-gold transition-colors duration-300 font-medium">
                        {link.label}
                    </a>
                ))}
            </nav>
        </div>
      )}
    </header>
  );
};

export default Header;