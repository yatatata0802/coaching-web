import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../styles/GlobalStyles";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 10px 15px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    gap: 8px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 40px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: ${(props) => (props.$isActive ? "#d4af37" : "#fff")};
  text-decoration: none;
  font-size: 1.1em;
  font-weight: 500;
  position: relative;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${(props) => (props.$isActive ? "100%" : "0")};
    height: 2px;
    background: #d4af37;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #d4af37;

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1em;
    letter-spacing: 0.05em;
  }

  @media (max-width: 480px) {
    font-size: 0.9em;
    letter-spacing: 0.03em;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const SocialIcon = styled.a`
  color: #fff;
  font-size: 1.2em;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);

  &:hover {
    color: #d4af37;
    background: rgba(212, 175, 55, 0.2);
    border-color: #d4af37;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 1em;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
    font-size: 0.9em;
  }
`;

const navItems = [
  { path: "/", label: "HOME" },
  { path: "/profile", label: "PROFILE" },
  { path: "/service", label: "SERVICE" },
  { path: "/what-coaching", label: "WHAT'S COACHING?" },
  { path: "/contact", label: "CONTACT" },
];

export default function Header() {
  const location = useLocation();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </Nav>

        <SocialIcons>
          <SocialIcon
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-twitter"></i>
          </SocialIcon>
          <SocialIcon
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-instagram"></i>
          </SocialIcon>
          <SocialIcon
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin"></i>
          </SocialIcon>
        </SocialIcons>
      </HeaderContent>
    </HeaderContainer>
  );
}
