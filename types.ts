import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from 'blitz';
import { User as DbUser, UserRole } from 'db';

declare module 'blitz' {
  export interface Ctx extends DefaultCtx {
    session: SessionContext;
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<UserRole>;
    PublicData: AuthenticatedUser;
  }
}

export type User = {
  userId: DbUser['id'];
  role: DbUser['role'];
  impersonatingFrom?: DbUser['id'];
  photo: DbUser['photo'];
};

export type AuthenticatedUser = {
  email: DbUser['email'];
  id: DbUser['id'];
  name: DbUser['name'];
  photo: DbUser['photo'];
  role: DbUser['role'];
};
