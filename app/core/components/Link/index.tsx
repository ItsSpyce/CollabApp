import { Link as BlitzLink, LinkProps } from 'blitz';
import { PropsWithChildren } from 'react';
import { StyledLink } from './styles';

const Link = (props: PropsWithChildren<LinkProps>) => (
  //@ts-ignore
  <StyledLink {...props} />
);

export default Link;
