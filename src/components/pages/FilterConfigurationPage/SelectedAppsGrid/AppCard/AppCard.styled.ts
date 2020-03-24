import styled, { css } from 'styled-components';
import Rating from '@material-ui/lab/Rating';

const AppField = styled.div`
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all ease-in-out 200ms;
  margin-bottom: 8px;
`;

export const Card = styled.div<{ inspected?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 15px;
  border: 1px solid #bebfc2;
  border-radius: 8px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);

  img {
    max-height: 300px;
    max-width: 100%;
  }

  ${({ inspected }) =>
    !inspected &&
    css`
      cursor: pointer;
      &:hover ${AppField} {
        color: #7487cc;
      }
    `}
`;

export const AppName = styled(AppField)`
  font-size: 16px;
  font-weight: bold;
  color: #6d6e73;
`;

export const AppPublisher = styled(AppField)`
  font-size: 12px;
  font-style: italic;
`;

export const AppRating = styled(Rating)`
  margin-bottom: 20px;
`;
