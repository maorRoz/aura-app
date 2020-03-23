import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavBarLayout = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  height: 60px;
  width: 100%;
  margin-bottom: 20px;
  background-color: #24292e;
  color: white;
`;

export const NavBarHeader = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: 1012px;
  margin: 0 auto;
  font-size: 22px;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
`;
