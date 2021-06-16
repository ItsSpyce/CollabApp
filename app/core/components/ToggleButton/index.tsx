import { Component } from 'react';
import { StyledToggleButton, ToggleButtonCircle } from './styles';

type ToggleButtonProps = {
  value?: boolean;
  onChange: (value: boolean) => void;
};

export default class ToggleButton extends Component<ToggleButtonProps> {
  state: {
    value: boolean;
  };

  constructor(props: ToggleButtonProps) {
    super(props);
    this.state = {
      value: props.value || false,
    };
  }

  componentDidUpdate({ value }: ToggleButtonProps) {
    if (value !== this.props.value) {
      this.setState({ value });
    }
  }

  toggleValue = () => {
    this.setState({ value: !this.state.value }, () => {
      this.props.onChange(this.state.value);
    });
  };

  render() {
    return (
      <StyledToggleButton onClick={this.toggleValue}>
        <ToggleButtonCircle isChecked={this.state.value} />
      </StyledToggleButton>
    );
  }
}
