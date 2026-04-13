import React, { useState, useEffect, useCallback } from 'react';
import './HeroTestimonialCards.css';
import { client } from './sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const HeroTestimonialCards = ({ testimonials }) => {
  const [current, setCurrent] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsToShow(1);
      else if (window.innerWidth < 1200) setItemsToShow(2);
      else setItemsToShow(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = testimonials && testimonials.length > 0 ? testimonials : [];
  const totalSlides = Math.max(1, Math.ceil(data.length / itemsToShow));

  const nextSlide = useCallback(() => {
    if (totalSlides > 1) {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }
  }, [totalSlides]);

  const prevSlide = () => {
    if (totalSlides > 1) {
      setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  useEffect(() => {
    if (data.length <= itemsToShow) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [nextSlide, data.length, itemsToShow]);

  if (!data || data.length === 0) return null;

  return (
    <div className="hero-testimonials-wrapper" id="testimonials">

      
      {data.length > itemsToShow && (
        <div className="carousel-controls">
          <button className="nav-arrow prev" onClick={prevSlide}>&larr;</button>
          <button className="nav-arrow next" onClick={nextSlide}>&rarr;</button>
        </div>
      )}

      <div className="carousel-window">
        <div 
          className="carousel-track" 
          style={{ transform: `translateX(-${current * (100 / totalSlides)}%)` }}
        >
          {data.map((item, idx) => (
            <div key={item._id || idx} className="testimonial-card-outer" style={{ width: `${100 / (data.length / itemsToShow)}%` }}>
              <div className="glass-card-modern">
                <div className="card-header-modern">
                  {item.photo && (
                    <img 
                      src={urlFor(item.photo)} 
                      alt={item.name} 
                      className="avatar-small" 
                    />
                  )}
                  <div className="author-info">
                    <h4 className="author-name">{item.name}</h4>
                    <span className="author-badge">{item.title}</span>
                  </div>
                </div>
                <div className="rating-row-mini">★★★★★</div>
                <p className="testimonial-text-short">"{item.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <div className="carousel-dots-modern">
          {[...Array(totalSlides)].map((_, i) => (
            <button 
              key={i} 
              className={`dot-modern ${current === i ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroTestimonialCards;
