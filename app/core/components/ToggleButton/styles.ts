import styled from 'styled-components';

export const StyledToggleButton = styled.div`
  height: 24px;
  width: 48px;
  border-radius: 18px;
  border: ${(props) => props.theme.colors.borderSecondary} solid 1px;
`;

type ToggleButtonCircleProps = {
  isChecked: boolean;
};

export const ToggleButtonCircle = styled.div<ToggleButtonCircleProps>`
  width: 22px;
  height: 22px;
  border: ${(props) => props.theme.colors.borderSecondary} solid 1px;
  border-radius: 18px;
`;
