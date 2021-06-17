import styled from 'styled-components';
import { Link } from 'blitz';

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.teal};
`;
