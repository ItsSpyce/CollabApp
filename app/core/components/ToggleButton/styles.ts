import styled from 'styled-components';

type ToggleButtonProps = {
  isChecked: boolean;
  color: string;
};

export const StyledToggleButton = styled.div<ToggleButtonProps>`
  height: 25px;
  width: 48px;
  border-radius: 18px;
  border: ${(props) => props.theme.colors.borderSecondary} solid 1px;
  background-color: ${(props) =>
    props.theme.colors[props.isChecked ? props.color : 'grayLighter']};
  transition: background-color 100ms ease-out;
  overflow: hidden;
`;

type ToggleButtonCircleProps = {
  isChecked: boolean;
  checkedColor?: string;
  uncheckedColor?: string;
};

export const ToggleButtonCircle = styled.div<ToggleButtonCircleProps>`
  width: 22px;
  height: 22px;
  border: ${(props) => props.theme.colors.borderSecondary} solid 1px;
  border-radius: 18px;
  transform: translateX(${(props) => (props.isChecked ? '100%' : '0')});
  transition: all 100ms ease-out;
  background-color: ${(props) =>
    props.theme.colors[
      props.isChecked
        ? props.checkedColor || 'offwhite'
        : props.uncheckedColor || 'offwhite'
    ]};
  display: flex;
  justify-content: center;
  padding-top: 2px;
  overflow: hidden;
`;
