import React from 'react';
import { Feature } from '@/types';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  // Map feature types to colors and icons
  const getFeatureStyle = (type: string) => {
    // Convert to uppercase for comparison to handle both 'ctb' and 'CTB'
    const normalizedType = type?.toUpperCase();
    
    switch (normalizedType) {
      case 'CTB':  // ✅ Changed from 'ctb' to 'CTB'
        return {
          icon: 'bi-laptop',
          color: 'text-primary',
          bgColor: 'bg-primary',
          badge: 'CBT System'
        };
      case 'LIVE':
        return {
          icon: 'bi-camera-video',
          color: 'text-success',
          bgColor: 'bg-success',
          badge: 'Live Class'
        };
      case 'GEN':
        return {
          icon: 'bi-gear',
          color: 'text-warning',
          bgColor: 'bg-warning',
          badge: 'General'
        };
      default:
        return {
          icon: 'bi-gear',
          color: 'text-warning',
          bgColor: 'bg-warning',
          badge: 'General'
        };
    }
  };

  const style = getFeatureStyle(feature.feature_type);

  return (
    <div className="card h-100 border-0 shadow-sm hover-shadow">
      <div className="card-body p-4">
        {/* Icon and Badge */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className={`${style.color} fs-1`}>
            <i className={`bi ${style.icon}`}></i>
          </div>
          <span className={`badge ${style.bgColor} text-white`}>
            {style.badge}
          </span>
        </div>

        {/* Title and Description */}
        <h5 className="card-title fw-bold mb-3">{feature.name}</h5>
        <p className="card-text text-muted">{feature.description}</p>

        {/* Feature icon from database */}
        {feature.icon && (
          <div className="mt-3">
            <small className="text-muted">
              <i className={`bi ${feature.icon} me-1`}></i>
              {feature.icon.replace('bi-', '')}
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;