import React, { useState, useEffect, useCallback } from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    id: 1,
    quote: "Their ability to capture our brand essence in every project is unparalleled. Next Scholar provided my daughter with more than just math skills—they gave her a future.",
    name: "Isabella Rodriguez",
    title: "CEO and Co-founder of ABC Company",
  },
  {
    id: 2,
    quote: "The personalized attention and logic-based teaching transformed my son's approach to learning. He went from struggling to top of his class in just one term.",
    name: "Dr. Marcus Thorne",
    title: "Senior Research Fellow",
  },
  {
    id: 3,
    quote: "A truly modern approach to education. The glassmorphic interface is just the tip of the iceberg; the actual curriculum is deep, rigorous, and inspiring.",
    name: "Sophia Henderson",
    title: "Director of Innovation, EdTech Lab",
  },
  {
    id: 4,
    quote: "My English writing skills improved drastically. Feedback was the key to my success in exams! The mentors here are world-class.",
    name: "Emily Rodriguez",
    title: "Scholar Excellence Award Recipient",
  },
  {
    id: 5,
    quote: "Foundation Mastery is the best investment we made for our twins. They are now confident learners who actually enjoy solving complex physics problems.",
    name: "Jameson Clarke",
    title: "Managing Partner, Clarke & Co.",
  },
  {
    id: 6,
    quote: "Next Scholar didn't just teach me science; they taught me how to think. This program is essential for any student looking to excel in the 21st century.",
    name: "Alina Petrova",
    title: "Post-Graduate Scholar",
  }
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // Auto-scroll every 4 seconds
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section className="testimonials-section-premium" id="testimonials">
      <div className="section-header-modern">
        <h2 className="header-praise">Words of praise from others about our presence.</h2>
      </div>

      <div 
        className="carousel-container-premium"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button className="nav-arrow-btn prev-arrow" onClick={prevSlide} aria-label="Previous">
          <span className="arrow-icon">&#10229;</span>
        </button>

        <div className="carousel-viewport">
          <div 
            className="carousel-rail" 
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((item) => (
              <div key={item.id} className="testimonial-card-slide">
                <div className="glass-card-premium">
                  <div className="glass-card-inner">
                    <p className="testimonial-quote">"{item.quote}"</p>
                    <div className="testimonial-author-block">
                      <div className="author-name-premium">{item.name}</div>
                      <div className="author-title-premium">{item.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="nav-arrow-btn next-arrow" onClick={nextSlide} aria-label="Next">
          <span className="arrow-icon">&#10230;</span>
        </button>
      </div>

      <div className="carousel-indicators-modern">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`indicator-dot-modern ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
