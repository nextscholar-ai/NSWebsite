import React from 'react';
import './OrbitingTestimonials.css';

const testimonials = [
  { id: 1, name: "Kushagra Sahay", subtitle: "Joined LinkedIn", photo: "https://i.pravatar.cc/150?img=12" },
  { id: 2, name: "Anusha Jha", subtitle: "Joined Deloitte", photo: "https://i.pravatar.cc/150?img=44" },
  { id: 3, name: "Rohit Sharma", subtitle: "Joined Amazon", photo: "https://i.pravatar.cc/150?img=11" },
  { id: 4, name: "Jessica Varma", subtitle: "Placed at Microsoft", photo: "https://i.pravatar.cc/150?img=32" },
  { id: 5, name: "Rahul Mehta", subtitle: "Joined Google", photo: "https://i.pravatar.cc/150?img=13" },
];

const OrbitingTestimonials = () => {
  return (
    <div className="orbit-scene">
      {/* Central 3D Laptop Mockup */}
      <div className="laptop-container">
        <div className="laptop-3d">
          <div className="laptop-screen">
            <div className="dsa-interface">
              <div className="dsa-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="dsa-title">Mastery Sheet v2.0</span>
              </div>
              <div className="dsa-content">
                <div className="code-line">1. Two Sum [Easy]</div>
                <div className="code-line-active">2. Add Two Numbers [Med]</div>
                <div className="code-line">3. Longest Substring...</div>
                <div className="code-line">4. Median of Two Arrays</div>
                <div className="dsa-preview">
                  <div className="preview-top">Problem Statement</div>
                  <div className="preview-body">Given an array of integers...</div>
                </div>
              </div>
            </div>
          </div>
          <div className="laptop-base"></div>
        </div>
        <div className="laptop-glow"></div>
      </div>

      {/* Orbiting Cards */}
      <div className="orbit-wrap">
        <div className="orbit-track">
          {testimonials.map((t, i) => (
            <div 
              key={t.id} 
              className="orbit-card-pos" 
              style={{ '--index': i, '--total': testimonials.length }}
            >
              <div className="testimonial-orbit-card">
                <div className="card-top">
                  <img src={t.photo} alt={t.name} className="orbit-avatar" />
                  <div className="orbit-meta">
                    <strong>{t.name}</strong>
                    <span>{t.subtitle}</span>
                  </div>
                </div>
                <p className="orbit-quote">"The mastery program transformed my approach completely. Highly recommended!"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guiding Lines */}
      <div className="orbit-line-1"></div>
      <div className="orbit-line-2"></div>
    </div>
  );
};

export default OrbitingTestimonials;
