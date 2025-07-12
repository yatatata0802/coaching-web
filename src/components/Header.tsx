import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-black bg-opacity-50 text-white p-4 fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/main" className="text-2xl font-bold text-yellow-400">矢田谷充則</Link>
        <div>
          <Link to="/main" className="mx-2 hover:text-yellow-400">HOME</Link>
          <Link to="/profile" className="mx-2 hover:text-yellow-400">PROFILE</Link>
          <Link to="/what-coaching" className="mx-2 hover:text-yellow-400">WHAT'S COACHING</Link>
          <Link to="/services" className="mx-2 hover:text-yellow-400">SERVICES</Link>
          <Link to="/contact" className="mx-2 hover:text-yellow-400">CONTACT</Link>
          <Link to="/sns" className="mx-2 hover:text-yellow-400">SNS</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
