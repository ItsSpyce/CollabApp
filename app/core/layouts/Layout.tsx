import React, { ReactNode, useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import {
  Grommet,
  Box,
  Heading,
  Button,
  ResponsiveContext,
  Image,
  Text,
  Tip,
} from 'grommet';
import * as Icons from 'grommet-icons';
import { Head, useMutation, Link, useRouter } from 'blitz';
import { useCurrentUser, useLocalStorage } from 'app/core/hooks';
import logoutMutation from 'app/auth/mutations/logout';
import { AuthenticatedUser } from 'types';
import getTheme from 'utils/theme';
import {
  FlyoutBackground,
  FlyoutContainer,
  MainContent,
  NotificationTextArea,
  ProfilePicture,
  SidenavHeaderContainer,
  SidenavHeaderLinksSection,
  StyledAppBar,
  StyledMain,
  StyledSidenavMenuItem,
  SidenavFooterContainer,
} from './Layout.styles';
import { NotificationsContext } from '../contexts';
import { Icon } from 'grommet-icons';
import { Notification, NotificationSource } from 'db';
import ToggleButton from '../components/ToggleButton';

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

type AppBarProps = {
  user: AuthenticatedUser;
  title: string;
  notificationsCount: number;
  onClickMenu: () => void;
  onClickNotifications: () => void;
  size: string;
};

const AppBar = (props: AppBarProps) => {
  return (
    <StyledAppBar
      background="bg"
      tag="header"
      direction="row"
      align="center"
      justify="between"
      pad={{
        vertical: props.size === 'small' ? 'medium' : 'xsmall',
        horizontal: 'small',
      }}
      elevation="large"
    >
      <Button
        icon={<Icons.Menu color="textTertiary" />}
        onClick={props.onClickMenu}
      />
      <Heading level="3" margin="none" style={{ fontWeight: 'lighter' }}>
        {props.title}
      </Heading>
      <Button
        icon={
          <Icons.Notification
            color={props.notificationsCount > 0 ? 'info' : 'textTertiary'}
          />
        }
        onClick={props.onClickNotifications}
      />
    </StyledAppBar>
  );
};

type SidenavMenuProps = {
  user: AuthenticatedUser;
  isShowingHeader: boolean;
  onThemeToggleClick: (value: boolean) => void;
  onLogoutClicked: Promise<void>;
  size: string;
  theme: string;
};

const sidenavMenuItems = [
  {
    icon: Icons.Projects,
    text: 'Overview',
    href: '/dashboard',
  },
  {
    icon: Icons.AddCircle,
    text: 'New Booking',
    href: '/new',
  },
  {
    icon: Icons.Favorite,
    text: 'About',
    href: '/about',
  },
  {
    icon: Icons.Performance,
    text: 'Settings',
    href: '/settings',
  },
];

const SidenavMenu = (props: SidenavMenuProps) => {
  const router = useRouter();
  const isItemActive = ({ href }) => router.pathname === href;

  return (
    <Box overflow={{ horizontal: 'hidden' }}>
      <SidenavHeaderContainer flex direction="row" align="center">
        <ProfilePicture
          src={props.user.photo!}
          marginLeft={props.isShowingHeader ? '0px' : '100px'}
        />
        <Box>
          <Text>Welcome</Text>
          <Text color="textTertiary">{props.user.name}</Text>
        </Box>
      </SidenavHeaderContainer>
      <SidenavHeaderLinksSection>
        {sidenavMenuItems.map((item) => (
          <Link href={item.href}>
            <StyledSidenavMenuItem
              direction="row"
              isActive={isItemActive(item)}
              flex
            >
              <item.icon
                color={isItemActive(item) ? 'brand' : 'textSecondary'}
              />
              <Text
                margin={{ horizontal: 'medium' }}
                color={isItemActive(item) ? 'brand' : 'textSecondary'}
              >
                {item.text}
              </Text>
            </StyledSidenavMenuItem>
          </Link>
        ))}
      </SidenavHeaderLinksSection>
      <SidenavFooterContainer>
        <Box align="center">
          <ToggleButton
            value={props.theme === 'dark'}
            onChange={(value) => (value ? 'light' : 'dark')}
          />
        </Box>
        <StyledSidenavMenuItem direction="row">
          <Tip content="Logout">
            <Icons.Logout color="brand" />
          </Tip>
        </StyledSidenavMenuItem>
      </SidenavFooterContainer>
    </Box>
  );
};

type NotificationsMenuProps = {
  notifications: Notification[];
  size: string;
};

const MESSAGE_MAX_CHARS = 55;
const transformMessageContent = (content: string) =>
  content.length > MESSAGE_MAX_CHARS
    ? content.substr(0, MESSAGE_MAX_CHARS) + '...'
    : content;

const NotificationsMenu = (props: NotificationsMenuProps) => (
  <Box>
    {props.notifications.map((notif) => (
      <Box flex direction="row" align="center">
        <Box
          margin={{ horizontal: props.size === 'small' ? 'large' : 'medium' }}
        >
          {notif.source === NotificationSource.SYSTEM && (
            <Icons.CircleInformation
              color={notif.isRead ? 'textSecondary' : 'info'}
            />
          )}
          {notif.source === NotificationSource.INVITATION && (
            <Icons.Mail color={notif.isRead ? 'textSecondary' : 'info'} />
          )}
        </Box>
        <NotificationTextArea flex justify="around">
          <Text color="textSecondary" size="small">
            {notif.source}
          </Text>
          <Text>{transformMessageContent(notif.content)}</Text>
          <Text color="textTertiary" size="small">
            {notif.createdAt}
          </Text>
        </NotificationTextArea>
      </Box>
    ))}
  </Box>
);

const NotificationsMenuItem = (props) => <Box />;

const Layout = ({ title, children }: LayoutProps) => {
  const logout = useMutation(logoutMutation);
  const [user] = useCurrentUser();
  const [selectedTheme, setSelectedTheme] = useLocalStorage('theme', 'light');
  const notifications = useContext(NotificationsContext);
  const [isMenuShowing, setIsMenuShowing] = useState(false);
  const [isNotificationsShowing, setIsNotificationsShowing] = useState(false);
  const theme = getTheme(selectedTheme);
  const unreadNotificationsCount = notifications.filter(
    (notif) => notif.isRead
  ).length;

  function showMenu() {
    setIsMenuShowing(!isMenuShowing);
    setIsNotificationsShowing(false);
  }

  function showNotifications() {
    setIsNotificationsShowing(!isNotificationsShowing);
    setIsMenuShowing(false);
  }

  function hideMenuAndNotifications() {
    setIsMenuShowing(false);
    setIsNotificationsShowing(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Grommet theme={theme} themeMode={selectedTheme}>
        <Head>
          <title>{title || 'Collab App'}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ResponsiveContext.Consumer>
          {(size) => (
            <>
              {user && (
                <AppBar
                  //@ts-ignore
                  user={user}
                  title={title || ''}
                  notificationsCount={unreadNotificationsCount}
                  onClickMenu={showMenu}
                  onClickNotifications={showNotifications}
                  size={size}
                />
              )}
              <StyledMain
                background="bgSecondary"
                direction="row"
                flex
                overflow={{ horizontal: 'hidden', vertical: 'auto' }}
                size={size}
              >
                {(isMenuShowing || isNotificationsShowing) && (
                  <FlyoutBackground onClick={hideMenuAndNotifications} />
                )}
                <FlyoutContainer
                  flyoutDirection="left"
                  isShowing={isMenuShowing || size !== 'small'}
                  background="bg"
                  width={size === 'small' || isMenuShowing ? '250px' : '76px'}
                >
                  <SidenavMenu
                    isShowingHeader={isMenuShowing}
                    size={size}
                    user={user as AuthenticatedUser}
                    onThemeToggleClick={setSelectedTheme}
                    onLogoutClicked={Promise.resolve()}
                    theme={selectedTheme}
                  />
                </FlyoutContainer>
                <FlyoutContainer
                  flyoutDirection="right"
                  isShowing={isNotificationsShowing}
                  background="bg"
                  width="300px"
                >
                  <NotificationsMenu
                    notifications={notifications}
                    size={size}
                  />
                </FlyoutContainer>
                <MainContent margin={{ left: size === 'small' ? '0' : '76px' }}>
                  {children}
                </MainContent>
              </StyledMain>
            </>
          )}
        </ResponsiveContext.Consumer>
      </Grommet>
    </ThemeProvider>
  );
};

export default Layout;
