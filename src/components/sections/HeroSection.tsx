import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedText from '../ui/AnimatedText';
import Button from '../ui/Button';

interface HeroSectionProps {
  title: string;
  subtitle?: string[];
  description?: string;
  buttonText?: string;
  buttonAction?: () => void;
  showVideo?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  buttonAction,
  showVideo = false
}) => {
  const navigate = useNavigate();

  const handleDefaultAction = () => {
    navigate('/main');
  };

  return (
    <div className="pt-24 min-h-screen relative flex flex-col justify-center items-center bg-[#0a0a0a] text-white font-sans overflow-hidden md:pt-32 sm:pt-32">
      {showVideo && (
        <>
          <div className="absolute top-0 left-0 w-full h-full z-10">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/hero_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-20"></div>
        </>
      )}

      <div className="relative z-30 text-center max-w-4xl px-8">
        <h1 className="text-5xl font-bold mb-8 leading-[1.2] text-red-500 md:text-[2.2rem]"
            style={{
              textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.4)',
              animation: 'glow 3s ease-in-out infinite'
            }}>
          <AnimatedText text={title} />
        </h1>

        {subtitle && (
          <div className="text-xl mb-8 text-[#d4af37] font-medium md:text-[1.1rem]">
            {subtitle.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}

        {description && (
          <p className="text-base mb-12 text-gray-300 font-normal md:text-[0.9rem]">
            {description}
          </p>
        )}

        {buttonText && (
          <Button 
            onClick={buttonAction || handleDefaultAction}
            variant="primary"
            size="lg"
          >
            {buttonText}
          </Button>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#d4af37] text-sm z-30 md:bottom-6 md:text-xs">
        <i className="fas fa-mouse mr-2"></i>
        クリックして物語を始める
      </div>

      <style jsx>{`
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.4);
          }
          50% {
            text-shadow: 0 0 40px rgba(255, 0, 0, 1), 0 0 60px rgba(255, 0, 0, 0.8), 0 0 80px rgba(255, 0, 0, 0.6);
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;