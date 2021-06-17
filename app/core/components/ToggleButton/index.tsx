import { useState, ReactElement } from 'react';
import { StyledToggleButton, ToggleButtonCircle } from './styles';

type ToggleButtonProps = {
  value?: boolean;
  onChange: (value: boolean) => void;
  checkedIcon?: ReactElement;
  uncheckedIcon?: ReactElement;
  checkedColor?: string;
  uncheckedColor?: string;
  background?: string;
};

const ToggleButton = ({
  checkedIcon,
  uncheckedIcon,
  checkedColor,
  uncheckedColor,
  background,
  onChange,
  value,
}: ToggleButtonProps) => {
  const [isChecked, setIsChecked] = useState(value || false);

  function toggleValue() {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  }
  return (
    <StyledToggleButton
      onClick={toggleValue}
      isChecked={isChecked}
      color={background || 'brand'}
    >
      <ToggleButtonCircle
        isChecked={isChecked}
        checkedColor={checkedColor}
        uncheckedColor={uncheckedColor}
      >
        {isChecked ? checkedIcon : uncheckedIcon}
      </ToggleButtonCircle>
    </StyledToggleButton>
  );
};

export default ToggleButton;
