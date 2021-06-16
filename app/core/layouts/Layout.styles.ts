import { Box, defaultProps, Image } from 'grommet';
import { rgba } from 'polished';
import styled from 'styled-components';

const getTopbarHeight = ({ size }) => (size === 'small' ? '72px' : '60px');

export const StyledAppBar = styled(Box)``;

type MainProps = {
  size: string;
};

export const StyledMain = styled(Box)<MainProps>`
  height: calc(100vh - ${getTopbarHeight});
  width: 100vw;
  position: relative;
`;

export const MainContent = styled(Box)`
  border-top: ${defaultProps.theme.global?.borderSize?.xsmall} solid
    ${(props) => rgba(props.theme.colors.borderSecondary, 0.5)};
  width: 100%;
`;

type FlyoutProps = {
  flyoutDirection: 'left' | 'right';
  isShowing: boolean;
};

const getFlyoutStartingPoint = (props: FlyoutProps) =>
  props.flyoutDirection === 'left' ? '-100%' : '100%';

export const FlyoutContainer = styled(Box)<FlyoutProps>`
  transform: translateX(${getFlyoutStartingPoint});
  position: absolute;
  top: 0;
  bottom: 0;
  ${(props) => (props.flyoutDirection === 'left' ? 'left: 0;' : 'right: 0;')}
  transform: translateX(
    ${(props) => (props.isShowing ? '0' : getFlyoutStartingPoint(props))}
  );
  transition: transform 200ms ease-out, width 200ms ease-out;
  z-index: 2;
  width: ${(props) => props.width};
  text-overflow: clip;
  white-space: nowrap;
`;

export const FlyoutBackground = styled.div`
  background-color: ${(props) => props.theme.colors.black};
  position: absolute;
  opacity: 0.5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow-x: hidden;
  animation: fadein 200ms ease-out;

  @keyframes fadein {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 0.5;
    }
  }
`;

export const SidenavHeaderContainer = styled(Box)`
  padding: 24px 20px;
`;

type ProfilePictureProps = {
  marginLeft: string;
};

export const ProfilePicture = styled(Image)<ProfilePictureProps>`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  margin-right: 12px;
  margin-left: ${(props) => props.marginLeft};
  transition: margin-left 200ms ease-out;
`;

export const SidenavHeaderLinksSection = styled(Box)``;

type SidenavMenuItemProps = {
  isActive?: boolean;
};

export const StyledSidenavMenuItem = styled(Box)<SidenavMenuItemProps>`
  padding: 18px ${(props) => (props.isActive ? '24px' : '28px')};
  ${(props) =>
    props.isActive && `border-left: 4px solid ${props.theme.colors.brand}`};
  background-color: ${(props) =>
    rgba(props.theme.colors.brand, props.isActive ? 0.15 : 0)};
`;

export const SidenavFooterContainer = styled(Box)`
  position: absolute;
  bottom: 0;
`;

export const NotificationTextArea = styled(Box)`
  height: 128px;
`;
