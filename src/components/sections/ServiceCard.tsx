import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import type { ServiceFeature } from '../../types';

interface ServiceCardProps {
  service: ServiceFeature;
  showButton?: boolean;
  buttonText?: string;
  buttonAction?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  showButton = false, 
  buttonText = 'サービス詳細',
  buttonAction 
}) => {
  const navigate = useNavigate();

  const handleDefaultAction = () => {
    navigate('/services');
  };

  return (
    <Card variant="glass">
      <h3 className="text-2xl font-bold text-[#d4af37] mb-4 md:text-xl">
        {service.title}
      </h3>
      <p className="text-gray-300 leading-relaxed mb-6 text-lg md:text-base">
        {service.description}
      </p>
      <ul className="space-y-3 text-gray-400 md:space-y-2">
        {service.features.map((feature, index) => (
          <li key={index} className="flex items-start text-base md:text-sm">
            <span className="text-[#d4af37] mr-3 mt-1">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {showButton && (
        <div className="mt-6">
          <Button 
            onClick={buttonAction || handleDefaultAction}
            variant="secondary"
            size="md"
          >
            {buttonText}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ServiceCard;