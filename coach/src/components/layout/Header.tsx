import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/navigation';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-[#d4af37]/30 py-4 px-8 md:px-4 sm:px-4">
      <nav className="max-w-[1200px] mx-auto flex justify-center items-center">
        <ul className="flex list-none m-0 p-0 gap-5 flex-wrap justify-center md:gap-2">
          {NAV_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="md:flex-1 md:text-center">
                <Link 
                  to={item.path}
                  className={`
                    ${isActive ? 'text-[#d4af37]' : 'text-white'} 
                    no-underline text-[0.92rem] font-medium transition-colors duration-300 
                    relative flex flex-col items-center gap-[0.2rem] 
                    md:text-[0.82rem] md:py-2 md:px-[0.3rem] md:gap-[0.1rem]
                    hover:text-[#d4af37]
                    ${isActive ? 'after:w-full' : 'after:w-0'} 
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 
                    after:h-0.5 after:bg-[#d4af37] after:transition-all after:duration-300
                    hover:after:w-full
                  `}
                >
                  <IconComponent size={20} className="text-[#d4af37] text-[1.1em] md:text-[1.2em] md:mb-[0.1rem]" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;