import React, { useState, useEffect } from 'react';
import './EnquiryForm.css';

const EnquiryForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredTime: 'Morning',
    gender: 'Male',
    currentClass: 'Class 1',
    boardOfEducation: 'CBSE'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getFormattedMessage = () => {
    const timestamp = new Date().toLocaleString();
    return `NEW ADMISSION ENQUIRY
Ref: ${timestamp}

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Time: ${formData.preferredTime}
Gender: ${formData.gender}
Class: ${formData.currentClass}
Board: ${formData.boardOfEducation}`.trim();
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(getFormattedMessage());
    window.open(`https://wa.me/918999099921?text=${text}`, '_blank');
  };
  const [status, setStatus] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    if (window.emailjs) {
      window.emailjs.init("_oyajexjvM3S0LZ0E"); // Replace with your Public Key
    }
  }, []);


  const handleEmail = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!formData.name || !formData.email || !formData.phone) {
      setStatus('Please fill in all required fields.');
      return;
    }

    // 2. Loading State
    setStatus('Sending your enquiry...');

    try {
      // 3. Send using EmailJS
      const result = await window.emailjs.send(
        "service_fd16f58",   // Replace with your Service ID
        "template_ectpnt9",  // Replace with your Template ID
        {
          name: formData.name,              // matches {{name}}
          email: formData.email,            // matches {{email}}
          phone: formData.phone,            // matches {{phone}}
          time_to_call: formData.preferredTime,  // matches {{time_to_call}}
          gender: formData.gender,          // matches {{gender}}
          class: formData.currentClass,     // matches {{class}}
          board: formData.boardOfEducation  // matches {{board}}
        }
      );

      console.log('EmailJS Success:', result.text);
      setStatus('Success! Your enquiry has been sent.');

      // Auto-clear success message
      setTimeout(() => setStatus(''), 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('Failed to send automatically. Please use the WhatsApp option below.');
    }
  };

  return (
    <div className="enquiry-modal-overlay" onClick={onClose}>
      <div className="enquiry-modal" onClick={e => e.stopPropagation()}>
        <button className="enquiry-close-btn" onClick={onClose}>&times;</button>
        <h2 className="enquiry-title">Join Class Enquiry</h2>
        <p className="enquiry-subtitle">Please fill out the details below carefully.</p>

        <form className="enquiry-form">
          <div className="form-group">
            <label>Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email ID *</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Standard Phone No. *</label>
            <input type="tel" name="phone" pattern="[0-9]*" placeholder="Valid mobile number" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Preferred time to call *</label>
            <select name="preferredTime" value={formData.preferredTime} onChange={handleChange}>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          <div className="form-group">
            <label>Gender *</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Current Class *</label>
            <select name="currentClass" value={formData.currentClass} onChange={handleChange}>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Board of Education *</label>
            <select name="boardOfEducation" value={formData.boardOfEducation} onChange={handleChange}>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
              <option value="International/Other">International / Other</option>
            </select>
          </div>

          {status && <div className="form-status-msg">{status}</div>}

          <div className="form-actions">
            <button type="button" className="btn-email" onClick={handleEmail}>&#9993; Email Form</button>
            <button type="button" className="btn-whatsapp" onClick={handleWhatsApp}>&#128172; WhatsApp Form</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryForm;
