
import React from 'react';

const Hero: React.FC = () => {
    const scrollToSection = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    return (
        <section id="hero" className="relative bg-brand-blue text-white py-20 md:py-32">
            <div className="absolute inset-0">
                <img src="https://picsum.photos/1600/900?grayscale&blur=2" alt="Background of students debating" className="w-full h-full object-cover opacity-20"/>
            </div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight">
                    Unlocking Potential Through a War of Words
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-brand-light">
                    We're leveling the playing field by giving students from under-resourced communities the tools of debate to build confidence, critical thinking, and a brighter future.
                </p>
                <a href="#get-involved" onClick={scrollToSection('get-involved')} className="bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 text-lg">
                    Join Our Mission
                </a>
            </div>
        </section>
    );
};

export default Hero;
