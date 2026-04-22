import React, { useState, useEffect } from 'react';
import './SuccessFeed.css';
import { client } from './sanityClient';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source).url();

const SuccessFeed = ({ testimonials }) => {
  const [highlightedId, setHighlightedId] = useState(null);

  const stories = testimonials && testimonials.length > 0 ? testimonials : [];

  useEffect(() => {
    if (stories.length === 0) return;
    
    // Set initial highlighted ID
    if (!highlightedId) setHighlightedId(stories[0]._id);

    const interval = setInterval(() => {
      setHighlightedId((prev) => {
        const currentIndex = stories.findIndex(s => s._id === prev);
        const nextIndex = (currentIndex + 1) % stories.length;
        return stories[nextIndex]._id;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [stories, highlightedId]);

  if (stories.length === 0) return null;

  return (
    <div className="success-feed-scene">
      <div className="feed-container">
        <div className="scroll-mask">
          <div className="feed-track">
            {/* Double the list for infinite scroll */}
            {[...stories, ...stories].map((story, index) => {
              // Map Sanity fields to local names
              const name = story.studentName || story.name;
              const title = story.studentTitle || story.subtitle || story.title;
              const photo = story.studentPhoto || story.photo;
              const quote = story.reviewText || story.quote;
              
              return (
                <div 
                  key={`${story._id}-${index}`} 
                  className={`success-card ${highlightedId === story._id ? 'spotlight' : ''}`}
                >
                  <div className="quote-mark">“</div>
                  
                  <div className="card-quote-section">
                    <span className="quote-highlight">Top Performer</span>
                    <p className="main-quote">{quote}</p>
                  </div>

                  <div className="card-separator"></div>

                  <div className="card-profile-section">
                    {photo ? (
                      <img src={urlFor(photo)} alt={name} className="user-avatar" />
                    ) : (
                      <div className="user-avatar-placeholder">
                        {name ? name.split(' ').map(n => n[0]).join('') : 'NS'}
                      </div>
                    )}
                    <div className="user-info">
                      <span className="user-name">{name}</span>
                      <span className="user-badge">{title || 'Next Scholar Alum'}</span>
                    </div>
                  </div>

                  <div className="card-footer-section">
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="star">★</span>
                      ))}
                    </div>
                    <span className="footer-quote">“Excellence in learning.”</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessFeed;
