import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/GlobalStyles';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
}

const SectionContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.dominant};
  color: white;
  position: relative;
  z-index: 1;
  padding: 50px;
`;

const Section: React.FC<SectionProps> = ({ children, id }) => {
  return <SectionContainer id={id}>{children}</SectionContainer>;
};

export default Section;
