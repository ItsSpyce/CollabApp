import { createContext, useContext, useReducer } from 'react';
import { useQuery, useMutation } from 'blitz';
import getCurrentUser from 'app/users/queries/getCurrentUser';
import logoutMutation from 'app/auth/mutations/logout';
import { AuthenticatedUser } from 'types';

const UserContext = createContext<AuthenticatedUser | null>(null);

export default function useCurrentUser() {
  const [user] = useQuery(getCurrentUser, null);
  const logout = useMutation(logoutMutation);
  return [user as AuthenticatedUser, logout];
}
