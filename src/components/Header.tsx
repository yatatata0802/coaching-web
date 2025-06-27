import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 64px;
  background: rgba(10, 10, 10, 0.92);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 0 3vw;
`;

const Nav = styled.nav`
  display: flex;
  gap: 2.5em;
`;

const NavLink = styled(Link)`
  color: #fff;
  font-size: 1.1em;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-decoration: none;
  padding: 0.3em 0.7em;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #222;
    color: #d4af37;
  }
`;

const SNSContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2em;
`;

const SNSIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: #fff;
  opacity: 0.82;
  transition: color 0.2s, opacity 0.2s;
  &:hover {
    color: #d4af37;
    opacity: 1;
  }
  &.x-icon svg path {
    fill: #fff;
    transition: fill 0.2s;
  }
  &.x-icon:hover svg path {
    fill: #000;
  }
`;

const InstagramIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 448 448"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient
        id="ig-gradient"
        cx="30%"
        cy="107%"
        r="150%"
        fx="30%"
        fy="107%"
      >
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="448" height="448" rx="100" fill="url(#ig-gradient)" />
    <circle cx="224" cy="224" r="80" fill="white" fillOpacity="0.8" />
    <circle cx="224" cy="224" r="56" fill="url(#ig-gradient)" />
    <circle cx="340" cy="108" r="20" fill="white" fillOpacity="0.8" />
  </svg>
);
const XIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 1200 1227"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1199.61 0H956.527L599.805 529.727L243.473 0H0L492.527 704.727L0 1227H243.473L599.805 697.273L956.527 1227H1199.61L707.083 522.273L1199.61 0Z" />
  </svg>
);
const NoteIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="7" fill="#00C27A" />
    <path
      d="M10.5 10.5V21.5H21.5V10.5H10.5ZM12.5 12.5H19.5V19.5H12.5V12.5Z"
      fill="white"
    />
  </svg>
);
const YouTubeIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="48" height="48" rx="12" fill="#FF0000" />
    <polygon points="20,16 34,24 20,32" fill="#fff" />
  </svg>
);

const Header: React.FC = () => (
  <HeaderContainer>
    <Nav>
      <NavLink to="/">HOME</NavLink>
      <NavLink to="/about">ABOUT US</NavLink>
      <NavLink to="/service">SERVICE</NavLink>
      <NavLink to="/contact">CONTACT</NavLink>
    </Nav>
    <SNSContainer>
      <SNSIcon
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </SNSIcon>
      <SNSIcon
        className="x-icon"
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X"
      >
        <XIcon />
      </SNSIcon>
      <SNSIcon
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Note"
      >
        <NoteIcon />
      </SNSIcon>
      <SNSIcon
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
      >
        <YouTubeIcon />
      </SNSIcon>
    </SNSContainer>
  </HeaderContainer>
);

export default Header;
