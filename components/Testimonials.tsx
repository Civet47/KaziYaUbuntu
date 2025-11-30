
import React from 'react';
import { Testimonial } from '../types';

const testimonialData: Testimonial[] = [
  {
    quote: "Debate taught me that my voice matters. Before this program, I was too shy to speak up in class. Now, I have the confidence to share my ideas and stand up for what I believe in.",
    name: "Maria S.",
    role: "10th Grade Student",
    imageUrl: "https://picsum.photos/100/100?image=1027",
  },
  {
    quote: "I've seen a remarkable transformation in my students who participate. They are more engaged, their arguments are more structured, and their overall academic performance has improved.",
    name: "Mr. David Chen",
    role: "High School Teacher",
    imageUrl: "https://picsum.photos/100/100?image=1005",
  },
  {
    quote: "As a parent, all you want is for your child to have the best opportunities. This program gave my son skills that will last a lifetime, and it didn't cost us a thing. We're so grateful.",
    name: "Angela R.",
    role: "Parent",
    imageUrl: "https://picsum.photos/100/100?image=1025",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-brand-blue text-white rounded-lg p-8 shadow-2xl flex flex-col items-center text-center h-full">
        <img src={testimonial.imageUrl} alt={testimonial.name} className="w-24 h-24 rounded-full mb-6 border-4 border-brand-gold object-cover" />
        <p className="text-lg italic mb-6 text-brand-light flex-grow">"{testimonial.quote}"</p>
        <div>
            <p className="font-bold text-xl text-white">{testimonial.name}</p>
            <p className="text-brand-gold">{testimonial.role}</p>
        </div>
    </div>
);

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-blue">Voices from Our Community</h2>
          <p className="text-lg text-gray-700 mt-2 max-w-2xl mx-auto">Hear directly from the students, educators, and families we serve.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonialData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
