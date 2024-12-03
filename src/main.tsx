import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import Datepicker from './Datepicker';
import './index.css';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Container>
      <Datepicker />
    </Container>
  </StrictMode>,
);
