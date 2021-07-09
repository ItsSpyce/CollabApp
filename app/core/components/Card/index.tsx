import { Box } from 'grommet';
import { PropsWithChildren } from 'react';
import { StyledCard, CardHeader } from './styles';

type CardProps = PropsWithChildren<{
  title?: string;
}>;

const Card = (props: CardProps) => (
  <StyledCard justify="around" align="center" {...props}>
    {props.title && <CardHeader>{props.title}</CardHeader>}
    {props.children}
  </StyledCard>
);

export default Card;
