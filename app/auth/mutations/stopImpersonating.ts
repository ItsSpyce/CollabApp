import { resolver } from 'blitz';
import db, { UserRole } from 'db';

export default resolver.pipe(
  resolver.authorize([UserRole.TEST, UserRole.ADMIN]),
  async (_, ctx) => {
    const userId = ctx.session.impersonatingFrom;
    if (!userId) {
      console.log('Current user is not impersonating anyone');
      return;
    }
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error(`No user found with ID ${userId}`);
    }

    await ctx.session.$create({
      userId: user.id,
      role: user.role,
      impersonatingFrom: undefined,
    });
    return user;
  }
);
