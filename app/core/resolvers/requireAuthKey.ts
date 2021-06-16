import { AuthenticatedMiddlewareCtx } from '@blitzjs/core/server';

export default function requireAuthKey(app: string) {
  return async (_: any, ctx: AuthenticatedMiddlewareCtx) => {
    //
  };
}
