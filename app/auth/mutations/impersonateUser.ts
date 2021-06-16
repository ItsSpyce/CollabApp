import { resolver } from 'blitz';
import db, { UserRole } from 'db';
import { z } from 'zod';

const ImpersonateUser = z.object({
  userId: z.string(),
});

export default resolver.pipe(
  resolver.zod(ImpersonateUser),
  resolver.authorize([UserRole.TEST, UserRole.ADMIN]),
  async ({ userId }, ctx) => {
    const user = await db.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error(`Could not find user with ID ${userId}`);

    await ctx.session.$create({
      userId: user.id,
      role: user.role,
      impersonatingFrom: ctx.session.userId,
    });

    return user;
  }
);
