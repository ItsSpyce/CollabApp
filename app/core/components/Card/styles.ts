import { Box } from 'grommet';
import styled from 'styled-components';

export const StyledCard = styled(Box)`
  padding: 12px;
  background-color: ${(props) => props.theme.colors.bg};
`;

export const CardHeader = styled.div`
  font-size: 24px;
  height: 40px;
  line-height: 32px;
`;
