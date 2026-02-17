import React from 'react';
import { Testimonial } from '@/types';
import { formatDate } from '@/utils/helpers';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  // Generate star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i
        key={index}
        className={`bi ${index < rating ? 'bi-star-fill text-warning' : 'bi-star text-muted'}`}
      ></i>
    ));
  };

  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body p-4">
        {/* Rating Stars */}
        <div className="mb-3">
          {renderStars(testimonial.rating)}
        </div>

        {/* Testimonial Content */}
        <p className="card-text fst-italic mb-4">
          "{testimonial.content}"
        </p>

        {/* Client Info */}
        <div className="d-flex align-items-center mt-auto">
          <div className="grow">
            <h6 className="mb-1 fw-bold">{testimonial.client_name}</h6>
            <p className="text-muted small mb-0">
              <i className="bi bi-geo-alt me-1"></i>
              {testimonial.client_country}
            </p>
            <p className="text-muted small mb-0">
              <i className="bi bi-calendar me-1"></i>
              {formatDate(testimonial.created_at)}
            </p>
          </div>
          <div className="ms-3">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                 style={{ width: '50px', height: '50px' }}>
              <i className="bi bi-person fs-5"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;