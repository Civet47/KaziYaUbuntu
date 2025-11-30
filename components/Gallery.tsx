import React, { useState } from 'react';

const galleryImages = [
  {
    src: 'https://picsum.photos/800/500?image=10',
    caption: 'Students collaborating during a pre-tournament workshop.',
  },
  {
    src: 'https://picsum.photos/800/500?image=20',
    caption: 'A passionate speaker delivering a powerful closing argument.',
  },
  {
    src: 'https://picsum.photos/800/500?image=30',
    caption: 'Celebrating a well-deserved win at the regional championships.',
  },
  {
    src: 'https://picsum.photos/800/500?image=40',
    caption: 'Mentors providing one-on-one feedback and guidance.',
  },
  {
    src: 'https://picsum.photos/800/500?image=50',
    caption: 'The joy of teamwork and shared success after a tough round.',
  },
];

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === galleryImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section id="gallery" className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-blue">Our Community in Action</h2>
          <p className="text-lg text-gray-700 mt-2 max-w-2xl mx-auto">
            A glimpse into the moments of learning, competition, and growth that define our program.
          </p>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="overflow-hidden rounded-lg shadow-2xl">
            <div
              className="flex transition-transform ease-in-out duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.caption}
                  className="w-full flex-shrink-0"
                />
              ))}
            </div>
          </div>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition-colors focus:outline-none"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition-colors focus:outline-none"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="text-center mt-4 p-4 bg-white rounded-lg shadow-md">
            <p className="text-gray-800 font-medium">{galleryImages[currentIndex].caption}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;